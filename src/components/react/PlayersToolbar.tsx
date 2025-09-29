import React, {useEffect, useRef, useState} from "react";

type Props = {
    value: string
    onQueryChange: (query: string) => void
    debounceMs?: number
}

export default function PlayersToolbar({value, onQueryChange, debounceMs = 200}: Props) {
    const [inputValue, setInputValue] = useState<string>(value)
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (value !== inputValue) setInputValue(value)
        console.log(`input value: ${inputValue},\n global value: ${value}`)
    }, [value]);

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const timeout = setTimeout(() => {
            if(inputValue !== value) onQueryChange(inputValue) //pass input value to the parent
        }, debounceMs)

        return () => clearTimeout(timeout)
    }, [inputValue, onQueryChange, value, debounceMs]);

    return (
        <div className="flex items-center justify-between h-fit border-y-2 border-(--middle-gray)">
            <input type="search"
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="🔎 Search for players.."
                   className="h-fit m-6 mr-0 p-2 text-2xl border border-solid border-(--middle-gray) rounded-2xl"/>
            <button type="button"
                    className="mr-6 py-2 px-4 text-2xl text-white bg-(--primary-color) border-none rounded-xl">+ Add
                player
            </button>
        </div>
    )
}