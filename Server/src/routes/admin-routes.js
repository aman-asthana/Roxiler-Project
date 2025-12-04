const router = require('express').Router();

const {addUser, getDashboard, getUsers, getUserById} = require('../controllers/admin-controller');
const auth = require('../middlewares/auth-middleware')
const role = require('../middlewares/role-middleware')

router.post('/add-user', auth, role(["ADMIN"]), addUser)

router.get('/dashboard', auth, role(['ADMIN']), getDashboard)

router.get('/users', auth, role(['ADMIN']), getUsers)

router.get('/users/:id', auth, role(['ADMIN']), getUserById)

module.exports = router;