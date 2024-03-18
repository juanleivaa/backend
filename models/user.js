const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {type:String, required:true},
    surname: String ,
    email: {type:String, required:true , unique:true},
    password: {type:String, required:true},
    dir: String,
    dir_num: Number,
    role: {type: String , default:'ROLE_USER'},
    status: { type:Boolean, default:true },
    pets: [String]
});



module.exports = mongoose.model('User', UserSchema);
