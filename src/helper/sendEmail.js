import { transporter } from "./transporter.js";
import "dotenv/config.js";

export const sendEmail = async (to, subject, text) => {
    const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
    return transporter.sendMail(mailOptions);
  };