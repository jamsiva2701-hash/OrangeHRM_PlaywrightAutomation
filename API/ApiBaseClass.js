export class ApiBaseClass {
    constructor() {
        this.baseURL = 'https://reqres.in/api';
        this.headers = {};
        this.payload = null;
        this.response = null;
    }

    initRequest() {
        this.headers = {};
        this.payload = null;
        this.response = null;
        console.log('Request initialized');
    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    addHeaders(headersObj) {
        this.headers = { ...this.headers, ...headersObj };
    }

    addPayload(body) {
        this.payload = body;
    }

    addDefaultHeaders() {
        this.addHeader('Content-Type', 'application/json');
        console.log('Default headers added');
    }

    async sendRequest(method, endpoint) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const options = {
                method: method.toUpperCase(),
                headers: this.headers
            };

            if (this.payload) {
                options.body = JSON.stringify(this.payload);
            }

            console.log(`${method.toUpperCase()} ${url}`);
            this.response = await fetch(url, options);
            
            const contentType = this.response.headers.get('content-type');
            let responseBody;
            
            if (contentType && contentType.includes('application/json')) {
                responseBody = await this.response.json();
            } else {
                responseBody = await this.response.text();
            }

            console.log(`Status: ${this.response.status}`);
            console.log(`Response: ${JSON.stringify(responseBody).substring(0, 100)}...`);
            
            return this.response;
        } catch (error) {
            console.error('API Request failed:', error.message);
            throw error;
        }
    }

    getStatusCode() {
        return this.response.status;
    }

    async getResponseBody() {
        const contentType = this.response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await this.response.json();
        }
        return await this.response.text();
    }
}
