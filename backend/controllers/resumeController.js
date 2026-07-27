const fs = require("fs");//for reading files
const pdfParse = require("pdf-parse");//for extracting text from pdf
const Resume = require("../models/Resume");//imorting resume model

exports.uploadResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            user: req.user.id,
            originalName: req.file.originalname,
            filePath: req.file.path,
            analysis: ""
        });
//const dataBuffer = fs.readFileSync(req.file.path);
// const data = await pdfParse(dataBuffer);
//console.log(pdfParse);
//console.log(data);
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
};//try catch for data validation and error handling