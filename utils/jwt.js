import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function signToken(jwtToken){
    return jwt.sign(jwtToken, process.env.SECRET , { expiresIn: 60 * 60 * 60 });
}

export function verifyToken(token){
    try{
        return jwt.verify(token, process.env.SECRET);
    }catch(error){
        throw new Error("jwt invalid");
    }
}