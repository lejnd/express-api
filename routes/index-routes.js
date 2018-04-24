var express = require('express');
var router = express.Router();
const path = require('path')
const constants = require('../constants')

router.all('/test', (req,res) => {
    res.sendFile(path.resolve('public/test.html'));
})

router.all('/getTime', (req,res) => {
	let today = new Date().getTime()
    res.json(today);
})

router.all('/qgapZYsCR6lcdtTY', (req,res) => {
    res.sendFile(path.resolve('public/home.html'));
})

router.all('/qgapZYsCR6lcdtTT', (req,res) => {
    res.sendFile(path.resolve('public/home.html'));
})

router.all('/qgapZYsCR6lcdtTZ', (req,res) => {
    res.sendFile(path.resolve('public/home.html'));
})

router.all('/*', (req,res) => {
    res.redirect('http://www.gznb.com')
})

module.exports = router;
