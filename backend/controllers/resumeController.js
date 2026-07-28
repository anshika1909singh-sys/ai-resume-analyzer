const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/geminiService");

exports.uploadResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            filePath: req.file.path,
            analysis: ""
        });

        const dataBuffer = fs.readFileSync(req.file.path);

        const data = await pdfParse(dataBuffer);

        
        const analysis = await analyzeResume(data.text);
        resume.analysis = analysis;

        await resume.save();
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