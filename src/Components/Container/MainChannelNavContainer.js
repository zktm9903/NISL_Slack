import MainChannelNavPresenter from "../Presenter/MainChannelNavPresenter";
import MainRoomNameContainer from "./MainRoomNameContainer";
import MainChannelsContainer from "./MainChannelsContainer";
import { useSelector, useDispatch } from "react-redux";

const MainChannelNavContainer = () => {

    const store = useSelector(state => state);

    return (
        <MainChannelNavPresenter>
            <MainRoomNameContainer selectRoom={store.selectRoom} />
            <MainChannelsContainer rooms={store.rooms[store.selectRoom - 1]} />
        </MainChannelNavPresenter>
    )
}

export default MainChannelNavContainer;