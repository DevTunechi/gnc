"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadCertificate() {

const [message,setMessage] = useState("");

async function upload(e:any){

e.preventDefault();

const form = e.target;


const certificateFile = form.certificate.files[0];
const statementFile = form.statement.files[0];


const certificateName = `certificates/${Date.now()}-${certificateFile.name}`;

const statementName = `statements/${Date.now()}-${statementFile.name}`;



const {error:certError}=await supabase.storage
.from("gnc-documents")
.upload(certificateName,certificateFile);


if(certError){

setMessage(certError.message);
return;

}



const {error:statementError}=await supabase.storage
.from("gnc-documents")
.upload(statementName,statementFile);


if(statementError){

setMessage(statementError.message);
return;

}



const certificateUrl = supabase.storage
.from("gnc-documents")
.getPublicUrl(certificateName)
.data.publicUrl;



const statementUrl = supabase.storage
.from("gnc-documents")
.getPublicUrl(statementName)
.data.publicUrl;




const {error}=await supabase
.from("certificates")
.insert({

student_name:form.name.value,

certificate_number:form.cert.value,

course:form.course.value,

date_issued:form.date.value,

file_url:certificateUrl,

statement_url:statementUrl

});



if(error){

setMessage(error.message);

}else{

setMessage("Certificate and Statement uploaded successfully");

form.reset();

}

}



return (

<div className="p-6 max-w-xl mx-auto">


<h1 className="text-2xl font-bold mb-5">
GNC Certificate Upload
</h1>


<form onSubmit={upload} className="space-y-4">


<input
name="name"
placeholder="Student Name"
required
className="border p-3 w-full"
/>


<input
name="cert"
placeholder="Certificate Number"
required
className="border p-3 w-full"
/>


<input
name="course"
placeholder="Course"
required
className="border p-3 w-full"
/>


<input
name="date"
type="date"
required
className="border p-3 w-full"
/>


<label>
Certificate File
</label>

<input
name="certificate"
type="file"
accept=".pdf,.png,.jpg,.jpeg"
required
/>



<label>
Statement of Result
</label>

<input
name="statement"
type="file"
accept=".pdf,.png,.jpg,.jpeg"
required
/>



<button
className="bg-red-600 text-white px-5 py-3 rounded"
>
Upload Documents
</button>


</form>


<p className="mt-4">
{message}
</p>


</div>

)

}
