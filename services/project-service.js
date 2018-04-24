const apiService = require('./api-service')
const constants = require('../constants')

exports.getProjectList = function() {
    return apiService.post(constants.PREFIX2 + '/Project/Index', {})
    .then((res) => {
        return Promise.resolve(res);
    })
    .catch(function (error) {
        return Promise.reject(error);
        console.log('error', error)
    })
}
