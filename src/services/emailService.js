import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_EMAIL_HOST,
      port: process.env.SMTP_EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.STPM_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASSWORD,
      },
    });
  }

  async sendMess(email, mes) {
    await this.transporter.sendMail({
      from: process.env.STPM_EMAIL_USER,
      to: email,
      subject: "Оповещение",
      html: `<h2>${mes}</h2> `,
    });
  }
}

export const emailService = new EmailService();
