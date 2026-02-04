import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="DingoLingo"
              width={160}
              height={45}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-500 text-sm max-w-md">
              Plateforme d'apprentissage de langues conçue pour les formations en entreprise. 
              Développez vos compétences linguistiques avec une approche moderne et interactive.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-orange-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/lessons" className="text-gray-500 hover:text-orange-500 transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/formateurs" className="text-gray-500 hover:text-orange-500 transition-colors">
                  Formateurs
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Informations légales</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-500 hover:text-orange-500 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gray-500 hover:text-orange-500 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DingoLingo - Projet EPHEC 3TI - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
