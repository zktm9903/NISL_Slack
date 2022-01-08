import BubbleBox from "../Presenter/BubbleBox";
import { OpponentName, OpponentDate, OpponentContent } from "../Presenter/InBubble";

const OpponentBubbleContainer = ({ log }) => {

    return (
        <BubbleBox>
            <OpponentName>{log.maker}</OpponentName>
            <OpponentDate>{log.created}</OpponentDate>
            <OpponentContent>{log.content}</OpponentContent>
        </BubbleBox>
    )
}

export default OpponentBubbleContainer;