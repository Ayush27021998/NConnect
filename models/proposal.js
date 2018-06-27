var mongoose=require('mongoose');

var proposalSchema={
    sender: String,
    receiver: String,
    proposal: String,
}

module.exports=mongoose.model('proposal',proposalSchema);