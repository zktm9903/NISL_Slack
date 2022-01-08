import styled from "styled-components";
import MainChatChannelNameContainer from "./MainChatChannelNameContainer";
import { useSelector } from "react-redux";
import MainChatLogContainer from "./MainChatLogContainer";
import MainChatInputContainer from "./MainChatInputContainer";

const BackDiv = styled.div`
    width: 100%;
    height: 100%;
`

const MainChatContainer = () => {
    const store = useSelector(state => state);

    return (
        <BackDiv>
            <MainChatChannelNameContainer room={store.selectRoom} channel={store.selectChannel} />
            <MainChatLogContainer room={store.selectRoom} channel={store.selectChannel} />
            <MainChatInputContainer room={store.selectRoom} channel={store.selectChannel} />
        </BackDiv>
    )
}

export default MainChatContainer;