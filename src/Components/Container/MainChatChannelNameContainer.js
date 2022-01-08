import { useSelector } from "react-redux";
import MainChatChannelNamePresenter from "../Presenter/MainChatChannelNamePresenter";


const MainChatChannelNameContainer = ({ room, channel }) => {
    const store = useSelector(state => state);
    let isCanRender = false;
    if (room !== 0) {
        if (channel !== 0) {
            isCanRender = true;
        }
    }
    return (
        <MainChatChannelNamePresenter>{isCanRender && store.rooms[room - 1].channels[channel - 1].name}</MainChatChannelNamePresenter>
    )
}

export default MainChatChannelNameContainer;