import { OpenAI } from 'openai';
import { ParsedQuery } from '@shared/types/parsed-query';
import { OPENAI_API_KEY, MODEL, } from '../config';
import { PROMPT } from '../utils/prompt';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export const parseRestaurantQuery = async (
    userMessage: string,
    retryCount = 0,
): Promise<ParsedQuery> => {
    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {

            const response = await openai.chat.completions.create(
                {
                    model: MODEL,
                    temperature: 0.2,
                    max_tokens: 60,
                    messages: [
                        { role: 'system', content: PROMPT },
                        { role: 'user', content: userMessage },
                    ],
                },
                {
                    timeout: 10000,
                }
            );
            console.log('======================userMessage======================', userMessage, JSON.stringify(response));

            const content = response.choices[0].message?.content || '{}';
            const parsed = JSON.parse(content) as ParsedQuery;

            if (
                typeof parsed.parameters.query === 'string'
            ) {
                return parsed;
            } else {
                throw new Error('Invalid LLM response shape');
            }
        } catch (err: any) {
            console.warn(`OpenAI attempt ${attempt + 1} failed:`, err);
            if (err.message === 'Invalid LLM response shape') {
                throw err; // Let it bubble up immediately, don't retry
            }
            if (attempt === retryCount) throw new Error('LLM parsing failed after retries');
        }
    }

    throw new Error('Unhandled LLM retry logic');
};
