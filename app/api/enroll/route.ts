import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {

    const data = await req.json();

    console.log("🔥 API HIT:", data);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await supabase.from("applications").insert({
      name: data.name,
      dob: data.dob,
      address: data.address,
      phone: data.phone,
      email: data.email,
      course: data.course,
      reason: data.reason,
      status: "new"
    });

    if (error) {
      console.log("DB ERROR:", error);

      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: `New Application - ${data.name}`,
      text: `
Name: ${data.name}
DOB: ${data.dob}
Address: ${data.address}
Phone: ${data.phone}
Email: ${data.email}
Course: ${data.course}

Reason:
${data.reason}
      `
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.log("SERVER ERROR:", err);

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
