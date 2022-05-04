import { useAsyncFn } from './hooks/useAsyncFn'
import { DependencyList } from 'react'

const Demo = ({ url }) => {
    const [state, doFetch] = useAsyncFn(async () => {
        // 获取lib下的方法  然后执行
        const response = await fetch(url)
        const result = await response.text()
        return result
    }, [url])

    return (
        <div>
            {
                state.loading ? (
                    <div>loading...</div>
                ) : state.error ? (
                    <div>Error: {state.error.message}</div>
                ) : (
                    <div>Value: {state?.value}</div>
                )
            }
            <button onClick={() => doFetch()}>start loading</button>
        </div>
    )
}