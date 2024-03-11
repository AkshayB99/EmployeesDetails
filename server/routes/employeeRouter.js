const express = require("express");
const employeeController = require("../controllers/employeController");
const auth = require("../controllers/adminController");
const multer = require("multer");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

const router = express.Router();

router
  .route("/getEmployees")
  .get(auth.protect, employeeController.getEmployees);

router
  .route("/createEmployee")
  .post(
    auth.protect,
    upload.single("f_Image"),
    employeeController.createEmployee
  );

router
  .route("/getEmployee/:id")
  .get(auth.protect, employeeController.getEmployee);

router
  .route("/deleteEmployee/:id")
  .delete(auth.protect, employeeController.deleteEmployee);

router
  .route("/updateEmployee/:id")
  .patch(
    auth.protect,
    upload.single("f_Image"),
    employeeController.updateEmployee
  );

module.exports = router;
