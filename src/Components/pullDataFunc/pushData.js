import axios from 'axios';
import { addChannel, addRoom } from '../modules/roomAndChannel';

export const makeRoom = async (dispatch, channel_name, user_name) => {
    try {
        const res = await axios.post('http://localhost:80/channel/', {
            channel_name: channel_name,
            user_name: user_name
        })

        await dispatch(addRoom(channel_name));
    } catch (e) {
        console.log("채널 등록 실패")
        console.log(e)
    }
}

export const insertUserInChannel = async (store, channel_name, user_name) => {
    try {
        const res = await axios.post('http://localhost:80/channel/member', {
            channel_name: channel_name,
            user_name: user_name,
        })

        store.socket.emit("add_member", {
            channel_name: channel_name,
            user_name: user_name,
        })
    } catch (e) {
        console.log("유저 초대 실패")
        console.log(e)
    }
}

export const makeChannel = async (dispatch, channel_id, user_name, channel_name, room_name) => {
    try {
        const res = await axios.post('http://localhost:80/room/', {
            user_name: user_name,
            channel_name: room_name,
            room_name: channel_name,
        })

        await dispatch(addChannel(channel_id, channel_name, 0));
    } catch (e) {
        console.log("채널 등록 실패")
        console.log(e)
    }
}