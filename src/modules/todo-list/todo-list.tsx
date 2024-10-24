import {useInfiniteQuery} from "@tanstack/react-query";
import {todolistApi} from "./api";
import {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx'


export function Todolist() {
    const [enabled, setEnabled] = useState(false)



    const {
        data: todoItems,
        error,
        isPlaceholderData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        ...todolistApi.getTodolistInfiniteQueryOptions(),
        enabled: enabled,

    })
    const cursorRef = useIntersection(() => {
        fetchNextPage()
    })
    console.log(cursorRef)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>error: {JSON.stringify(error)}</div>

    console.log('isFetchingNextPage', isFetchingNextPage, hasNextPage, )

    return <div className='p-5 mx-auto max-w-[1200px] mt-10'>
        <h1 className='text-3xl font-bold underline'>Todolist</h1>
        <button onClick={() => setEnabled(e => !e)}>toggle enabled</button>
        <div
            className={clsx('flex flex-col gap-4 mt-10', isPlaceholderData && 'opacity-50')}>{todoItems?.map(todo =>
            <div
                className='border border-slate-300 rounded p-3' key={todo.id}>{todo.text}</div>)}</div>
        <div className="flex gap-2 mt-4" ref={cursorRef}> {!hasNextPage &&
            <div>Нет данных для загрузки</div>} {isFetchingNextPage && <div>...Loading</div>}

        </div>
    </div>
}

export function useIntersection(onIntersect: () => void) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    const setElement = useCallback((el: HTMLDivElement | null) => {
        elementRef.current = el;
    }, []);

    useEffect(() => {
        if (!elementRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('Intersecting:', entry.isIntersecting);
                    onIntersect();
                }
            });
        });

        observer.observe(elementRef.current);
        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [onIntersect]);

    return setElement;
}