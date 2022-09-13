const express = require("express");
const router = express.Router();
const multer = require('multer')
const { authenticate,checkIfAdmin } = require('../middleware/authenticate')
const { addCompany, deleteCompany, updateCompany, getCompanyById, getCompany} = require('../controller/companyController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "." + Date.now()
      );
    },
  });
  
const upload = multer({ storage: storage });
router.get("/", getCompany,checkIfAdmin)
router.get("/:id",authenticate,checkIfAdmin, getCompanyById)
router.delete("/:id",authenticate,checkIfAdmin, deleteCompany)
router.put("/:id",authenticate,checkIfAdmin, updateCompany)
router.route('/add').post(authenticate,upload.fields([{ name: "images", maxCount: 4 }]),addCompany)

module.exports = router

