const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique: true
    },
    readList : [{
        type : mongoose.Schema.ObjectId, 
        ref : "Post",
    }]
})

userSchema.virtual('readListCount').get(function(){
    return this.readList.length;
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);