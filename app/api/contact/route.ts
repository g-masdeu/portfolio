export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const EMAIL_FROM = process.env.EMAIL_FROM!;
const EMAIL_TO = process.env.EMAIL_TO!;
const MAX_MESSAGE_LENGTH = parseInt(process.env.MAX_MESSAGE_LENGTH || "5000", 10);

type Payload = { name: string; email: string; message: string };

function isEmail(str: string) {
  return /^\S+@\S+\.\S+$/.test(str);
}

function clamp(str: string, max = MAX_MESSAGE_LENGTH) {
  return str.length > max ? str.slice(0, max) : str;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = clamp((body.message ?? "").trim());

    // Validación mínima
    if (!name || name.length < 2 || name.length > 100)
      return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });

    if (!isEmail(email))
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });

    if (!message || message.length < 10)
      return NextResponse.json({ ok: false, error: "Message too short" }, { status: 400 });

    const subject = `New message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
        <h2 style="margin:0 0 12px">New message from ${escapeHtml(name)}</h2>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>`;

    // Enviar correo
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[CONTACT_API_ERROR]", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// Evita inyección de HTML
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
