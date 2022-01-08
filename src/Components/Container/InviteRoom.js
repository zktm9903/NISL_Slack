import { Modal, Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

const ChannelNameInput = styled(FormControl)`
    width: 440px;
    margin:30px;
`

const InviteRoom = ({ set, setShow, InvitePerson, changeInputId }) => {
    return (
        <Modal
            show={set}
            onHide={setShow}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>친구 초대</Modal.Title>
            </Modal.Header>
            <ChannelNameInput
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={changeInputId}
            />
            <Modal.Footer>
                <Button variant="secondary" onClick={setShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={InvitePerson}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InviteRoom;