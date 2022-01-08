import MainTopNavPresenter from "../Presenter/MainTopNavPresenter"
import { useSelector } from "react-redux";
import styled from "styled-components";

const CloseButton = styled.p`
    margin: 0;
    margin-left:10px;
    margin-bottom:5px;
    width: 20px;
    height: 20px;
    padding: 0;
`

const MainTopNavContainer = ({ offFunc }) => {
    const store = useSelector(state => state);

    return (
        <MainTopNavPresenter >
            <CloseButton onClick={offFunc}>X</CloseButton>
            {store.myid}
        </MainTopNavPresenter>
    )
}

export default MainTopNavContainer;