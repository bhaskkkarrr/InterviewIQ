import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";

export async function isVerified(req, res, next) {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const session = await sessionModel.findOne({
      _id: decoded.sessionId,
      revoked: false,
    });
    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: "Session expired" });
    }
    const User = await userModel.findById(decoded.id);
    if (!User) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = User;
    req.session = session;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.name });
  }
}
