const messageModel = require('../models/MessageSchema');

const createMessage =(req,res)=>{
    const message = new messageModel({
        userId:req.body.userId,
        userMessage:req.body.userMessage,
        adminMessage:req.body.adminMessage
    });
    message.save().then((messages)=>{
        res.status(201).json(message);
    })
    .catch((error)=>{
        res.status(500).json(error);
    });
};

const getMessage = async(req,res)=>{
    try{
        await messageModel.find()
        .then((resp)=>{
          res.status(201).json(resp);
        }).catch((error)=>{
          res.status(501).json(error);
        })
    }catch(error){
        res.status(501).json(error);
    }
}

const getMessageByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed as a parameter in the request URL
        // console.log(userId);
        const messages = await messageModel.find({ userId: userId });

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: "No messages found for the specified user." });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    createMessage,
    getMessage,
    getMessageByUserId
}