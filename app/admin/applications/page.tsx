"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Applications(){

  const [apps, setApps] = useState<any[]>([]);
  const [sent, setSent] = useState<any[]>([]);
  const [tab, setTab] = useState<"inbox" | "sent">("inbox");
  const [replyText, setReplyText] = useState<{[key:string]:string}>({});

  async function loadInbox(){
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    setApps(data || []);
  }

  async function loadSent(){
    const { data } = await supabase
      .from("sent_mails")
      .select("*")
      .order("created_at", { ascending: false });

    setSent(data || []);
  }

  useEffect(()=>{
    loadInbox();
    loadSent();
  },[]);

  async function sendReply(app:any){

    const message = replyText[app.id];

    if(!message){
      alert("Write a reply first");
      return;
    }

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
      alert("Reply sent successfully");

      setReplyText(prev => ({
        ...prev,
        [app.id]: ""
      }));

      loadInbox();
      loadSent();
    } else {
      alert(data.error || "Failed");
    }
  }

  const inbox = apps;
  const filtered = tab === "inbox" ? inbox : sent;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        GNC Mail Center
      </h1>

      {/* TABS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={()=>setTab("inbox")}
          className={`px-4 py-2 border rounded ${
            tab==="inbox" ? "bg-black text-white" : ""
          }`}
        >
          Inbox ({apps.length})
        </button>

        <button
          onClick={()=>setTab("sent")}
          className={`px-4 py-2 border rounded ${
            tab==="sent" ? "bg-black text-white" : ""
          }`}
        >
          Sent ({sent.length})
        </button>

      </div>

      {/* LIST */}
      {filtered.map((a)=>{

        const isReplied = a.status === "replied";

        return (
          <div key={a.id} className="border p-4 mb-4 rounded">

            {/* HEADER */}
            <div className="flex justify-between items-center">

              <p className={`text-lg ${
                isReplied ? "font-normal" : "font-bold"
              }`}>
                {a.name}
              </p>

              {tab === "inbox" && (
                <span className={`text-xs px-2 py-1 rounded ${
                  isReplied
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {isReplied ? "replied" : "new"}
                </span>
              )}

            </div>

            <p className="text-sm text-gray-600">{a.email}</p>

            <p className={`mt-2 ${
              isReplied ? "text-gray-600" : "text-black font-medium"
            }`}>
              {a.message}
            </p>

            {/* REPLY ONLY IN INBOX */}
            {tab === "inbox" && !isReplied && (
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
        );
      })}

    </div>
  );
}
