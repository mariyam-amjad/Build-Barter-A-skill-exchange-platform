const detokenize = require('../utils/detokenizer');
const User = require('../models/userModel');

const authCheck = async (req, res, next) => {
    if(req.cookies === undefined) {
        console.log("Cookies undefined, redirecting to login page.")
        return res.status(300).json("Cookies undefined, redirect to login page!")
    }

    const token = req.cookies.token
    console.log(req.cookies)
    try {
        const decodedToken = detokenize(token)
        
        const userExists = await User.findOne({email:decodedToken.email, username:decodedToken.username})

        if(userExists) console.log("\nSession authenticated successfully\n")

        // auth gets user id of indv and passes it to next middleware attraching it to request.
        req.body._id = userExists._id  
        req.user = userExists
        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("\nToken expired\n")

            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            return res.status(400).json({ message: "Session expired, please login again !" })
        }
        else if(error.name === 'JsonWebTokenError'){
            console.error("\nInvalid token OR No token found !\n")

            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            res.status(400).json({ message: "Please login first to view this page !" })
        }
        else{
            console.error("\nFailed to verify token:", error)
    
            // Handle invalid token error
            return res.status(400).send({ error: "Unauthorized !" })
        }
        // HANDLE REDIRECT TO LOGIN PAGE IN FRONTEND !!
    }
}

module.exports = {authCheck};