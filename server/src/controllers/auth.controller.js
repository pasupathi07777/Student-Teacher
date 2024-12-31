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
  return Math.floor(100000 + Math.random() * 900000).toString();
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
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};


// verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

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

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "otp",
            error: "No OTP found for this user. Please request a new OTP.",
          },
        ],
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "otp",

            error: "Invalid OTP. Please try again.",
          },
        ],
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "otp",
            error: "OTP has expired. Please request a new OTP.",
          },
        ],
      });
    }


    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
    });
  }
};


// reset password



export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

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

    user.password = newPassword; 
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      errors: [{ field: "other", error: "Internal Server Error" }],
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
