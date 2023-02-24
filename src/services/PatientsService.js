import { Doctors, Patients, Schedule } from "../../models.js";
import bcrypt from "bcrypt";
import { PatientDTO } from "../Dtos/PatientDTO.js";
import { tokenService } from "./tokenService.js";
import { Op } from "sequelize";

import { ApiErorr } from "./../../erorrs/ApiError.js";
import { ScheduleDTO } from "./../Dtos/ScheduleDTO.js";
import { emailService } from "./emailService.js";
class PatientsService {
  async registrationPatient(email, password, name, gender, phone) {
    const candidat = await Patients.findOne({ where: { email } });
    if (candidat) {
      throw ApiErorr.badRequest("Пользователь уже существует");
    }
    const hashPass = bcrypt.hashSync(password, 4);
    const patient = await Patients.create({
      email,
      password: hashPass,
      name,
      gender,
      phone,
    });
    const patientDto = new PatientDTO(patient);
    const token = tokenService.generateToken({ ...patientDto });

    return {
      token,
      patientDto,
    };
  }
  async loginPatient(email, password) {
    const patient = await Patients.findOne({ where: { email } });
    if (!patient) {
      throw ApiErorr.badRequest("Пользователь не существует");
    }

    const isPass = bcrypt.compareSync(password, patient.password);

    if (!isPass) {
      throw ApiErorr.badRequest("Пользователь не существует");
    }
    const patientDto = new PatientDTO(patient);
    const token = tokenService.generateToken({ ...patientDto });
    emailService.sendMess("hymqag@mailto.plus", "sadasdasd");
    return {
      token,
      patientDto,
    };
  }
  async setAppointment(email, doctorId, type, date, time_from) {
    const patient = await Patients.findOne({ where: { email } });
    if (!patient) {
      throw ApiErorr.badRequest("Пациента нету");
    }
    const doctor = await Doctors.findOne({ where: { id: doctorId } });

    if (!doctor) {
      throw ApiErorr.badRequest("Доктора нету");
    }

    const schedule = await Schedule.findOne({
      where: {
        [Op.and]: [
          {
            doctorId,
            date: new Date(
              `${date}`.split("-")[0].length === 4
                ? `${date}`
                : `${date}`.split("-").reverse().join("-")
            ),
            time_from,
          },
        ],
      },
    });

    if (!schedule) {
      throw ApiErorr.badRequest("Слота не существует");
    }
    if (schedule.is_free === false) {
      throw ApiErorr.badRequest("Слот занят");
    }

    schedule.patientId = patient.id;
    schedule.type = type;
    schedule.is_free = false;
    schedule.save();
  }

  async getSchedule(date, is_free, doctorId) {
    if (doctorId && is_free) {
      const schedules = await Schedule.findAll({
        where: {
          [Op.and]: [
            {
              date: new Date(date),
              doctorId: Number(doctorId),
              is_free: is_free === "true" ? true : false,
            },
          ],
        },
      });

      return schedules.map((s) => {
        let scheduleDto = new ScheduleDTO(s);
        return scheduleDto;
      });
    }
    if (doctorId) {
      const schedules = await Schedule.findAll({
        where: {
          [Op.and]: [
            {
              date: new Date(date),
              doctorId: Number(doctorId),
            },
          ],
        },
      });
      return schedules.map((s) => {
        let scheduleDto = new ScheduleDTO(s);
        return scheduleDto;
      });
    }
    if (is_free) {
      const schedules = await Schedule.findAll({
        where: {
          [Op.and]: [
            {
              date: new Date(date),
              is_free: is_free === "true" ? true : false,
            },
          ],
        },
      });

      return schedules.map((s) => {
        let scheduleDto = new ScheduleDTO(s);
        return scheduleDto;
      });
    }

    if (!date) {
      const schedules = await Schedule.findAll();
      return schedules.map((s) => {
        let scheduleDto = new ScheduleDTO(s);
        return scheduleDto;
      });
    }

    const schedules = await Schedule.findAll({
      where: { date: new Date(date) },
    });
    return schedules.map((s) => {
      let scheduleDto = new ScheduleDTO(s);
      return scheduleDto;
    });
  }
  async getPatient() {
    const patients = await Patients.findAll();
    if (!patients) {
      throw ApiErorr.badRequest("Пациенты не найдены");
    }
    return patients;
  }
}
export const patientsService = new PatientsService();
