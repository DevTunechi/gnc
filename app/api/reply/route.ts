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

    // send email
    const result = await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: body.email,
      subject: "Response from GNC Training Institute",
      text: `Hello ${body.name}

${body.message}

Regards,
GNC Training Institute`
    });

    // mark as replied
    await supabase
      .from("applications")
      .update({ status: "replied" })
      .eq("id", body.id);

    return NextResponse.json({
      success: true,
      result
    });

  } catch (err:any) {

    return NextResponse.json({
      success:false,
      error: err.message
    }, { status:500 });

  }
}
