import { Request, Response } from 'express';
import { searchRestaurants } from '../services/restaurant.service';

export const findRestaurants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query, location } = req.query as {
      query?: string;
      location?: string;
    };

    if (!query || !location) {
      res.status(400).json({ error: 'Missing query or location' });
      return;
    }

    const results = await searchRestaurants(query, location);
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
