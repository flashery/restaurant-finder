import { Request, Response } from 'express';
import { parseRestaurantQuery } from '../services/query.service';
import { searchPlaces } from '../services/restaurant.service';
import { FoursquarePlace } from '@shared/types/foursquare';
import { ParsedQuery } from '@shared/types/parsed-query';

export const parseAndSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Missing message' });
      return;
    }

    const parsed: ParsedQuery = await parseRestaurantQuery(message);
    const { query } = parsed.parameters;

    if (!query) {
      res.status(400).json({ error: 'LLM did not return valid query/near' });
      return;
    }
    
    const results: FoursquarePlace[] = await searchPlaces(parsed.action, parsed.parameters);

    res.json(results);
  } catch (err) {
    console.error('LLM error:', err);
    res.status(500).json({ error: err });
  }
};
