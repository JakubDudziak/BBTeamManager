import React from "react";
import type { Player } from "../../types/player";

export default function PlayersTable({players}: {players: Player[]}) {
    return (
        <div>
            <p>PlayersTable</p>
            <table>
                <thead>
                    <tr>
                        <th>PLAYER</th>
                        <th>POSITION</th>
                        <th>HEIGHT</th>
                        <th>WEIGHT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                <p>{players.length}</p>
                    {

                        players.map(player => {
                            return (
                                <tr>
                                    <td>{player.firstName} {player.lastName}</td>
                                    <td>{player.position}</td>
                                    <td>{player.heightCm} cm</td>
                                    <td>{player.weightKg} kg</td>
                                    <td>
                                        <button></button>
                                        <button></button>
                                        <button></button>
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