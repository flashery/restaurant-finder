import { OpenAI } from 'openai';
import { ParsedQuery } from '@shared/types/parsed-query';
import { OPENAI_API_KEY } from '../config';
import { PROMPT } from '../utils/prompt';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});





export const parseRestaurantQuery = async (
    userMessage: string,
    retryCount = 2
): Promise<ParsedQuery> => {
    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
            const response = await openai.chat.completions.create(
                {
                    model: 'gpt-4',
                    temperature: 0.2,
                    messages: [
                        { role: 'user', content: `${PROMPT}\n\nUser: ${userMessage}` },
                    ],
                },
                {
                    timeout: 10000,
                }
            );

            const content = response.choices[0].message?.content || '{}';
            const parsed = JSON.parse(content) as ParsedQuery;
            console.log(parsed);

            if (
                typeof parsed.parameters.query === 'string'
            ) {
                return parsed;
            } else {
                throw new Error('Invalid LLM response shape');
            }
        } catch (err) {
            console.warn(`⚠️ OpenAI attempt ${attempt + 1} failed:`, err);
            if (attempt === retryCount) throw new Error('LLM parsing failed after retries');
        }
    }

    throw new Error('Unhandled LLM retry logic');
};
