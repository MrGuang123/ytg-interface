import { DependencyList, useCallback, useRef, useState } from "react";
import { FunctionReturningPromise, PromiseType } from "./misc/types";
import useMountedState from "./useMountedState";

type asyncState<T> = {
    loading: boolean
    error?: undefined
    value?: undefined
} | {
    loading: true
    error?: Error | undefined
    value?: T
} | {
    loading: false
    error: Error
    value?: undefined
} | {
    loading: false
    error?: undefined
    value: T
}
type useAsyncFnReturningPromise<T extends FunctionReturningPromise> = asyncState<PromiseType<ReturnType<T>>>

type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [useAsyncFnReturningPromise<T>, T]

export function useAsyncFn<T extends FunctionReturningPromise>(
    fn: T,
    dependencies: DependencyList[],
    initialState: useAsyncFnReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
    const lastCallId = useRef(0)
    const [state, setState] = useState(initialState)
    const isMounted = useMountedState()
    const hooksDeps = [fn, isMounted, state.loading]

    if (dependencies.length > 0) {
        (hooksDeps as typeof hooksDeps & DependencyList[]).push(dependencies)
    }

    const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
        const callId = ++lastCallId.current
        setState({ loading: true })

        return fn(...args).then(value => {
            isMounted() && callId === lastCallId.current && setState({ value, loading: false })
            return value
        }, error => {
            isMounted() && callId === lastCallId.current && setState({ error, loading: false })
            return error
        }) as ReturnType<T>
    }, [...hooksDeps])

    return [state, callback as unknown as T]
}