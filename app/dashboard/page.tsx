import { TrendingUp, Clock, Wallet, FileText } from "lucide-react";
import Link from "next/link";

const mockInvestments = [
  {
    id: "1",
    deal: "Camion benne HOWO 6×4 — SGO Bambadji",
    slug: "howo-dump-truck-sgo-bambadji",
    amount: 15000,
    pct: 12.5,
    monthly: 525,
    status: "active",
    startDate: "Janv. 2025",
    paid: 5250,
    nextPayment: "15 Juin 2025",
  },
  {
    id: "2",
    deal: "Chargeuse LOVOL FL968H — Ciments du Sahel",
    slug: "lovol-chargeuse-ciments-sahel",
    amount: 10000,
    pct: 10.5,
    monthly: 368,
    status: "active",
    startDate: "Mars 2025",
    paid: 1104,
    nextPayment: "15 Juin 2025",
  },
];

const totalInvested = mockInvestments.reduce((s, i) => s + i.amount, 0);
const totalMonthly = mockInvestments.reduce((s, i) => s + i.monthly, 0);
const totalPaid = mockInvestments.reduce((s, i) => s + i.paid, 0);

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mon Portfolio</h1>
          <p className="text-sm text-slate-500 mt-1">Bienvenue, Investisseur</p>
        </div>
        <Link
          href="/deals"
          className="px-4 py-2 text-sm font-semibold rounded-lg orange-gradient text-white hover:opacity-90 transition-opacity shadow-sm"
        >
          Nouveau deal
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Wallet size={18} className="text-[#0C4693]" />, label: "Total investi", value: `$${totalInvested.toLocaleString()}` },
          { icon: <TrendingUp size={18} className="text-[#0C4693]" />, label: "Revenu mensuel", value: `$${totalMonthly.toLocaleString()}` },
          { icon: <FileText size={18} className="text-[#0C4693]" />, label: "Total perçu", value: `$${totalPaid.toLocaleString()}` },
          { icon: <Clock size={18} className="text-[#0C4693]" />, label: "Deals actifs", value: String(mockInvestments.length) },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-slate-500">{s.label}</span></div>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Investments table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Mes investissements</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {mockInvestments.map((inv) => (
            <div key={inv.id} className="px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/deals/${inv.slug}`} className="font-medium text-slate-900 hover:text-[#0C4693] transition-colors text-sm">
                    {inv.deal}
                  </Link>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    <span>Depuis {inv.startDate}</span>
                    <span>Part : {inv.pct}%</span>
                    <span>Prochain paiement : {inv.nextPayment}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">${inv.amount.toLocaleString()}</p>
                  <p className="text-xs text-[#0C4693]">${inv.monthly.toLocaleString()}/mois</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-400">Investi</p>
                  <p className="text-sm text-slate-900 font-medium">${inv.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Perçu à date</p>
                  <p className="text-sm text-slate-900 font-medium">${inv.paid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Statut</p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    Actif
                  </span>
                </div>
              </div>

              <div className="mt-3 progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.round((inv.paid / inv.amount) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round((inv.paid / inv.amount) * 100)}% remboursé
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar preview */}
      <div className="mt-6 card p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Prochains paiements</h2>
        <div className="space-y-3">
          {mockInvestments.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="text-slate-900">{inv.deal.split("—")[0].trim()}</p>
                <p className="text-xs text-slate-400">{inv.nextPayment}</p>
              </div>
              <span className="font-bold text-[#0C4693]">${inv.monthly.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
