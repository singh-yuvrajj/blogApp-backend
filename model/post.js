const mongoose = require('mongoose');
const Comment = require('../model/comment');
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary/index');


const ImageSchema = new Schema(
    {
        path : String,
        filename : String
    }
)

ImageSchema.virtual('thumbnail').get(function(){
    return this.path.replace('/upload','/upload/w_200');
})

const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique : true,
        minlength : [5,"Title should be min of length 4"]
    },
    image : ImageSchema ,
    content :{
        type : String,
        required : true,
        minlength : [20 , " Please provide the content of atleast 20 characters"]
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref: 'Comment' 
    }],
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    author :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    publishedOn :{
        type : Date,
        required : true
    }
})

PostSchema.virtual('commentCount').get(function(){
    return this.comments.length;
})
PostSchema.virtual('upvoteCount').get(function(){
    return this.upvotes.length;
})


PostSchema.post('findOneAndDelete',async (data)=>{
    if(data){
    const { comments } = data;
    await Comment.deleteMany({_id : { $in : comments}});
    for(let currImage of data.images){
        await cloudinary.uploader.destroy(currImage.filename);
    }
    }
})
module.exports = mongoose.model('Post',PostSchema);