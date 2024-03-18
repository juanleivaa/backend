const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    value : {type:Number, required:true},
    client_id : {type: String , required:true , unique:false},
    description : {type:String, required:true},
    created_at : {type: Date, required:true},
});


module.exports = mongoose.model('Transaction', TransactionSchema);
