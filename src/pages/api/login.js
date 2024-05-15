import { PrismaClient } from '../../prisma/generated/client'
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if(!user)
        return res.status(404).json({message: 'User email not found!'})
    const result = await bcrypt.compare(password, user.password);
        if(result){
            const data = {
                email: user.email,
                id: user.id,
            }
            const token = await jwt.sign(data, process.env.SECRET_KEY);
        
            res.status(200).json({message:'user logged in successfuly', data: {...data, token}})
        }
        return res.status(400).json({message: 'Invalid credentials'});
}
  