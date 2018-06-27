var express=require('express');
var router=express.Router();
var user=require('../models/user');

router.get('/volunteer/:id', isLoggedIn, function (req, res) {
    user.findById(req.user._id, function (err, found) {
        if (!err) {
            res.render("volunteer.ejs", { volunteer: found });
        }
    });
});

router.get('/donor/:id',isLoggedIn, function (req,res) {
    user.findById(req.user._id, function (err, found) {
        if (!err) {
            res.render("donor.ejs", { donor: found });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        //req.flash('error', "You First Need To Login");
        res.redirect('/login');
    }
}

module.exports=router;