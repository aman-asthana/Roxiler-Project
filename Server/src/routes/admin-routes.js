const router = require('express').Router();

const {addUser} = require('../controllers/admin-controller');
const auth = require('../middlewares/auth-middleware')
const role = require('../middlewares/role-middleware')

router.post('/add-user', auth, role(["ADMIN"]), addUser)

module.exports = router;