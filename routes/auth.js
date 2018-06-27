var express = require('express');
var user = require("../models/user");
var passport= require("passport");
var router = express.Router();


router.get('/login', function(req, res, next) {
    res.render("login");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), function(req,res,err){

});

router.get("/register",function(req,res){
    res.render("register");
});

router.get("/register/ngo",function (req,res) {
    //req.flash("NGO registered");
    res.render("ngoregister");
});

router.get("/register/volunteer",function (req,res) {
    res.render("vregister");
});


router.post('/register',function(req,res){
    console.log(req.body);
    if(req.body.isNGO){
        var newNGO = new user({
            name: req.body.name,
            image: req.body.image,
            about: req.body.about,
            description: req.body.description,
            username: req.body.username,
            isNGO: req.body.isNGO,
        });
        var password= req.body.password;
        user.register(newNGO, password, function(err,user){
            passport.authenticate("local")(req, res, function(){
                //req.flash("success","NGO registered");
                res.redirect("/");
            });
        });
    }else{
        var newVolunteer = new user({
            name: req.body.name,
            image: req.body.image,
            age: req.body.age,
            profession: req.body.profession,
            username: req.body.username,
            duration:req.body.duration,
            isNGO: req.body.isNGO,
        });
        var password= req.body.password;
        user.register(newVolunteer, password, function(err,user){
            passport.authenticate("local")(req, res, function(){
                //req.flash("success","Volunteer registered");
                res.redirect("/");
            });
        });
    }
});

router.get('/logout', function (req,res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
