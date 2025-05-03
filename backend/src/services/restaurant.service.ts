import axios from 'axios';
import { httpGet } from '../utils/http';

export const searchRestaurants = async (query: string, location: string) => {
    const apiKey = process.env.FOURSQUARE_API_KEY;
    const url = process.env.FOURSQUARE_API_URL || '';

    const response = await httpGet(url, {
        headers: { Authorization: apiKey },
        params: {
            query,
            near: location,
            categories: '13065', // food category
            limit: 10,
        },
    });

    return response.data.results;
};
