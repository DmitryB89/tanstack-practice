import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {todolistApi} from "./api";
import {useState} from "react";
import clsx from 'clsx'


export function Todolist() {
    const [page, setPage] = useState(1)
    const [enabled, setEnabled] = useState(false)

    const {data: todoItems, error,  isPlaceholderData, isLoading} = useQuery({
        queryKey: ['tasks', 'list', {page}],
        queryFn: (meta) => todolistApi.getTodolists({page}, meta), placeholderData: keepPreviousData, enabled: enabled
    })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>error: {JSON.stringify(error)}</div>
    return <div className='p-5 mx-auto max-w-[1200px] mt-10'>
        <h1 className='text-3xl font-bold underline'>Todolist</h1>
        <button onClick={() => setEnabled(e => !e)}>toggle enabled</button>
        <div className={clsx('flex flex-col gap-4 mt-10', isPlaceholderData && 'opacity-50' )}>{todoItems?.data.map(todo => <div
            className='border border-slate-300 rounded p-3' key={todo.id}>{todo.text}</div>)}</div>
        <div className="flex gap-2 mt-4">
            <button className="p-3 rounded border border-teal-500"
                    onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev
            </button>
            <button className="p-3 rounded border border-teal-500"
                    onClick={() => setPage(p => Math.min(p + 1, todoItems?.pages ?? 1))}>Next
            </button>
        </div>
    </div>
}