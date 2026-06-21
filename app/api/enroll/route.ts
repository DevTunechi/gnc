import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request){

  try {

    const data = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. SAVE TO DATABASE (IMPORTANT)
    const { error: dbError } = await supabase
      .from("applications")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        message: data.reason
      });

    if (dbError) {
      console.log("DB ERROR:", dbError);
      return NextResponse.json({
        success: false,
        error: dbError.message
      }, { status: 500 });
    }

    // 2. SEND EMAIL
    await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: "New Student Application",
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Course: ${data.course}
Message: ${data.reason}
      `
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {

    console.log("SERVER ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });

  }
}
