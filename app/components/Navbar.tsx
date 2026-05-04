"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg orange-gradient flex items-center justify-center text-white font-black text-sm">H</span>
            <span className="text-lg font-bold text-[#0f172a]">Hiray <span className="text-[#0C4693]">Finance</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link href="/deals" className="text-sm text-slate-600 hover:text-[#0C4693] transition-colors font-medium">
              Deals
            </Link>
            <Link href="/simulateur" className="text-sm text-slate-600 hover:text-[#0C4693] transition-colors font-medium">
              Simulateur
            </Link>
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-[#0C4693] transition-colors font-medium">
              Mon Portfolio
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold rounded-lg orange-gradient text-white hover:opacity-90 transition-opacity shadow-sm"
            >
              Investir maintenant
            </Link>
          </div>

          <button className="md:hidden text-slate-600" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
          <Link href="/deals" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Deals</Link>
          <Link href="/simulateur" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Simulateur</Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Mon Portfolio</Link>
          <Link href="/register" className="text-sm font-semibold text-[#0C4693]" onClick={() => setOpen(false)}>Investir →</Link>
        </div>
      )}
    </nav>
  );
}
