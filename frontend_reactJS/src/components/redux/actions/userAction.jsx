/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import MarkBelloApi from '../../../services/Api.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    UPLOAD_AND_UPDATE_IMAGE_REQUEST,
    UPLOAD_AND_UPDATE_IMAGE_FAILURE,
    UPLOAD_AND_UPDATE_IMAGE_SUCCESS,
    CHANGE_PASSWORD_USER_REQUEST,
    CHANGE_PASSWORD_USER_SUCCESS,
    CHANGE_PASSWORD_USER_FAILURE,
} from '../types/userTypes.jsx';

//MAG-FETCH UG USER
export const fetchUsers = () => async dispatch => {
    try {
        dispatch({ type: FETCH_USERS_REQUEST });
        // Perform async operation, e.g., fetch data from an API
        const users = await MarkBelloApi.get('/api/users');
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: users
        });
    } catch (error) {
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG USER 
export const addUser = newUser => async dispatch => {
    try {
        dispatch({ type: ADD_USER_REQUEST });
        // Perform async operation, e.g., send data to an API
        const addedUser = await MarkBelloApi.post(newUser);
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: addedUser
        });
    } catch (error) {
        dispatch({
            type: ADD_USER_FAILURE,
            payload: error.message
        });
    }
};

//MAG UPDATE UG USER GAMIT ID
export const updateUser = (userId, updatedUserData) => async dispatch => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const updateUserDataReqAndRes = await MarkBelloApi.put(`/api/user/${userId}`, updatedUserData);
        console.log("DATA SA response SA LINE 76", updateUserDataReqAndRes);

        if (updateUserDataReqAndRes.data.status === 200 && updateUserDataReqAndRes.data.success === true) {
            toast.success('User has been updated successfully!🤭😇🤗', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'white',
                    color: 'green',
                    fontSize: '15px'
                }
            });
        } else {
            toast.success('User was not updated!🤭😇🤗', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }
            });
        }

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updatedUser,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.message,
        });
    }
};

//MAG DELETE UG USER
export const deleteUser = userId => async dispatch => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        // Perform async operation, e.g., send delete request to an API
        await MarkBelloApi.delete(userId);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: userId
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message
        });
    }
};

//MAG-REGISTER UG USER 
export const registerUser = userData => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const registeredUser = await MarkBelloApi.post('/api/register', userData);
        console.log("DATA SA userData", userData);


        document.getElementById('loading-infinity').classList.add('loading', 'loading-infinity', 'loading-lg');

        toast.success('Registered successfully!🤭😇🤗', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            style: {
                background: 'white',
                color: 'black',
                fontSize: '15px'
            }
        });

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: registeredUser
        });

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; // Extract message from backend response
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: errorMessage
        });

        toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            style: {
                background: 'black',
                color: 'red',
                fontSize: '15px',
                fontWeight: 'Bold'
            }
        });
    }
};


export const loginUser = userData => async dispatch => {
    try {
        setTimeout(() => {
            dispatch({ type: LOGIN_USER_REQUEST });
        }, 1000);

        document.getElementById('loading-infinity').classList.add('loading', 'loading-infinity', 'loading-lg');

        const response = await MarkBelloApi.post('/api/login', userData);
        const loggedInUser = response.data.token;
        const loggedInUserId = response.data.user_id;
        const loggedInUserAccessTypId = response.data.user.access_type_id;

        console.log("DATA SA loginUser", response);

        localStorage.setItem('DTRMS_BY_M4RKBELLO', loggedInUser);
        sessionStorage.setItem('DTRMS_BY_M4RKBELLO', loggedInUser);
        document.cookie = `DTRMS_BY_M4RKBELLO=${loggedInUser}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;

        localStorage.setItem('DTRMS_BY_M4RKBELLO_USER_ID', loggedInUserId);
        sessionStorage.setItem('DTRMS_BY_M4RKBELLO_USER_ID', loggedInUserId);
        document.cookie = `DTRMS_BY_M4RKBELLO_USER_ID=${loggedInUserId}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;
        document.cookie = `DTRMS_BY_M4RKBELLO_USER_ACCESS_TYPE_ID=${loggedInUserAccessTypId}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;

        console.log("DATA RESPONSE SA LOGIN NAAY TOKEN", loggedInUser);
        console.log("DATA RESPONSE SA LOGIN", loggedInUserId)

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: loggedInUser
        });

        toast.success('Login successfully!🤭🤗😎', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            style: {
                background: 'white',
                color: 'green',
                fontSize: '15px'
            }
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: error.message
        });

        toast.error('User or Password is incorrect! 🥺⚠️👽', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            style: {
                background: 'black',
                color: 'red',
                fontSize: '15px',
                fontWeight: 'Bold'
            }
        });
    }
};

export const uploadAndUpdateImageUser = (formData, userId) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_AND_UPDATE_IMAGE_REQUEST });
        const uploadAndUpdateImageReqRes = await MarkBelloApi.post(`/api/update-image/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log("DATA SA uploadAndUpdateImageReqRes", uploadAndUpdateImageReqRes);

        if (uploadAndUpdateImageReqRes.data.success === true) {
            //set ug timer para mo reload .5seconds

            toast.success('Image upload successfully!🤭😇🤗', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                style: {
                    background: 'white',
                    color: 'green',
                    fontSize: '15px'
                }
            });


            // setTimeout(() => {
            //     window.location.reload();
            // }, 5000)
        } else {

            toast.error(uploadAndUpdateImageReqRes.data.message, '!🥺😱😣', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }

            });

            // setTimeout(() => {
            //     window.location.reload();
            //     navigate("http://localhost:5173/admin/user/profile-details");
            // }, 5000);

        }

        dispatch({
            type: UPLOAD_AND_UPDATE_IMAGE_SUCCESS,
            payload: response.data.user_image
        });

    } catch (error) {
        dispatch({
            type: UPLOAD_AND_UPDATE_IMAGE_FAILURE,
            payload: error.message,
        });

    }
};


//MAG CHANGE PASSWORD ANG USER
export const userChangePassword = (userId, changePasswordUserData) => async dispatch => {
    try {
        dispatch({ type: CHANGE_PASSWORD_USER_REQUEST });

        const response = await MarkBelloApi.post(`/api/user/change-password/${userId}`, changePasswordUserData);

        const changePasswordData = response.data;
        const changePasswordReqRes = response.success;

        if (changePasswordReqRes === true) {
            toast.success('Updated successfully!🤭😇🤗', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                style: {
                    background: 'white',
                    color: 'greeb',
                    fontSize: '15px'
                }
            });

        }

        dispatch({
            type: CHANGE_PASSWORD_USER_SUCCESS,
            payload: changePasswordData,
        });
    } catch (error) {

        toast.error('Updated successfully!🤭😇🤗', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            style: {
                background: 'black',
                color: 'red',
                fontSize: '15px'
            }
        });

        dispatch({
            type: CHANGE_PASSWORD_USER_FAILURE,
            payload: error.message,
        });
    }
};

