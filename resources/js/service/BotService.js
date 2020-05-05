import {ApiService} from "./ApiService";


class BotService extends ApiService{
    constructor () {
        super();
    }

    create(data){
        this.setRequestHeaders();

        return this
            .post('/bot/create', data)
            .then(function({ data, status, statusText, headers }) {
                return data;
            })
            .catch(function(error) {
                throw error;
            });
    }

    getAll(){
        this.setRequestHeaders();

        return this
            .post('/bot/get')
            .then(function({ data, status, statusText, headers }) {
                return data;
            })
            .catch(function(error) {
                throw error;
            });
    }
}

export default new BotService;