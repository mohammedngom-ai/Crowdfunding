"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const countries = [
  "Sénégal", "Mali", "Burkina Faso", "Côte d'Ivoire", "Guinée", "RDC",
  "Cameroun", "Gabon", "Mauritanie", "Niger", "Tchad", "France", "Belgique", "Autre",
];

export default function RegisterForm({ dealSlug }: { dealSlug?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Sénégal",
    amount: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle size={40} className="text-[#0C4693] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Inscription reçue !</h2>
        <p className="text-slate-500 text-sm">
          Votre dépôt de garantie a été enregistré. Notre équipe vous contactera sous 24h pour finaliser votre investissement.
        </p>
        {dealSlug && (
          <a
            href={`/deals/${dealSlug}`}
            className="inline-block mt-6 text-sm text-[#0C4693] hover:underline"
          >
            ← Retour au deal
          </a>
        )}
      </div>
    );
  }

  const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-orange-400 placeholder-slate-400 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2].map((s) => (
          <div key={s} className={`flex items-center gap-2 ${s < 2 ? "flex-1" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "orange-gradient text-white" : "bg-slate-100 text-slate-400"}`}>
              {s}
            </div>
            {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? "bg-[#0C4693]" : "bg-slate-200"}`} />}
          </div>
        ))}
        <span className="text-xs text-slate-500 ml-2">{step === 1 ? "Infos personnelles" : "Dépôt de garantie"}</span>
      </div>

      {step === 1 && (
        <>
          <div>
            <label className="text-xs text-slate-500 mb-1 block font-medium">Nom complet *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jean Dupont"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block font-medium">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jean@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block font-medium">Téléphone *</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+221 77 000 00 00"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block font-medium">Pays *</label>
            <select
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={inputClass}
            >
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="p-4 rounded-lg bg-[#E6EEF4] border border-[#0C4693]/25">
            <p className="text-xs text-[#0C4693] font-semibold mb-1">Dépôt de garantie</p>
            <p className="text-sm text-slate-600">
              Un dépôt non-remboursable est requis pour réserver votre place dans le deal.
              Ce montant sera déduit de votre investissement final.
            </p>
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block font-medium">Montant souhaité ($) *</label>
            <input
              required
              type="number"
              min={5000}
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
              placeholder="15000"
              className={inputClass}
            />
          </div>
          {dealSlug && (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
              Deal réservé : <span className="text-slate-900 font-medium">{dealSlug}</span>
            </div>
          )}
          <div className="text-xs text-slate-500 p-3 rounded-lg bg-slate-50 border border-slate-100">
            En continuant, vous acceptez que le dépôt de garantie est <strong className="text-slate-700">non-remboursable</strong> et confirme votre intention d&apos;investir.
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold orange-gradient text-white hover:opacity-90 transition-opacity text-sm shadow-md"
      >
        {step === 1 ? "Continuer →" : "Confirmer ma réservation"}
      </button>
    </form>
  );
}
