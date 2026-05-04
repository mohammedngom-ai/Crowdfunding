import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../lib/prisma";
import { Building2, Clock, TrendingUp, Wrench, MapPin } from "lucide-react";
import InlineSimulator from "./InlineSimulator";

const sectorLabel: Record<string, string> = {
  mine: "Mine",
  carriere: "Carrière",
  construction: "Construction",
};

const sectorColor: Record<string, string> = {
  mine: "bg-amber-50 text-amber-700 border border-amber-200",
  carriere: "bg-slate-100 text-slate-700 border border-slate-200",
  construction: "bg-blue-50 text-blue-700 border border-blue-200",
};

const contractLabel: Record<string, string> = {
  minier_extra: "Transport extra-minier",
  carrier: "Exploitation carrière",
  location: "Location libre",
};

const fallbackImages: Record<string, string> = {
  dump_truck: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=1200",
  excavatrice: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=1200",
  chargeuse: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=1200",
  foreuse: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=1200",
  grader: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=1200",
  camion_articule: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default async function DealPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const deal = await prisma.deal.findUnique({ where: { slug } });
  if (!deal) notFound();

  const pct = Math.round((deal.raisedAmount / deal.totalPrice) * 100);
  const remaining = deal.totalPrice - deal.raisedAmount;
  const totalMonths = deal.paybackMonths + deal.profitMonths;
  const totalRevenue = deal.monthlyRevenue * totalMonths;
  const netProfit = totalRevenue - deal.totalPrice;
  const roi = Math.round((netProfit / deal.totalPrice) * 100);

  const imgSrc = deal.imageUrl ?? fallbackImages[deal.equipmentType] ?? fallbackImages.dump_truck;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-5">
        <Link href="/deals" className="text-xs text-slate-500 hover:text-[#0C4693] transition-colors">
          ← Retour aux deals
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
        <Image
          src={imgSrc}
          alt={deal.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />
        <div className="absolute bottom-6 left-6 flex gap-3 items-end">
          <div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${sectorColor[deal.sector] ?? "bg-slate-100 text-slate-700"}`}>
              {sectorLabel[deal.sector] ?? deal.sector}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2 drop-shadow-lg max-w-xl">{deal.title}</h1>
            <p className="text-slate-200 text-sm mt-1 drop-shadow">{deal.brand} {deal.model} · Neuf · {deal.origin} · {deal.year}</p>
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${deal.status === "open" ? "bg-green-100/90 text-green-700 border border-green-200" : "bg-slate-100/90 text-slate-600 border border-slate-200"}`}>
            {deal.status === "open" ? "● Ouvert" : deal.status === "full" ? "Complet" : "En cours"}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-5">

          {/* Equipment + Contract side by side */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card p-5">
              <h2 className="font-semibold text-slate-900 mb-4 text-sm">Fiche technique</h2>
              <div className="space-y-2.5">
                {[
                  { label: "Marque", value: deal.brand },
                  { label: "Modèle", value: deal.model },
                  { label: "Année", value: String(deal.year) },
                  { label: "Origine", value: deal.origin },
                  { label: "Type", value: deal.equipmentType.replace("_", " ") },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900 font-medium capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="font-semibold text-slate-900 mb-4 text-sm">Contrat associé</h2>
              <div className="space-y-3">
                {[
                  { icon: <Building2 size={13} />, label: "Client", value: deal.contractClient },
                  { icon: <Wrench size={13} />, label: "Type", value: contractLabel[deal.contractType] ?? deal.contractType },
                  { icon: <MapPin size={13} />, label: "Sector", value: sectorLabel[deal.sector] },
                  { icon: <Clock size={13} />, label: "Durée", value: `${totalMonths} mois` },
                  { icon: <TrendingUp size={13} />, label: "Rev./mois", value: `$${deal.monthlyRevenue.toLocaleString()}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span className="text-[#0C4693] shrink-0">{item.icon}</span>
                    <span className="text-slate-500 w-20 shrink-0">{item.label}</span>
                    <span className="text-slate-900 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {deal.description && (
            <div className="card p-5">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm">Description</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{deal.description}</p>
            </div>
          )}

          {/* Timeline visuelle */}
          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-4 text-sm">Calendrier de retour</h2>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
                <p className="text-xs text-blue-600 mb-1">Phase 1</p>
                <p className="text-lg font-bold text-slate-900">{deal.paybackMonths} mois</p>
                <p className="text-xs text-slate-500">Remboursement</p>
                <p className="text-xs text-[#0C4693] mt-1">${deal.monthlyRevenue.toLocaleString()}/mois</p>
              </div>
              <div className="flex items-center text-slate-300 text-lg">→</div>
              <div className="flex-1 rounded-lg bg-orange-50 border border-orange-200 p-3 text-center">
                <p className="text-xs text-[#0C4693] mb-1">Phase 2</p>
                <p className="text-lg font-bold text-slate-900">{deal.profitMonths} mois</p>
                <p className="text-xs text-slate-500">Bénéfice net</p>
                <p className="text-xs text-[#0C4693] mt-1">${deal.monthlyRevenue.toLocaleString()}/mois</p>
              </div>
              <div className="flex items-center text-slate-300 text-lg">→</div>
              <div className="flex-1 rounded-lg bg-green-50 border border-green-200 p-3 text-center">
                <p className="text-xs text-green-600 mb-1">Total</p>
                <p className="text-lg font-bold text-[#0C4693]">+{roi}%</p>
                <p className="text-xs text-slate-500">ROI</p>
                <p className="text-xs text-slate-400 mt-1">${netProfit.toLocaleString()} net</p>
              </div>
            </div>
          </div>

          <InlineSimulator
            totalPrice={deal.totalPrice}
            monthlyRevenue={deal.monthlyRevenue}
            paybackMonths={deal.paybackMonths}
            profitMonths={deal.profitMonths}
            minInvestment={deal.minInvestment}
          />
        </div>

        {/* Right: Invest sidebar */}
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Financement</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Levé</span>
                <span className="font-bold text-slate-900">${deal.raisedAmount.toLocaleString()}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{pct}% financé</span>
                <span>${remaining.toLocaleString()} restants</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
              {[
                { label: "Prix total", value: `$${deal.totalPrice.toLocaleString()}` },
                { label: "Invest. minimum", value: `$${deal.minInvestment.toLocaleString()}`, orange: true },
                { label: "Dépôt de garantie", value: `$${deal.depositAmount.toLocaleString()}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={item.orange ? "text-[#0C4693] font-bold" : "text-slate-900"}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Rendement estimé</h2>
            <div className="space-y-2.5">
              {[
                { label: "ROI total 5 ans", value: `+${roi}%`, highlight: true },
                { label: "Revenu mensuel", value: `$${deal.monthlyRevenue.toLocaleString()}` },
                { label: "Bénéfice net total", value: `$${netProfit.toLocaleString()}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{item.label}</span>
                  <span className={item.highlight ? "font-bold text-[#0C4693] text-base" : "text-slate-900"}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {deal.status === "open" ? (
            <Link
              href={`/register?deal=${deal.slug}`}
              className="block w-full text-center px-6 py-3.5 rounded-xl font-semibold orange-gradient text-white hover:opacity-90 transition-opacity shadow-md"
            >
              Réserver ma part
              <span className="block text-xs font-normal opacity-80 mt-0.5">Dépôt ${deal.depositAmount.toLocaleString()} · non-remboursable</span>
            </Link>
          ) : (
            <div className="w-full text-center px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-400 cursor-not-allowed">
              Deal complet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
