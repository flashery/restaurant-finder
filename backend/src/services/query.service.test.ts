import { mockCreateCompletion } from 'backend/src/services/__mocks__/openai';
import { parseRestaurantQuery } from './query.service';

jest.mock('../config', () => ({
    OPENAI_API_KEY: 'test-key',
    MODEL: 'test-model'
}));

describe('Query Service - parseRestaurantQuery', () => {

    beforeEach(() => {
        mockCreateCompletion.mockReset(); // just reset calls/responses
    });

    it('should successfully parse a valid response', async () => {
        const validResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        action: 'restaurant_search',
                        parameters: {
                            query: 'pizza',
                            near: null,
                            price: null,
                            open_now:null,
                            rating: null,
                        }
                    })
                }
            }]
        };

        mockCreateCompletion.mockResolvedValueOnce(validResponse);
        

        const result = await parseRestaurantQuery('Find me a pizza place', 2);

        expect(result.parameters.query).toBe('pizza');
    });

    it('should throw error on invalid JSON response', async () => {
        const invalidResponse = {
            choices: [{
                message: {
                    content: 'invalid json'
                }
            }]
        };

        mockCreateCompletion.mockResolvedValueOnce(invalidResponse);

        await expect(parseRestaurantQuery('Find me a pizza place'))
            .rejects
            .toThrow('LLM parsing failed after retries');
    });

    it('should throw error when query parameter is missing', async () => {
        const invalidResponse = {
            choices: [{
                message: {
                    content: JSON.stringify({
                        action: 'restaurant_search',
                        parameters: {
                            near: null,
                            price: null,
                            open_now:null,
                            rating: null,
                        }
                    })
                }
            }]
        };

        mockCreateCompletion.mockResolvedValueOnce(invalidResponse);

        await expect(
            parseRestaurantQuery('Find me a donut buy place', 0)
          ).rejects.toThrow('Invalid LLM response shape');
    });

    it('should retry on API failure', async () => {
        mockCreateCompletion
            .mockRejectedValueOnce(new Error('API Error'))
            .mockResolvedValueOnce({
                choices: [{
                    message: {
                        content: JSON.stringify({
                            action: 'restaurant_search',
                            parameters: {
                                query: 'pizza'
                            }
                        })
                    }
                }]
            });

        const result = await parseRestaurantQuery('Find me a pizza place', 2);

        expect(mockCreateCompletion).toHaveBeenCalledTimes(2);
        expect(result.parameters.query).toBe('pizza');
    });

    it('should fail after maximum retries', async () => {
        mockCreateCompletion.mockRejectedValue(new Error('API Error'));

        await expect(parseRestaurantQuery('Find me a pizza place', 3))
            .rejects
            .toThrow('LLM parsing failed after retries');
        
        expect(mockCreateCompletion).toHaveBeenCalledTimes(4); 
    });

    it('should handle timeout errors', async () => {
        mockCreateCompletion.mockRejectedValue(new Error('timeout'));

        await expect(parseRestaurantQuery('Find me a pizza place', 3))
            .rejects
            .toThrow('LLM parsing failed after retries');
    });
});