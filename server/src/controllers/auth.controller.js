import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken, setAuthCookie } from "../utils/token.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  bio: user.bio,
  role: user.role
});

export const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create(data);
  const token = createToken(user._id);
  setAuthCookie(res, token);

  res.status(201).json({ user: serializeUser(user), token });
});

export const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user || !(await user.comparePassword(data.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = createToken(user._id);
  setAuthCookie(res, token);

  res.json({ user: serializeUser(user), token });
});

export const logout = (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const me = (req, res) => {
  res.json({ user: serializeUser(req.user) });
};
