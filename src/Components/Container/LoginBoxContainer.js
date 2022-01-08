import LoginBoxPresenter from "../Presenter/LoginBoxPresenter";
import LoginBoxTitleContainer from "./LoginBoxTitleContainer";
import LoginBoxFormContainer from "./LoginBoxFormContainer";

const LoginBoxContainer = () => {
    return (
        <LoginBoxPresenter>
            <LoginBoxTitleContainer />
            <LoginBoxFormContainer />
        </LoginBoxPresenter>
    )
}

export default LoginBoxContainer;