import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { getResend } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(2000),
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

    const { name, email, message } = result.data;

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

    const resend = getResend();
    await resend.emails.send({
      from: "Contact Form <contact@hiram.work>",
      to: "hiram@hiram.work",
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
