import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {

  try {

    const data = await req.json();

    console.log("🔥 ENROLL API CALLED:", data);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 🔴 STEP 1: INSERT INTO DB (CRITICAL)
    const { data: inserted, error } = await supabase
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
      })
      .select("*");

    if (error) {
      console.log("❌ SUPABASE ERROR:", error);

      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    console.log("✅ SAVED TO DB:", inserted);

    // 🔴 STEP 2: EMAIL
    await resend.emails.send({
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

    return NextResponse.json({
      success: true,
      inserted
    });

  } catch (err: any) {

    console.log("🔥 SERVER ERROR:", err);

    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
