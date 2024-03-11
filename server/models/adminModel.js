const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  f_userName: {
    type: String,
    required: [true, "Please provide the admin user name"],
  },
  email: {
    type: String,
  },
  f_Pwd: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("f_Pwd")) return next();

  this.f_Pwd = await bcrypt.hash(this.f_Pwd, 12);

  next();
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
