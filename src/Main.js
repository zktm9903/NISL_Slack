import styled from "styled-components"
import io from "socket.io-client";
import MainBoxContainer from "./Components/Container/MainBoxContainer"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initSocket } from "./Components/modules/roomAndChannel";
import { receiveChat } from "./Components/modules/roomAndChannel";
import { pullAllRoom, pullChannelInRoom } from "./Components/pullDataFunc/pullData";

const BackDiv = styled.div`
    width: 100%;
    height: 100%;
`

const socket = io.connect("http://localhost:80");

const Main = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    useEffect(() => {
        socket.on('chat_message', function (data) {
            dispatch(receiveChat(data));
        });
        dispatch(initSocket(socket));
        pullAllRoom(dispatch, store.myid);
    }, [])
    useEffect(() => {
        store.rooms.map(room => pullChannelInRoom(store, dispatch, room.name))
    }, [store.rooms.length])
    return (
        <BackDiv>
            <MainBoxContainer />
        </BackDiv>
    )
}

export default Main;