import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request){

  try {

    const data = await req.json();

    console.log("📩 Incoming payload:", data);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 🧠 STEP 1: VALIDATION CHECK (IMPORTANT)
    if (!data.name || !data.email || !data.reason) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields"
      }, { status: 400 });
    }

    // 🧠 STEP 2: DATABASE INSERT (WITH FULL LOGGING)
    const { data: inserted, error: dbError } = await supabase
      .from("applications")
      .insert({
        name: data.name,
        dob: data.dob || null,
        address: data.address || null,
        phone: data.phone || null,
        email: data.email,
        course: data.course || null,
        reason: data.reason,
        status: "new"
      })
      .select(); // IMPORTANT: ensures row returns

    if (dbError) {
      console.log("❌ DB ERROR:", dbError);

      return NextResponse.json({
        success: false,
        error: dbError.message
      }, { status: 500 });
    }

    console.log("✅ INSERTED ROW:", inserted);

    // 🧠 STEP 3: EMAIL
    const emailResult = await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: `New Application - ${data.name}`,
      text: `
NEW APPLICATION RECEIVED

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

    console.log("📨 EMAIL RESULT:", emailResult);

    return NextResponse.json({
      success: true,
      inserted
    });

  } catch (err:any) {

    console.log("🔥 SERVER CRASH:", err);

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });

  }
}
