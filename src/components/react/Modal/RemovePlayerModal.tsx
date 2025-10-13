import React from "react";
import Modal from "./Modal";


export default function RemovePlayerModal({ playerId, closeButtonFn }: { playerId: number, closeButtonFn: () => void }) {
    return (
        <Modal isOpen={true} closeButtonFn={closeButtonFn} content={(
            <>
                <h2>Remove Player</h2>
                <p>Are you sure that you want do remove: { } from the player list?</p>
            </>
        )} />
    )
}