"use client";
import { useState } from "react";
import { api } from "../../services/api";
import { setToken } from "../../utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await api("/auth/login", "POST", { email, password });
    setToken(res.token);
    router.push("/matches");
  };

  return (
    <div className="p-10">
      <h1>Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
