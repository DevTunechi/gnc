import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request){

  try {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await req.json();

    // save application
    await supabase.from("applications").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: data.course,
      message: data.reason
    });

    // notify admin
    await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: "New Student Application",
      text: `
New Application Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Course: ${data.course}

Message:
${data.reason}
      `
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );

  }
}
