import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const getAllUser = async (req, res) => {
  const {minAge, maxAge, search} = req.query
    console.log(req.query)
    let query 

    if(minAge && maxAge) {
        query = {
            ...query,
            age: {
                $gt: minAge,
                $lt: maxAge
            }
        }
    }

    if(search) {
        query = {
            ...query, 
            name: {
                $regex: search
            }
        }
    }

  console.log(query)

  const users = await User.find(query);
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const { name, last_name, email, age, password } = req.body;
  const newUser = new User({ name, last_name, email,password, age });
  await newUser.save();
  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
   const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = bcrypt.compare(user.password, password)
    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'testPassword');
    res.status(200).send({ user, token });
}
