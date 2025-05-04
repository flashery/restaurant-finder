export type FourSquareQueryParams = {
  query: string;
  near?: string;
  categories: string;
  limit: number;
  min_price?: 1 | 2 | 3 | 4 | null;
  max_price?: 1 | 2 | 3 | 4 | null;
  open_now?: boolean | null;
  rating?: number | null;
}

export type FoursquarePlace = {
  fsq_id: string;
  name: string;
  location: {
    address: string;
    address_extended?: string;
    country: string;
    cross_street?: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;
    census_block?: string;
    dma?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
    roof?: {
      latitude: number;
      longitude: number;
    };
    drop_off?: {
      latitude: number;
      longitude: number;
    };
  };
  categories: {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  chains?: {
    id: string;
    name: string;
  }[];
  distance: number;
  link: string;
  closed_bucket?: string;
  timezone: string;
  rating?: number;
  display_rating?: string;
  open_now?: boolean;
}

export type FoursquareDetail = { rating?: number, hours?: { open_now: boolean } }

export type FoursquareSearchResponse = {
  results: FoursquarePlace[];
  context: {
    geo_bounds: {
      circle: {
        center: {
          latitude: number;
          longitude: number;
        };
        radius: number;
      };
    };
  };
}
