import { Accordion } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addVideo, selectVideo, selectRoom } from "../modules/roomAndChannel";
import PlusVideoContainer from "./PlusVideoContainer";
import Modal from "react-modal";
import Rtc from "../../Rtc";

const AccordionItemColor = styled(Accordion.Item)`
  background-color: transparent;
`;
const ChannelButton = styled.div`
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const ModalForVideo = styled(Modal)`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`;

const AccordionBodyPadding = styled(Accordion.Body)`
  padding-top: 7px;
`;

const VideoChannels = ({ rooms }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [videoName, setVideoName] = useState("");

  const InputVideoName = (e) => {
    setVideoName(e.target.value);
  };

  const InsertVideo = () => {
    console.log("124");
    if (store.rooms[store.selectRoom - 1] !== undefined)
      dispatch(
        addVideo(store.rooms[store.selectRoom - 1].videos.length + 1, videoName)
      );
  };

  const chooseVideo = (id) => {
    dispatch(selectVideo(id));
    setIsOpen(true);
  };
  return (
    <Accordion defaultActiveKey="0">
      <AccordionItemColor eventKey="0">
        <Accordion.Header>Videos</Accordion.Header>
        <AccordionBodyPadding>
          {rooms.videos &&
            rooms.videos.map((video) => (
              <ChannelButton
                roomId={video.id}
                onClick={() => chooseVideo(video.id)}
              >
                # {video.name}{" "}
                <ModalForVideo isOpen={isOpen} ariaHideApp={false}>
                  <Rtc />
                </ModalForVideo>
              </ChannelButton>
            ))}
          <PlusVideoContainer
            set={show}
            setShow={handleClose}
            InsertVideo={InsertVideo}
            InputVideoName={InputVideoName}
          />
          <ChannelButton
            onClick={() => {
              setShow(true);
            }}
          >
            +video
          </ChannelButton>
        </AccordionBodyPadding>
      </AccordionItemColor>
    </Accordion>
  );
};

export default VideoChannels;
