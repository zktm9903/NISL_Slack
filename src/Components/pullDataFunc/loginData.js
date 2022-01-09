import axios from 'axios';
import { logout, setMyid } from '../modules/roomAndChannel';

export const loginUser = async (dispatch, user_name, setIsOpen) => {
    try {
        const res = await axios.post('http://localhost:80/user/login', {
            user_name: user_name,
        })
        await dispatch(setMyid(user_name));
        await setIsOpen(true);
    } catch (e) {
        console.log("로그인 실패")
        console.log(e)
    }
}

export const logoutUser = async (dispatch, user_name, setIsOpen) => {
    try {
        console.log({
            user_name: user_name,
        })
        const res = await axios.post('http://localhost:80/user/logout', {
            user_name: user_name,
        })
        await dispatch(logout());
        await setIsOpen(false);
    } catch (e) {
        console.log("로그아웃 실패")
        console.log(e)
    }
}