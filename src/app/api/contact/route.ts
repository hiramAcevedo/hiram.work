import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { getResend } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(2000),
  subject: z.string().max(200).optional(),
  meta: z
    .object({
      company: z.string().max(100).optional(),
      projectType: z.string().max(100).optional(),
      budget: z.string().max(50).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message, subject, meta } = result.data;

    // Rate limiting (only if Upstash is configured)
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { ratelimit } = await import("@/lib/ratelimit");
      const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment." },
          { status: 429 }
        );
      }
    }

    // Build email body with optional metadata
    let text = `Name: ${name}\nEmail: ${email}`;
    if (meta?.company) text += `\nCompany: ${meta.company}`;
    if (meta?.projectType) text += `\nProject Type: ${meta.projectType}`;
    if (meta?.budget) text += `\nBudget: ${meta.budget}`;
    text += `\n\nMessage:\n${message}`;

    const resend = getResend();
    await resend.emails.send({
      from: "Contact Form <contact@hiram.work>",
      to: "hiram@hiram.work",
      subject: subject || `New message from ${name}`,
      replyTo: email,
      text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
