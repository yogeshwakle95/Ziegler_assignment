const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    userMessage:{
        type:String,
    },
    adminMessage:{
        type:String
    }
    
})

const messageModel = mongoose.model("Message",MessageSchema);
module.exports = messageModel;