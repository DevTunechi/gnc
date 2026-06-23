"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadCertificate() {

  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function upload(e:any){

    e.preventDefault();

    const form = e.target;
    const file = form.file.files[0];


    if(!file){
      setMessage("Please select a certificate file");
      return;
    }


    const fileNameUpload = `${Date.now()}-${file.name}`;


    // Upload file
    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(fileNameUpload, file);


    if(uploadError){

      setMessage(uploadError.message);
      return;

    }


    const { data:urlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileNameUpload);


    const fileUrl = urlData.publicUrl;



    const { error } = await supabase
      .from("certificates")
      .insert({

        student_name: form.name.value,
        certificate_number: form.cert.value,
        course: form.course.value,
        date_issued: form.date.value,
        file_url:fileUrl

      });



    if(error){

      setMessage(error.message);

    }else{

      setMessage("Certificate uploaded successfully");

      form.reset();
      setFileName("");

    }

  }



  return (

    <div className="p-6 max-w-xl mx-auto">


      <h1 className="text-2xl font-bold mb-5">
        GNC Certificate Upload
      </h1>



      <form
      onSubmit={upload}
      className="space-y-4"
      >


      <input
      name="name"
      placeholder="Student Name"
      required
      className="border p-3 w-full rounded"
      />


      <input
      name="cert"
      placeholder="Certificate Number"
      required
      className="border p-3 w-full rounded"
      />


      <input
      name="course"
      placeholder="Course"
      required
      className="border p-3 w-full rounded"
      />


      <input
      name="date"
      type="date"
      required
      className="border p-3 w-full rounded"
      />


      <label className="block">

        <span className="block mb-2 font-medium">
          Certificate PDF/Image
        </span>


        <input
        name="file"
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        required
        className="hidden"
        id="certificateFile"

        onChange={(e)=>
          setFileName(
            e.target.files?.[0]?.name || ""
          )
        }

        />


        <label
        htmlFor="certificateFile"
        className="inline-block cursor-pointer bg-blue-950 text-white px-5 py-3 rounded"
        >
          Select Certificate File
        </label>


        {fileName && (

          <p className="mt-2 text-sm text-gray-600">
            Selected: {fileName}
          </p>

        )}


      </label>



      <button
      className="bg-red-600 text-white px-5 py-3 rounded w-full"
      >
        Upload Certificate
      </button>


      </form>



      <p className="mt-4">
        {message}
      </p>


    </div>

  );

}
