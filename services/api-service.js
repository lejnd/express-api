var Promise = require("bluebird");
var _ = require('lodash');
var request = require('request');

/**
 * parse response body to json if it's json type
 * @param res
 * @param body
 * @returns {*}
 */
function parseToJson (res, body) {
    if (_.get(res, 'headers["content-type"]', '').indexOf('application/json') != -1) {
        return JSON.parse(body);
    } else {
        return body;
    }
}

/**
 * clear up null
 * @param options
 * @returns {*}
 */
function clearUpData (options) {
    //if(!options.data) return {}
    var data = options.data;
    //remove null and undefined keys
    Object.keys(data).forEach(function (key) {
        if (data[key] == null) {
            delete data[key];
        }
    });

    return options;

}

/**
 * is internal call
 * @param options
 * @returns {*}
 */
function addIsInternalCall (options) {

    options.isInternalCall = options.url.indexOf('http') != 0;
    return options;

}

/**
 * clone, clearup, and add credentials info to params
 * @param options
 * @returns {*}
 */
function addCredentials (options) {
    if (options.isInternalCall) {
        //if it's a internal call
        var data = options.data ? _.clone(options.data) : {};
        //add credentials
        options.req[options.dataKey] = _.defaults(data);
        //ecdo, checkout why have lang in request, remove lang
        delete options.req[options.dataKey].lang;
    }
    return options;
}

/**
 * prepend internal url
 * @param options
 */
function prependInternalUrl (options) {
    // if (options.isInternalCall) {
    //     //prepend internal prefix
    //     options.req.url = config.api.urlPrefix + options.url;
    // }else{
    //     options.req.url = options.url;
    // }
    options.req.url = options.url;
}

/**
 * make a request with node-request options. and use defer to resolve.
 * @param options
 * @returns {bluebird|exports|module.exports}
 */
function req (options) {

    return new Promise(function (resolve, reject) {

        addIsInternalCall(options);
        clearUpData(options);
        addCredentials(options);
        prependInternalUrl(options);

        request(options.req, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(parseToJson(res, body));
            } else {
                reject({
                    error: error,
                    body: parseToJson(res, body),
                    res: res
                })
            }
        })
    });

}

/**
 * get request
 * @param url url
 * @param qs query string
 * @returns {*|promise.promise|Function|o.promise|jQuery.promise|d.promise}
 */
function get (url, qs) {
    var options = {
        url: qs?url + '?' + _.keys(qs)[0] + '=' + _.reduce(qs,(result,n,key)=>{return `${result}&${key}=${n}`}):url,
        data: qs,
        dataKey: 'qs',
        req: {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        }
    }
    return req(options);
}

/**
 * post request
 * @param url
 * @param form
 * @param isMultipart
 * @returns {*|promise.promise|Function|o.promise|jQuery.promise|d.promise}
 */
function post (url, form, isMultipart) {
    var options = {
        url: url,
        data: form,
        dataKey: isMultipart ? 'formData' : 'form',
        req: {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: _.reduce({data:JSON.stringify(form)},(result,n,key)=>{return `${result}&${key}=${n}`})
        }
    };

    return req(options);
}

exports.get = get;
exports.post = post;
exports.req = req;
