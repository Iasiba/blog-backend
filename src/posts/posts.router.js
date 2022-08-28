const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const postServices = require('./posts.http')

router.route('/posts/') //* /api/v1/posts/
    .get(postServices.getAllPosts)
    .post(postServices.createPost)

router.route('/user/me/posts')///api/v1/users/me/posts
    .get(passport.authenticate('jwt',{session: false}) ,postServices.getMyPosts)

router.route('/posts/:id')///api/v1/posts/:id 
    .get(postServices.getPostByID)

router.route('/users/me/posts/:id')///api/v1/users/me/posts/:id 
    .get(passport.authenticate('jwt',{session: false}), postServices.getMyPostByID)
    .delete(passport.authenticate('jwt',{session: false}) ,postServices.deleteMyPost)
    .put(passport.authenticate('jwt',{session: false}), postServices.editMyPost)
exports.router = router