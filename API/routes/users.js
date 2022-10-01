var express = require('express');
var router = express.Router();
const user = require('../Schemas/Users.schema')
const multer  = require('multer')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await user.find();
  res.send(users);
});


const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '/home/qandeeil/Private/Project-2/API/Profile-Picture')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().getSeconds() + file.originalname)
  }
})

const uploads = multer({
  storage: storage,
}).single('uploadProfilePicture')

router.post('/', uploads, async (req,res,next) => {
  const url = req.protocol + "://" + req.get("host");
  if(req.file){
    const {
      _id,
      email,
      password,
      profilePicture = url + '/users/' + req.file.filename,
      fullName,
      country,
      phoneNumber,
      birthday,
      gender} = req.body
      const newUser = await user.create({
        _id,
        email,
        password,
        profilePicture,
        fullName,
        country,
        phoneNumber,
        birthday,
        gender,
        createAt: new Date(),
      })
      res.send(newUser)
  }else{
    const {
      _id,
      email,
      password,
      fullName,
      country,
      phoneNumber,
      birthday,
      gender} = req.body
      const newUser = await user.create({
        _id,
        email,
        password,
        fullName,
        country,
        phoneNumber,
        birthday,
        gender,
        createAt: new Date(),
      })
      res.send(newUser)
  }
})

router.post('/checkUserLogin', async (req,res,next) => {
  const {_id,password} = req.body
  const checkUser = await user.findOne({
    _id,
    password,
  })
  if(checkUser){
    res.send({_id, result: true, data: {
      _id: checkUser._id,
      fullName: checkUser.fullName,
      profilePicture: checkUser.profilePicture,
      post: checkUser.post
    }})
  }else{
    res.send({result: false , message: "Please check your account !!!"})
  }
})

router.post('/uploadPhotoProfile', uploads, async (req,res,next) => {
  const url = req.protocol + "://" + req.get("host");
  const {
    _id,
    profilePicture = url + '/users/' + req.file.filename
  } = req.body
  const updatePhotoProfile = await user.findByIdAndUpdate(_id,{
    profilePicture
  })
  res.send(updatePhotoProfile)
})

router.post('/checkUsernameSignUp', async (req,res,next) => {
  const {_id} = req.body
  const check = await user.findOne({
    _id
  })
  if(check){
    res.send({username: true, message: 'Username already register'})
  }else{
    res.send({username: false})
  }
})


const storagePost = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, '/home/qandeeil/Private/Project-2/API/Posts')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().getSeconds() + file.originalname)
  }
})

const uploadsPost = multer({
  storage: storagePost,
}).single('uploadPost')

router.put('/post', uploadsPost, async (req,res,next) => {
  const url = req.protocol + "://" + req.get("host");
  const {
    _id,
    post = url + '/post/' + req.file.filename
  } = req.body
  const addPost = await user.findByIdAndUpdate(_id,{
    $push: {
      post: post
    }
  })
  res.send(addPost.post)
})

router.put('/DeletePost', async (req,res,next) => {
  const {
    _id,
    post
  } = req.body
  console.log(req.body)
  const deletePost = await user.findByIdAndUpdate(_id,{
    $pull: {
      post: post
    }
  })
  res.send(deletePost)
})

module.exports = router;
