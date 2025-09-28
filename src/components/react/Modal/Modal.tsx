import React, {type ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";

interface Props {
    open: boolean;
    cancelFn?: () => void;
    primaryFn?: () => void;
    closeIcon?: string | React.ReactNode;
    content?: React.ReactNode;
    titleContent?: ReactNode;
}

export default function Modal(props: Props) {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && props.open) {
                if (props.cancelFn) {
                    props.cancelFn()
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, props.cancelFn])

    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 flex items-center">
            <div className="flex flex-col size-1/6 rounded-xl bg-white shadow-md shadow-blue-300 absolute left-1/2">

            </div>
        </div>, document.body
    )
}