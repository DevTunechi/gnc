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

    // 🔴 VALIDATION (prevents empty records)
    if (!data.name || !data.email || !data.reason) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields"
      }, { status: 400 });
    }

    // 🔴 INSERT FULL APPLICATION
    const { data: inserted, error } = await supabase
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
      .select()
      .single();

    if (error) {
      console.log("❌ SUPABASE ERROR:", error);

      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    console.log("✅ SAVED TO DB:", inserted);

    // 🔴 EMAIL (clean + structured)
    const emailResult = await resend.emails.send({
      from: "GNC Training Institute <info@gnctraininginstitute.com>",
      to: "info@gnctraininginstitute.com",
      subject: `New Application - ${data.name}`,
      text: `
==============================
NEW APPLICATION RECEIVED
==============================

Name: ${data.name}
DOB: ${data.dob || "N/A"}
Address: ${data.address || "N/A"}
Phone: ${data.phone || "N/A"}
Email: ${data.email}
Course: ${data.course || "N/A"}

------------------------------
Reason:
${data.reason}
------------------------------
      `
    });

    console.log("📧 EMAIL SENT:", emailResult);

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
