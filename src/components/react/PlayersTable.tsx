import React from "react";
import type { Player } from "../../types/player";

export default function PlayersTable(props) {
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

                </tbody>
            </table>
        </div>
    )
}