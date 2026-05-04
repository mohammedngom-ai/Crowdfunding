import { prisma } from "../lib/prisma";
import DealCard from "../components/DealCard";
import DealsFilter from "./DealsFilter";

interface SearchParams {
  sector?: string;
  status?: string;
}

export default async function DealsPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const sector = searchParams.sector;
  const status = searchParams.status;

  const deals = await prisma.deal.findMany({
    where: {
      ...(sector ? { sector } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const openCount = deals.filter((d) => d.status === "open").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Deals disponibles</h1>
        <p className="mt-2 text-slate-500">
          {openCount} deal{openCount !== 1 ? "s" : ""} ouvert{openCount !== 1 ? "s" : ""} · Équipements neufs, contrats actifs
        </p>
      </div>

      <DealsFilter currentSector={sector} currentStatus={status} />

      {deals.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">Aucun deal trouvé pour ce filtre.</p>
          <a href="/deals" className="text-[#0C4693] text-sm mt-2 inline-block hover:underline">Réinitialiser les filtres</a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}
