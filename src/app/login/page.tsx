"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import logo from "../../../assets/logo.png";
import useAuth from "@/store/authStore";

const inputClass =
  "h-11 w-full rounded-lg border border-gray-700 bg-[#000000] px-3 text-sm text-white placeholder-gray-500 focus:border-[var(--primary-color)] focus:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const token = useAuth((state) => state.token);
  const setToken = useAuth((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in: skip the form
  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/admin/login`,
        { email, password }
      );
      setToken(res.data.token);
      router.replace("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && !err.response) {
        setError("Can't reach the server. Check your connection and try again.");
      } else {
        // 400 / 401 / 500 all come back as { message } from the backend
        const message = axios.isAxiosError(err) ? err.response?.data?.message : null;
        setError(message || "Could not log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#000000] px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-gray-800 bg-[#0b121a] p-8"
      >
        <div className="flex flex-col items-center gap-2">
          <Image src={logo} alt="Homes and Land Goa" width={120} />
          <h1 className="text-xl font-semibold">Admin Login</h1>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm text-gray-300">
            Email
          </label>
          <input
            id="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full cursor-pointer rounded-lg bg-[var(--primary-color)] font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
