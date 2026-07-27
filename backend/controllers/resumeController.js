const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            filePath: req.file.path,
            analysis: ""
        });

        res.status(201).json({
            message: "Resume uploaded successfully",
            resume
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};