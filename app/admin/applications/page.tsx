"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Applications(){

  const [apps, setApps] = useState<any[]>([]);
  const [tab, setTab] = useState("inbox");
  const [replyText, setReplyText] = useState<{[key:string]:string}>({});

  async function load(){
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    setApps(data || []);
  }

  useEffect(()=>{ load(); },[]);

  const filtered = apps.filter(a =>
    tab === "inbox" ? a.status !== "replied" : a.status === "replied"
  );

  async function sendReply(app:any){

    const message = replyText[app.id];

    if(!message) return alert("Write a reply first");

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: app.id,
        email: app.email,
        name: app.name,
        message
      })
    });

    const data = await res.json();

    if(data.success){
      alert("Reply sent");
      setReplyText(prev => ({ ...prev, [app.id]: "" }));
      load();
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        GNC Mail Center
      </h1>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={()=>setTab("inbox")}
          className={`px-4 py-2 border rounded ${tab==="inbox" ? "bg-black text-white" : ""}`}
        >
          Inbox
        </button>

        <button
          onClick={()=>setTab("sent")}
          className={`px-4 py-2 border rounded ${tab==="sent" ? "bg-black text-white" : ""}`}
        >
          Sent
        </button>
      </div>

      {/* LIST */}
      {filtered.map((a)=>(
        <div key={a.id} className="border p-4 mb-4 rounded">

          <div className="flex justify-between">
            <p className="font-bold">{a.name}</p>
            <span className={`text-xs px-2 py-1 rounded ${
              a.status === "replied"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {a.status || "new"}
            </span>
          </div>

          <p className="text-sm">{a.email}</p>
          <p className="mt-2">{a.message}</p>

          {tab === "inbox" && (
            <>
              <textarea
                className="border w-full mt-3 p-2"
                placeholder="Write reply..."
                value={replyText[a.id] || ""}
                onChange={(e)=>
                  setReplyText(prev => ({
                    ...prev,
                    [a.id]: e.target.value
                  }))
                }
              />

              <button
                onClick={()=>sendReply(a)}
                className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
              >
                Send Reply
              </button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}
