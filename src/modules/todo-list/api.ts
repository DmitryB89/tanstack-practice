import {instance} from "../../shared/api/query-client.ts";
import {infiniteQueryOptions, queryOptions} from "@tanstack/react-query";

export type TodoDto = {
    id: string;
    text: string;
    done: boolean
}

export type PaginatedResult<T> = {
    data: T[]
    prev: number | null
    next: number | null
    last: number
    first: number | null
    items: number
    pages: number


}

export const todolistApi = {
    getTodolist: ({page}: { page: number }, {signal}: { signal: AbortSignal; }): Promise<PaginatedResult<TodoDto>> => {
        return instance.get(`/tasks?_page=${page}&_per_page=10`, {signal}).then((res) => res.data);
    },
    getTodolistQueryOptions: ({page}: {page: number}) => {
        return queryOptions({
            queryKey: ['tasks', 'list', {page}],
            queryFn: (meta) => todolistApi.getTodolist({page}, meta),
        })
    },
    getTodolistInfiniteQueryOptions: () => {
        return infiniteQueryOptions({
            queryKey: ['tasks', 'list'],
            queryFn: (meta) => todolistApi.getTodolist({page: meta.pageParam}, meta),
            initialPageParam: 1,
            getNextPageParam: (result) => result.next,
            select: result => result.pages.flatMap(page => page.data)
        })
    }
}
