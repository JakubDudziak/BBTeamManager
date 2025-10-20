import React, { useEffect, useRef, useState } from "react";

type Props = {
    value: string
    onQueryChange: (query: string) => void
}

export default function PlayersToolbar({ value, onQueryChange }: Props) {
    return (
        <div className="flex items-center justify-between h-fit border-y-2 border-(--middle-gray)">
            <input type="search"
                value={value}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="🔎 Search for players.."
                className="h-fit m-6 mr-0 p-2 text-2xl border border-solid border-(--middle-gray) rounded-2xl" />
            <a href="/players/new">
                <button type="button"
                    className="mr-6 py-2 px-4 text-2xl text-white bg-(--primary-color) border-none rounded-xl">+ Add
                    player
                </button>
            </a>
        </div>
    )
}