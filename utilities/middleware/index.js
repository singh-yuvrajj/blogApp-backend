const Post = require('../../model/post');

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error',"You need to be logged in");
        return res.redirect('/login');
    }
    next();
}
const isAuthor = async (req,res,next)=>{
    const {id} = req.params;
    const currpost = await Post.findById(id);
    if(!req.user.equals(currpost.author)){
        req.flash('error',"Not authorised");
        return res.redirect(`/post/${id}`);
    }
    else next();
}

const redirectOriginalUrl  = (req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
const customFunctions = {
    isLoggedIn,
    redirectOriginalUrl,
    isAuthor
}

module.exports = customFunctions;