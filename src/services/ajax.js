export class Ajax {
    constructor () {
        // temp, check if window.fetch exists on the browser
        // if (!window.fetch) {
        //     throw new Error('window.fetch does not exist');
        // }

        this.fetch = fetch;
        this._baseUri = '';
    }

    get baseUri () {
        return this._baseUri;
    }

    set baseUri (base) {
        if (base[base.length - 1] !== '/') {
            base += '/';
        }
        this._baseUri = base;
    }

    _request (method, url, options) {
        // wrapping window.fetch in a new Promise to ease throwing errors when http failure codes occur
        return new Promise( (resolve, reject) => {
            if (typeof url === 'object') {
                if (!url.url) {
                    return reject(new Error('No url was found. A url is required'));
                }
                options = Object.assign({}, url);
                url = options.url;
            }
            //else {
                options = (options === undefined) ? {} : options;
                options.method = options.method || method;
            //}

            fetch(this.baseUri + url, options)
            .then( resp => {
                console.log(resp);

                // TODO: check status code and reject when >= 400
                return resp.json();
            })
            .catch( err => {
                return reject(err);
            })
            .then( json => {
                return resolve(json);
            });
        });
    }

    get (url, options) {
        return this._request('GET', url, options);
    }

    delete (url, options) {
        return this._request('DELETE', url, options);
    }

    // utility method for POSTs and PUTs to stringify the body object
    _postOrPut (method, url, body, options) {
        if (typeof url === 'object') {
            if (!url.body) {
                return new Error('No body was found. A body is required');
            }

            url.body = JSON.stringify(url.body);
        }
        else {
            options = (options === undefined) ? {} : options;
            options.body = JSON.stringify(body);
        }

        return this._request(method, url, body, options);
    }

    post (url, body, options) {
        return this._postOrPut('POST', url, body, options);
    }

    put (url, body, options) {
        return this._postOrPut('PUT', url, body, options);
    }
}
