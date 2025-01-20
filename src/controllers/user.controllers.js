import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath)
    return res.status(400).json({ message: "Avatar is required" });

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  return res.status(200).json({
    message: "User has been registered successfully",
    avatarPublicUrl: avatar.url,
  });
};

export { registerUser };
