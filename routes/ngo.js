var express = require('express');
var router = express.Router();
var user=require('../models/user');
var proposal= require("../models/proposal");

router.get('/ngo/:id', function (req, res) {
    user.findById(req.params.id, function (err, found) {

        res.render("ngo.ejs", { ngo: found });

    });
});


router.get('/ngo/:id/collaborate', isLoggedIn,function (req, res) {
    var ngos = [];

    user.find({}, function (err, found) {
        if (!err) {
            for (var i = 0; i < found.length; i++) {
                if (found[i]._id.equals(req.params.id)) {
                    i++;
                }
                else {
                    ngos.push(found[i]);
                }
            }

            res.render('ngolist', { ngos: ngos });
        }
    });
});

router.get('/ngo/:id/proposal',isLoggedIn ,function (req, res) {
    user.findById(req.params.id, function (err, found) {
        req.user.ngcolab.push(found._id);
    });
    res.render('proposal.ejs');
});

router.post("/:id",function(req,res){
    var newProposal= new proposal({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        proposal: req.body.proposal,
    });
    newProposal.save();
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