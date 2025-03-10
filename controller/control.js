const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterData = require("../model/register");
const PostData = require("../model/postdata");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const BusData = require("../model/busdata");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await RegisterData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterData({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterData.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found - Invalid Email Id" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "TMSKEYS1331",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createPostDataController = async (req, res) => {
  try {
    const {
      StaffName,
      Department,
      NumOfStu,
      Reason,
      From,
      To,
      Days,
      StartDate,
      EndDate,
    } = req.body;

    const newPostData = new PostData({
      StaffName,
      Department,
      NumOfStu,
      Reason,
      From,
      To,
      Days,
      StartDate,
      EndDate,
    });

    await newPostData.save();

    const emailContent = {
      emailFrom: "rammunis2001@gmail.com",
      emailTo: "ramkumarpalani2001@gmail.com",
      subject: `Request from ${Department}`,
      body: `Request to transport from ${Department} Department - Reason ${Reason} for ${Days} Days \n Incharge Staff : ${StaffName} \n No.of Students : ${NumOfStu} \n Date : ${StartDate} - ${EndDate} \n Place : ${From} to ${To}`,
    };

    await sendEmail(emailContent);

    res.status(201).json({ message: "Post data created successfully" });
  } catch (error) {
    console.error("Error creating post data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendEmail = async (emailContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ramkumarpalani2001@gmail.com",
        pass: "lhvs dqhl fdat diah",
      },
    });

    const mailOptions = {
      from: emailContent.emailFrom,
      to: emailContent.emailTo,
      subject: emailContent.subject,
      text: emailContent.body,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getAllPostDataController = async (req, res) => {
  try {
    const allActivePostData = await PostData.find({ Active: "0" });

    if (allActivePostData.length === 0) {
      return res.status(404).json({ message: "No active post data found" });
    }

    res.status(200).json(allActivePostData);
  } catch (error) {
    console.error("Error getting active post data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllPostDataControllerAdmin = async (req, res) => {
  try {
    const allActivePostData = await PostData.find({ Active: "1" });

    if (allActivePostData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(allActivePostData);
  } catch (error) {
    console.error("Error getting active post data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePostDataActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const postData = await PostData.findById(id);
    if (!postData) {
      return res.status(404).json({ message: "Post data not found" });
    }

    postData.Active = "0";
    await postData.save();

    res.status(200).json({ message: "Post data status updated successfully" });
  } catch (error) {
    console.error("Error updating post data status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const BusAllowcateController = async (req, res) => {
  try {
    const { BusNO, Destination, DepartureTime } = req.body;

    const BusAllowcate = new BusData({
      BusNO,
      Destination,
      DepartureTime,
    });

    await BusAllowcate.save();

    const emailContent = {
      emailFrom: "ramkumarpalani2001@gmail.com",
      emailTo: "rammunis2001@gmail.com",
      subject: "Bus Allocated",
      body: `Bus with number ${BusNO} has been allocated for destination ${Destination} at ${DepartureTime}`,
    };

    await sendEmail(emailContent);

    res.status(201).json({ message: "Bus Allocated Successfully" });
  } catch (error) {
    console.error("Error Bus Allocate:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllBusAllowcateController = async (req, res) => {
  try {
    const getAllBusAllowcateData = await BusData.find();

    if (getAllBusAllowcateData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(getAllBusAllowcateData);
  } catch (error) {
    console.error("Error getting active post data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerController,
  loginController,
  createPostDataController,
  getAllPostDataController,
  getAllPostDataControllerAdmin,
  updatePostDataActiveStatus,
  BusAllowcateController,
  getAllBusAllowcateController,
};
