import { Modal, Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

const ChannelNameInput = styled(FormControl)`
    width: 440px;
    margin:30px;
`

const PlusChannelContainer = ({ set, setShow, InsertChannel, InputChannelName }) => {
    return (
        <Modal
            show={set}
            onHide={setShow}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>채널 추가</Modal.Title>
            </Modal.Header>
            <ChannelNameInput
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={InputChannelName}
            />
            <Modal.Footer>
                <Button variant="secondary" onClick={setShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={InsertChannel}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlusChannelContainer;