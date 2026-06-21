"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Applications(){

  const [apps, setApps] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<{[key:string]:string}>({});

  async function load(){
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    setApps(data || []);
  }

  useEffect(()=>{
    load();
  },[]);

async function sendReply(app:any){

  const message = replyText[app.id];

  if(!message){
    alert("Write a reply first");
    return;
  }

  try {

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: app.email,
        name: app.name,
        message
      })
    });

    const data = await res.json();

    if(data.success){

      alert("Reply sent successfully");

      // clear input
      setReplyText({...replyText, [app.id]:""});

      // refresh list
      load();

    } else {
      alert(data.error || "Failed to send reply");
    }

  } catch (err:any){
    alert("Network error sending reply");
  }
}
    const data = await res.json();

    if(data.success){
      alert("Reply sent");
      setReplyText({...replyText, [app.id]:""});
    } else {
      alert(data.error || "Failed to send reply");
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-5">
        Student Applications
      </h1>

      {apps.map((a)=>(
        <div key={a.id} className="border p-4 mb-4 rounded">

          <p><b>Name:</b> {a.name}</p>
          <p><b>Email:</b> {a.email}</p>
          <p><b>Course:</b> {a.course}</p>
          <p><b>Message:</b> {a.message}</p>

          <textarea
            className="border w-full mt-3 p-2"
            placeholder="Write reply..."
            value={replyText[a.id] || ""}
            onChange={(e)=>
              setReplyText({
                ...replyText,
                [a.id]: e.target.value
              })
            }
          />

          <button
            onClick={()=>sendReply(a)}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Send Reply
          </button>

        </div>
      ))}

    </div>
  );
}
