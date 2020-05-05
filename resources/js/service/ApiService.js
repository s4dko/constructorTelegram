import axios from 'axios';

export class ApiService {
    constructor () {
        this.axios = axios.create({
            baseURL: 'http://localhost',
            timeout: 30000
        });


        this.translate = null;
    }

    getDefaultUrl (){
        return [API.protocol, API.basePath, ':', API.port, API.v].join('')
    }


    get(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .get(baseUrl + relUrl, data)
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    post(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .post(baseUrl + relUrl, data)
            .then(this.handleResponse)
            .catch(this.handleError);
    }



    handleError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let errorObj = this.handleBadStatus(error.response);

            if (errorObj)
                throw errorObj;

            //console.log(error.response.data);
            //console.log(error.response.headers);
            //console.log(error.response.status);
        }
        else {
            if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of http.ClientRequest in node.js
                console.log(error.request);

                if (error && error.message === "Network Error") {
                    throw new Error(this.getTranslate('error.network'));
                }
                else {
                    throw new Error(error.message);
                }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);

                throw new Error(error.message);
            }
        }
    }

    setRequestHeaders () {
        const api_token = localStorage.getItem('token');

        if (api_token) {
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`;
        }
    }
}