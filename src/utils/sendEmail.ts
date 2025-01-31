import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_EMAIL as string,
      subject,
      text,
    };
    await sgMail.send(msg);
    console.log("Email Sent  Successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
