import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export default async function handler(req, res) {
    try{
    const {authorization} = req.headers;
    const data = await jwt.verify(authorization, process.env.SECRET_KEY);
    if(!data){
        return res.status(400).json({message: 'Not authorized to access this page, you have to Login to access this page!'});
    }
    // just to check
    const images = await prisma.image.findMany({
        where: {
            user: data.id
        }
      })
    
      if(!images.length){
        return res.status(300).json({message: 'No Images found!', data: []})
      }
      return res.status(200).json({data: images})

    }catch(err){
        return res.status(500).json({message: 'Something went wrong!'});
    }
}
  