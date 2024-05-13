const jwt = require('jsonwebtoken');
const User = require("../models/user");
const expressHandler = require('express-async-handler');

const Image = require("../models/image");

const uploadimage = async (req, res)  => {
  console.log(req.file, req.body);
  try{
    if(!req.file){
      res.status(404).json({message: 'No file found!'})
    }else{
      const { authorization } = req.headers;
      const data = await jwt.verify(authorization, process.env.SECRET_KEY);
      if(!data){
          return res.status(400).json({message: 'Not authorized to access this page, you have to Login to access this page!'});
      }
      const result = await Image.create({
        filename: req.file.originalname,
        publish_date: new Date(),
        publish_time: new Date(),
        user: data.id
      })
      console.log(result);
      res.status(201).json({message: 'Image saved successfully!', status: 'Ok'})
    }
  }catch(err){
    res.status(500).json({message: 'something went wrong!'})

  }   
}

module.exports = uploadimage;