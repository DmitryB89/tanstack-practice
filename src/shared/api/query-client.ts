import {QueryClient} from '@tanstack/react-query'
import axios from 'axios'
export const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-type": "application.json" },
});

export const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 1 * 60 * 1000}}})