import React from "react";

type PaginationProps = {
    currentPage: number;
    playersCount: number;
    playersPerPage: number;
    onPageChange: (currentPage: number) => void;
};

export default function Pagination({ currentPage, playersCount, playersPerPage, onPageChange }: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(playersCount / playersPerPage));
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const prev = () => onPageChange(Math.max(1, currentPage - 1));
    const next = () => onPageChange(Math.min(totalPages, currentPage + 1));

    return (
        <nav className="flex items-centet justify-center mb-6">
            <button
                type="button"
                onClick={prev}
                disabled={currentPage === 1}
                className={`size-10 m-1.5 rounded-xl
                ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-(--middle-gray)"}`}>
                &lt;
            </button>
            <div>
                {pages.map((pageNumber, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onPageChange(pageNumber)}
                        className={`size-10 m-1.5 cursor-pointer 
                        ${pageNumber === currentPage && "bg-(--primary-color) text-white rounded-xl"} 
                        ${pageNumber !== currentPage && "hover:bg-(--secondary-color) rounded-xl"}`}>
                        {pageNumber}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={next}
                disabled={currentPage === totalPages}
                className={`size-10 m-1.5 rounded-xl
                ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-(--middle-gray)"}`}>
                &gt;
            </button>
        </nav>
    )
}