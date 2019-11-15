import axios from 'axios';

class BaseService {  
    getUsers() {
        return axios.get('http://localhost:8080/api/users')
    };
    postUser(){
        
    };
}

export default (new BaseService()); // singleton object