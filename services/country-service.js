
const Promise = require("bluebird")
const _ = require('lodash')
const apiService = require('./api-service')
const constants = require('../constants')

function getTodayItem(options) {
    return apiService.post( constants.PREFIX + '/Trade/DownToday',{})
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        console.log('error',error)
    })
}

function getTodaySale(options) {
    return apiService.post( constants.PREFIX + '/Trade/DownTodayXS',{})
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        console.log('error',error)
    })
}

function getTotalItem(options) {
    return apiService.post( constants.PREFIX + '/Trade/DownTotal',options)
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

function getTotalSale(options) {
    return apiService.post( constants.PREFIX2 + '/Workstation/GetReturnFee',options)
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

function getTodayStages() {
    return apiService.post( constants.PREFIX2 + '/WorkstationInventory/StagesArbitrarily',{})
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

function getTotalStages(options) {
    return apiService.post( constants.PREFIX2 + '/WorkstationInventory/StagesArbitrarily',options)
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

// 获取分期购饼图
function getStagesPie(options) {
    return apiService.post( constants.PREFIX2 + '/WorkstationInventory/StagesArbitrarilyPie', Object.assign({}, options, { type: 0 }))
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

// 获取任意购饼图
function getArbitrarilyPie(options) {
    return apiService.post( constants.PREFIX2 + '/WorkstationInventory/StagesArbitrarilyPie', Object.assign({}, options, { type: 10 }))
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

// 获取饼图集合
function getAllPie(options) {
    return apiService.post( constants.PREFIX2 + '/WorkstationInventory/StagesArbitrarilyProductionGoodsPie', Object.assign({}, options, { type: 0 }))
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

function getYesterdaySale(options) {
    let Yesterday = new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
    let YESTERDAY = `${new Date(Yesterday).getFullYear()}-${new Date(Yesterday).getMonth() + 1}-${new Date(Yesterday).getDate()}`
    return apiService.post( constants.PREFIX2 + '/Workstation/GetReturnFee',
    {
      "startTime": options.begTime || YESTERDAY,
      "endTime": options.endTime || YESTERDAY,
    })
    .then( (list)=> {
        return list.data
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

exports.getCountryTotal = function (options) {
    return Promise.props({
        totalItem: getTotalItem(options),
        totalSale: getYesterdaySale(options),
        totalStages: getTotalStages(options),    // 分期购、任意购、合作社, 传日期
        // stagesPie: getStagesPie(options),
        // arbitrarilyPie: getArbitrarilyPie(options)
        allPie: getAllPie(options),  // 饼图集合
    })
}

exports.getInfo = function (options) {
    return Promise.props({
        todayItem: getTodayItem(),
        todaySale: getTodaySale(),
        totalItem: getTotalItem(options),
        yesterdaySale: getYesterdaySale({}),
        totalSale: getYesterdaySale(options),
        totalStages: getTotalStages(options),    // 分期购、任意购、合作社, 传日期
        todayStages: getTodayStages(),    // 分期购、任意购、合作社， 不传日期
        // stagesPie: getStagesPie(options),
        // arbitrarilyPie: getArbitrarilyPie(options)
        allPie: getAllPie(options),  // 饼图集合
    })
}
