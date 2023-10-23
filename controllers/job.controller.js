const jobModel = require("../models/job.model");
const AppliedForJobModel = require("../models/appliedforjobs.model");

exports.create = async (req, res) => {
    try {
        const { title, description, location, experience, companyName } = req.body;
        let newJob = new jobModel({
            title, description, location, experience, companyName
        });
        if (req.file !== undefined) {
            newJob.image = "/uploads/" + req.file.filename
        }
        let data = await newJob.save();
        res.status(200).json({ err: 200, msg: "New Job created successfully", data });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.getAll = async (req, res) => {
    try {
        const { userId, location, experience, title } = req.body;
        const query = {};
        if (location) {
            query.location = {
                $regex: location,
                $options: 'i',
            };
        }
        if (experience) {
            query.experience = {
                $regex: experience,
                $options: 'i',
            };
        }
        if (title) {
            query.title = {
                $regex: title,
                $options: 'i',
            };
        }

        const listOfAllJobs = await jobModel.find(query);
        if (listOfAllJobs.length === 0) {
            res.status(200).json({ err: 300, msg: "Jobs Not found" });
        } else {
            if (userId !== "") {
                const jobStatusPromises = listOfAllJobs.map(async (job) => {
                    const appliedJob = await AppliedForJobModel.findOne({ userId, jobId: job._id });
                    if (appliedJob) {
                        job.status = "Already Applied";
                    } else {
                        job.status = "Apply";
                    }
                });

                await Promise.all(jobStatusPromises);
            }
            res.status(200).json({ err: 200, msg: "Jobs found", data: listOfAllJobs });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.getById = async (req, res) => {
    try {
        const { jobId } = req.body;
        let job = await jobModel.findById(jobId);
        if (!job) {
            res.status(200).json({ err: 300, msg: "Job does not exist" })
        } else {
            res.status(200).json({ err: 200, msg: "Job Found", data: job })
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

//get users who have applied for job = 
exports.getUsers = async (req, res) => {
    try {
        const { jobId } = req.body;
        let userExists = await AppliedForJobModel.find({ jobId }).populate("userId");
        if (userExists.length === 0) {
            res.status(200).json({ err: 300, msg: "No any student have been applied for job" });
        } else {
            res.status(200).json({ err: 200, msg: "Data Found successfully", data: userExists });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}