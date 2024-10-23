import {instance} from "../../shared/api/query-client.ts";

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
    getTodolists: ({page}: { page: number }, {signal}: { signal: AbortSignal; }): Promise<PaginatedResult<TodoDto>> => {
        return instance.get(`/tasks?_page=${page}&_per_page=10`, {signal}).then((res) => res.data);
    }
}
