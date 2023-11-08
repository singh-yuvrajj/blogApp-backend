const Post = require('../model/post');
const Comment = require('../model/comment');

const addComment = async (req,res)=>{
    const currpost = await Post.findById(req.params.id);
    const comment = new Comment(req.body);
    comment.user = req.user;
    comment.postedOn = new Date();
    console.log("done here")


    currpost.comments.push(comment);
    await currpost.save();
    await comment.save();
    req.flash('success','SuccessFully created comment');
    res.redirect(`/post/${req.params.id}`);
}

const deleteComment = async (req,res)=>{
    const { id , comment_id} = req.params;
    const comment = await Comment.findById(comment_id);
    if(!req.user.equals(comment.user)){
        req.flash('error',"Cant delete comment");
        return res.redirect(`/post/${id}`);
    }
    await Post.findByIdAndUpdate(id,{ $pull : { comments : comment_id}});
    await Comment.findByIdAndDelete(comment_id);
    req.flash('success','SuccessFully deleted comment');
    res.redirect(`/post/${id}`);
}

const addLike = async (req,res)=>{
    const { id , comment_id } = req.params;
    const comment = await Comment.findById(comment_id);

    const inLikeList = comment.likes.some((readPost) =>
    readPost.equals(req.user.id));

    if (!inLikeList) {
        comment.likes.push(req.user);
        await comment.save();
    }
    res.redirect(`/post/${id}`);
}

const addDislike = async (req,res)=>{
    const { id , comment_id } = req.params;
    const comment = await Comment.findById(comment_id);

    const indisLikeList = comment.dislikes.some((readPost) =>
    readPost.equals(req.user.id));

    if (!indisLikeList) {
        comment.dislikes.push(req.user);
        await comment.save();
    }
 
    res.redirect(`/post/${id}`);
}
module.exports = {
    addComment,
    deleteComment,
    addLike,
    addDislike
}