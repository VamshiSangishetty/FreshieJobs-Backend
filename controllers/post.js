const { isValidObjectId } = require('mongoose');
const Post = require('../models/post');
const ExpoToken=require('../models/expoToken')

const  FCM  = require('fcm-node');

const serverKey = 'AAAAkDDPLbc:APA91bGHPeWjzMVULJeDDoephsNJxA685ljrzHaBhHzGe6Z20sbPF6adRJQVzkElYkOguhKhO211E2cQ3RsOwDjyzXg_jZWH7Pb2hRB6k_prg81hcE1QMzET8St1VzI-SjOMrC68sqAV'; // Replace with your FCM server key
const fcm = new FCM(serverKey);

exports.createPost = async (req, res) => {
  try {
    const { _id, title, image, description, company, role, batch, salary, qualification, location, skills, jobType, link } = req.body;

    // Check if the post with the given _id already exists
    const isAlreadyExists = await Post.findOne({ _id });

    if (isAlreadyExists) {
      return res.status(401).json({ error: "Please use a unique id" });
    }

    const newPost = new Post({
      title,
      image,
      description,
      company,
      role,
      batch,
      salary,
      qualification,
      location,
      skills,
      jobType,
      link,
    });

    // Save the new post
    await newPost.save();

   // Send notification to all FCM tokens
const fcmTokens = await ExpoToken.find({});
console.log(fcmTokens);

// Filter out invalid tokens
const validTokens = fcmTokens.filter(fcmToken => fcmToken.token && fcmToken.token.length > 0);
const registrationTokens = validTokens.map(fcmToken => fcmToken.token);

const message = {
  registration_ids: registrationTokens,
  notification: {
    title:'FreshieJobs',
    body: `${newPost.title}`,
    smallIcon: 'https://imgur.com/PMpN2YN.png',
  },
};

fcm.send(message, (err, response) => {
  if (err) {
    console.log('Error sending FCM notification:', err);
  } else {
    console.log('FCM notification sent successfully:', response);
  }
});


    res.json({ post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

exports.deletePost=async(req,res)=>{
    const{postId}=req.params;
    if(!isValidObjectId(postId)) return res.status(401).json({error:"Invalid request!"})

    const post = await Post.findById(postId)
    if(!post) return res.status(403).json({error:"Post not found!"})

    await Post.findByIdAndDelete(postId)
    res.json({message:'Post removed succesfully'})
}

exports.updatePost = async(req,res)=>{
    const {title,image,description,company,role,batch,salary,qualification,location,skills,jobType,link}=req.body
    const{postId}=req.params;
    if(!isValidObjectId(postId)) return res.status(401).json({error:"Invalid request!"})

    const post = await Post.findById(postId)
    if(!post) return res.status(403).json({error:"Post not found!"})

    post.title=title;
    post.image=image;
    post.description=description;
    post.company=company;
    post.role=role;
    post.batch=batch;
    post.salary=salary;
    post.qualification=qualification;
    post.location=location;
    post.skills=skills;
    post.jobType=jobType;
    post.link=link;

    await post.save();
    res.json({post:post});  
}

exports.getPost=async(req,res)=>{
    const{postId}=req.params;
    if(!isValidObjectId(postId)) return res.status(401).json({error:"Invalid request!"})

    const post = await Post.findById(postId)
    if(!post) return res.status(403).json({error:"Post not found!"});

    res.json({post:post});  

}

exports.getPosts=async(req,res)=>{
    const {pageNo=0,limit=18}=req.query;

    const posts=await Post.find({})
    .sort({createdAt:-1})
    .skip(parseInt(pageNo)*parseInt(limit))
    .limit(parseInt(limit));

    const postCount=await Post.countDocuments()

    res.json({posts:posts,postCount});
}


exports.createToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Check if the token already exists
    const isAlreadyExists = await ExpoToken.findOne({ token });

    if (isAlreadyExists) {
      return res.status(401).json({ error: "Token already exists" });
    }

    const newToken = new ExpoToken({ token });

    await newToken.save();
    res.json({ newToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getToken=async(req,res)=>{
  const{token}=req.params;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }
  const expoToken = await ExpoToken.findOne({token})
  if(!expoToken) return res.status(403).json({error:"Token not found!"});

  res.json({expoToken});  

}

exports.getTokens=async(req,res)=>{

  const tokens=await ExpoToken.find({})

  res.json({tokens});
}


