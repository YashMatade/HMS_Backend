const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require("../models/user.model");
const AppliedForJobModel = require('../models/appliedforjobs.model');

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, education, role, password } = req.body;
        let existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(200).json({ err: 300, msg: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let newUser = new userModel({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            education,
            role: "employee"
        });
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRETE_KEY, { expiresIn: '24d' });
        let result = await newUser.save();
        res.status(200).json({ err: 200, msg: "User Registered successfully", data: result, token });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ err: 300, msg: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ err: 300, msg: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY, { expiresIn: '24d' });
        res.status(200).json({ err: 200, msg: "Logged in successfully", data: user, token });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}


exports.applyForJob = async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        let alreadyApplied = await AppliedForJobModel.findOne({ userId, jobId });
        if (alreadyApplied === null) {
            let apply = new AppliedForJobModel({
                userId, jobId
            });
            let data = await apply.save();
            const populatedData = await AppliedForJobModel.findById(data._id).populate('jobId');
            res.status(200).json({ err: 200, msg: "Applied for job successfully", data: populatedData });
        } else {
            res.status(200).json({ err: 300, msg: "Already applied for job" });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.listOfAppliedJobs = async (req, res) => {
    try {
        const { userId } = req.body;
        let jobs = await AppliedForJobModel.find({ userId }).populate('jobId');
        if (jobs.length === 0) {
            res.status(200).json({ err: 300, msg: "You haven't applied for any jobs" });
        } else {
            res.status(200).json({ err: 200, msg: 'Jobs found successfully', data: jobs });
        }
    } catch (error) {
        res.status(200).json({ err: 500, msg: error.toString() });
    }
}