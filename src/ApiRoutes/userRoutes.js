const express = require("express")
const router = express.Router()

const {login,register,getUser} = require('../Controllers/usersController')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/users').get(getUser)

module.exports = router