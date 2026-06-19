"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Verify(){

const [search,setSearch] = useState("");
const [result,setResult] = useState<any>(null);
const [message,setMessage] = useState("");
const [viewLink,setViewLink] = useState("");

async function verify(){

setMessage("");
setResult(null);
setViewLink("");


const {data,error}=await supabase
.from("certificates")
.select("*")
.or(`student_name.ilike.%${search}%,certificate_number.ilike.%${search}%`)
.single();


if(error){

setMessage("Certificate not found");

return;

}


setResult(data);

}


async function viewCertificate(){

if(!result?.file_url) return;


const filePath = result.file_url.split("/certificates/")[1];


const {data,error}=await supabase.storage
.from("certificates")
.createSignedUrl(filePath,60);


if(error){

setMessage("Unable to open certificate");

return;

}


if(data?.signedUrl){

setViewLink(data.signedUrl);

window.open(data.signedUrl,"_blank");

}

}


return (

<div className="p-6 max-w-xl mx-auto">

<h1 className="text-3xl font-bold mb-6">
Verify Certificate
</h1>


<input
className="border p-3 w-full mb-4"
placeholder="Enter student name or certificate number"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


<button
onClick={verify}
className="bg-red-600 text-white px-5 py-3 rounded"
>
Search
</button>


<p className="mt-4 text-red-600">
{message}
</p>


{result && (

<div className="mt-6 border p-5 rounded">

<h2 className="font-bold text-xl">
Certificate Verified
</h2>


<p>Name: {result.student_name}</p>

<p>Course: {result.course}</p>

<p>Certificate No: {result.certificate_number}</p>

<p>Date Issued: {result.date_issued}</p>


<button
onClick={viewCertificate}
className="text-blue-600 underline mt-3"
>
View Certificate
</button>


</div>

)}


</div>

)

}
