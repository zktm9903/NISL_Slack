import { RoomButton, RoomPlusButton } from "../Presenter/RoomButtonPresenter";
import PlusRoomContainer from "./PlusRoomContainer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectRoom } from "../modules/roomAndChannel";

const RoomButtonsConatiner = ({ store, RoomPlus, show, handleClose, addRoomFunc }) => {
    const [roomName, setRoomName] = useState('');
    const dispatch = useDispatch();

    const changeRoom = (roomid) => {
        dispatch(selectRoom(roomid))
    }

    const InputRoomName = (e) => {
        setRoomName(e.target.value)
    }

    const InsertRoom = () => {
        addRoomFunc(roomName);
    }

    return (
        <>
            {
                store.rooms.map(room => (
                    <RoomButton key={room.id} variant="light" roomid={room.id} onClick={() => changeRoom(room.id)}>{room.name[0]}</RoomButton>
                ))
            }
            <RoomPlusButton variant="light" onClick={RoomPlus}>+</RoomPlusButton>
            <PlusRoomContainer set={show} setShow={handleClose} InsertRoom={InsertRoom} InputRoomName={InputRoomName} />
        </>
    )
}

export default RoomButtonsConatiner;