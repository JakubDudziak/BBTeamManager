import React from "react";
import Modal from "./Modal";


export default function RemovePlayerModal({playerId}: {playerId: number}) {
    return (
        <Modal isOpen={true} content={(
            <>
                <h2>Remove Player</h2>
                <p>Are you sure that you want do remove: {} from the player list?</p>
            </>
        )} />
    )
}