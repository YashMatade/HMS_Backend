const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.post('/apply', auth, userController.applyForJob);
router.post('/apliedjoblist', auth, userController.listOfAppliedJobs);

module.exports = router;