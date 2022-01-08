import { Modal, Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

const VideoNameInput = styled(FormControl)`
  width: 440px;
  margin: 30px;
`;

const PlusVideoContainer = ({ set, setShow, InsertVideo, InputVideoName }) => {
  return (
    <Modal show={set} onHide={setShow} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>비디오 채널 추가</Modal.Title>
      </Modal.Header>
      <VideoNameInput
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={InputVideoName}
      />
      <Modal.Footer>
        <Button variant="secondary" onClick={setShow}>
          Close
        </Button>
        <Button variant="primary" onClick={InsertVideo}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlusVideoContainer;
