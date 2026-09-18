"use client";

import { useEffect, useState } from "react";
import { getAllInquiries, setInquiryStatus } from "@/lib/admin-inquiries";
import type { Inquiry, InquiryStatus } from "@/lib/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const statusOptions: InquiryStatus[] = ["new", "read", "replied", "archived"];

const statusStyles: Record<InquiryStatus, string> = {
  new: "bg-sun/25 text-ink",
  read: "bg-sea/20 text-djerba",
  replied: "bg-djerba/10 text-djerba",
  archived: "bg-black/5 text-ink/50",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await getAllInquiries();
    setInquiries(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: InquiryStatus) {
    await setInquiryStatus(id, status);
    load();
  }

  async function openInquiry(inquiry: Inquiry) {
    setOpenId(openId === inquiry.id ? null : inquiry.id);
    if (inquiry.status === "new") {
      await updateStatus(inquiry.id, "read");
    }
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Messages</h1>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-ink/50">Loading inquiries...</p>}
        {!loading && inquiries.length === 0 && <p className="text-sm text-ink/50">No inquiries yet.</p>}

        {inquiries.map((inquiry) => {
          const isOpen = openId === inquiry.id;
          const whatsappLink = buildWhatsAppLink({
            propertyName: inquiry.propertyName,
            checkIn: inquiry.checkIn,
            checkOut: inquiry.checkOut,
            guests: inquiry.guests,
          });

          const cardClasses = "overflow-hidden rounded-lg border border-black/10 bg-white";
          const rowClasses = "flex w-full items-center justify-between gap-4 px-5 py-4 text-left";
          const badgeClasses = "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium " + statusStyles[inquiry.status];
          const linkClasses = "flex items-center gap-2 rounded-md border border-djerba/20 px-4 py-2 text-xs font-medium text-djerba hover:bg-djerba/5";
          const selectClasses = "rounded-md border border-black/15 px-3 py-2 text-xs";

          return (
            <div key={inquiry.id} className={cardClasses}>
              <button onClick={() => openInquiry(inquiry)} className={rowClasses}>
                <div>
                  <p className="font-medium text-ink">{inquiry.name}</p>
                  <p className="text-sm text-ink/60">{inquiry.propertyName}</p>
                </div>
                <span className={badgeClasses}>{inquiry.status}</span>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 px-5 py-4 text-sm">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p><span className="text-ink/50">Phone: </span>{inquiry.phone}</p>
                    {inquiry.email && <p><span className="text-ink/50">Email: </span>{inquiry.email}</p>}
                    <p><span className="text-ink/50">Check-in: </span>{inquiry.checkIn}</p>
                    <p><span className="text-ink/50">Check-out: </span>{inquiry.checkOut}</p>
                    <p><span className="text-ink/50">Guests: </span>{inquiry.guests}</p>
                  </div>

                  {inquiry.message && <p className="mt-3 text-ink/80">{inquiry.message}</p>}

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                      <MessageCircle size={14} />
                      Reply on WhatsApp
                    </a>

                    <select value={inquiry.status} onChange={(e) => updateStatus(inquiry.id, e.target.value as InquiryStatus)} className={selectClasses}>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}