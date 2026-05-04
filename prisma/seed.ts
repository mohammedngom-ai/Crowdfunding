import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  await prisma.deal.deleteMany();

  await prisma.deal.createMany({
    data: [
      {
        title: "Camion benne HOWO 6×4 — Contrat SGO Bambadji",
        slug: "howo-dump-truck-sgo-bambadji",
        sector: "mine",
        equipmentType: "dump_truck",
        brand: "HOWO",
        model: "ZZ3257N3847E1",
        year: 2024,
        origin: "Chine",
        totalPrice: 120000,
        minInvestment: 5000,
        depositAmount: 500,
        contractClient: "SGO",
        contractType: "minier_extra",
        contractDuration: 60,
        monthlyRevenue: 4200,
        paybackMonths: 36,
        profitMonths: 24,
        status: "open",
        raisedAmount: 72000,
        imageUrl: "https://images.pexels.com/photos/13224687/pexels-photo-13224687.jpeg?auto=compress&cs=tinysrgb&w=800",
        description:
          "Camion benne neuf HOWO 6×4, capacité 20t, affecté au transport de minerai extra-site pour SGO Bambadji (Sénégal). Contrat ferme 5 ans signé. Remboursement intégral en 36 mois, puis 24 mois de bénéfice net.",
      },
      {
        title: "Excavatrice XCMG XE370CA — Carrière Dangote Thiès",
        slug: "xcmg-excavatrice-dangote-thies",
        sector: "carriere",
        equipmentType: "excavatrice",
        brand: "XCMG",
        model: "XE370CA",
        year: 2024,
        origin: "Chine",
        totalPrice: 185000,
        minInvestment: 10000,
        depositAmount: 1000,
        contractClient: "Dangote",
        contractType: "carrier",
        contractDuration: 60,
        monthlyRevenue: 6800,
        paybackMonths: 36,
        profitMonths: 24,
        status: "open",
        raisedAmount: 55000,
        imageUrl: "https://images.pexels.com/photos/15138925/pexels-photo-15138925.jpeg?auto=compress&cs=tinysrgb&w=800",
        description:
          "Excavatrice hydraulique XCMG 37 tonnes, affectée à la carrière de calcaire de Dangote Thiès. Contrat exclusif 5 ans avec option de renouvellement. ROI estimé à 62% sur 5 ans.",
      },
      {
        title: "Chargeuse LOVOL FL968H — Ciments du Sahel",
        slug: "lovol-chargeuse-ciments-sahel",
        sector: "carriere",
        equipmentType: "chargeuse",
        brand: "LOVOL",
        model: "FL968H",
        year: 2024,
        origin: "Chine",
        totalPrice: 95000,
        minInvestment: 5000,
        depositAmount: 500,
        contractClient: "Ciments du Sahel",
        contractType: "carrier",
        contractDuration: 60,
        monthlyRevenue: 3500,
        paybackMonths: 36,
        profitMonths: 24,
        status: "open",
        raisedAmount: 19000,
        imageUrl: "https://images.pexels.com/photos/461789/pexels-photo-461789.jpeg?auto=compress&cs=tinysrgb&w=800",
        description:
          "Chargeuse sur pneus LOVOL 6m³, dédiée à la carrière de Ciments du Sahel. Machine neuve importée directement de Chine. Faible coût de maintenance, pièces disponibles localement.",
      },
    ],
  });

  console.log("Seed complete: 3 deals created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
