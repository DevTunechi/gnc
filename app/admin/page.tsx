"use client";

import Link from "next/link";

export default function AdminHome(){

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-5">
        GNC Admin Dashboard
      </h1>

      <div className="space-y-3">

        <Link className="block border p-4 rounded" href="/admin/applications">
          📩 Student Applications
        </Link>

        <Link className="block border p-4 rounded" href="/admin/upload">
          📜 Upload Certificates
        </Link>

      </div>

    </div>
  );
}
