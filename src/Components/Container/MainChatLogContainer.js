import MainChatLogPresenter from "../Presenter/MainChatLogPresenter";
import MyBubbleContainer from "./MyBubbleContainer";
import OpponentBubbleContainer from "./OpponentBubbleContainer";
import { useSelector } from "react-redux";

const MainChatLogContainer = ({ room, channel }) => {
    const store = useSelector(state => state)
    let key = 1;

    return (
        <MainChatLogPresenter>
            {room !== 0 && channel !== 0 && store.rooms[room - 1].channels[channel - 1].chat.map(log => (
                store.myid === log.maker ?
                    <MyBubbleContainer key={key++} log={log} /> :
                    <OpponentBubbleContainer key={key++} log={log} />
            ))}
        </MainChatLogPresenter>
    )
}

export default MainChatLogContainer;