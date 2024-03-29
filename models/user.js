const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var rolesValidos = [ 'ADMIN_ROLE', 'CLIENT_ROLE' ];



const UserSchema = new Schema({
    name: {type:String, required:true},
    surname: String ,
    email: {type:String, required:true , unique:true},
    password: {type:String, required:true},
    dir: String,
    dir_num: Number,
    role: {type: String , default:'CLIENT_ROLE' , enum: rolesValidos},
    avatar: {type: String },
    active: {type: Boolean , default:true},
});



module.exports = mongoose.model('User', UserSchema);
