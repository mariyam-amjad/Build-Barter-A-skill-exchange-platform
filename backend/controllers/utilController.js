const detokenize = require('../utils/detokenizer');
const Skill = require('../models/skillModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const getAllSkills = async (req, res) => {
    try {
        const allSkills = await Skill.find()
        return res.status(200).json(allSkills)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}


const showProfileWithUsername = async (req, res) => {
    try {
        const username = req.params.id;
        let isExternal = true;
        let token;
        let loggedinUserExists;
        let decodedToken

        const userExists = await User.findOne({ username: username })
            .populate('skills')
            .populate('interests');

        if (!userExists) {
            console.log("User not found!");
            return res.status(404).json({ message: "User not found!" });
        }

        let profile = {
            fname: userExists.fname,
            lname: userExists.lname,
            username: userExists.username,
            skills: userExists.skills,
            interests: userExists.interests,
            bio: userExists.bio
        }

        if (req.cookies === undefined) {
            console.log("Cookies undefined, will view user as external!");
        } else {
            token = req.cookies.token;
            console.log(req.cookies);

            try {
                decodedToken = detokenize(token);
            } catch (err) {
                return res.status(200).json(profile)
            }

            if(decodedToken)
            loggedinUserExists = await User.findOne({
                email: decodedToken.email,
                username: decodedToken.username
            })

            if (decodedToken && loggedinUserExists) {
                isExternal = false;
            } else {
                console.log("Invalid cookies, will view user as external!");
            }
        }


        if (!isExternal && loggedinUserExists && loggedinUserExists.matches && loggedinUserExists.matches.includes(userExists._id)) {
            profile = {
                ...profile,
                email: userExists.email
            };
        }

        return res.status(200).json(profile);

    } catch (err) {
        console.log("\nFailed to fetch user details!\n");
        return res.status(500).json({ error: err });
    }
};


const verifyToken = async (req, res) => {
    try {
        console.log("Verified token for frontend !")
        return res.status(200).json({ message : "Token verified !" })
    } catch (err) {
        console.log("Failed to verify token")
        return res.status(400).json({ error: err })
    }
}


module.exports = { getAllSkills, showProfileWithUsername, verifyToken }