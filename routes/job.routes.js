const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");


const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    },
});

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only image is allowed"));
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});

router.post("/create", upload.single("image"), auth, jobController.create);
router.post("/getalljobs", auth, jobController.getAll);
router.post("/getjob", auth, jobController.getById);
// get users who have applied for same job (Pass jobId in body);
router.post("/getusers", auth, jobController.getUsers);
module.exports = router;