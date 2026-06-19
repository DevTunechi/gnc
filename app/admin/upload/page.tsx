"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadCertificate() {

const [message,setMessage] = useState("");

async function upload(e:any){

e.preventDefault();

const form = e.target;

const file = form.file.files[0];

const fileName = `${Date.now()}-${file.name}`;


const {error:uploadError}=await supabase.storage
.from("certificates")
.upload(fileName,file);


if(uploadError){

setMessage(uploadError.message);

return;

}


const {error}=await supabase
.from("certificates")
.insert({

student_name:form.name.value,

certificate_number:form.cert.value,

course:form.course.value,

date_issued:form.date.value,

file_url:fileName

});


if(error){

setMessage(error.message);

}else{

setMessage("Certificate uploaded successfully");

form.reset();

}

}


return (

<div className="p-6 max-w-xl mx-auto">

<h1 className="text-2xl font-bold mb-5">
GNC Certificate Upload
</h1>


<form onSubmit={upload} className="space-y-4">


<input name="name" placeholder="Student Name" required className="border p-3 w-full"/>


<input name="cert" placeholder="Certificate Number" required className="border p-3 w-full"/>


<input name="course" placeholder="Course" required className="border p-3 w-full"/>


<input name="date" type="date" required className="border p-3 w-full"/>


<input name="file" type="file" accept=".pdf,.png,.jpg,.jpeg" required/>


<button className="bg-red-600 text-white px-5 py-3 rounded">
Upload Certificate
</button>


</form>


<p className="mt-4">{message}</p>


</div>

)

}
