/* eslint-disable react-hooks/rules-of-hooks */
import MarkBelloApi from '../../../services/Api.jsx';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
    UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST,
    UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS,
    UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE,
    REGISTER_EMPLOYEE_REQUEST,
    REGISTER_EMPLOYEE_SUCCESS,
    REGISTER_EMPLOYEE_FAILURE,
    LOGIN_EMPLOYEE_REQUEST,
    LOGIN_EMPLOYEE_SUCCESS,
    LOGIN_EMPLOYEE_FAILURE
} from '../types/employeeTypes.jsx';


//MAG-FETCH UG EMPLOYEES DATAS
export const fetchEmployees = () => async dispatch => {
    try {
        dispatch({ type: FETCH_EMPLOYEES_REQUEST });

        // Fetch employees data from the API
        const employees = await MarkBelloApi.get('/api/employees');

        dispatch({
            type: FETCH_EMPLOYEES_SUCCESS,
            payload: employees
        });
    } catch (error) {
        // console.error("Error fetching employees:", error.message);

        dispatch({
            type: FETCH_EMPLOYEES_FAILURE,
            payload: error.message
        });
    }
};

//MAG ADD UG EMPLOYEE 
export const addEmployee = AddEmployeeData => async dispatch => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });

        const addEmployeeRequestResponse = await MarkBelloApi.post('/api/employee-registration', AddEmployeeData);

        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
            payload: addEmployeeRequestResponse
        });

    } catch (error) {

        dispatch({
            type: ADD_EMPLOYEE_FAILURE,
            payload: error.message
        });

    }
};

//MAG UPDATE UG EMPLOYEE GAMIT ID
export const updateEmployee = (employeeId, updateEmployeeData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

        const updateEmployeeResponse = await MarkBelloApi.put(`/api/employee/${employeeId}`, updateEmployeeData);

        if (!updateEmployeeResponse) {
            toast.error('Fill-up correctly! 🥺⚠️👽', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px',
                },
            });
        } else {
            toast.success('Updated Successfully!👌👌👌', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'white',
                    color: 'green',
                    fontSize: '15px',
                },
            });

            dispatch({
                type: UPDATE_EMPLOYEE_SUCCESS,
                payload: updateEmployeeResponse,
            });

            return updateEmployeeResponse;
        }
    } catch (error) {
 
        if (error.response && (error.response.status !== 200 || error.response.status !== 201)) {
            toast.error('Something went wrong! 😛😛😛', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px',
                },
            });
        }

        dispatch({
            type: UPDATE_EMPLOYEE_FAILURE,
            payload: error.message,
        });
    }
};

//REDUX-ACTION DISPATCH - FLAG TO 0 OR DELETE DEPENDE SA USECASE
export const deactivateEmployee = employeeId => async dispatch => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });

        const deactivateEmployeeReqAndRes = await MarkBelloApi.put(`/api/employee/deactivated/${employeeId}`);

        if (deactivateEmployeeReqAndRes.success != true) {
            // Handle the case where the response is empty
            toast.error('Employee not deactivated! 🥺⚠️👽', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: 'black',
                    color: 'red',
                    fontSize: '15px'
                }
            });
        } else {
            // Handle the case where the update is successful
            toast.success('Employee deactivated Successfully!👌👌👌', {
                position: 'top-right',
                autoClose: 3000,
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

            // setTimeout(() => {
            //     window.location.reload();
            //     updateEmployeeNavigator("http://localhost:5173/employee/dashboard"); // Use navigate here
            //   })

            dispatch({
                type: DELETE_EMPLOYEE_SUCCESS,
                payload: deactivateEmployeeReqAndRes
            });
        }

    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAILURE,
            payload: error.message
        });
    }
};

