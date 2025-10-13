import React, { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    isOpen: boolean;
    cancelFn?: () => void;
    primaryFn?: () => void;
    closeButtonFn: () => void;
    content?: ReactNode;
    titleContent?: ReactNode;
}

export default function Modal({ isOpen, cancelFn, primaryFn, content, titleContent, closeButtonFn }: Props) {
    const [open, setIsOpen] = useState(isOpen)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                if (cancelFn) {
                    cancelFn() //execute passed closing function
                }
                closeButtonFn()
                console.log(open)
            }
        };

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, cancelFn])



    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-blue-300/60 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-between size-2/5 rounded-xl bg-white shadow-md shadow-blue-300">
                <div title="Modal header" className="">
                    <h2>{titleContent}</h2>
                </div>
                <div title="Modal content">
                    {content}
                </div>
                <div title="Modal footer">

                </div>
            </div>
        </div>, document.body
    )
}