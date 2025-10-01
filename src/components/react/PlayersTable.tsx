import React from "react";
import type { Player } from "../../types/player";

export default function PlayersTable({ players }: { players: Player[] }) {
    return (


        <div className={"flex flex-1 flex-col"}>
            <table className={"order-1 m-6 border-collapse border border-(--middle-gray) bg-white"}>
                <thead className={"tracking-widest text-(--hard-gray) bg-(--light-gray)"}>
                    <tr className={"border-b-1 border-(--middle-gray)"}>
                        <th className={"w-1/3 p-6 text-left select-none"}>PLAYER</th>
                        <th className={"p-6 text-left select-none"}>POSITION</th>
                        <th className={"p-6 text-left select-none"}>HEIGHT</th>
                        <th className={"p-6 text-left select-none"}>WEIGHT</th>
                        <th className={"p-6 text-left select-none"}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map(player => {
                            return (
                                <tr key={player.id} className={"group bg-white even:bg-(--light-gray) border-b-1 border-(--middle-gray)"}>
                                    <td className={"w-1/3 p-6 align-middle text-left select-none"} >{player.firstName} {player.lastName}</td>
                                    <td className={"p-6 align-middle text-left select-none"}>{player.position}</td>
                                    <td className={"p-6 align-middle text-left select-none"}>{player.heightCm} cm</td>
                                    <td className={"p-6 align-middle text-left select-none"}>{player.weightKg} kg</td>
                                    <td className={"p-6 align-middle text-left select-none"}>
                                        <button className={"bg-[url(public/icons/eye-icon.png)] size-[50px] border-none bg-white bg-size-[70%] bg-no-repeat bg-center group-even:bg-(--light-gray)"} type={"button"}></button>
                                        <button className={"bg-[url(public/icons/edit-icon.png)] size-[50px] border-none bg-white bg-size-[70%] bg-no-repeat bg-center group-even:bg-(--light-gray)"} type={"button"}></button>
                                        <button className={"bg-[url(public/icons/trash-icon.png)] size-[50px] border-none bg-white bg-size-[70%] bg-no-repeat bg-center group-even:bg-(--light-gray)"} type={"button"}></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}