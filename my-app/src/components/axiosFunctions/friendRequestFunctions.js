import axios from 'axios';
const port = 8000;

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

export const sendFriendRequest = (friendEmail) => {

    let friendRequestObject = {
        sender: localStorage.getItem("email"),
        receiver: friendEmail
    }

    //console.log(localStorage);

    return axios.post('http://localhost:' + port + '/api/friendRequest/me',
        friendRequestObject,
        { headers: { Authorization: localStorage.getItem("token") } }
    ).then(response => {
       console.log("sendFriendRequest() ", response.data);
        return response.data;
    }).catch(function (error) {

        if (error === "Error: Request failed with status code 409") {
            console.log(error.response);
            return error.response;
        }
        if (error === "Error: Network Error") {
            console.log("sendFriendRequest() Network Error: ", error);
            return;
        }
        console.log("error", error.response);
        return error.response;
    });
};

export const getMyFriendRequests = () => {

    return axios.get('http://localhost:' + port + '/api/friendRequest/me',
        { headers: { Authorization: localStorage.getItem("token") } })
        .then(response => {
           // console.log("getMyFriendRequests() ", response.data.foundFriendRequests);
            return response.data.foundFriendRequests;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error === "Error: Network Error") {
                console.log("getMyFriendRequest() Network Error: ", error);
                return;
            }
            console.log("error", error.response);
            return error.response;
        });
};

export const getMyFriendsList = () => {

    return axios.get('http://localhost:' + port + '/api/friendsList/me',
        { headers: { Authorization: localStorage.getItem("token") } })
        .then(response => {
           // console.log("getMyFriendList() ", response);
           if(response === undefined){
            return "You have no friends yet!";
           }
            return response.data.friendsList;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error === "Error: Network Error") {
                console.log("getMyFriendList() Network Error: ", error);
                return;
            }
            console.log("error", error.response);
            return error.response;
        });
};