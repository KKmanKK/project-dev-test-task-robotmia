import dotenv from "dotenv";
import { sequelize } from "../db.js";
import express from "express";
import { router } from "./routers.js";
import { errorMiddleware } from "./../middlewares/errorMiddleware.js";
import { CornService } from "./services/CornService.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api", router);

CornService.sendMail();
app.use(errorMiddleware);
const start = () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    app.listen(PORT, () => {
      console.log("Сервер запущен");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
