import { patientsService } from "../services/PatientsService.js";

class PatientsController {
  async registration(req, res, next) {
    try {
      const { email, password, name, gender, phone } = req.body;
      const patient = await patientsService.registrationPatient(
        email,
        password,
        name,
        gender,
        phone
      );
      return res.status(200).json(patient);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const patient = await patientsService.loginPatient(email, password);
      return res.status(200).json(patient);
    } catch (e) {
      next(e);
    }
  }
  async setAppointment(req, res, next) {
    try {
      const { email, doctorId, type, date, time_from, time_to } = req.body;

      const schedule = await patientsService.setAppointment(
        email,
        doctorId,
        type,
        date,
        time_from,
        time_to
      );
      return res.status(200).json(schedule);
    } catch (e) {
      next(e);
    }
  }
  async getSchedule(req, res, next) {
    try {
      const { date, isFree, doctorId } = req.query;

      let schedules = await patientsService.getSchedule(date, isFree, doctorId);

      return res.status(200).json(schedules);
    } catch (e) {
      next(e);
    }
  }
}

export const patientsController = new PatientsController();
