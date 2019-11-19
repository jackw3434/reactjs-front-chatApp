import axios from 'axios';

class BaseService {
    getUsers() {
        return axios.get('http://localhost:8080/api/users')
            .catch(function (error) {
                console.log("Error ", error);
            });
    };
    postUser(userObject) {
        return axios.post('http://localhost:8080/api/users', userObject)
            .catch(function (error) {
                console.log("Error ", error);
            });
    };
}

export default (new BaseService()); // singleton object