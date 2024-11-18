/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface IPaginationProps<T = any> {
    page?: number;
    take?: number;
    count?: number;
    data?: Partial<T>[];
}

export function usePagination<T = any>(props?: IPaginationProps<T>) {
    const [count, setCount] = useState<number>(props?.count ?? 0);
    const [take, setTake] = useState<number>(props?.take ?? 10);
    const [page, setPage] = useState<number>(props?.page ?? 0);
    const [pageCount, setPageCount] = useState<number>(
        calcLastPage({
            customCount: props?.count,
            customTake: props?.take,
        }) + 1
    );
    const [lastPage, setLastPage] = useState<number>(
        calcLastPage({
            customCount: props?.count,
            customTake: props?.take,
        })
    );
    const [current, setCurrent] = useState<number>(props?.data?.length ?? 0);
    const [data, setData] = useState<Partial<T>[]>(props?.data ?? []);
    const [update, setUpdate] = useState<Date>(new Date());

    function calcLastPage(config?: {
        customCount?: number;
        customTake?: number;
    }): number {
        const localCount = config?.customCount ?? count;
        const localTake = config?.customTake ?? take;
        const remainder = localCount % localTake;

        return Math.floor(localCount / localTake) + (remainder > 0 ? 1 : 0);
    }

    function goToPage(page: number) {
        if (page < 0 || page > lastPage) return;
        setPage(page);
        setUpdate(new Date());
    }

    function goToFirstPage() {
        setPage(0);
        setUpdate(new Date());
    }

    function goToLastPage() {
        setPage(lastPage);
        setUpdate(new Date());
    }

    function goToNextPage() {
        if (page < lastPage) {
            setPage((prev) => prev + 1);
            setUpdate(new Date());
        }
    }

    function goToPrevPage() {
        if (page > 0) {
            setPage((prev) => prev - 1);
            setUpdate(new Date());
        }
    }

    function updateData(newData: Partial<T>[], newCount: number) {
        setData(newData);
        setCount(newCount);
        setCurrent(newData.length);

        const lastPage = calcLastPage({
            customCount: props?.count,
            customTake: props?.take,
        });
        setLastPage(lastPage);
        setPageCount(lastPage + 1);
        setUpdate(new Date());
    }

    function updateCount(newCount: number) {
        setCount(newCount);
    }

    function isFirstPage(): boolean {
        return page === 0;
    }

    function isLastPage(): boolean {
        return page === lastPage;
    }

    return {
        update,
        page,
        pageCount,
        lastPage,
        count,
        take,
        current,
        data,
        goToPage,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPrevPage,
        isFirstPage,
        isLastPage,
        updateCount,
        setTake,
        updateData,
    };
}
