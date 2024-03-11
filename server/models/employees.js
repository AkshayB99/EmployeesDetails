const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: Number,
    unique: true,
  },
  f_Image: {
    data: Buffer,
    contentType: String,
  },
  f_Name: {
    type: String,
    required: [true, "Please provide employee name"],
  },
  f_Email: {
    type: String,
    required: [true, "Please provide employee email"],
  },
  f_Mobile: {
    type: String,
    required: [true, "Please provide employee mobile"],
  },
  f_Designation: {
    type: String,
    required: [true, "Please provide employee designation"],
  },
  f_Gender: {
    type: String,
    required: [true, "Please provide employee gender"],
  },
  f_Course: {
    type: String,
    required: [true, "Please provide employee course"],
  },
  f_Createddate: {
    type: String,
    default: () => {
      const date = new Date();
      const formattedDate = `${("0" + date.getDate()).slice(
        -2
      )}-${date.toLocaleString("default", { month: "short" })}-${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
      return formattedDate;
    },
  },
});

employeeSchema.pre("save", async function (next) {
  // Only increment if the document is newly created
  if (this.isNew) {
    try {
      const lastEmployee = await this.constructor.findOne(
        {},
        {},
        { sort: { f_Id: -1 } }
      );
      if (lastEmployee) {
        this.f_Id = lastEmployee.f_Id + 1;
      } else {
        // If no documents exist, start with 1
        this.f_Id = 1;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
