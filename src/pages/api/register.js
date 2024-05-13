import { PrismaClient } from '@prisma/client'
import 'dotenv/config';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const {email, password} = req.body;

    const checkUser = await prisma.user.findUnique({
      where: {
          email,
      },
  })
  
    if(checkUser){
      return res.status(300).json({message:'user already exist!'})
    }
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const newUser = await prisma.user.create({
        data: {
          email,
          password: hashPassword,
        },
      });

    res.status(200).json({message:'user created successfuly'})
}
  