const express = require("express");
const router = express.Router(); //router for all resume related APIs

const authMiddleware = require("../middleware/authMiddleware"); //only logged in user can upload resume
const upload = require("../config/multer");//multer middleware
const { uploadResume } = require("../controllers/resumeController");//import controller that will execute after multer has processed the file

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

module.exports = router;