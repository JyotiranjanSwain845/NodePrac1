const express = require('express')
const router = express.Router()
const {handleUserSignup,handleUserSignin, getAllUsers, getUserById, updateUserById, deleteUserById} = require('../Controls/UserControl')

router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin);
router.get('/',getAllUsers);
router.get('/users/:id',getUserById);
router.put('/users/:id',updateUserById);
router.delete('/users/:id',deleteUserById);

module.exports = router;