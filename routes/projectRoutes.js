const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { addProject, deleteProject, updateProject, getProjectByCompanyName, getProjectById, getProject } = require('../controller/ProjectController')
router.get("/",authenticate,getProject)
router.get("/:id",authenticate, getProjectById)
router.delete("/:id",authenticate, deleteProject)
router.put("/:id",authenticate, updateProject)
router.post('/add',authenticate,addProject)
// router.get('/getProjectByCompanyName/',authenticate,getProjectByCompanyName)
router.route('/company/list/').get(authenticate,getProjectByCompanyName)

module.exports = router
