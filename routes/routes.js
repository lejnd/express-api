
var index = require('./index-routes')
var country = require('./country-routes')
var city = require('./city-routes')
var project = require('./project-routes')

module.exports = function (app) {
    app.use('/country', country)
    app.use('/city', city)
    app.use('/project', project)
    app.use('/', index)
};
