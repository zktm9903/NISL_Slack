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
  const [videoMember, setVideoMember] = useState(0);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000", {
      transports: ["websocket"],
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
    console.log(socket.current.on("hey"));
  }, []);

  function callPeer(id) {
    if (videoMember === 0) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {},
        stream: stream,
      });

      peer.on("signal", (data) => {
        socket.current.emit("callUser", {
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

      socket.current.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
    }
  }

  function deleteThis() {
    const div = document.getElementById("noNeed");
    div.remove();
  }

  function acceptCall() {
    setCallAccepted(true);
    setVideoMember(videoMember + 1);
    const div = document.getElementById("noNeed");
    div.remove();
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
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
  console.log(RTCPeerConnection.generateCertificate());
  if (receivingCall) {
    incomingCall = (
      <div id="noNeed">
        <h1>통화를 시작하시겠습니까?</h1>
        <div>
          <button onClick={acceptCall}>Yes</button>
          <button onClick={deleteThis}>No</button>
        </div>
      </div>
    );
  }
  return (
    <>
      <Container>
        <Row>{PartnerVideo}</Row>
        <div>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
            }
            return callPeer(key);
          })}
        </div>
        <div>{incomingCall}</div>
      </Container>
      <MainContainer>
        <Row>{UserVideo}</Row>
      </MainContainer>
    </>
  );
}

export default Rtc;
