import { httpGet } from '../utils/http';
import { FOURSQUARE_API_KEY, FOURSQUARE_API_URL } from '../config';
import { FoursquarePlace, FourSquareQueryParams, FoursquareSearchResponse } from '@shared/types/foursquare';
import { ParseParams } from '@shared/types/parsed-query';
import { resolveCategoryId } from '../utils/actionHelper';

export const searchPlaces = async (action: string, params: ParseParams): Promise<FoursquarePlace[]> => {
    const categoryId = resolveCategoryId(action) || '';

    if (!categoryId) {
        throw new Error('Currently this place type is not supported');
    }

    const queryParams: FourSquareQueryParams = {
        query: params.query,
        categories: categoryId,
        limit: 10,
    };

    if (params.price) {
        queryParams.min_price = params.price;
        queryParams.max_price = params.price;
    }

    if (params.near) queryParams.near = params.near;
    if (params.open_now != null) queryParams.open_now = params.open_now;

    // Perform the initial search
    const data = await httpGet<FoursquareSearchResponse>(`${FOURSQUARE_API_URL}/places/search`, {
        headers: { Authorization: FOURSQUARE_API_KEY },
        params: queryParams,
    });

    const places = await Promise.all(
        data.results.map(async (place) => {
            try {
                const detail = await httpGet<{ rating?: number }>(
                    `${FOURSQUARE_API_URL}/places/${place.fsq_id}?fields=rating`,
                    { headers: { Authorization: FOURSQUARE_API_KEY } }
                );
                return { ...place, rating: detail.rating };
            } catch (error) {
                console.warn(`Failed to get rating for fsq_id ${place.fsq_id}`, error);
                return { ...place, rating: undefined };
            }
        })
    );

    if (!params.rating) {
        return places;
    }

    const filtered = await searchPlacesWithRatingFilter(places, params.rating);

    return filtered;
};

const searchPlacesWithRatingFilter = async (places: FoursquarePlace[], rating: number): Promise<FoursquarePlace[]> => {

    const filtered = places.filter(
        (place) => place.rating != null && place.rating >= rating
    );

    return filtered;
};