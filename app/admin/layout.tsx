"use client";

import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gnc_admin_auth");
    if(saved === "true") setAuth(true);
  }, []);

  function login(){

    if(username === "admin" && password === "gnc1234"){
      localStorage.setItem("gnc_admin_auth", "true");
      setAuth(true);
    } else {
      alert("Invalid login");
    }

  }

  function logout(){
    localStorage.removeItem("gnc_admin_auth");
    setAuth(false);
  }

  if(!auth){
    return (
      <div className="p-10 max-w-md mx-auto">

        <h1 className="text-xl font-bold mb-4">GNC Admin Login</h1>

        <input
          className="border p-3 w-full mb-2"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-black text-white px-5 py-2 mt-3 w-full"
        >
          Login
        </button>

      </div>
    );
  }

  return (
    <div>

      <div className="p-3 flex justify-end border-b">
        <button
          onClick={logout}
          className="text-sm text-red-600"
        >
          Logout
        </button>
      </div>

      {children}
    </div>
  );
}
