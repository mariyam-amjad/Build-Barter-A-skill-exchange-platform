const User = require('../models/userModel')
const mongoose = require('mongoose')


const getPotentialMatches = async (req, res) => {
    try {
        const currentUser = req.user
        const currentUserInterests = currentUser.interests;

        // Find users who have skills matching the current user's interests
        let potentialMatchesBySkills = await User.find({
            _id: { $not: { $in: [currentUser._id] } },
            skills: { $in: currentUserInterests },
            matchRequests: { $not: { $in: [currentUser._id] } },
            matches: { $not: { $in: [currentUser._id] } }
            // rejected: { $not: { $in: [currentUser._id] } }
        }).populate('skills').populate('interests')

        potentialMatchesBySkills = potentialMatchesBySkills
            .filter(person => !currentUser.rejected.includes(person._id))
            .map(person => {
                return ({
                    fname: person.fname,
                    lname: person.lname,
                    bio: person.bio,
                    username: person.username,
                    skills: person.skills.map(item => item.name),
                    interests: person.interests.map(item => item.name)
                })
            })

        console.log(potentialMatchesBySkills)

        return res.status(200).json({ potentialMatchesBySkills })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const swipeAction = async (req, res) => {
    try {
        let { username, isAccepted } = req.body // username of the swiped user, and isAccepted is boolean

        if (typeof isAccepted !== 'boolean') {
            return res.status(400).json({ error: 'isAccepted must be a boolean' });
        }

        const currentUser = req.user

        const swipedUser = await User.findOne({ username: username })

        if (!swipedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        // RIGHT swipe
        if (isAccepted) {
            if (currentUser.matchRequests.includes(swipedUser._id)) {
                // Add both users to each other's matches
                currentUser.matchRequests = currentUser.matchRequests.filter(id => id !== swipedUser._id)
                currentUser.matches.push(swipedUser._id)
                swipedUser.matches.push(currentUser._id)
                currentUser.notifications.push(`🎉 You matched with @ ${swipedUser.username} !!!`)
                swipedUser.notifications.push(`🎉 You matched with @ ${currentUser.username} !!!`)
                await currentUser.save()
                await swipedUser.save()
                console.log("User got a match !")
                return res.status(200).json({ message: `🎉 It's a match with @ ${swipedUser.username} !!` })
            }
            swipedUser.matchRequests.push(currentUser._id)
            await swipedUser.save()
            console.log("User sent a match request !")
            return res.status(200).json({ message: `➕ Match request sent to @ ${swipedUser.username} !` })
        }
        // LEFT swipe
        else {
            currentUser.rejected.push(swipedUser._id)
            await currentUser.save()
            console.log("User rejected this pontential match !")
            return res.status(200).json({ message: `🚫 User Rejected potential match @ ${swipedUser.username} !` })
        }

    } catch (error) {
        console.error('Error in swipeAction:', error)
        return res.status(400).json({ error: 'Internal server error' })
    }
}


module.exports = { getPotentialMatches, swipeAction }