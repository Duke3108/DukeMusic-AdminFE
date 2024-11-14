/* eslint-disable no-unused-vars */
import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { url } from "../App"
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${url}/v1/auth/login`, user, {
            withCredentials: true  // Đảm bảo cookies được gửi đi trong yêu cầu
        })
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post(`${url}/v1/auth/register`, user)
        dispatch(registerSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get(`${url}/v1/user`, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed())
    }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart())
    try {
        const res = await axiosJWT.delete(`${url}/v1/user/` + id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(deleteUserSuccess(res.data))
    } catch (error) {
        dispatch(deleteUserFailed(error.response.data))
    }
}

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post(`${url}/v1/auth/logout`, id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logoutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed())
    }
}

