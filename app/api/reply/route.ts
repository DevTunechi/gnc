import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request){

  const body = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    from: "GNC Training Institute <info@gnctraininginstitute.com>",
    to: body.email,
    subject: "Response to your GNC Application",
    text: `Hello ${body.name}

${body.message}

GNC Training Institute`
  });

  return NextResponse.json({ success: true, result });
}
