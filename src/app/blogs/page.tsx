/**
 * La liste du blog est interactive (filtres par categorie), donc cliente. Or un
 * composant client ne peut pas exporter `metadata` : le fichier `metadata.ts`
 * existait mais n'etait importe nulle part, et Google recevait pour /blogs le
 * titre, la description et surtout le canonical de la page d'accueil — deux URL
 * se declaraient donc comme etant la meme page.
 *
 * Cette page serveur ne fait que porter les metadonnees et rendre la liste.
 */
import { metadata } from './metadata';
import BlogsPageClient from './BlogsPageClient';

export { metadata };

export default function BlogsPage() {
  return <BlogsPageClient />;
}
