const router = require('express').Router();
const { getOwnerDashboard } = require('../controllers/owner-controller');
const auth = require('../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');


router.get('/dashboard', auth, role(["OWNER"]), getOwnerDashboard);

module.exports = router;
