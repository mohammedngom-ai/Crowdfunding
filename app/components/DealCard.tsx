import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Clock, Building2 } from "lucide-react";

interface Deal {
  id: string;
  slug: string;
  title: string;
  sector: string;
  equipmentType: string;
  brand: string;
  model: string;
  year: number;
  origin: string;
  totalPrice: number;
  minInvestment: number;
  raisedAmount: number;
  contractClient: string;
  contractType: string;
  paybackMonths: number;
  profitMonths: number;
  status: string;
  monthlyRevenue: number;
  imageUrl?: string | null;
}

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

const fallbackImages: Record<string, string> = {
  dump_truck: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=800",
  excavatrice: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=800",
  chargeuse: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=800",
  foreuse: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=800",
  grader: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=800",
  camion_articule: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export default function DealCard({ deal }: { deal: Deal }) {
  const pct = Math.round((deal.raisedAmount / deal.totalPrice) * 100);
  const remaining = deal.totalPrice - deal.raisedAmount;
  const totalMonths = deal.paybackMonths + deal.profitMonths;
  const totalReturn = deal.monthlyRevenue * totalMonths - deal.totalPrice;
  const roi = Math.round((totalReturn / deal.totalPrice) * 100);
  const imgSrc = deal.imageUrl ?? fallbackImages[deal.equipmentType] ?? fallbackImages.dump_truck;

  return (
    <Link href={`/deals/${deal.slug}`} className="block group">
      <div className="card card-hover overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Image
            src={imgSrc}
            alt={deal.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sectorColor[deal.sector] ?? "bg-slate-100 text-slate-700"}`}>
              {sectorLabel[deal.sector] ?? deal.sector}
            </span>
          </div>
          {deal.status === "open" && pct >= 80 && (
            <div className="absolute top-3 right-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E6EEF4]0 text-white font-medium">
                Presque complet
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs px-2 py-0.5 rounded font-semibold bg-white/90 text-slate-800">
              {deal.brand} · {deal.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-[#0C4693] transition-colors text-sm">
              {deal.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{deal.brand} {deal.model} · {deal.origin}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Building2 size={11} className="text-[#0C4693]" />
              <span>{deal.contractClient}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-[#0C4693]" />
              <span>{totalMonths} mois</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={11} className="text-[#0C4693]" />
              <span className="text-[#0C4693] font-bold">+{roi}%</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Financé</span>
              <span className="font-semibold text-slate-700">{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>${deal.raisedAmount.toLocaleString()}</span>
              <span>sur ${deal.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400">Invest. min.</p>
              <p className="font-bold text-[#0C4693]">${deal.minInvestment.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Restant</p>
              <p className="font-semibold text-slate-700">${remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
