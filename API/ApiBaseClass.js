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

    // addDefaultHeaders() {
    //     this.addHeader('Content-Type', 'application/json');
    //     console.log('Default headers added');
    // }
    addDefaultHeaders() {
    this.addHeader('Content-Type', 'application/json');
    this.addHeader(
        'x-api-key',
        'pro_53221e47f1e0dc774ec5191a0f243fe8bb3383cc9b4bf1d1bb0e0414b31b7ed8'
    );
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
