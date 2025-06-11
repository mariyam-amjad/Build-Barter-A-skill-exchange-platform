const express = require('express')
const router = express.Router()
const {getPotentialMatches, swipeAction} = require('../controllers/swipeController');
const {authCheck} = require('../middlewares/authCheck');

router.get('/', authCheck, getPotentialMatches)
router.post('/', authCheck, swipeAction)

module.exports = router;