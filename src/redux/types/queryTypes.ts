export interface UserRTKArgs {
    source: string;
    page?: number;
    limit?: number;
}

export interface DateRangeRTKArgs {
    date?: string;
}


export interface FetchQueryRTKArgs {
    source?: string;
    page?: number;
    limit?: number;
    reviews?: number;
}
export interface ByIdQueryRTKArgs {
    id: string;
    page?: number;
    limit?: number;
}