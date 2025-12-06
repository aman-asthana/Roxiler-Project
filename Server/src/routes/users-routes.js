const router = require('express').Router()

const {updatePassword} = require('../controllers/users-controller')
const authMiddleware = require('../middlewares/auth-middleware')


router.put('/update-password', authMiddleware, updatePassword)


module.exports = router