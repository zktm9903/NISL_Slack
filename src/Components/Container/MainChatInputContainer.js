import MainChatInputPresenter from "../Presenter/MainChatInputPresenter";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { decrypt, encrypt } from "../crypto";

const TextInput = styled.textarea`
  width: 90%;
  height: 90%;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
  border-color: -moz-use-text-color #ffffff #ffffff -moz-use-text-color;
  border-image: none;
  border-radius: 6px 6px 6px 6px;
  border-style: none solid solid none;
  border-width: medium 1px 1px medium;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
  padding: 20px;
  font-size: 20px;
`;

const ButtonResizing = styled(Button)`
  margin-left: 10px;
  width: 8%;
  height: 90%;
  font-size: 30px;
  background-color: #1e2230;
  border: solid 0px black;
`;

const MainChatInputContainer = ({ room, channel }) => {
  const store = useSelector((state) => state);
  const [Msg, setMsg] = useState("");

  const changeMsg = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = () => {
    const text = encrypt(Msg, "81651647116"); // 암호화

    store.socket.emit("chat_message", {
      channel_name: store.rooms[store.selectRoom - 1].name,
      room_name:
        store.rooms[store.selectRoom - 1].channels[store.selectChannel - 1]
          .name,
      user_id: store.myid,
      user_name: store.myid,
      content: text,
    });
  };

  return (
    <MainChatInputPresenter>
      {room !== 0 && channel !== 0 && (
        <>
          <TextInput onChange={changeMsg} />
          <ButtonResizing variant="primary" onClick={sendMsg}>
            send
          </ButtonResizing>{" "}
        </>
      )}
    </MainChatInputPresenter>
  );
};

export default MainChatInputContainer;
