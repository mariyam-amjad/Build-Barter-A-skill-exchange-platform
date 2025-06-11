const User = require('../models/userModel')

// get user count in system
const homeController = async (req, res)=> {
    try{
        const totalUsers = await User.countDocuments()
        res.status(200).json(totalUsers)
    } catch(err) {
        res.status(400).json({error:err.message})
        console.log(err)
    }
}

module.exports = {homeController}