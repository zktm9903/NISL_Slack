import MainChannelsPresenter from "../Presenter/MainChannelsPresenter";
import FoldingChannels from "./FoldingChannels";
import { useSelector } from "react-redux";
import VideoChannels from "./VideoChannels";

const MainChannelsContainer = ({ rooms }) => {
  const store = useSelector((state) => state);
  const store2 = useSelector((state) => state);

  return (
    <MainChannelsPresenter>
      {store.selectRoom !== 0 && <FoldingChannels rooms={rooms} />}
      {store2.selectRoom !== 0 && <VideoChannels rooms={rooms} />}
    </MainChannelsPresenter>
  );
};

export default MainChannelsContainer;
