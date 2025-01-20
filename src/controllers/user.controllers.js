import fs from "fs";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { validateEmail } from "../utils/helper.js";
import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatarLocalPath = req.file?.path;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const isValidEmail = validateEmail(email);
    if (!isValidEmail)
      return res.status(400).json({ message: "Email is not valid" });

    if (!avatarLocalPath)
      return res.status(400).json({ message: "Avatar is required" });

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
      username,
      avatar: avatar.url,
      password,
      email,
    });

    return res.status(200).json({
      message: "User has been registered successfully",
      avatarPublicUrl: avatar.url,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again" });
  } finally {
    if (fs.existsSync(req.file?.path)) {
      fs.unlinkSync(req.file?.path);
    }
  }
};

export { registerUser };
