import React from "react";
import PlayersToolbar from "./PlayersToolbar";
import PlayersTable from "./PlayersTable";
import PlayerFormModal from "./PlayerFormModal";
import PlayerDetails from "./PlayerDetails";
import DeleteConfirmationDialog from "./DeleteConfirmDialog";

export default function PlayersManager() {
    return (
        <div>
            <PlayersToolbar />
            <PlayersTable />
            <PlayerFormModal />
            <PlayerDetails />
            <DeleteConfirmationDialog />
        </div>
    )
}