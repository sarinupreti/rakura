import { NextResponse } from "next/server";
import { Resend } from "resend";

// Set RESEND_API_KEY in your environment (Vercel dashboard / .env.local)
// Get a free key at https://resend.com — takes 2 minutes
const RECIPIENT = "rakura.thailand@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, productInterest } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      productInterest?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);

      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0f0e0c; padding: 24px 32px; margin-bottom: 0;">
            <h1 style="color: #c9a52a; font-size: 18px; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">
              Rakura — New Enquiry
            </h1>
          </div>
          <div style="border: 1px solid #e7e5e4; border-top: none; padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; width: 40%; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px;"><a href="mailto:${email}" style="color: #c9a52a;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Phone / Line</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px;">${phone}</td>
              </tr>` : ""}
              ${productInterest ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Product Interest</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px;">${productInterest}</td>
              </tr>` : ""}
              ${message ? `<tr>
                <td style="padding: 10px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</td>
              </tr>` : ""}
            </table>
          </div>
          <div style="padding: 16px 32px; background: #fafaf9; border: 1px solid #e7e5e4; border-top: none; font-size: 11px; color: #a8a29e;">
            Sent via rakura.com contact form
          </div>
        </div>
      `;

      const { error } = await resend.emails.send({
        // Use a verified domain address in production.
        // For testing with Resend free tier, "onboarding@resend.dev" works.
        from: "Rakura Website <onboarding@resend.dev>",
        to: [RECIPIENT],
        replyTo: email,
        subject: `New Enquiry from ${name}${productInterest ? ` — ${productInterest.slice(0, 40)}` : ""}`,
        html,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Email failed" }, { status: 502 });
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: Formspree
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId) {
      const res = await fetch("https://formspree.io/f/" + formspreeId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, productInterest }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Form submission failed" }, { status: 502 });
      }
      return NextResponse.json({ success: true });
    }

    // Dev fallback: log to console and return success
    console.log("📧 Contact form submission (no email provider configured):", {
      name, email, phone, message, productInterest,
    });
    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
