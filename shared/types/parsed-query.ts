export type ParseParams = {
    query: string;
    near?: string;
    price?: '1' | '2' | '3' | '4' | null;
    open_now?: boolean | null;
    rating?: number | null;
};

export type ParsedQuery = {
    action: string;
    parameters: ParseParams;
}