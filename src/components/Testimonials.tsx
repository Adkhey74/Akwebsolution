import { getReviews } from "@/lib/reviews";
import { TestimonialsList } from "@/components/TestimonialsList";
import type { Locale } from "@/lib/i18n/translations";

/**
 * Section « avis clients » de l'accueil.
 *
 * Composant SERVEUR : il lit les avis (écrits en dur dans `lib/reviews.ts`) et
 * les passe au composant client qui les anime. Ils partent donc dans le HTML
 * servi, lisibles sans JavaScript et par un moteur de recherche.
 *
 * S'il n'y a aucun avis, la section entière disparaît : une section « Avis
 * clients » vide ferait plus de mal que pas de section du tout.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const data = getReviews(locale);
  if (!data) return null;

  return <TestimonialsList data={data} />;
}
