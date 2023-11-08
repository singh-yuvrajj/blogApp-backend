
const User = require('../model/user');

const registerUserForm = (req,res)=>{
    // res.render('user/register');
    res.send("register a user");
}

const registerUser = async (req,res,next)=>{
    const { username , email , password } = req.body;
    const user = new User({ username , email });
    try{
    const currUser = await User.register(user,password)

    req.login(currUser , (err)=>{
        if(err) next(err);
        req.flash('success',`Welcome to Echo ${username}`);
        res.send("registered");
    });
    }
    catch(err){
    res.send(err);
    }
}

const loginUserForm = async (req,res)=>{
    res.render('login');
    // res.send("log in?");
}

const loginUser = async (req,res)=>{
    req.flash('success',`Welcome back ${req.user.username}`);
    const path = res.locals.returnTo || '/post';

    res.redirect(path);
}

const logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err) next(err);
        // req.flash('success',"Successfully logged out");
        res.redirect('/post');
    });
   
}

module.exports = {
    registerUser,
    registerUserForm,
    loginUser,
    loginUserForm,
    logoutUser
}