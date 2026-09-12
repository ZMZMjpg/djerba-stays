"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import Button from "@/components/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/admin");
    } catch (err) {
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-djerba px-6">
      <div className="w-full max-w-sm rounded-lg bg-cream p-8 shadow-elevated">
        <p className="font-hand text-2xl text-djerba">Djerba Stays</p>
        <h1 className="mt-2 font-serif text-2xl text-ink">Admin sign in</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md border border-djerba/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-djerba/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
          />

          {error && <p className="text-sm text-terracotta">{error}</p>}

          <Button type="submit" variant="primary" className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}