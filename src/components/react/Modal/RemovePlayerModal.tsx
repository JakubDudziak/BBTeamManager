import React from "react";
import Modal from "./Modal";

type Props = {
    isOpen: boolean
    playerName: string
}

export default function RemovePlayerModal({ isOpen, playerName }: Props) {
    return (
        <Modal isOpen={isOpen} content={(
            <>
                <h2>Remove Player</h2>
                <p>Are you sure that you want do remove: {playerName} from the player list?</p>
            </>
        )} />
    )
}