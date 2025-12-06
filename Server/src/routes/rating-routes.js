const router = require('express').Router();
const {addRating, updateRating} = require('../controllers/ratings-controller')
const auth = require('../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');

router.post('/:storeId', auth, role(["USER"]), addRating)


router.put('/:storeId', auth, role(["USER"]), updateRating)

module.exports = router