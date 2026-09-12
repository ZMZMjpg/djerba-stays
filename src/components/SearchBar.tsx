"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BedDouble, Waves, Search } from "lucide-react";

const bedroomOptions = [
  { value: "", label: "Any size" },
  { value: "1", label: "S+1" },
  { value: "2", label: "S+2" },
  { value: "3", label: "S+3" },
  { value: "4", label: "S+4 and up" },
];

const poolOptions = [
  { value: "", label: "Pool: any" },
  { value: "yes", label: "With pool" },
  { value: "no", label: "No pool" },
];

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [pool, setPool] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn) params.set("checkIn", checkIn);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (pool) params.set("pool", pool);
    router.push(`/stays?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg bg-cream p-4 shadow-elevated md:flex-row md:flex-wrap md:items-center md:gap-0 md:divide-x md:divide-djerba/10 md:p-2"
    >
      <div className="flex flex-1 items-center gap-2.5 px-3 py-2 md:min-w-[180px]">
        <MapPin size={18} className="shrink-0 text-djerba/60" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where in Djerba?"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <div className="flex flex-1 items-center gap-2.5 px-3 py-2 md:min-w-[160px]">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-transparent text-sm text-ink focus:outline-none"
        />
      </div>

      <div className="flex flex-1 items-center gap-2.5 px-3 py-2 md:min-w-[150px]">
        <BedDouble size={18} className="shrink-0 text-djerba/60" />
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full bg-transparent text-sm text-ink focus:outline-none"
        >
          {bedroomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 items-center gap-2.5 px-3 py-2 md:min-w-[140px]">
        <Waves size={18} className="shrink-0 text-djerba/60" />
        <select
          value={pool}
          onChange={(e) => setPool(e.target.value)}
          className="w-full bg-transparent text-sm text-ink focus:outline-none"
        >
          {poolOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-md bg-djerba px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-djerba-dark md:ml-2"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}