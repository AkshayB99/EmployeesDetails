const AppError = require("../utils/appError");
const Employee = require("../models/employees");
const fs = require("fs");

exports.createEmployee = async (req, res, next) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;

    const imagePath = req.file.path; // Get the path of the uploaded image

    // Create a new employee record with image data
    const employee = await Employee.create({
      f_Image: {
        data: imagePath, // Store the path of the image
        contentType: req.file.mimetype, // Store the MIME type of the image
      },
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
    });

    res.status(201).json({
      status: "success",
      data: {
        employee,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    // Read the image files from the file system and encode them in base64 format
    const employeesWithBase64Images = await Promise.all(
      employees.map(async (employee) => {
        const imageData = await fs.promises.readFile(employee.f_Image.data);
        const base64Image = Buffer.from(imageData).toString("base64");
        return {
          ...employee.toJSON(),
          f_Image: base64Image,
        };
      })
    );
    res.status(200).json({
      status: "success",
      results: employeesWithBase64Images.length,
      data: {
        employees: employeesWithBase64Images,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return next(new AppError("No employee found with that ID", 404));
    }

    // Read the image file from the file system and encode it in base64 format
    const imageData = await fs.promises.readFile(employee.f_Image.data);
    const base64Image = Buffer.from(imageData).toString("base64");

    // Create a new object with base64 image and other employee data
    const employeeWithBase64Image = {
      ...employee.toJSON(),
      f_Image: base64Image,
    };

    // Send the response
    res.status(200).json({
      status: "success",
      data: {
        employee: employeeWithBase64Image,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
      req.body;

    // Check if a new image file is uploaded
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }

    // Find the employee by ID
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return next(new AppError("No employee found with that ID", 404));
    }

    // Update employee data
    employee.f_Name = f_Name;
    employee.f_Email = f_Email;
    employee.f_Mobile = f_Mobile;
    employee.f_Designation = f_Designation;
    employee.f_Gender = f_Gender;
    employee.f_Course = f_Course;

    // If a new image is uploaded, update the image data
    if (imagePath) {
      // Remove the old image file
      fs.unlinkSync(employee.f_Image.data);
      // Update image data
      employee.f_Image = {
        data: imagePath,
        contentType: req.file.mimetype,
      };
    }

    // Save the updated employee data
    employee = await employee.save();

    res.status(200).json({
      status: "success",
      data: {
        employee,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return next(new AppError("No employee found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
