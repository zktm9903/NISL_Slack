import { initSocket, receiveChat } from "./modules/roomAndChannel";


export const socketSubscribe = async (socket, dispatch) => {
    await socket.on('message', (data) => {
        console.log("App.js Socket(receive chat) ", data);
        //dispatch(receiveChat(data));
    });
    await dispatch(initSocket(socket));
}

const mapStateToProps = state => {
    console.log("containers/App.js mapStateToProps ", state);
    return state;
};

// const mapDispatchToProps = dispatch => {
//     socketSubscribe(dispatch);
//     return {
//         enterChatroom: () => {
//             socket.emit('enter chatroom');
//         },
//         leaveChatroom: () => {
//             socket.emit('leave chatroom');
//         },
//         sendChat: (chat) => {
//             socket.emit('send chat', { type: "msg", socketId: socket.id, chat: chat, regDate: Date.now() });
//         },
//         clearChat: () => {
//             dispatch(action.clearChat());
//         }
//     };
// }
