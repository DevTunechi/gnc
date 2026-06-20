"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Verify(){

const [search,setSearch] = useState("");
const [result,setResult] = useState<any>(null);
const [message,setMessage] = useState("");


async function verify(){

setMessage("");
setResult(null);


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



<a

href={result.file_url}

target="_blank"

className="text-blue-600 underline block mt-4"

>
View Certificate
</a>



<a

href={result.statement_url}

target="_blank"

className="text-blue-600 underline block mt-3"

>
View Statement of Result
</a>



</div>

)}



</div>

)

}
