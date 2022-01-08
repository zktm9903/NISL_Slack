import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addChannel, selectChannel, selectRoom } from "../modules/roomAndChannel";
import PlusChannelContainer from "./PlusChannelContainer";
import { useState } from "react";
import { makeChannel } from "../pullDataFunc/pushData"

const AccordionItemColor = styled(Accordion.Item)`
    background-color: transparent;
`
const ChannelButton = styled.div`
    background-color: transparent ;
    color: white;
`

const AccordionBodyPadding = styled(Accordion.Body)`
    padding-top:7px;
`

const FoldingChannels = ({ rooms }) => {
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [channelName, setChannelName] = useState('');

    const InputChannelName = (e) => {
        setChannelName(e.target.value);
    }

    const InsertChannel = () => {
        if (store.rooms[store.selectRoom - 1] !== undefined)
            makeChannel(dispatch, store.rooms[store.selectRoom - 1].channels.length, store.myid, channelName, store.rooms[store.selectRoom - 1].name)
        //dispatch(addChannel(store.rooms[store.selectRoom - 1].channels.length + 1, channelName))
    }

    const chooseChannel = (id) => {
        dispatch(selectChannel(id));
    }


    return (
        <Accordion defaultActiveKey="0">
            <AccordionItemColor eventKey="0">
                <Accordion.Header>Channels</Accordion.Header>
                <AccordionBodyPadding>
                    {rooms.channels.map(channel => (
                        <ChannelButton roomId={channel.id} onClick={() => chooseChannel(channel.id)}># {channel.name} </ChannelButton>
                    ))}
                    <ChannelButton onClick={() => setShow(true)}>+channel</ChannelButton>
                    <PlusChannelContainer set={show} setShow={handleClose} InsertChannel={InsertChannel} InputChannelName={InputChannelName} />
                </AccordionBodyPadding>
            </AccordionItemColor>
        </Accordion >
    )
}


export default FoldingChannels;