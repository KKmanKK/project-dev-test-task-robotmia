import { ApiErorr } from "./../erorrs/ApiError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      return next(ApiErorr.unAuthError());
    }
    const token = authorizationToken.split(" ")[1];

    if (!token) {
      return next(ApiErorr.unAuthError());
    }
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    if (!tokenData) {
      return next(ApiErorr.unAuthError());
    }
    req.user = tokenData;
    next();
  } catch (e) {
    next(ApiErorr.unAuthError());
  }
};
