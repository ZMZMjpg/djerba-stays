"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, MessageSquare, LogOut, Palette, Compass } from "lucide-react";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Houses", icon: Home },
  { href: "/admin/inquiries", label: "Messages", icon: MessageSquare },
  { href: "/admin/homepage", label: "Homepage", icon: Palette },
  { href: "/admin/explore", label: "Explore Djerba", icon: Compass },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-black/10 bg-white">
      <div className="px-6 py-6">
        <p className="font-hand text-xl text-djerba">Djerba Stays</p>
        <p className="text-xs text-ink/50">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className={"flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors " + (active ? "bg-djerba text-cream" : "text-ink/70 hover:bg-sand")}>
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button type="button" onClick={handleSignOut} className="mx-3 mb-6 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-ink/60 hover:bg-sand">
        <LogOut size={17} />
        Sign out
      </button>
    </aside>
  );
}