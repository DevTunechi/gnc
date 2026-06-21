"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Applications() {

  const [apps, setApps] = useState<any[]>([]);
  const [sent, setSent] = useState<any[]>([]);
  const [tab, setTab] = useState<"inbox" | "sent">("inbox");

  const [selected, setSelected] = useState<any>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  async function loadInbox() {
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    setApps(data || []);
  }

  async function loadSent() {
    const { data } = await supabase
      .from("sent_mails")
      .select("*")
      .order("created_at", { ascending: false });

    setSent(data || []);
  }

  useEffect(() => {
    loadInbox();
    loadSent();
  }, []);

  async function sendReply(app: any) {

    const message = replyText[app.id];
    const subject = replyText[`${app.id}_subject`];
    const cc = replyText[`${app.id}_cc`];

    if (!message) {
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
        message,
        subject,
        cc
      })
    });

    const data = await res.json();

    if (data.success) {

      alert("Reply sent successfully");

      setReplyText(prev => ({
        ...prev,
        [app.id]: "",
        [`${app.id}_subject`]: "",
        [`${app.id}_cc`]: ""
      }));

      loadInbox();
      loadSent();

      setSelected(null);

    } else {
      alert(data.error || "Failed to send reply");
    }
  }

  const inbox = apps;
  const filtered = tab === "inbox" ? inbox : sent;

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        GNC Mail Center
      </h1>

      {/* TABS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => {
            setTab("inbox");
            setSelected(null);
          }}
          className={`px-4 py-2 border rounded ${
            tab === "inbox" ? "bg-black text-white" : ""
          }`}
        >
          Inbox ({apps.length})
        </button>

        <button
          onClick={() => {
            setTab("sent");
            setSelected(null);
          }}
          className={`px-4 py-2 border rounded ${
            tab === "sent" ? "bg-black text-white" : ""
          }`}
        >
          Sent ({sent.length})
        </button>

      </div>

      <div className="flex gap-4">

        {/* LEFT PANEL (LIST) */}
        <div className="w-1/3 border rounded p-2 h-[75vh] overflow-y-auto">

          {filtered.map((a) => {

            const isReplied = a.status === "replied";

            return (
              <div
                key={a.id}
                onClick={() => setSelected(a)}
                className={`p-2 mb-2 border rounded cursor-pointer ${
                  selected?.id === a.id ? "bg-gray-200" : ""
                }`}
              >

                <p className={`font-medium ${
                  isReplied ? "text-gray-600" : "text-black"
                }`}>
                  {a.name}
                </p>

                <p className="text-xs text-gray-500">{a.email}</p>

                <span className={`text-xs px-2 py-1 rounded ${
                  isReplied
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {isReplied ? "replied" : "new"}
                </span>

              </div>
            );
          })}

        </div>

        {/* RIGHT PANEL (DETAIL VIEW) */}
        <div className="w-2/3 border rounded p-4 h-[75vh] overflow-y-auto">

          {!selected ? (
            <p className="text-gray-500">
              Select a student application to view details
            </p>
          ) : (
            <>
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-sm text-gray-600">{selected.email}</p>

              <div className="mt-4 space-y-1 text-sm border-t pt-3">

                <p><b>Course:</b> {selected.course || "N/A"}</p>
                <p><b>DOB:</b> {selected.dob || "N/A"}</p>
                <p><b>Address:</b> {selected.address || "N/A"}</p>
                <p><b>Phone:</b> {selected.phone || "N/A"}</p>

                <div className="mt-2">
                  <p className="font-semibold">Reason:</p>
                  <p>{selected.reason}</p>
                </div>

              </div>

              {/* REPLY BOX */}
              {selected.status !== "replied" && (
                <div className="mt-4 border-t pt-3">

                  <input
                    className="border w-full p-2 mb-2"
                    placeholder="Subject"
                    value={replyText[`${selected.id}_subject`] || ""}
                    onChange={(e) =>
                      setReplyText(prev => ({
                        ...prev,
                        [`${selected.id}_subject`]: e.target.value
                      }))
                    }
                  />

                  <input
                    className="border w-full p-2 mb-2"
                    placeholder="CC"
                    value={replyText[`${selected.id}_cc`] || ""}
                    onChange={(e) =>
                      setReplyText(prev => ({
                        ...prev,
                        [`${selected.id}_cc`]: e.target.value
                      }))
                    }
                  />

                  <textarea
                    className="border w-full p-2"
                    placeholder="Write reply..."
                    value={replyText[selected.id] || ""}
                    onChange={(e) =>
                      setReplyText(prev => ({
                        ...prev,
                        [selected.id]: e.target.value
                      }))
                    }
                  />

                  <button
                    onClick={() => sendReply(selected)}
                    className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
                  >
                    Send Reply
                  </button>

                </div>
              )}

            </>
          )}

        </div>

      </div>
    </div>
  );
}
