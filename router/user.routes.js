const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

 
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/getuser', userController.getuser);
router.get('/getuser/:userID', userController.getuserID);
router.get('/filteruser',userController.filteruser);
router.post('/filtername', userController.filtername);
router.get('/filtersum', userController.filtersum);

module.exports = router;


