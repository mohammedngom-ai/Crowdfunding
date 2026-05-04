import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Shield, Clock, ChevronRight, Pickaxe, Building, Mountain } from "lucide-react";
import { prisma } from "./lib/prisma";
import DealCard from "./components/DealCard";

const HERO_IMG = "https://images.pexels.com/photos/34334647/pexels-photo-34334647.jpeg?auto=compress&cs=tinysrgb&w=1600";
const MINING_IMG = "https://images.pexels.com/photos/36224103/pexels-photo-36224103.jpeg?auto=compress&cs=tinysrgb&w=1200";

const stats = [
  { label: "Rendement moyen", value: "58%", sub: "sur 5 ans" },
  { label: "Deals financés", value: "12", sub: "actifs" },
  { label: "Capital levé", value: "$2.1M", sub: "total" },
  { label: "Investisseurs", value: "140+", sub: "inscrits" },
];

const howItWorks = [
  { step: "01", title: "Choisissez un deal", desc: "Parcourez les équipements disponibles liés à des contrats miniers ou de construction actifs." },
  { step: "02", title: "Investissez votre part", desc: "Réservez avec un dépôt de garantie puis finalisez. Investissement minimum $5 000." },
  { step: "03", title: "Percevez vos revenus", desc: "Remboursement sur 36 mois via les revenus du contrat, puis 24 mois de bénéfice net." },
];

const sectors = [
  { icon: <Pickaxe size={26} className="text-[#0C4693]" />, label: "Mines", tag: "Transport extra-minier", clients: ["SGO", "Corica", "Famy", "Somiva", "Temico", "Boya", "Makabingui", "ALT"] },
  { icon: <Mountain size={26} className="text-[#0C4693]" />, label: "Carrières", tag: "Extraction & concassage", clients: ["Gécamines", "Ciments du Sahel", "Dangote", "Transport Dieye"] },
  { icon: <Building size={26} className="text-[#0C4693]" />, label: "Construction", tag: "Génie civil & BTP", clients: ["PFO", "Arezki", "Houar"] },
];

const machines = [
  { label: "Camions bennes", img: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { label: "Excavatrices", img: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { label: "Chargeuses", img: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { label: "Foreuses", img: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { label: "Graders", img: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { label: "Camions articulés", img: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const allClients = ["SGO", "Dangote", "Gécamines", "Ciments du Sahel", "Corica", "Famy", "Somiva", "Transport Dieye", "PFO", "Temico", "Boya", "ALT", "Makabingui", "ALT"];

export default async function HomePage() {
  const featuredDeals = await prisma.deal.findMany({
    where: { status: "open" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="Chantier industriel" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a]/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C4693]/20 border border-[#0C4693]/30 text-[#E6EEF4] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C4693] animate-pulse" />
              3 deals ouverts · Places limitées
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Investissez dans les{" "}
              <span className="text-[#0C4693]">machines qui font tourner</span>{" "}
              l&apos;Afrique
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-xl leading-relaxed">
              Financement participatif d&apos;équipements lourds liés à des contrats miniers et de construction.
              Remboursement en 36 mois, bénéfice net pendant 24 mois.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/deals" className="px-6 py-3 rounded-xl font-semibold orange-gradient text-white hover:opacity-90 transition-opacity text-sm text-center shadow-lg">
                Voir les deals disponibles
              </Link>
              <Link href="/simulateur" className="px-6 py-3 rounded-xl font-semibold border border-white/25 text-white hover:bg-white/10 transition-all text-sm text-center">
                Simuler mon investissement →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-xl overflow-hidden shadow-sm">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 text-center">
              <p className="text-2xl font-bold text-[#0C4693]">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
              <p className="text-xs text-slate-400">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs text-slate-400 uppercase tracking-widest mb-5 font-medium">Clients & opérateurs partenaires</p>
          <div className="flex flex-wrap justify-center gap-2">
            {allClients.map((c, i) => (
              <span key={`${c}-${i}`} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 font-medium hover:border-[#0C4693]/25 hover:text-[#0C4693] transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Comment ça marche</h2>
            <p className="mt-2 text-sm text-slate-500">Trois étapes pour commencer à générer des revenus</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="card p-6 relative">
                <div className="w-8 h-8 rounded-lg orange-gradient flex items-center justify-center text-white text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      {featuredDeals.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Deals disponibles</h2>
                <p className="text-sm text-slate-500 mt-1">Équipements neufs importés de Chine, contrats actifs</p>
              </div>
              <Link href="/deals" className="flex items-center gap-1 text-sm text-[#0C4693] hover:underline font-medium">
                Voir tout <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Machines grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Types d&apos;équipements</h2>
            <p className="text-sm text-slate-500 mt-2">Neuf · HOWO · SINOTRUK · LOVOL · XCMG · Importés de Chine</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {machines.map((m) => (
              <div key={m.label} className="relative h-36 rounded-xl overflow-hidden group cursor-default shadow-sm">
                <Image src={m.img} alt={m.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-semibold text-white drop-shadow">{m.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Nos secteurs cibles</h2>
            <p className="text-sm text-slate-500 mt-2">Transport extra-minier uniquement</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s) => (
              <div key={s.label} className="card p-6 hover:border-[#0C4693]/25 transition-colors">
                <div className="mb-3 w-11 h-11 rounded-xl bg-[#E6EEF4] flex items-center justify-center">{s.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{s.label}</h3>
                <p className="text-xs text-[#0C4693] font-medium mb-3">{s.tag}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.clients.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171B31]">L&apos;équipe fondatrice</h2>
            <p className="mt-2 text-sm text-slate-500">Trois associés, une vision commune : financer l&apos;Afrique industrielle</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Abdel Kader Ngom",
                role: "Co-fondateur",
                initials: "AK",
                desc: "Expertise en développement des affaires et partenariats miniers en Afrique de l'Ouest.",
              },
              {
                name: "Mohammed Ngom",
                role: "Co-fondateur",
                initials: "MN",
                desc: "Spécialiste en structuration financière et gestion d'investissements alternatifs.",
              },
              {
                name: "Ayman Boukaroum",
                role: "Co-fondateur",
                initials: "AB",
                desc: "Expert en importation d'équipements lourds et en gestion opérationnelle terrain.",
              },
            ].map((p) => (
              <div key={p.name} className="card p-6 text-center hover:border-[#0C4693]/25 transition-colors">
                <div className="w-16 h-16 rounded-full orange-gradient flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {p.initials}
                </div>
                <h3 className="font-bold text-[#171B31] text-base">{p.name}</h3>
                <p className="text-xs text-[#0C4693] font-semibold uppercase tracking-wide mt-0.5 mb-3">{p.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 section-alt">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Shield size={20} className="text-[#0C4693]" />, title: "Contrats garantis", desc: "Chaque équipement est lié à un contrat signé avant ouverture du deal." },
              { icon: <TrendingUp size={20} className="text-[#0C4693]" />, title: "ROI transparent", desc: "Simulateur intégré. Vous savez exactement ce que vous percevez chaque mois." },
              { icon: <Clock size={20} className="text-[#0C4693]" />, title: "5 ans max", desc: "36 mois de remboursement + 24 mois de bénéfice net. Structure claire." },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-[#E6EEF4] flex items-center justify-center">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-8 text-center border-[#0C4693]/15">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Prêt à investir ?</h2>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Inscrivez-vous, déposez votre garantie et sécurisez votre place dans les prochains deals.
            </p>
            <Link href="/register" className="inline-block px-8 py-3 rounded-xl font-semibold orange-gradient text-white hover:opacity-90 transition-opacity shadow-md">
              Créer mon compte investisseur
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
