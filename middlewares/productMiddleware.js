import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const authMiddleware = async (req,res, next) => {
    try {
        const token = req.headers.authorization

        const decodedToken = jwt.verify(token, 'testPassword')

        console.log(decodedToken)

        const user = await User.findById(decodedToken.userId)

        if(user) {
            next()
        } else {
            res.status(404).json({message: "user not found"})
        }
    } catch (error) {
        res.status(401).json(error)
    }
}