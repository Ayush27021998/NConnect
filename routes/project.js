var express=require('express')
var router=express.Router();
var project= require("../models/project");
var moment=require('moment');


// router.get('/', function (req, res) {
//
//     project.find({}, function (err, found) {
//         if (!err) {
//             res.render("home.ejs", { projects: found });
//         }
//     });
// });

router.get('/project/new', function (req, res) {

    res.render('new.ejs');
});

router.post('/', function (req, res) {
    //console.log(req.body);
    var obj = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        startDate: req.body.start,
        endDate: req.body.end,
        // creator:{
        //     id:req.user._id,
        //     name:req.user.name
        // }     
    };
    console.log(obj);
    var today = moment().format('YYYY-MM-DD');
    console.log(today);
    if (today < obj.startDate) {
        obj.isActive = false;
        obj.isUpcoming = true;
    }
    else if (obj.startDate <= today && today <= obj.endDate) {
        obj.isActive = true;
        obj.isUpcoming = false;
    }
    else if (today > obj.startDate && today > obj.endDate) {
        obj.isActive = false;
        obj.isUpcoming = false;
    }
    console.log(obj);
    project.create(obj, function (err, newone) {
        if (!err) {
            res.redirect('/');
        }
    });


});

router.get('/project/:id', function (req, res) {
    project.findById(req.params.id, function (err, found) {
        if (!err) {
            console.log(found);
            res.render("show.ejs", { found: found });
        }
    });

});

module.exports=router;