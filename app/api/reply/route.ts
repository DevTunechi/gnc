import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request){

  try {

    const body = await req.json();

    console.log("REPLY PAYLOAD:", body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. SEND EMAIL
    const emailResult = await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: body.email,
      subject: "Response from GNC Training Institute",
      text: `Hello ${body.name}

${body.message}

Regards,
GNC Training Institute`
    });

    console.log("EMAIL RESULT:", emailResult);

    // 2. UPDATE APPLICATION
    const updateResult = await supabase
      .from("applications")
      .update({ status: "replied" })
      .eq("id", body.id);

    console.log("UPDATE RESULT:", updateResult);

    // 3. INSERT SENT MAIL
    const insertResult = await supabase
      .from("sent_mails")
      .insert({
        name: body.name,
        email: body.email,
        message: body.message
      });

    console.log("INSERT RESULT:", insertResult);

    return NextResponse.json({
      success: true,
      emailResult,
      updateResult,
      insertResult
    });

  } catch (err:any) {

    console.log("REPLY ERROR:", err);

    return NextResponse.json({
      success:false,
      error: err.message
    }, { status:500 });

  }
}
