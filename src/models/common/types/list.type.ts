export interface IListOffset<T = any> {
    currentPage: number;
    lastPage: number;
    count: number;
    take: number;
    current: number;
    data?: Partial<T>[];
}

export interface IListCursor<T = any> {
    nextCursor: string;
    take: number;
    current: number;
    data?: Partial<T>[];
}

export type TList<T = any> = IListOffset<T> | IListCursor<T>;
