import { searchPlaces } from './restaurant.service';
import { httpGet } from '../utils/http';
import { resolveCategoryId } from '../utils/loadCategories';
import { ParseParams } from '@shared/types/parsed-query';

// Mock dependencies
jest.mock('../utils/http');
jest.mock('../utils/loadCategories');
jest.mock('../config', () => ({
    FOURSQUARE_API_KEY: 'test-api-key',
    FOURSQUARE_API_URL: 'https://api.foursquare.com/v3'
}));

describe('Restaurant Service - searchPlaces', () => {
    const mockedHttpGet = httpGet as jest.MockedFunction<typeof httpGet>;
    const mockedResolveCategoryId = resolveCategoryId as jest.MockedFunction<typeof resolveCategoryId>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockedResolveCategoryId.mockReturnValue('123');
        mockedHttpGet.mockResolvedValue({ results: [] });
    });

    it('should construct basic query params correctly', async () => {
        const params: ParseParams = {
            query: 'pizza'
        };

        await searchPlaces('restaurant', params);

        expect(mockedHttpGet).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                params: {
                    query: 'pizza',
                    categories: '123',
                    limit: 20
                }
            })
        );
    });

    it('should add price filter when specified', async () => {
        const params: ParseParams = {
            query: 'pizza',
            price: 2
        };

        await searchPlaces('restaurant', params);

        expect(mockedHttpGet).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                params: {
                    query: 'pizza',
                    categories: '123',
                    limit: 20,
                    min_price: 2,
                    max_price: 2
                }
            })
        );
    });

    it('should add location when near parameter is provided', async () => {
        const params: ParseParams = {
            query: 'pizza',
            near: 'New York'
        };

        await searchPlaces('restaurant', params);

        expect(mockedHttpGet).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                params: {
                    query: 'pizza',
                    categories: '123',
                    limit: 20,
                    near: 'New York'
                }
            })
        );
    });

    it('should add open_now when specified', async () => {
        const params: ParseParams = {
            query: 'pizza',
            open_now: true
        };

        await searchPlaces('restaurant', params);

        expect(mockedHttpGet).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                params: {
                    query: 'pizza',
                    categories: '123',
                    limit: 20,
                    open_now: true
                }
            })
        );
    });

    it('should throw error when category is not supported', async () => {
        mockedResolveCategoryId.mockReturnValue('');
        const params: ParseParams = {
            query: 'pizza'
        };

        await expect(searchPlaces('invalid-category', params))
            .rejects
            .toThrow('Currently this place type is not supported');
    });
});