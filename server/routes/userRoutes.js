const express = require('express');
const router = express.Router();
const { registerUser, loginUser, 
        getAllUsers, getUserById, 
        updateUser, updateUserPassword, 
        deleteUser 
      } = require('../controller/userController');

router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getUserById);
router.route('/users/:id').delete(deleteUser);
router.route('/users/:id').put(updateUser);
router.route('/users/:id/password').put(updateUserPassword);

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;