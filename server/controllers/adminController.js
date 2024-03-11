const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create({
    f_userName: req.body.f_userName,
    email: req.body.email,
    f_Pwd: req.body.f_Pwd,
  });
  res.status(201).json({
    status: "success",
    data: {
      newAdmin,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { f_userName, f_Pwd } = req.body;
  if (!f_userName || !f_Pwd) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const admin = await Admin.findOne({ f_userName }).select("+f_Pwd");
  if (!admin || !(await admin.correctPassword(f_Pwd, admin.f_Pwd))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(admin._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(201).json({
    status: "success",
    token,
    data: {
      admin,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await Admin.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
