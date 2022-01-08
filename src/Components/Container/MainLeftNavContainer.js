import MainLeftNavPresenter from "../Presenter/MainLeftNavPresenter";
import RoomButtonsConatiner from "./RoomButtonsContainer";
import { useState } from "react";


const MainLeftNavContainer = ({ store, addRoomFunc }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const RoomPlus = () => setShow(true);

    return (
        <MainLeftNavPresenter>
            <RoomButtonsConatiner store={store} show={show} handleClose={handleClose} RoomPlus={RoomPlus} addRoomFunc={addRoomFunc} />
        </MainLeftNavPresenter>
    )
}

export default MainLeftNavContainer;