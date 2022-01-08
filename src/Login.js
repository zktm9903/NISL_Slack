import styled from "styled-components";
import LoginBoxContainer from "./Components/Container/LoginBoxContainer";

const BackDiv = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height:100vh;
    background: linear-gradient(to right top,#1E2230, #0E0E0E);
`

const Login = () => {
    return (
        <BackDiv>
            <LoginBoxContainer></LoginBoxContainer>
        </BackDiv>
    )
}

export default Login;