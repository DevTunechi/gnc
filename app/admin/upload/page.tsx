"use client";

import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";


export default function UploadCertificate(){


const [message,setMessage]=useState("");
const [certificates,setCertificates]=useState<any[]>([]);



async function loadCertificates(){

const {data}=await supabase
.from("certificates")
.select("*")
.order("created_at",{ascending:false});


setCertificates(data || []);

}



useEffect(()=>{

loadCertificates();

},[]);




async function upload(e:any){

e.preventDefault();


const form=e.target;

const file=form.file.files[0];


if(!file){

setMessage("Select certificate file");
return;

}



const fileName=`${Date.now()}-${file.name}`;



const {error:uploadError}=await supabase.storage
.from("certificates")
.upload(fileName,file);



if(uploadError){

setMessage(uploadError.message);
return;

}




const {data:urlData}=supabase.storage
.from("certificates")
.getPublicUrl(fileName);



const {error}=await supabase
.from("certificates")
.insert({

student_name:form.name.value,

certificate_number:form.cert.value,

course:form.course.value,

date_issued:form.date.value,

file_url:urlData.publicUrl

});



if(error){

setMessage(error.message);

}else{

setMessage("Certificate uploaded");

form.reset();

loadCertificates();

}


}





async function deleteCertificate(cert:any){


const confirmDelete=confirm(
"Delete this certificate?"
);


if(!confirmDelete)return;



const filePath=cert.file_url.split("/certificates/")[1];



await supabase.storage
.from("certificates")
.remove([filePath]);



await supabase
.from("certificates")
.delete()
.eq("id",cert.id);



setMessage("Certificate deleted");


loadCertificates();


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



<input

name="file"

type="file"

accept=".pdf,.png,.jpg,.jpeg"

required

/>



<button

className="bg-red-600 text-white px-5 py-3 rounded"

>
Upload Certificate
</button>



</form>



<p className="mt-4">
{message}
</p>




<h2 className="text-xl font-bold mt-8">
Uploaded Certificates
</h2>



{certificates.map(cert=>(


<div

key={cert.id}

className="border p-4 mt-3 rounded"

>


<p>
<b>{cert.student_name}</b>
</p>

<p>
{cert.certificate_number}
</p>


<div className="flex gap-3 mt-3">


<a

href={cert.file_url}

target="_blank"

className="bg-blue-600 text-white px-3 py-2 rounded"

>
View
</a>



<button

onClick={()=>deleteCertificate(cert)}

className="bg-red-600 text-white px-3 py-2 rounded"

>
Delete
</button>



</div>


</div>


))}



</div>


)


}
