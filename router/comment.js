const express = require('express');
const router = express.Router({ mergeParams: true });
const errorCheck = require('../utilities/error/errorCheck');

const { CommentSchema } = require('../utilities/validator/schema');
const Validator = require('../utilities/validator/index');
const {isLoggedIn} = require('../utilities/middleware');

const { addComment , deleteComment, addDislike , addLike } = require('../controller/comment')

router.post('/', isLoggedIn,Validator(CommentSchema),errorCheck(addComment));

router.delete('/:comment_id',isLoggedIn,errorCheck(deleteComment));

router.post('/:comment_id/like',isLoggedIn,errorCheck(addLike));
router.post('/:comment_id/dislike',isLoggedIn,errorCheck(addDislike));

module.exports = router;
