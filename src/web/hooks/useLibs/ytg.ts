import { useEffect, useCallback } from "react";
import { atomWithImmer } from 'jotai/immer'
import { toggleService, DemoData } from '@ytg/utils'
import { useAtom } from 'jotai'

const manageAtomObj = atomWithImmer({
    loading: false,
    result: {} as DemoData
})

export function useDemo() {
    const [query, setQuery] = useAtom(manageAtomObj)
    const fn = useCallback(() => {
        toggleService.send('FETCH')
    }, [])

    useEffect(() => {
        toggleService.onTransition((state) => {
            if (state.value === 'loading') {
                setQuery(draft => {
                    draft.loading = true
                })
            }
            if (state.value === 'success') {
                setQuery(draft => {
                    draft.loading = false
                    draft.result = (state.context as any).user
                })
            }
        })
    }, [])

    return [query, fn]
}