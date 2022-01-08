import MainTopNavContainer from "./MainTopNavContainer"
import MainBottomContainer from "./MainBottomContainer"

const MainBoxContainer = ({ offFunc }) => {
    return (
        <>
            <MainTopNavContainer offFunc={offFunc} />
            <MainBottomContainer />
        </>
    )
}

export default MainBoxContainer;