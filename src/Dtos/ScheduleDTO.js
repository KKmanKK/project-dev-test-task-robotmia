export class ScheduleDTO {
  id;
  date;
  time_from;
  time_to;
  is_free;
  doctorId;
  patientId;
  constructor(model) {
    this.id = model.id;
    this.date = model.date;
    this.time_from = model.time_from;
    this.time_to = model.time_to;
    this.doctorId = model.doctorId;
    this.patientId = model.patientId;
    this.is_free = model.is_free;
  }
}
