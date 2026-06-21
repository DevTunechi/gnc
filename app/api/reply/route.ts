import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request){

  try {

    const body = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const subject =
      body.subject?.trim() ||
      "Response from GNC Training Institute";

    const cc = body.cc?.trim();

    const emailPayload:any = {
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: body.email,
      subject,
      text: `Hello ${body.name}

${body.message}

Regards,
GNC Training Institute`
    };

    if (cc) {
      emailPayload.cc = cc;
    }

    const result = await resend.emails.send(emailPayload);

    await supabase
      .from("applications")
      .update({ status: "replied" })
      .eq("id", body.id);

    await supabase
      .from("sent_mails")
      .insert({
        name: body.name,
        email: body.email,
        message: body.message,
        subject,
        cc: cc || null
      });

    return NextResponse.json({
      success: true,
      result
    });

  } catch (err:any) {

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });

  }
}
