import { Doctors } from "../../models.js";

class DoctorSrevice {
  async getDoctors() {
    const doctors = await Doctors.findAll();
    return doctors;
  }
}
export const doctorSrevice = new DoctorSrevice();
