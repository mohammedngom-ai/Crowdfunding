"use client";
import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface Props {
  totalPrice: number;
  monthlyRevenue: number;
  paybackMonths: number;
  profitMonths: number;
  minInvestment: number;
}

export default function InlineSimulator({ totalPrice, monthlyRevenue, paybackMonths, profitMonths, minInvestment }: Props) {
  const [amount, setAmount] = useState(minInvestment);

  const data = useMemo(() => {
    const pct = amount / totalPrice;
    const myMonthly = monthlyRevenue * pct;
    const totalMonths = paybackMonths + profitMonths;
    const results = [];
    let cumulative = -amount;
    for (let m = 1; m <= totalMonths; m++) {
      cumulative += myMonthly;
      results.push({
        month: m,
        cumulative: Math.round(cumulative),
        phase: m <= paybackMonths ? "Remboursement" : "Bénéfice",
      });
    }
    return results;
  }, [amount, totalPrice, monthlyRevenue, paybackMonths, profitMonths]);

  const pct = amount / totalPrice;
  const myMonthly = Math.round(monthlyRevenue * pct);
  const totalMonths = paybackMonths + profitMonths;
  const totalReturn = myMonthly * totalMonths;
  const netGain = totalReturn - amount;
  const roi = Math.round((netGain / amount) * 100);

  return (
    <div className="card p-6">
      <h2 className="font-semibold text-slate-900 mb-4">Simulateur rapide</h2>

      <div className="mb-5">
        <label className="text-xs text-slate-500 mb-2 block">
          Mon investissement : <span className="text-[#0C4693] font-bold">${amount.toLocaleString()}</span>
          {" "}({Math.round(pct * 100)}% de l&apos;équipement)
        </label>
        <input
          type="range"
          min={minInvestment}
          max={totalPrice}
          step={minInvestment}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-[#0C4693]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>${minInvestment.toLocaleString()}</span>
          <span>${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Revenu/mois", value: `$${myMonthly.toLocaleString()}` },
          { label: "Gain net total", value: `$${netGain.toLocaleString()}` },
          { label: "ROI 5 ans", value: `+${roi}%` },
        ].map((s) => (
          <div key={s.label} className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="font-bold text-[#0C4693]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0C4693" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0C4693" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#64748b" }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Cumulé"]}
            />
            <ReferenceLine y={0} stroke="#e2e8f0" strokeDasharray="4 2" />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#0C4693"
              strokeWidth={2}
              fill="url(#orangeGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        Gain cumulé sur {totalMonths} mois · Phase bénéfice à partir du mois {paybackMonths + 1}
      </p>
    </div>
  );
}
