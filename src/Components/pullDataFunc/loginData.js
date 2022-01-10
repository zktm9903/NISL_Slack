import axios from "axios";
import { logout, setMyid } from "../modules/roomAndChannel";

export const loginUser = async (dispatch, id, pw, setIsOpen) => {
  try {
    const authRes = await axios.post("http://localhost:3000/auth/read", {
      key: {
        id: id,
        pw: pw,
      },
    });

    if (!authRes.data.result.coll) {
      console.log("블록체인에 존재하지 않음");
      return;
    }
    console.log("블록체인에 존재함");
    const user_name =
      authRes.data.result.coll +
      authRes.data.result.stuid +
      authRes.data.result.name;

    console.log(user_name);
    try {
      const signUpRes = await axios.post("http://localhost:80/user/signup", {
        user_name: user_name,
      });
    } catch (e) {
      console.log("이미 회원가입이 되어있음");
      //console.log(e);
    }

    try {
      const signUpRes = await axios.post("http://localhost:80/user/login", {
        user_name: user_name,
      });
    } catch (e) {
      console.log("로그인 실패");
      //console.log(e);
    }

    console.log("로그인 성공");
    await dispatch(setMyid(user_name));
    await setIsOpen(true);
  } catch (e) {
    console.log("블록체인에 존재하지 않음");
    //console.log(e);
  }
};

export const logoutUser = async (dispatch, user_name, setIsOpen) => {
  try {
    console.log({
      user_name: user_name,
    });
    const res = await axios.post("http://localhost:80/user/logout", {
      user_name: user_name,
    });

    console.log("로그아웃 성공");
    await dispatch(logout());
    await setIsOpen(false);
  } catch (e) {
    console.log("로그아웃 실패");
    console.log(e);
  }
};
