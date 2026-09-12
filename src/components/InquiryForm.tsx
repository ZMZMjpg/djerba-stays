"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/inquiries";
import Button from "./Button";

export default function InquiryForm({
  propertyId,
  propertyName,
}: {
  propertyId: string;
  propertyName: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitInquiry({
        propertyId,
        propertyName,
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests) || 1,
        message: form.message,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-djerba/10 bg-sand/50 p-8 text-center">
        <p className="font-serif text-xl text-ink">Message received.</p>
        <p className="mt-2 text-sm text-ink/60">
          We&apos;ll get back to you soon about {propertyName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="font-serif text-xl text-ink">Interested in this stay?</p>
        <p className="mt-1 text-sm text-ink/60">
          Tell us your dates and we&apos;ll get back to you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Full name"
          className="rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
        />
        <input
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="Phone / WhatsApp"
          className="rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
        />
      </div>

      <input
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="Email (optional)"
        className="w-full rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <input
          type="date"
          required
          value={form.checkIn}
          onChange={(e) => update("checkIn", e.target.value)}
          className="rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink focus:border-djerba/40 focus:outline-none"
        />
        <input
          type="date"
          required
          value={form.checkOut}
          onChange={(e) => update("checkOut", e.target.value)}
          className="rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink focus:border-djerba/40 focus:outline-none"
        />
        <input
          type="number"
          min={1}
          required
          value={form.guests}
          onChange={(e) => update("guests", e.target.value)}
          placeholder="Guests"
          className="rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
        />
      </div>

      <textarea
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        placeholder="Anything else we should know?"
        rows={4}
        className="w-full rounded-md border border-djerba/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-djerba/40 focus:outline-none"
      />

      {status === "error" && (
        <p className="text-sm text-terracotta">
          Your inquiry couldn&apos;t be sent. Please try again in a moment.
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send inquiry"}
      </Button>
    </form>
  );
}