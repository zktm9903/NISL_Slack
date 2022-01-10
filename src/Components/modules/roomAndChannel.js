import produce from "immer";
import { decrypt } from "../crypto";

const INIT_SOCKET = "roomAndChannel/INIT_SOCKET";
const SET_MYID = "roomAndChannel/SET_MYID";
const ADD_ROOM = "roomAndChannel/ADD_ROOM";
const SELECT_ROOM = "roomAndChannel/SELECT_ROOM";
const ADD_CHANNEL = "roomAndChannel/ADD_CHANNEL";
const SELECT_CHANNEL = "roomAndChannel/SELECT_CHANNEL";
const RECEIVE_CHAT = "roomAndChannel/RECEIVE_CHAT";
const PULL_ROOM = "roomAndChannel/PULL_ROOM";
const LOGOUT = "roomAndChannel/LOGOUT";
//비디오 타입 추가
const ADD_VIDEO = "roomAndChannel/ADD_VIDEO";
const SELECT_VIDEO = "roomAndChannel/SELECT_VIDEO";

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const pullRoom = (rooms) => {
  return {
    type: PULL_ROOM,
    rooms: rooms,
  };
};

export const initSocket = (socket) => ({
  type: INIT_SOCKET,
  socket: socket,
});

export const setMyid = (id) => ({
  type: SET_MYID,
  id: id,
});
export const addRoom = (roomName) => ({
  type: ADD_ROOM,
  room: {
    id: nextRoomId++,
    name: roomName,
    channels: [],
    videos: [],
  },
});

export const selectRoom = (roomId) => ({
  type: SELECT_ROOM,
  id: roomId,
});

export const addChannel = (id, channelName, roomId) => ({
  type: ADD_CHANNEL,
  roomId: roomId,
  channel: {
    id: id,
    name: channelName,
    chat: [],
  },
});

export const selectChannel = (channelId) => ({
  type: SELECT_CHANNEL,
  id: channelId,
});

export const receiveChat = (chat) => ({
  type: RECEIVE_CHAT,
  chat: chat,
});

// 비디오 객체 상새 형태
export const addVideo = (id, videoName) => ({
  type: ADD_VIDEO,
  video: {
    id: id,
    name: videoName,
  },
});

export const selectVideo = (videoId) => ({
  type: SELECT_VIDEO,
  id: videoId,
});

let nextRoomId = 1;

const initialState = {
  socket: null,
  myid: "",
  selectRoom: 0,
  selectChannel: 0,
  rooms: [
    // {
    //   id: 1,
    //   name: "first room",
    //   channels: [
    //     {
    //       id: 1,
    //       name: "1-1 channel",
    //       chat: [],
    //     },
    //     {
    //       id: 2,
    //       name: "1-2 channel",
    //       chat: [
    //         // {
    //         //     id: 5555555,
    //         //     name: '김수환',
    //         //     time: '4:22 PM',
    //         //     content: '안녕하세요 여러분~!'
    //         // },
    //         // {
    //         //     id: 5469775,
    //         //     name: '이상철',
    //         //     time: '5:34 AM',
    //         //     content: '방가방가 여러분~!'
    //         // },
    //         // {
    //         //     id: 6666666,
    //         //     name: '병률짱',
    //         //     time: '0:00 AM',
    //         //     content: '에취!'
    //         // },
    //       ],
    //     },
    //   ],
    //   videos: [
    //     {
    //       id: 1,
    //       name: "1-1 video room",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "second room",
    //   channels: [
    //     {
    //       id: 1,
    //       name: "2-1 channel",
    //       chat: [],
    //     },
    //     {
    //       id: 2,
    //       name: "2-2 channel",
    //       chat: [],
    //     },
    //   ],
    //   videos: [
    //     {
    //       id: 1,
    //       name: "2-1 video room",
    //     },
    //   ],
    // },
  ],
};

export default function roomAndChannel(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      nextRoomId = 1;
      state.socket.disconnect();
      return {
        ...state,
        socket: null,
        myid: "",
        selectRoom: 0,
        selectChannel: 0,
        rooms: [],
      };
    case INIT_SOCKET:
      return { ...state, socket: action.socket };
    case PULL_ROOM:
      return { ...state, rooms: action.rooms };
    case SET_MYID:
      return { ...state, myid: action.id };
    case ADD_ROOM:
      return { ...state, rooms: state.rooms.concat(action.room) };
    case SELECT_ROOM:
      return { ...state, selectRoom: action.id, selectChannel: 0 };
    case ADD_CHANNEL:
      if (action.roomId === 0) {
        return produce(state, (draft) => {
          draft.rooms[state.selectRoom - 1].channels.push(action.channel);
        });
      }
      return produce(state, (draft) => {
        draft.rooms[action.roomId - 1].channels.push(action.channel);
      });
    case SELECT_CHANNEL:
      return { ...state, selectChannel: action.id };
    case RECEIVE_CHAT:
      let sendRoom;
      let sendChannel;
      state.rooms.map((room) => {
        if (room.name == action.chat.channel_name) {
          sendRoom = room.id;
          room.channels.map((channel) => {
            if (channel.name == action.chat.room_name) {
              sendChannel = channel.id;
            }
          });
        }
      });

      action.chat.content = decrypt(action.chat.content, "81651647116"); // 복호화
      return produce(state, (draft) => {
        draft.rooms[sendRoom - 1].channels[sendChannel - 1].chat.push(
          action.chat
        );
      });
    //비디오 채널 추가 및 선택 ========================
    case ADD_VIDEO:
      return produce(state, (draft) => {
        draft.rooms[state.selectRoom - 1].videos.push(action.video);
      });
    case SELECT_VIDEO:
      return { ...state, selectVideo: action.id };
    default:
      return state;
  }
}
