import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validateFields } from "../utils/functions.js";
import nodemailer from "nodemailer";



// signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log(req.body, "signup");

    const validationErrors = validateFields({ username, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "email",
            error: "Email already exists",
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({
      success: false,
      errors: [
        {
          field: "other",
          error: "Internal Server Error",
        },
      ],
    });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        succces: false,
        errors: [
          {
            field: "email",
            error: "User does not exist",
          },
        ],
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        succces: false,
        errors: [{ field: "password", error: "Incorrect Password" }],
      });
    }

    const token = await generateToken(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      succces: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};

// verify Email
export const verfiyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        succces: false,
        errors: [
          {
            field: "email",
            error: "email does not exist",
          },
        ],
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      succces: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};


// reset password
// generateOTP

const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};


// send OTP
export const otpSenter = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "email",
            error: "User does not exist",
          },
        ],
      });
    }
    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for the next 10 minutes.`,
    };


    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to your email.");

   
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; 
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};


export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Verifying OTP:", { email, otp });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: { field: "email", error: "User does not exist" },
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", error: "No OTP found" },
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", error: "Invalid OTP" },
      });
    }

    if (new Date(user.otpExpiry).getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        error: { field: "otp", error: "OTP has expired" },
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      error: { field: "other", error: "Internal Server Error" },
    });
  }
};



// Reset Password Controller
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
console.log("hited");

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errors: 
        {
          field: !email ? "email" : "password",
          error: !email ? "Email is required" : "Password is required",
        },
      
    });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: 
          {
            field: "email",
            error: "User does not exist",
          }
      
      });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
      user
    });
  } catch (error) {
    console.error("Error resetting password:", error);

    // Send a general server error
    res.status(500).json({
      success: false,
      errors: 
        {
          field: "other",
          error: "An unexpected error occurred. Please try again later.",
        },
      
    });
  }
};




export const checkAuth = async (req, res) => {
  try {
    
    res.status(200).json({succces:true, user:req.user });

  } catch (error) {

    res.status(500).json({succces:false, error: "Internal server error" });
  }
};
