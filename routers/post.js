const router = require('express').Router();
const { postValidator, validate } = require('../controllers/middlewares/postValidator');
const {createPost,deletePost,updatePost,getPost,getPosts,createToken,getToken,getTokens}=require('../controllers/post');

router.post('/create',postValidator,validate,createPost);

router.put('/:postId',postValidator,validate,updatePost);

router.delete('/:postId',deletePost)

router.get("/single/:postId",getPost)

router.get('/posts',getPosts)

router.post('/token',createToken);

router.get('/singleToken/:token',getToken)

router.get('/tokens',getTokens)


module.exports=router
