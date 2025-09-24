import React, {type ReactNode, useEffect} from "react";

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

    return (
        <div className="fixed flex justify-center items-center size-full ">
            <dialog className="flex flex-col rounded-xl bg-white shadow-md shadow-blue-300">

            </dialog>
        </div>
    )
}