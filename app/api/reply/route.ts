import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. SEND EMAIL
    const emailResult = await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: body.email,
      subject: body.subject || "Response from GNC Training Institute",
      cc: body.cc || undefined,
      text: body.message
    });

    // 2. SAVE TO SENT MAILS TABLE
    const { error: sentError } = await supabase
      .from("sent_mails")
      .insert({
        application_id: body.id,
        name: body.name,
        email: body.email,
        subject: body.subject,
        cc: body.cc,
        message: body.message
      });

    if (sentError) {
      console.log("SENT MAIL SAVE ERROR:", sentError);
    }

    // 3. UPDATE APPLICATION STATUS
    await supabase
      .from("applications")
      .update({
        status: "replied"
      })
      .eq("id", body.id);

    return NextResponse.json({
      success: true,
      emailResult
    });

  } catch (err: any) {

    console.log("REPLY ERROR:", err);

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });

  }
}
