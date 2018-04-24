
const express = require('express')
const router = express.Router()
const cityService = require('../services/city-service')
const constants = require('../constants')

let cityIndex = (req, res)=> {
    let now = new Date().setTime(new Date().getTime())
    let TODAY = `${new Date(now).getFullYear()}-${new Date(now).getMonth() + 1}-${new Date(now).getDate()}`
    cityService.getInfo({
        "begTime": "2017-05-15",
        "endTime": TODAY
    })
    .then(function(info){
        res.setHeader('Content-Type', 'application/json');
        res.json(info)
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

let cityTotal = (req, res)=> {
    cityService.getCityTotal({
        "begTime": req.query.begTime,
        "endTime": req.query.endTime,
    })
    .then(function(info){
    	res.setHeader('Content-Type', 'application/json');
        res.json(info)
    })
    .catch(function (error) {
        //console.log('error',error)
    })
}

router.post('/index', cityIndex)
router.get('/index', cityIndex)
router.get('/total', cityTotal)

module.exports = router
