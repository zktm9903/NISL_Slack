import axios from 'axios';
import { addChannel, pullRoom } from '../modules/roomAndChannel';

export const pullAllRoom = async (dispatch, user_name) => {
    try {
        const res = await axios.post('http://localhost:80/channel/get', {
            user_name: user_name,
        })

        let nextId = 1;
        const insertRooms = [];
        await res.data.content.map(room => {
            insertRooms.push({
                id: nextId++,
                name: room.channel_name,
                channels: [],
                videos: []
            })
        })

        await dispatch(pullRoom(insertRooms));
    } catch (e) {
        console.log(e)
    }
};

export const pullChannelInRoom = async (store, dispatch, room_name) => {
    try {
        const res = await axios.post('http://localhost:80/room/get', {
            channel_name: room_name,
        })
        let nextId = 1;
        await res.data.content.map(channel => {
            const reduxRoomId = store.rooms.find(reduxRoom => reduxRoom.name === channel.channel_name).id;
            console.log(store.rooms[reduxRoomId - 1].name);
            console.log(channel.name)
            dispatch(addChannel(nextId++, channel.name, reduxRoomId));
            store.socket.emit("chat_join", [{
                channel_name: store.rooms[reduxRoomId - 1].name,
                room_name: channel.name,
            }])
        })
    } catch (e) {
        console.log(e)
    }

}

export const pullChat = async (dispatch, room_name, channel_name) => {
    const res = await axios.post('http://localhost:80/chat/get', {
        channel_name: room_name,
        room_name: channel_name,
    })

    await console.log(res.data.content)


}