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
    await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: body.email,
      subject: body.subject || "Reply from GNC",
      cc: body.cc || undefined,
      text: body.message
    });

    // 2. SAVE SENT MAIL (MATCHES YOUR CURRENT TABLE)
    const { error } = await supabase
      .from("sent_mails")
      .insert({
        name: body.name,
        email: body.email,
        message: body.message
      });

    if (error) {
      console.log("SENT MAIL ERROR:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // 3. UPDATE APPLICATION STATUS
    await supabase
      .from("applications")
      .update({ status: "replied" })
      .eq("id", body.id);

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
