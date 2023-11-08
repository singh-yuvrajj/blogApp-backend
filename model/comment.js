const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    body : String,
    postedOn :{
        type : Date,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    dislikes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }] 
})

commentSchema.virtual('likeCount').get(function(){
    return this.likes.length;
})

commentSchema.virtual('dislikeCount').get(function(){
    return this.dislikes.length;
})


module.exports = mongoose.model('Comment',commentSchema);