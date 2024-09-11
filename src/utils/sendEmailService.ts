import nodemailer from "nodemailer";
import EmailOptions from "../interface/email.interface";

const sendEmailService = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: options.to,
    subject: options.subject,
    text: options?.text,
    html: options?.html,
  };
  await transporter.sendMail(message);
};

export default sendEmailService;
