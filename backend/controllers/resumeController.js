const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/geminiService");

exports.uploadResume = async (req, res) => {
    try {
        const { jobTitle, jobDescription } = req.body;

        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            filePath: req.file.path,
            jobTitle,
            jobDescription,
            analysis: {},
        });

        try {
            const dataBuffer = fs.readFileSync(req.file.path);
            const data = await pdfParse(dataBuffer);
            console.log("Calling Gemini...");
            const analysis = await analyzeResume(data.text, jobTitle, jobDescription);
            console.log("Gemini returned:", analysis);
            resume.analysis = analysis;
            await resume.save();

            return res.status(201).json({
                message: "Resume uploaded successfully",
                resume,
            });
        } catch (analysisError) {
            console.error("Analysis failed:", analysisError);
            resume.analysis = {
                failed: true,
                message: "Could not connect to the analysis server, so no analysis is available.",
            };
            await resume.save();

            return res.status(201).json({
                message: "Resume uploaded, but analysis was unavailable.",
                resume,
            });
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Resume.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("originalName jobTitle jobDescription analysis createdAt");

        res.status(200).json({
            history,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};
async function deleteFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.warn(`Unable to delete file ${filePath}:`, err.message);
    }
}

exports.deleteHistoryItem = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        await deleteFile(resume.filePath);
        await resume.deleteOne();

        res.status(200).json({
            message: "History item deleted",
            id: req.params.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

exports.deleteAllHistory = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).select("filePath");

        for (const resume of resumes) {
            await deleteFile(resume.filePath);
        }

        await Resume.deleteMany({ user: req.user.id });

        res.status(200).json({
            message: "All history deleted",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};
exports.getResumeFile = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        }).select("originalName filePath");

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        const filePath = path.resolve(resume.filePath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: "Resume file not found",
            });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename="${resume.originalName.replace(/\"/g, "")}"`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        }).select("originalName jobTitle jobDescription analysis createdAt updatedAt");

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        res.status(200).json({
            resume,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};