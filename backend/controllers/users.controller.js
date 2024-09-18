import Users from '../models/users.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const test = async (req, res) => {
    res.send("Backend deploy successfull!")
}

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    try {        
        if(!username || !email || !password) {
            return res.status(400).json({message: 'no field must be empty'})
        }            
    } catch (error) {
        return res.status(500).json({message: 'server error1'})
    }
    
    const duplicateUsername = await Users.findOne({username: username})

    try {
          if(duplicateUsername) {
            return res.status(400).json({message: 'username must be unique'})
        } 
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }

    const duplicateEmail = await Users.findOne({email: email})

    try {
        if(duplicateEmail) {
            return res.status(400).json({message: 'email must be unique'})
        }        
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    const user = new Users({
        username,
        email,
        password: passwordHash
    })

    try {
        if(!user) {
            return res.status(400).json({message: 'something went wrong'})
        }
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }

    await user.save()

    return res.status(200).json({message: 'user has been created successfully!'})

}



export const signin = async (req, res, next) => {
    const { email, password } = req.body

    const user = await Users.findOne({email: email})

    try {
        if(!user) {
            return res.status(400).json({message: 'username does not exist'})
        }
    } catch (error) {
        return res.status(500).json({message: 'server error'})
    }

    try {
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({message: 'wrong credentials'})
        }
    } catch (error) {
        return res.status(500).json({message: 'server error'})   
    }
    
    const userP = await Users.findOne({email: email}).select('-password')
    const token = jwt.sign({id: user._id }, process.env.JWT_SECRET_KEY)

    const expireDate = new Date(Date.now() + 30*60*1000)

    res.cookie('access_token', token, 
        {   Path: "/",
            expires: expireDate, 
            httpOnly: true, 
            sameSite: "lax" 
        })

    .status(200).json({message: `${user.username} is logged in successfully!`,userP})

}


export const google = async (req, res, next) => {
    
    try {
        const user = await Users.findOne({email: req.body.email})
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)
            const { password: passwordHash, ...rest } = user._doc
            const expireDate = new Date(Date.now() + 30*60*1000)
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: expireDate
            }).status(200).json(rest)

        }else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const passwordHash = bcrypt.hashSync(generatedPassword, 10)

            const newUser = new Users({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: passwordHash,
                profilePicture: req.body.photo
            })

            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
            const { password: passwordHash2, ...rest } = newUser._doc
            const expireDate = new Date(Date.now() + 30*60*1000)

            res.cookie("access_token", token, {
                httpOnly: true,
                expires: expireDate
            }).status(200).json(rest)
        }
    } catch (error) {
        
    }

}