const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
router.get('/signup', viewsController.getSignupForm);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

// router.get('/',(req, res)=>{
//   res.status(200).render('base', {
//     tour: "the forest hiker",
//     user: " jonas"
//   });
// });

// router.get('/', viewsController.getOverview);
// router.get('/tour/:slug',viewsController.getTour);
// router.get('/login',viewsController.getLoginForm);
module.exports = router;
