const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const {Schema} = require('mongoose');
const { createToken } = require('../Auth/UserAuth');


const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email:{
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    salt:{
        type:String,
        default : '',
    }
},{timestamps:true})





userSchema.pre('save',async function (next){
    let user = this;
    if(!user.isModified('password')) return next();
    const gen_salt = await bcrypt.genSalt(10);
    user.salt = gen_salt;
    const hashed = await bcrypt.hash(user.password,gen_salt);
    user.password = hashed;
    next();
})


userSchema.static("matchPassAndValidate", async function (email, password) {
  const user = this.findOne({ email });
  if (!user) throw new Error("UserNotFOund!");
  const hashed = this.password;
  const userfound = bcrypt.compare(password, hashed);
  const token = createToken(userfound);
  return token;
});

const User = mongoose.model("UserDeatils",userSchema);
module.exports = User;