import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function signToken(jwtToken){
    return jwt.sign(jwtToken, process.env.SECRET , { expiresIn: 7 * 24 * 60 * 60 * 1000 });
}

export function verifyToken(token){
    try{
        return jwt.verify(token, process.env.SECRET);
    }catch(error){
        throw new Error("jwt invalid");
    }
}