const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { getUser, signUpUser, signInUser, getUserById , deleteUser ,updateUser} = require('../controller/userController')
const { addCompany, deleteCompany, updateCompany, getCompanyById, getCompany} = require('../controller/companyController')
router.get("/", getCompany)
router.get("/:id",authenticate, getCompanyById)
router.delete("/:id",authenticate, deleteCompany)
router.put("/:id",authenticate, updateCompany)
router.post('/add',authenticate,addCompany)

module.exports = router
