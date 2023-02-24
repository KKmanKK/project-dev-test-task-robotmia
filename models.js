import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Patients = sequelize.define("patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

export const Doctors = sequelize.define("doctors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  spec: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
});

export const Schedule = sequelize.define("schedule", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  time_from: { type: DataTypes.TIME },
  time_to: { type: DataTypes.TIME },
  is_free: { type: DataTypes.BOOLEAN },
  type: { type: DataTypes.INTEGER },
});

Doctors.hasMany(Schedule);
Schedule.belongsTo(Doctors);

Patients.hasMany(Schedule);
Schedule.belongsTo(Patients);

export const createUser = async () => {
  try {
    const patients = await Patients.findAll();

    if (patients.length === 0) {
      await Patients.create({
        email: "email@mail.ru",
        password: "123",
        name: "Kail",
        gender: "Male",
        phone: "111111111",
      });
      await Patients.create({
        email: "gmail@mail.ru",
        password: "123",
        name: "Djon",
        gender: "Male",
        phone: "3141343214",
      });
      await Patients.create({
        email: "Nemal@mail.ru",
        password: "123",
        name: "Nata",
        gender: "Female",
        phone: "567463",
      });
    }

    const doctors = await Doctors.findAll();
    if (doctors.length === 0) {
      await Doctors.create({
        spec: "Хирург",
        name: "Анастасия",
        price: 2000,
      });
      await Doctors.create({
        spec: "Психиатр",
        name: "Александр",
        price: "25000",
      });
      await Doctors.create({
        spec: "Нейрохирург",
        name: "Дмитрий",
        price: 10000,
      });
    }

    const schedule = await Schedule.findAll();
    if (schedule.length === 0) {
      await Schedule.create({
        date: new Date()
          .toLocaleDateString()
          .split(".")
          .map((d) =>
            Number(d) === Number(new Date().toLocaleDateString().split(".")[0])
              ? Number(d) + 1
              : d
          )
          .reverse()
          .join("-"),
        time_from: new Date(0, 0, 0, 10, 0, 0).toLocaleTimeString(),
        time_to: new Date(0, 0, 0, 10, 30, 0).toLocaleTimeString(),
        doctorId: 2,
        patientId: null,
        is_free: true,
        type: 0,
      });
      await Schedule.create({
        date: new Date().toLocaleDateString().split(".").reverse().join("-"),
        time_from: new Date(0, 0, 0, 12, 0, 0).toLocaleTimeString(),
        time_to: new Date(0, 0, 0, 12, 30, 0).toLocaleTimeString(),
        doctorId: 2,
        patientId: null,
        is_free: true,
        type: 0,
      });
      await Schedule.create({
        date: new Date().toLocaleDateString().split(".").reverse().join("-"),
        time_from: new Date(0, 0, 0, 13, 0, 0).toLocaleTimeString(),
        time_to: new Date(0, 0, 0, 13, 30, 0).toLocaleTimeString(),
        doctorId: 2,
        patientId: null,
        is_free: true,
        type: 0,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
setTimeout(() => {
  createUser();
}, 2000);
