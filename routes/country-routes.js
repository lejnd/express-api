
const express = require('express')
const router = express.Router()
const countryService = require('../services/country-service')
const constants = require('../constants')

let countryIndex = (req, res)=> {
    let now = new Date().setTime(new Date().getTime())
    let TODAY = `${new Date(now).getFullYear()}-${new Date(now).getMonth() + 1}-${new Date(now).getDate()}`
    countryService.getInfo({
        "begTime": "2016-10-17",
        "endTime": TODAY
    })
    .then(function(info){
        res.setHeader('Content-Type', 'application/json');
        res.json(info)
    })
    .catch(function (error) {
        //res.json(error.body);
        //console.log('error',error)
    })
}

let countryTotal = (req, res)=> {
    countryService.getCountryTotal({
        "begTime": req.query.begTime,
        "endTime": req.query.endTime,
    })
    .then(function(info){
        res.setHeader('Content-Type', 'application/json');
        res.json(info)
    })
    .catch(function (error) {
        //res.json(error.body);
        //console.log('error',error)
    })
}

router.post('/index', countryIndex)
router.get('/index', countryIndex)
router.get('/total', countryTotal)

module.exports = router
