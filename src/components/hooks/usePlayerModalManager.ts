import { useState } from "react";
import { string } from "zod/v4";

export const usePlayerModalManager = () => {
    const [currentModal, setCurrentModal] = useState<string | null>(null)

    const openModal = (modalName: string) => setCurrentModal(modalName)
    const closeModal = () => setCurrentModal(null);

    const toggleModal = (modalName: string) => {
        if (currentModal === modalName) {
            closeModal();
        } else {
            openModal(modalName);
        }
    };

    return { openModal, closeModal, toggleModal, currentModal }
}