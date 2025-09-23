import React from "react";

type PaginationProps = {
    playersCount: number;
    playersPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

export default function Pagination({playersCount, playersPerPage,currentPage ,setCurrentPage}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(playersCount / playersPerPage));
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const prev = () => setCurrentPage(Math.max(1, currentPage - 1));
    const next = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

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
                {pages.map((page, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`size-10 m-1.5 cursor-pointer 
                        ${currentPage === page && "bg-(--primary-color) text-white rounded-xl"} 
                        ${currentPage!== page && "hover:bg-(--secondary-color) rounded-xl"}`}>
                        {page}
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