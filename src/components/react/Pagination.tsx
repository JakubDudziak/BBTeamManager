import React from "react";

export default function Pagination({playersCount, playersPerPage, setCurrentPage}: {playersCount: number, playersPerPage: number, setCurrentPage: (page: number) => void}) {
    let pages = []

    for (let i = 1; i <= Math.ceil(playersCount / playersPerPage) ; i++) {
        pages.push(i)
    }

    return (
        <div className="flex items-centet justify-center mb-6">
        {/*<button type="button" className="size-10 m-1.5 cursor-pointer">&lt;</button>*/}
        <div>
            {pages.map((page, index) => {

                return <button type="button" key={index} onClick={() => setCurrentPage(page) } className="size-10 m-1.5 cursor-pointer focus:bg-(--primary-color) focus:text-white rounded-xl">{page}</button>
            })}
        </div>
        {/*<button type="button" className="size-10 m-1.5 cursor-pointer">&gt;</button>*/}
        </div>
    )
}