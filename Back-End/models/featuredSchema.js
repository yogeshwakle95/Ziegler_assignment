const mongoose = require('mongoose');
require("dotenv").config();

const featuredSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
      featuredimage:{
       type:String
      }
})

const featuredModel = mongoose.model("Featured",featuredSchema);
module.exports = featuredModel;