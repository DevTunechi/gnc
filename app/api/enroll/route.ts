import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(req:Request){

const resend = new Resend(
process.env.RESEND_API_KEY
);


const data = await req.json();


await resend.emails.send({

from:
"GNC Training Institute <info@gnctraininginstitute.com>",

to:
"info@gnctraininginstitute.com",

subject:
"New GNC Student Enrollment",

text:
JSON.stringify(data,null,2)

});


return NextResponse.json({

success:true

});


}
