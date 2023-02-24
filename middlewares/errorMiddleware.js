import { ApiErorr } from "../erorrs/ApiError.js";
export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiErorr) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.erorrs });
  }
  return res.status(500).json({ message: "Ошибка" });
};
