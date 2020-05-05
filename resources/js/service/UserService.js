import {ApiService} from "./ApiService";

class UserService extends ApiService {
    constructor () {
        super();
    }

    login(data) {
        return this
            .post('/login', data)
            .then(function({ data, status, statusText, headers }) {
                const token = data.result.message.token;
                const user = JSON.stringify(data.result.message.user);

                localStorage.setItem('token', token);
                localStorage.setItem('user', user);

                return data;
            })
            .catch(function(error) {
                throw error;
            });
    }

    register(data) {
        return this
            .post('/register', data)
            .then(function({ data, status, statusText, headers }) {
                return data;
            })
            .catch(function(error) {
                throw error;
            });
    }

    logout(){
        this.setRequestHeaders();

        return this
            .post('/logout')
            .then(function({ data, status, statusText, headers }) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .catch(function(error) {
                throw error;
            });
    }
}

export default new UserService;
