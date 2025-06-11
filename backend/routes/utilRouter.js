const express = require('express')
const router = express.Router()
const {getAllSkills, showProfileWithUsername, verifyToken} = require('../controllers/utilController')
const {authCheck} = require('../middlewares/authCheck')

router.get('/skills', getAllSkills)

router.get('/verifytoken', authCheck, verifyToken)

router.get('/:id', showProfileWithUsername)

module.exports = router;