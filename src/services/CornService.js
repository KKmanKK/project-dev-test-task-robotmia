import cron from "node-cron";
import { doctorSrevice } from "./DoctorService.js";
import { emailService } from "./emailService.js";
import { patientsService } from "./PatientsService.js";
export class CornService {
  static sendMail() {
    let task = cron.schedule("0 7-21 * * *", async () => {
      const schedule = await patientsService.getSchedule();

      const patients = await patientsService.getPatient();

      const doctors = await doctorSrevice.getDoctors();

      let dateMonth = new Date().getMonth() + 1;
      let dateDay = new Date().getDate();
      let dateHour = new Date().toLocaleTimeString().split(":")[0];
      let dateMin = new Date().toLocaleTimeString().split(":")[1];
      schedule.forEach((sc) => {
        let date = sc.date.toLocaleDateString().split(".");
        let scMonth = +date[1];
        let scDay = +date[0];
        let scHour = +sc.time_from.split(":")[0];
        let scMin = +sc.time_from.split(":")[1];

        if (scMonth === dateMonth && scDay - dateDay === 1) {
          if (String(sc.is_free) === "false") {
            const patient = patients.find((p) => p.id == sc.patientId);
            const doctor = doctors.find((p) => p.id == sc.doctorId);

            emailService.sendMess(
              patient.email,
              `${date.join("-")} | Привет ${
                patient.name
              }! Напоминаем что вы записаны к ${doctor.spec} завтра в ${
                sc.time_from
              }! `
            );
          }
        }

        if (
          scMonth === dateMonth &&
          scDay === dateDay &&
          scHour * 60 + scMin - (dateHour * 60 + +dateMin) === 120
        ) {
          if (String(sc.is_free) === "false") {
            const patient = patients.find((p) => p.id == sc.patientId);
            const doctor = doctors.find((p) => p.id == sc.doctorId);

            emailService.sendMess(
              patient.email,
              `${date.join("-")} | Привет ${
                patient.name
              }! Через 2 часа у вас приём у ${doctor.spec} в ${sc.time_from}! `
            );
          }
        }
      });
    });

    task.start();
  }
}
