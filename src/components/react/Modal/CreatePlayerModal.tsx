import React from "react";
import Modal from "./Modal.tsx";

export default function CreatePlayerModal({ isOpen, closeButtonFn }: { isOpen: boolean, closeButtonFn: () => void }) {
    return (
        <Modal isOpen={isOpen} titleContent={"Create Player"} closeButtonFn={closeButtonFn} content={
            <>
                <form>

                </form>
            </>
        } />
    )
}