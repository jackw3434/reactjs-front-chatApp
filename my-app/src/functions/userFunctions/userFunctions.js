import axios from 'axios';

export const getUsers = () => {
    return axios.get('http://localhost:8080/api/users')
        .then(response => {
            console.log("getusers() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {

            if (error == "Error: Network Error") {
                console.log("GetUsers() Network Error: ", error);
                return;
            }
            console.log(error.response);
            return error.response;
        });
};

export const getUserByID = (userID) => {
    return axios.get('http://localhost:8080/api/users/' + userID)
        .then(response => {
            console.log("getusersByID() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};

export const editUserByID = (userID, editedObject) => {
    return axios.put('http://localhost:8080/api/users/' + userID, editedObject)
        .then(response => {
            console.log("editUserByID() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};

export const postUser = (userObject) => {
    return axios.post('http://localhost:8080/api/users', userObject)
        .then(response => {
            console.log("postUsers() ", response.data);
            return response.data;
        })
        .catch(function (error) {
            if (error == "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error == "Error: Network Error") {
                console.log("postUser() Network Error: ", error);
                return;
            }
            console.log("error", error);
            return error;
        });
};

export const deleteUser = (userID) => {
    return axios.delete('http://localhost:8080/api/users/' + userID)
        .then((response) => {
            console.log("deleteUserByID() ", response.data);
            return response;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};