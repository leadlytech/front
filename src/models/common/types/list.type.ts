export interface IListOffset<T = never> {
    currentPage: number;
    lastPage: number;
    count: number;
    take: number;
    current: number;
    data?: Partial<T>[];
}

export interface IListCursor<T = never> {
    nextCursor: string;
    take: number;
    current: number;
    data?: Partial<T>[];
}

export type TList<T = never> = IListOffset<T> | IListCursor<T>;
