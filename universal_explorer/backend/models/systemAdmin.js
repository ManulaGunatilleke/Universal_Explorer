// systemAdmin.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const systemAdminSchema = new Schema({
   Fullname : {
    type : String,
    required : true
   },
   SystemAdminID : {
    type : String,
    required : true
   },
   Email : {
      type : String,
      required : true
   },
   Address : {
      type : String,
      required : true
   },
   Phone : {
      type : Number,
      required : true
   },
   UserType : {
    type : String,
    required : true
   },
   Password : {
      type : String,
      required : true
   }

})

const systemAdmin = mongoose.model("systemAdmin", systemAdminSchema);
module.exports = systemAdmin;