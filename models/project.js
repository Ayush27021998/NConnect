var mongoose=require('mongoose');
var user=require('./user');

var projectSchema={
    name:String,
    description:String,
    image:String,
    isActive:Boolean,
    isUpcoming:Boolean,
    startDate:Date,
    endDate:Date,
    creator:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        name:String
    }

}

module.exports=mongoose.model('project',projectSchema);