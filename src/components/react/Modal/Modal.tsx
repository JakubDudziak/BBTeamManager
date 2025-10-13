import React, {type ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface Props {
    isOpen: boolean;
    cancelFn?: () => void;
    primaryFn?: () => void;
    closeIcon?: string | ReactNode;
    content?: ReactNode;
    titleContent?: ReactNode;
}

export default function Modal({isOpen, cancelFn, primaryFn, closeIcon, content, titleContent}: Props) {
    const[open, setIsOpen] = useState(isOpen)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                if (cancelFn) {
                    cancelFn() //execute passed closing function
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, cancelFn])

    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-blue-300/60 backdrop-blur-sm">
            <div className="flex flex-col items-center size-2/5 rounded-xl bg-white shadow-md shadow-blue-300">
                <h2>{titleContent}</h2>
                {content}
            </div>
        </div>, document.body
    )
}