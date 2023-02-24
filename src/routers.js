import { Router } from "express";
import { patientsController } from "./controllers/patientController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";

export const router = Router();

router.post("/registration", patientsController.registration);
router.post("/login", patientsController.login);
router.put(
  "/setAppointment",
  authMiddleware,
  patientsController.setAppointment
);
router.get(
  "/getSchedule/:date?/:isFree?/:doctorId?",
  authMiddleware,
  patientsController.getSchedule
);
