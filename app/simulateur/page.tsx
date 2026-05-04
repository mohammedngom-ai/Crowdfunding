import SimulateurClient from "./SimulateurClient";

export default function SimulateurPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white">Simulateur d&apos;investissement</h1>
        <p className="mt-2 text-gray-400">
          Estimez vos revenus mensuels et votre ROI sur 5 ans selon votre mise.
        </p>
      </div>
      <SimulateurClient />
    </div>
  );
}
