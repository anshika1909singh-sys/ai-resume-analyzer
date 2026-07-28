const express = require("express");
const router = express.Router(); //router for all resume related APIs

const authMiddleware = require("../middleware/authMiddleware"); //only logged in user can upload resume
const upload = require("../config/multer");//multer middleware
const {
    uploadResume,
    getHistory,
    getResumeById,
    getResumeFile,
    deleteHistoryItem,
    deleteAllHistory,
} = require("../controllers/resumeController");

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

router.get("/history", authMiddleware, getHistory);
router.delete("/history", authMiddleware, deleteAllHistory);
router.get("/:id/file", authMiddleware, getResumeFile);
router.get("/:id", authMiddleware, getResumeById);
router.delete("/:id", authMiddleware, deleteHistoryItem);

module.exports = router;