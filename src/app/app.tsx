import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../shared/api/query-client.ts";
import {Todolist} from "../modules/todo-list/todo-list.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Todolist/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}