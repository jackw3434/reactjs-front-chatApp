import axios from 'axios';
const port = 8000;

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

export const registerUser = (userObject) => {
    return axios.post('http://localhost:' + port + '/api/register', userObject)
        .then(response => {
            console.log("registerUser() ", response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                //console.log( "Error: Request failed with status code 409", error.response);
                return "Error: Request failed with status code 409";
            }
            if (error === "Error: Network Error") {
                //console.log("registerUser() Network Error: ", error);
                return "Error: Network Error";
            }
            if (error.response.data.includes("UnauthorizedError: jwt expired")) {
                // console.log("UnauthorizedError: jwt expired");
                localStorage.clear();
                registerUser(userObject);
                return "UnauthorizedError: jwt expired, clearing cache and retrying";
            }
            //console.log("error", error);
            return error;
        });
};

export const loginUser = (userObject) => {
    return axios.post('http://localhost:' + port + '/api/login', userObject)
        .then(response => {
            //console.log("loginUser() ", response.data);
            return response;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error === "Error: Network Error") {
                console.log("loginUser() Network Error: ", error);
                return;
            }

            return error.response;
        });
};

export const getUsers = () => {
    return axios.get('http://localhost:' + port + '/api/users', { headers: { Authorization: localStorage.getItem("token") } })
        .then(response => {
            //console.log("getusers() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {

            if (error === "Error: Network Error") {
                console.log("GetUsers() Network Error: ", error);
                return;
            }
            console.log("lcoalstorage  ", localStorage);
            console.log("error.response ", error.response);
            console.log("error.response.data ", error.response.data);
            console.log("error.response ", error.response.statusText);

            if (error.response.data.includes("UnauthorizedError: jwt expired")) {
                console.log("UnauthorizedError: jwt expired");
                localStorage.clear();
                return;
            }

            return error.response;
        });
};

export const getUserByID = (userID) => {
    return axios.get('http://localhost:' + port + '/api/users/' + userID)
        .then(response => {
            //console.log("getusersByID() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};

export const editUserByID = (userID, editedObject) => {
    return axios.put('http://localhost:' + port + '/api/users/' + userID, editedObject)
        .then(response => {
            //console.log("editUserByID() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};

export const postUser = (userObject) => {
    return axios.post('http://localhost:' + port + '/api/users', userObject)
        .then(response => {
            //console.log("postUsers() ", response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error === "Error: Network Error") {
                console.log("postUser() Network Error: ", error);
                return;
            }
            console.log("error", error);
            return error;
        });
};

export const deleteUser = (userID) => {
    return axios.delete('http://localhost:' + port + '/api/users/' + userID)
        .then((response) => {
            //console.log("deleteUserByID() ", response.data);
            return response;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};