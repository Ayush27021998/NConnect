var mongoose = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    img: String,
    about: String,
    description: String,
    username: String,
    password: String,
    age: Number,
    profession: String,
    projects:
       [ {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "project",
            }
        }],
        ngocolab:[{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            }
        }],
    duration: Number,
    isNGO: Boolean,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