//REDUX-ACTION DISPATCH - UPLOAD UG IMAGE UG UPDATE - METHOD POST
export const uploadAndUpdateImageEmployee = (formData, employeeId) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_AND_UPDATE_EMPLOYEE_REQUEST });

        const uploadAndUpdateImageEmpReqRes = await MarkBelloApi.post(`/api/employee/image/${employeeId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (uploadAndUpdateImageEmpReqRes.data.success === false) {
            // Display error toast if the upload was unsuccessful
            toast.error(uploadAndUpdateImageEmpReqRes.data.message, '!🥺😱😣', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#fef3c7',
                    color: 'red',
                    fontSize: '20px'
                }
            });
        } else {
            // Display success toast if the upload was successful
            toast.success('Employee Image upload successfully!🤭😇🤗', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#fef3c7',
                    color: 'green',
                    fontSize: '17px'
                }
            });

            // Dispatch the success action only if the upload was successful
            dispatch({
                type: UPLOAD_AND_UPDATE_EMPLOYEE_SUCCESS,
                payload: uploadAndUpdateImageEmpReqRes.data.employee_image // Use the correct response object
            });

            // Reload or navigate after a successful upload, not needed if error occurs

        }
    } catch (error) {
        dispatch({
            type: UPLOAD_AND_UPDATE_EMPLOYEE_FAILURE,
            payload: error.message,
        });
    }
};

//REGISTER EMPLOYEE DISPATCH-ACTIONS
export const registerEmployee = employeeData => async dispatch => {
    try {
        dispatch({ type: REGISTER_EMPLOYEE_REQUEST });
        const registeredUser = await MarkBelloApi.post('/api/authentication/employee/register', employeeData);

        toast.success('Registered successfully!🤭😇🤗', {
            position: 'top-right',
            // autoClose: 5000,
            autoClose: false, 
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

        // Optional: Remove loading indicator
        document.getElementById('loading-infinity')?.classList.remove('loading', 'loading-infinity', 'loading-lg');

        dispatch({
            type: REGISTER_EMPLOYEE_SUCCESS,
            payload: registeredUser
        });

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; // Extract message from backend response
        dispatch({
            type: REGISTER_EMPLOYEE_FAILURE,
            payload: errorMessage
        });

        toast.error(errorMessage, {
            position: 'top-right',
            autoClose: false, 
            // autoClose: 5000,
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


//FOR EMPLOYEE LOGIN
export const loginEmployee = employeeData => async dispatch => {
    try {
        setTimeout(() => {
            dispatch({ type: LOGIN_EMPLOYEE_REQUEST });
        }, 1000);

        document.getElementById('loading-infinity').classList.add('loading', 'loading-infinity', 'loading-lg');

        const response = await MarkBelloApi.post('/api/authentication/employee/login', employeeData);
        const loggedInEmployee = response.data.token;
        const loggedInEmployeeId = response.data.employee.id;
        const loggedInEmployeeAccessTypId = response.data.employee.access_type_id;

        localStorage.setItem('DTRMS_BY_M4RKBELLO', loggedInEmployee);
        sessionStorage.setItem('DTRMS_BY_M4RKBELLO', loggedInEmployee);
        document.cookie = `DTRMS_BY_M4RKBELLO=${loggedInEmployee}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;

        localStorage.setItem('DTRMS_BY_M4RKBELLO_USER_ID', loggedInEmployeeId);
        sessionStorage.setItem('DTRMS_BY_M4RKBELLO_USER_ID', loggedInEmployeeId);
        document.cookie = `DTRMS_BY_M4RKBELLO_USER_ID=${loggedInEmployeeId}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;
        document.cookie = `DTRMS_BY_M4RKBELLO_EMPLOYEE_ACCESS_TYPE_ID=${loggedInEmployeeAccessTypId}; expires=${new Date(Date.now() + 86400 * 1000).toUTCString()}; path=/`;

        dispatch({
            type: LOGIN_EMPLOYEE_SUCCESS,
            payload: loggedInEmployee
        });

        toast.success('Employee Login successfully!🤭🤗😎', {
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
            type: LOGIN_EMPLOYEE_FAILURE,
            payload: error.message
        });

        toast.error('Employee or Password is incorrect! 🥺⚠️👽', {
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





