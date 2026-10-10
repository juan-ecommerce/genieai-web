import nodemailer from "nodemailer";
import { z } from "zod";
import { LEAD_RECIPIENT } from "./config.mjs";

const singleLine = /^[^\r\n\0]*$/;
export const inquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100).regex(singleLine),
    email: z.string().trim().max(254).email(),
    company: z
      .string()
      .trim()
      .max(120)
      .regex(singleLine)
      .optional()
      .default(""),
    message: z.string().trim().min(10).max(4000),
  })
  .strict();

export const contactSchema = inquirySchema
  .extend({
    consent: z.literal(true),
    website: z
      .string()
      .max(200)
      .optional()
      .default("")
      .refine((value) => value === ""),
  })
  .strict();

export function createMailSender(config) {
  const transport = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    requireTLS: config.smtpPort !== 465,
    auth: { user: config.smtpUser, pass: config.smtpPass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return (mail) => transport.sendMail(mail);
}

export async function deliverInquiry(config, inquiry, sendMail) {
  const result = await sendMail({
    from: config.smtpFrom,
    to: LEAD_RECIPIENT,
    replyTo: inquiry.email,
    subject: `GenieAI enquiry from ${inquiry.name}`,
    text: `New GenieAI project enquiry\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company || "Not provided"}\n\n${inquiry.message}\n\nThe visitor agreed to be contacted about this enquiry.`,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  if (
    !Array.isArray(result?.accepted) ||
    !result.accepted.some(
      (value) => String(value).toLowerCase() === LEAD_RECIPIENT,
    )
  ) {
    throw new Error("The recipient was not accepted by SMTP");
  }
}
