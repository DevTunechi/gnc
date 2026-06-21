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

    // 1. SAVE FULL APPLICATION TO DATABASE
    const { error: dbError } = await supabase
      .from("applications")
      .insert({
        name: data.name,
        dob: data.dob,
        address: data.address,
        phone: data.phone,
        email: data.email,
        course: data.course,
        reason: data.reason,
        status: "new"
      });

    if (dbError) {
      return NextResponse.json({
        success: false,
        error: dbError.message
      }, { status: 500 });
    }

    // 2. SEND EMAIL WITH FULL DETAILS
    await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: `New Application: ${data.name}`,
      text: `
==============================
NEW STUDENT APPLICATION
==============================

Full Name: ${data.name}
Date of Birth: ${data.dob}
Address: ${data.address}
Phone: ${data.phone}
Email: ${data.email}
Course: ${data.course}

------------------------------
Reason for Application:
${data.reason}
------------------------------
      `
    });

    return NextResponse.json({
      success: true
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });

  }
}
