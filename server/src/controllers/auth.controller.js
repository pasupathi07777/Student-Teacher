import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { validateFields } from "../utils/functions.js";

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

// resetPassword
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
            error: "User does not exist",
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

export const otpSenter = async (req, res) => {
  const { email } = req.body;
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





export const checkAuth = async (req, res) => {
  try {
    
    res.status(200).json({succces:true, user:req.user });

  } catch (error) {

    res.status(500).json({succces:false, error: "Internal server error" });
  }
};
