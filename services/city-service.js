
const Promise = require("bluebird")
const _ = require('lodash')
const apiService = require('./api-service')
const constants = require('../constants')

function getTodayItem(options) {
    return apiService.post( constants.PREFIX + '/Trade/UpToday',{})
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        console.log('error',error)
    })
}

function getTodaySale(options) {
    return apiService.post( constants.PREFIX + '/Trade/UpTodayXS',{})
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        console.log('error',error)
    })
}

function getTotalItem(options) {
    return apiService.post( constants.PREFIX + '/Trade/UpTotal',options)
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

function getTotalSale(options) {
    return apiService.post( constants.PREFIX + '/Trade/UpTotalXS',options)
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        console.log('error',error)
    })
}

exports.getCityTotal = function (options) {
    return Promise.props({
        totalItem: getTotalItem(options),
        totalSale: getTotalSale(options),
    })
}

exports.getInfo = function (options) {
    return Promise.props({
        todaySale: getTodaySale(),
        todayItem: getTodayItem(),
        totalSale: getTotalSale(options),
        totalItem: getTotalItem(options),
    })
}