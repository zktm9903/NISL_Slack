import BubbleBox from "../Presenter/BubbleBox";
import { MyName, MyDate, MyContent } from "../Presenter/InBubble";


const MyBubbleContainer = ({ log }) => {

    return (
        <BubbleBox>
            <MyName>{log.user_name}</MyName>
            <MyDate>{log.created}</MyDate>
            <MyContent>{log.content}</MyContent>
        </BubbleBox>
    )
}

export default MyBubbleContainer;