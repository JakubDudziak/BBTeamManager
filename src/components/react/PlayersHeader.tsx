import React from "react";

export default function PlayersHeader({playersCount}: {playersCount: number}) {
    return (
        <div className="flex items-center h-auto m-6">
            <img
                src="/icons/people-icon.png"
                alt="players heads"
                className="mr-2"
            />
            <h1 className="text-4xl">Players</h1>
            <p className="justify-center items-center ml-4 px-2 text-3xl text-(--primary-color) bg-(--secondary-color) rounded-xl">{playersCount}</p>
        </div>
    )
}