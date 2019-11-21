import axios from 'axios';

export const getUsers = async () => {
    return await axios.get('http://localhost:8080/api/users')
        .then(response => {
            console.log("getusers() ", response.data);
            return response.data.users;
        })
        .catch(function (error) {
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
    return axios.put('http://localhost:8080/api/users/' + userID,editedObject)
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
            return response;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};

export const deleteUser = (userID) => {
    return axios.delete('http://localhost:8080/api/user/' + userID)
        .then((response) => {
            console.log("deleteUserByID() ", response.data);
            return response;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
};