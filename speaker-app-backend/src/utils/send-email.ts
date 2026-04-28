import { emailTemplates } from "./email-template";
import transporter from "../config/node-mailer";
import { EMAIL_ADDRESS_SENDER } from "../config/env";

export const sendEmail = async ({
  to,
  type,
  userName,
  code,
}: {
  to: string;
  type: string;
  userName: string;
  code: number;
}) => {
  if (!to || !type || !userName || !code) {
    throw new Error(
      "Missing required parameter: to, type, userName, and code are all required",
    );
  }

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) {
    throw new Error("Invalid email type");
  }

  const subject = template.generateSubject();
  const html = template.generateBody({ userName, code });

  const mailOptions = {
    from: EMAIL_ADDRESS_SENDER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw e;
  }
};
