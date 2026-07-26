exports.uploadResume = async (req, res) => { //this is express controller function which receive the uploaded file and save it in MongoDb, call Gemini AI, return analysis
    console.log(req.file); //req file contains information about the uploaded file, including its path, original name, and size

    res.json({
        message: "Resume uploaded successfully",
        file: req.file
    }); //all this send file details to thunder client to inspect
};