import RegisterForm from "./RegisterForm";

export default async function RegisterPage(props: { searchParams: Promise<{ deal?: string }> }) {
  const { deal } = await props.searchParams;
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <span className="text-2xl font-bold gold-text">Hiray Finance</span>
        <h1 className="text-xl font-bold text-white mt-3">Créer mon compte investisseur</h1>
        <p className="text-sm text-gray-400 mt-2">
          {deal
            ? "Réservez votre place dans ce deal avec un dépôt de garantie non-remboursable."
            : "Rejoignez les investisseurs Hiray Finance."}
        </p>
      </div>
      <RegisterForm dealSlug={deal} />
    </div>
  );
}
