import config from "../config/config.js";
import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export async function getUser(req, res) {
  const { name, email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    user = await userModel.create({
      name,
      email,
    });
  }

  const session = await sessionModel.create({
    user: user._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  const refreshToken = jwt.sign(
    { id: user._id, sessionId: session._id },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  session.refreshTokenHash = refreshTokenHash;
  await session.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User signed in",
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
      credit: user.credits,
    },
    token: accessToken,
  });
}

export async function getAccessToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Access not granted",
    });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(400).json({
      success: false,
      message: "Access denied",
    });
  }
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  console.log("Decoded user:\n", decoded);

  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  const accessToken = jwt.sign(
    {
      id: decoded.id,
      sessionId: decoded.sessionId,
    },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  const newRefreshToken = jwt.sign(
    { id: decoded.id, sessionId: decoded.sessionId },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();
  res.cookie("refreshToken", newRefreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    token: accessToken,
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
      credit: user.credits,
    },
  });
}

export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  console.log("Cookies:", req.cookies);
  console.log("Refresh Token:", req.cookies.refreshToken);
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Token not found",
    });
  }

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }

  session.revoked = true;
  await session.save();
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}
