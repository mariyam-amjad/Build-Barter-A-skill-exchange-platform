const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/users', adminController.showAllUsers)
router.get('/skills', adminController.showAllSkills)
router.get('/get/one', adminController.getAUser);
router.post('/add/skill', adminController.addSkill)  // single or a list of objects
router.post('/add/user', adminController.addUser)   // single or a list of objects


// to be deleted in production routes
router.post('/deleteAllUsers', adminController.deleteAllUsers)
router.get('/setRandomSkillsAndMatches', adminController.setRandomSkillsAndMatches)


module.exports = router
