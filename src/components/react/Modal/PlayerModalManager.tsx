import CreatePlayerModal from "./CreatePlayerModal.tsx";
import ViewPlayerModal from "./ViewPlayerModal.tsx";
import EditPlayerModal from "./EditPlayerModal.tsx";
import RemovePlayerModal from "./RemovePlayerModal.tsx";

export enum Modals {
    CreatePlayer = "CreatePlayer", ViewPlayer = "ViewPlayer",  EditPlayer = "EditPlayer", RemovePlayer = "RemovePlayer"
}

export default function PlayerModalManager({modalType, playerId}: {modalType: Modals, playerId: number | null}) {

    if(playerId) {
        switch (modalType) {
            case Modals.ViewPlayer:
                return <ViewPlayerModal/>
            case Modals.EditPlayer:
                return <EditPlayerModal/>
            case Modals.RemovePlayer:
                return <RemovePlayerModal playerId={playerId}/>
            default:
                console.log("Modal type undefined.")
        }
    } else if (!playerId && modalType == Modals.CreatePlayer) {
        return <CreatePlayerModal />
    }
}