const express = require('express')
const router = express.Router()
const projectService = require('../services/project-service')

let getProjectList = (req, res) => {
    projectService.getProjectList()
        .then(function(data) {
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        })
        .catch(function(error) {
            console.error('error', error);
            res.json(error);
        })
}

router.get('/index', getProjectList)

module.exports = router
