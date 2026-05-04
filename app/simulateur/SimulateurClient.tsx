"use client";
import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";

const PRESETS = [
  { label: "Starter", amount: 5000 },
  { label: "Standard", amount: 15000 },
  { label: "Premium", amount: 50000 },
  { label: "Partner", amount: 100000 },
];

const MACHINE_TYPES = [
  { label: "Camion benne (HOWO)", price: 120000, monthlyRev: 4200 },
  { label: "Excavatrice (XCMG)", price: 185000, monthlyRev: 6800 },
  { label: "Chargeuse (LOVOL)", price: 95000, monthlyRev: 3500 },
  { label: "Camion articulé (SINOTRUK)", price: 150000, monthlyRev: 5200 },
];

export default function SimulateurClient() {
  const [amount, setAmount] = useState(15000);
  const [amountInput, setAmountInput] = useState("15000");
  const [machineIdx, setMachineIdx] = useState(0);

  const machine = MACHINE_TYPES[machineIdx];
  const pct = amount / machine.price;
  const myMonthly = Math.round(machine.monthlyRev * pct);
  const paybackMonths = 36;
  const profitMonths = 24;
  const totalMonths = 60;

  const data = useMemo(() => {
    const results = [];
    let cumulative = -amount;
    for (let m = 1; m <= totalMonths; m++) {
      cumulative += myMonthly;
      results.push({
        month: `M${m}`,
        cumulative: Math.round(cumulative),
        mensuel: myMonthly,
        phase: m <= paybackMonths ? "remboursement" : "benefice",
      });
    }
    return results;
  }, [amount, myMonthly]);

  const totalReturn = myMonthly * totalMonths;
  const netGain = totalReturn - amount;
  const roi = Math.round((netGain / amount) * 100);
  const breakEvenMonth = data.findIndex((d) => d.cumulative >= 0) + 1;

  function handleAmountChange(val: string) {
    setAmountInput(val);
    const n = Number(val.replace(/\D/g, ""));
    if (n >= 1000 && n <= machine.price) setAmount(n);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-5">
        <div className="card p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Paramètres</h2>

          <div className="mb-4">
            <label className="text-xs text-slate-500 mb-2 block">Type d&apos;équipement</label>
            <div className="space-y-2">
              {MACHINE_TYPES.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() => setMachineIdx(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                    machineIdx === i
                      ? "border-[#0C4693] bg-[#E6EEF4] text-[#0C4693]"
                      : "border-slate-200 text-slate-600 hover:border-[#0C4693]/25"
                  }`}
                >
                  {m.label}
                  <span className="float-right text-xs text-slate-400">${m.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-slate-500 mb-2 block">Montant investi</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="text"
                value={amountInput}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 pl-7 text-slate-900 text-sm focus:outline-none focus:border-orange-400"
                placeholder="15000"
              />
            </div>
            <input
              type="range"
              min={5000}
              max={machine.price}
              step={5000}
              value={Math.min(amount, machine.price)}
              onChange={(e) => {
                const v = Number(e.target.value);
                setAmount(v);
                setAmountInput(String(v));
              }}
              className="w-full mt-2 accent-[#0C4693]"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>$5 000</span>
              <span>${machine.price.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-2 block">Presets rapides</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => { setAmount(p.amount); setAmountInput(String(p.amount)); }}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                    amount === p.amount
                      ? "border-[#0C4693] bg-[#E6EEF4] text-[#0C4693]"
                      : "border-slate-200 text-slate-500 hover:border-[#0C4693]/25"
                  }`}
                >
                  {p.label}
                  <span className="block text-[10px] opacity-60">${p.amount.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="card p-6 space-y-3">
          <h2 className="font-semibold text-slate-900 mb-2">Résultats</h2>
          {[
            { label: "Participation", value: `${Math.round(pct * 100)}%` },
            { label: "Revenu mensuel", value: `$${myMonthly.toLocaleString()}` },
            { label: "Total perçu (60 mois)", value: `$${totalReturn.toLocaleString()}` },
            { label: "Gain net", value: `$${netGain.toLocaleString()}` },
            { label: "ROI 5 ans", value: `+${roi}%`, highlight: true },
            { label: "Seuil atteint à", value: `Mois ${breakEvenMonth}` },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-slate-500">{item.label}</span>
              <span className={item.highlight ? "font-bold text-[#0C4693]" : "text-slate-900 font-medium"}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="lg:col-span-2 space-y-5">
        <div className="card p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Gain cumulé sur 60 mois</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="orangeGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0C4693" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0C4693" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  interval={11}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ color: "#64748b" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Cumulé"]}
                />
                <ReferenceLine y={0} stroke="#e2e8f0" strokeDasharray="4 2" label={{ value: "Seuil", fill: "#94a3b8", fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#0C4693"
                  strokeWidth={2}
                  fill="url(#orangeGrad2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Remboursement mois 1–{paybackMonths} · Bénéfice mois {paybackMonths + 1}–{totalMonths}
          </p>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Revenu mensuel par phase (5 ans)</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Remboursement (36 mois)", valeur: myMonthly * paybackMonths },
                  { name: "Bénéfice net (24 mois)", valeur: myMonthly * profitMonths },
                ]}
                margin={{ top: 5, right: 10, bottom: 0, left: 0 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 11 }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Total"]}
                />
                <Bar dataKey="valeur" fill="#0C4693" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4 bg-slate-50">
          <p className="text-xs text-slate-400">
            * Simulation basée sur un taux de revenu mensuel fixe lié au contrat. Les performances réelles peuvent varier selon l&apos;opération et les conditions de marché. Investir comporte des risques.
          </p>
        </div>
      </div>
    </div>
  );
}
