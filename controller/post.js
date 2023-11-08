
const Post = require('../model/post');
const { cloudinary } = require('../cloudinary/index');

const getAllPost = async (req,res)=>{
    const posts = await Post.find({});
    res.json( { posts });
}

const addPost = async (req,res,next)=>{
    const newpost = new Post(req.body);
    newpost.author = req.user.id;
    newpost.image = { path : req.file.path , filename : req.file.filename };
    newpost.publishedOn = new Date();


    await newpost.save();
    req.flash('success','Successfully made a new Post');
    res.redirect(`/post/${newpost.id}`);
}

const newPostForm = async (req,res)=>{
    res.render('addpost');
    // res.send("render karo")
}

const getPost = async (req,res)=>{
    const {id} = req.params;
    const currpost = await Post.findById(id);
    if(!currpost){
        req.flash('error',"cant find Post");
        return res.redirect('/Post');
    }
   
    if(req.user){ 
     const inReadList = req.user.readList.some((readPost) =>
      readPost.equals(currpost._id)
    );

    if (!inReadList) {
      req.user.readList.push(currpost._id);
      await req.user.save();
    }
    }

    await (await currpost.populate({ 
        path : 'comments',
        populate : {
            path : 'user'
        }
    })).populate('author');

    res.json( { currpost });
}

const editPost = async (req, res) => {
    const { id } = req.params;

    const currpost = await Post.findByIdAndUpdate(id, req.body);

    if (req.file) {

      await cloudinary.uploader.destroy(currpost.image.filename);

      currpost.image = { path: req.file.path, filename: req.file.filename };
    }
 
    currpost.publishedOn = new Date();

    await currpost.save();
  
    req.flash('success', 'Successfully updated Post');
    res.redirect(`/post/${id}`);
  }

const deletePost = async (req,res)=>{
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    
    req.flash('success',"Successfully deleted Post");
    res.redirect('/post');
}

const editPostForm = async (req,res)=>{
    const {id} = req.params;
    const currpost = await Post.findById(id);
    res.render('editpost',{currpost});
    // res.send("edit karo")
}

module.exports = {
    editPost,
    editPostForm,
    addPost,
    newPostForm,
    deletePost,
    getAllPost,
    getPost
}