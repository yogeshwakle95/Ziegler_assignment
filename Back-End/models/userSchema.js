const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      // minlenght: 50,
      // trim: true,
    },

    email: {
      type: String,
      require: true,
      maxlenght: 50,
      // trim: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      // enum: ["user", "admin"],
      default: "user",
    },
    address:{
      type:String,
      require:true,
    }
    
  },
);

// Hash Password Before Send to Database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
