import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const MainVideo = styled.video`
  border: 1px solid green;
  width: 100vw;
  height: 70vh;
  text-align: center;
`;

const Row = styled.div`
  text-align: center;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 30%;
  height: 100%;
`;

function Rtc() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  //모달용 state
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    console.log(socket);
    socket.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("rtc_yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("rtc_allUsers", (users) => {
      setUsers(users);
    });

    socket.current.emit("rtc_ID", (data, users) => {
      setYourID(data);
      setUsers(users);
    });

    socket.current.on("rtc_hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {},
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("rtc_callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("rtc_callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("rtc_acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <MainVideo playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller}</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  function callIsComing(key) {
    if (caller === "") {
      callPeer(key);
      console.log("not my key : " + key);
      setCaller("1");
      openModal();
    }
  }

  return (
    <>
      <Container>
        <Row>{PartnerVideo}</Row>
      </Container>
      <MainContainer>
        <Row>{UserVideo}</Row>A
        <div>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
              console.log("This is my key : " + key);
            }
            return <button onClick={() => callPeer(key)}>Call {key}</button>;
            console.log("Not my key : " + key);
          })}
        </div>
        <div>{incomingCall}</div>
      </MainContainer>
    </>
  );
}

export default Rtc;
