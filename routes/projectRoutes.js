const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authenticate, checkIfAdmin } = require("../middleware/authenticate");
const {
  addProject,
  deleteProject,
  updateProject,
  getProjectByCompanyName,
  getProjectById,
  getProject,
} = require("../controller/ProjectController");

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

router.get("/", authenticate,checkIfAdmin, getProject);
router.get("/:id", authenticate,checkIfAdmin, getProjectById);
router.delete("/:id", authenticate,checkIfAdmin, deleteProject);
router.put("/:id", authenticate,checkIfAdmin, updateProject);
router
  .route("/add")
  .post(
    authenticate,
    upload.fields([{ name: "images", maxCount: 4 }]),
    addProject
  );
router.route("/company/list/").get(authenticate,checkIfAdmin, getProjectByCompanyName);
module.exports = router;
