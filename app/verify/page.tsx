"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Verify(){

  const [search,setSearch] = useState("");
  const [result,setResult] = useState<any[]>([]);
  const [message,setMessage] = useState("");


  async function verify(){

    setMessage("");
    setResult([]);


    if(!search.trim()){
      setMessage("Enter name or certificate number");
      return;
    }


    const { data,error } = await supabase
      .from("certificates")
      .select("*")
      .or(
        `student_name.ilike.%${search}%,certificate_number.ilike.%${search}%`
      );


    if(error || !data || data.length === 0){

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

placeholder="Search student name or certificate number"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<button

onClick={verify}

className="bg-red-600 text-white px-5 py-3 rounded"

>
Search Certificate
</button>



<p className="mt-4 text-red-600">
{message}
</p>



{result.map((certificate)=>(


<div
key={certificate.id}
className="mt-6 border p-5 rounded"
>


<h2 className="font-bold text-xl">
Certificate Verified
</h2>



<p>Name: {certificate.student_name}</p>

<p>Course: {certificate.course}</p>

<p>
Certificate No: {certificate.certificate_number}
</p>

<p>
Date Issued: {certificate.date_issued}
</p>



<a

href={certificate.file_url}

target="_blank"

className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded"

>
View Certificate
</a>



</div>


))}



</div>

)

}
