import bcrypt from "bcryptjs"

export const createUserMiddleware = async (req, res, next) => {
    try {
        const {password} = req.body

        console.log(password);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        req.body.password = hash

        next()
    } catch (error) {
        res.status(400).json(error)
    }
}