import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  name?: string;
  verificationURL?: string;
  message?: string;
  isRegisterMail: boolean;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let message: nodemailer.SendMailOptions;

  if (options.isRegisterMail) {
    message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: `
        <div>
          <h1>Hello ${options.name}.</h1>
          <h3>Welcome to Quiz App.</h3>
          <p>Please click on the Activate below to verify your account.</p>
          <a href="${options.verificationURL}">Activate Account</a>
        </div>
      `,
    };
  } else {
    message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: `
        <div>
          <h2>From ${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>.</h2>
          <h3>Issue type: ${options.subject}</h3>
          <p>${options.message}</p>
        </div>
      `,
    };
  }

  await transporter.sendMail(message);
};

export default sendEmail;
