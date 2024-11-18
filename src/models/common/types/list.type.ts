export interface IListOffset<T = never> {
    currentPage: number;
    lastPage: number;
    count: number;
    take: number;
    current: number;
    data: Array<T>;
}

export interface IListCursor<T = never> {
    nextCursor: string;
    take: number;
    current: number;
    data: Array<T>;
}

export type TList<T = never> = IListOffset<T> | IListCursor<T>;
