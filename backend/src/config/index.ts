
import dotenv from 'dotenv';
dotenv.config();

export const ROUT_PREFIX = process.env.ROUT_PREFIX || '/api/v1';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY || '';
export const FOURSQUARE_API_URL = process.env.FOURSQUARE_API_URL || '';
export const PORT = process.env.PORT || 4000;
export const FOURSQUARE_CATEGORIES = process.env.FOURSQUARE_CATEGORIES || '';