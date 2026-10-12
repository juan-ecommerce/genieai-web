import nodemailer from "nodemailer";
import { z } from "zod";
import { LEAD_RECIPIENT, emailProvider } from "./config.mjs";

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

export function createMailSender(config, fetchImpl = fetch) {
  if (emailProvider(config) === "resend") {
    return async (mail) => {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + config.resendKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: mail.from,
          to: [LEAD_RECIPIENT],
          reply_to: mail.replyTo,
          subject: mail.subject,
          text: mail.text,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || typeof result?.id !== "string" || !result.id.trim())
        throw new Error("The email provider did not accept the enquiry.");
      return { accepted: [LEAD_RECIPIENT] };
    };
  }
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
    from: emailProvider(config) === "resend" ? config.resendFrom : config.smtpFrom,
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
    throw new Error("The recipient was not accepted by the email provider.");
  }
}
