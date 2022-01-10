import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as faceapi from "face-api.js";

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
  margin-bottom: 20px;
  color: white;
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

  //face_api
  const [faceEmotion, setFaceEmotion] = useState("");

  const userVideo = useRef(null);
  const partnerVideo = useRef(null);
  const socket = useRef();

  useEffect(() => {
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
    const div = document.getElementById("justUse");
    div.remove();
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
    const div = document.getElementById("justUse");
    div.remove();
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

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
    return () => {
      if (partnerVideo?.current) {
        console.log("Cleaning up stream tracks...");
        partnerVideo.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (partnerVideo?.current) {
      partnerVideo.current.addEventListener("play", playCallback);
    }
  });

  //face-api
  let interval;
  const playCallback = useCallback(() => {
    interval = setInterval(faceDetection, 1000);
  }, []);

  const faceDetection = useCallback(async () => {
    if (partnerVideo.current) {
      const detections = await faceapi
        .detectSingleFace(
          partnerVideo.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();
      setFaceEmotion(detections?.expressions.asSortedArray()[0].expression);
    }
  }, [partnerVideo]);

  //face-api

  let UserVideo;
  if (stream) {
    UserVideo = <MainVideo playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  let PlusEmotion;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
    PlusEmotion = faceEmotion;
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

  let cnt = 0;
  return (
    <>
      <Container>
        <Row>
          {PartnerVideo}
          {PlusEmotion}
        </Row>
        <div id="justUse">
          {incomingCall}
          {Object.keys(users).map((key) => {
            cnt++;
            if (cnt < 4) {
              return;
            }
            if (key === yourID) {
              return null;
            }
            return <button onClick={() => callPeer(key)}>Call {key}</button>;
          })}
        </div>
      </Container>
      <MainContainer>
        <Row>{UserVideo}</Row>A
      </MainContainer>
    </>
  );
}

export default Rtc;
