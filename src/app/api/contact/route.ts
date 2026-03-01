import { NextResponse } from "next/server";

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

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId) {
      const res = await fetch("https://formspree.io/f/" + formspreeId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "",
          message: message || "",
          productInterest: productInterest || "",
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Form submission failed" }, { status: 502 });
      }
      return NextResponse.json({ success: true });
    }

    // No Formspree: log and return success (you can add email sending later)
    console.log("Contact form submission:", { name, email, phone, message, productInterest });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
