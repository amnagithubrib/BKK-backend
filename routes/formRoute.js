const express = require("express");
const router = express.Router();
const FormController = require("../controller/formController");
const { Authenticated } = require("../middleware/registerauth");
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../uploads/"));
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });

router.post("/form", Authenticated, async (req, res) => {
    const result = await FormController.createFormElement(req);
    res.send(result);
});
router.get("/form/:id", async (req, res) => {
    const result = await FormController.getFormElement(req);
    res.send(result);
});
router.get("/allforms", async (req, res) => {
    const result = await FormController.getAllFormElements(req);
    res.send(result);
});

module.exports = router;
