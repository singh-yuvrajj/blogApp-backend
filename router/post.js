const express = require('express');
const router = express.Router();
const errorCheck = require('../utilities/error/errorCheck');
const Validator = require('../utilities/validator/index');
const { PostSchema } = require('../utilities/validator/schema');
const {isLoggedIn , isAuthor} = require('../utilities/middleware');
const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({storage})

const { editPost ,  editPostForm , getAllPost , getPost , deletePost , newPostForm , addPost } = require('../controller/post');


router.route('/')
      .get(errorCheck(getAllPost))
      .post(isLoggedIn,upload.single('image'),Validator(PostSchema),errorCheck(addPost))


router.get('/new',isLoggedIn,errorCheck(newPostForm))


router.route('/:id')
      .get(errorCheck(getPost))
      .put(isLoggedIn,isAuthor,upload.single('image'),Validator(PostSchema),errorCheck(editPost))
      .delete(isLoggedIn,isAuthor,errorCheck(deletePost))

router.get('/:id/edit',isLoggedIn,isAuthor,upload.single('image'),errorCheck(editPostForm))


module.exports  = router;