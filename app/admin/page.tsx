import { prisma } from "../lib/prisma";
import Link from "next/link";
import { Plus, TrendingUp, Layers, Users } from "lucide-react";

export default async function AdminPage() {
  const [deals, reservations] = await Promise.all([
    prisma.deal.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.reservation.findMany({ include: { user: true, deal: true }, orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  const totalRaised = deals.reduce((s, d) => s + d.raisedAmount, 0);
  const openDeals = deals.filter((d) => d.status === "open").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-500">Hiray Finance — Gestion des deals</p>
        </div>
        <Link
          href="/admin/deals/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold orange-gradient text-white hover:opacity-90 shadow-sm"
        >
          <Plus size={16} />
          Nouveau deal
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Layers size={18} className="text-[#0C4693]" />, label: "Total deals", value: String(deals.length) },
          { icon: <TrendingUp size={18} className="text-[#0C4693]" />, label: "Deals ouverts", value: String(openDeals) },
          { icon: <TrendingUp size={18} className="text-[#0C4693]" />, label: "Capital levé", value: `$${totalRaised.toLocaleString()}` },
          { icon: <Users size={18} className="text-[#0C4693]" />, label: "Réservations", value: String(reservations.length) },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-slate-500">{s.label}</span></div>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Deals table */}
      <div className="card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between">
          <h2 className="font-semibold text-slate-900">Deals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Titre", "Secteur", "Client", "Prix", "Levé", "%", "Statut", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals.map((deal) => {
                const pct = Math.round((deal.raisedAmount / deal.totalPrice) * 100);
                return (
                  <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-900 max-w-[200px] truncate font-medium">{deal.title}</td>
                    <td className="px-4 py-3 text-slate-500 capitalize">{deal.sector}</td>
                    <td className="px-4 py-3 text-slate-500">{deal.contractClient}</td>
                    <td className="px-4 py-3 text-slate-500">${deal.totalPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-500">${deal.raisedAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="w-16">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${deal.status === "open" ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-100 text-slate-500"}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/deals/${deal.slug}`} className="text-[#0C4693] hover:underline text-xs font-medium">
                        Voir
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservations */}
      {reservations.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Réservations récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Investisseur", "Deal", "Dépôt", "Statut", "Date"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-900 font-medium">{r.user.name}</td>
                    <td className="px-4 py-3 text-slate-500 truncate max-w-[160px]">{r.deal.title.split("—")[0]}</td>
                    <td className="px-4 py-3 text-[#0C4693] font-medium">${r.depositPaid.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "confirmed" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
