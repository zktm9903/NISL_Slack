import { Modal, Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

const RoomNameInput = styled(FormControl)`
    width: 440px;
    margin:30px;
`

const PlusRoomContainer = ({ set, setShow, InsertRoom, InputRoomName }) => {
    return (
        <Modal
            show={set}
            onHide={setShow}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>그룹 추가</Modal.Title>
            </Modal.Header>
            <RoomNameInput
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={InputRoomName}
            />
            <Modal.Footer>
                <Button variant="secondary" onClick={setShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={InsertRoom}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlusRoomContainer;