const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../Models/userSchema')

//@DESCRIPTION:     Login
//@ROUTE:           POST: API/V1/AUTH/LOGIN
//@ACCESS:          PUBLIC
exports.login = async (req, res, next) => {
    // get user inputs
    const email = req.body.email
    const passwordhash = req.body.passwordHash

    // valite nullity
    if(!email || !passwordhash){
        res.status(400).json({ data : "all Fields should be filled" , success : false})
    }

    // validate if user exists usinng email
    const userExist = await user.findOne({email})
    if(!userExist){
         return res.status(400).json({ data : `user with email : ${res.body.email} does not exists`})
    }

    // verify password agaist saved password in database
    const verifiedUser = await bcrypt.compare(passwordhash , userExist.passwordHash)

    if(!verifiedUser){
         return res.status(400).json({ data : "incorrect login details" , success : false})
    }

    // create a signed jwt token
    const token = jwt.sign({email : req.body.email } , process.env.SECRET_KEY,{ expiresIn : process.env.JWT_EXPIRE})

     res.status(200).json({ success: true, data: "Logged in successfully", token: token })
}

//@DESCRIPTION:     REGISTER
//@ROUTE:           POST: API/V1/AUTH/REGISTER
//@ACCESS:          PUBLIC
exports.register = async (req, res, next) => {
    try {
        const {username, email, passwordHash}  = req.body

        //check if null
        if(!username || !email || !passwordHash){
            return res.status(400).json({ data : "All fields are required" , success : false})
        }

        //check if user already exists
        const userExist = user.findOne({email : req.body.email})

        
        if(!userExist){
            return res.status(400).json({ data : "User with same email address already exists" , success : false })
        }

        //create a password hash
        const hashedPassword = await bcrypt.hash(req.body.passwordHash , 10)

        req.body.passwordHash = hashedPassword

        //save user in database
        const newUser = await user.create(req.body)

        //sign jwt token
        //const token =  jwt.sign({ email : newUser.email }, process.env.SECRET_KEY, {expiresIn : process.env.JWT_EXPIRE})

        //return cokie with signed token
        return res.status(200).json({ success: true, message: 'User registered successfully', data: newUser })

    } catch (error) {

        return res.status(401).json({data : error.message , success : false})

    }
    
}

//@DESCRIPTION:     GET REGISTERED USERS
//@ROUTE:           PUT: API/V1/AUTH/USERS
//@ACCESS:          PUBLIC

exports.getUser = async (req, res, next) => {

    const users = await user.find()

    res.status(200).json({data : users , Success : true})
    
}