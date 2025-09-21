import React from "react";

export default function PlayersToolbar() {
    return (
        <div className="flex items-center justify-between h-fit border-y-2 border-(--middle-gray)">
            <input type="text" id="wantedPlayer" name="wantedPlayer" placeholder="🔎 Search for players.."
                   className="h-fit m-6 mr-0 p-2 text-2xl border border-solid border-(--middle-gray) rounded-2xl"/>
            <button type="button"
                    className="mr-6 py-2 px-4 text-2xl text-white bg-(--primary-color) border-none rounded-xl">+ Add
                player
            </button>
        </div>
    )
}