var express = require('express');
var router = express.Router();
var project = require("../models/project");




/* GET home page. */
router.get('/', function(req, res, next) {
    project.find({},function (err,projects) {
        res.render('index',{projects:projects});
    });
});


module.exports = router;
