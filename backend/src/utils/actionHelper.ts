export const ACTION_CATEGORY_MAP: Record<string, string> = {
    restaurant_search: '13065',
    hotel_search: '19014',
    bar_search: '13003',
    coffee_search: '13032',
    sushi_search: '13276',
    pizza_search: '13067',
};

export const resolveCategoryId = (query: string): string | undefined => {
    const normalizedQuery = query.toLowerCase();
    return ACTION_CATEGORY_MAP[normalizedQuery];
};
