import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg orange-gradient flex items-center justify-center text-white font-black text-sm">H</span>
              <span className="text-lg font-bold">Hiray <span className="text-[#0C4693]">Finance</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Financement participatif d'équipements lourds liés à des contrats miniers, carriers et de construction en Afrique.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/deals" className="hover:text-[#0C4693] transition-colors">Deals disponibles</Link></li>
              <li><Link href="/simulateur" className="hover:text-[#0C4693] transition-colors">Simulateur</Link></li>
              <li><Link href="/register" className="hover:text-[#0C4693] transition-colors">S'inscrire</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Secteurs</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Mines (SGO, Corica, Somiva…)</li>
              <li>Carrières (Dangote, Gécamines…)</li>
              <li>Construction (PFO, Arezki…)</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Hiray Finance. Tous droits réservés. — Investir comporte des risques.
        </div>
      </div>
    </footer>
  );
}
