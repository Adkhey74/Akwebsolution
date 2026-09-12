"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { GOOGLE_PLACE_URL, type GoogleReview, type GoogleReviews } from "@/lib/reviews";

/**
 * Rendu des avis Google. Les données arrivent en props depuis le composant
 * serveur `Testimonials` — ce fichier ne fait que mettre en page.
 *
 * Les avis vivent dans `lib/reviews.ts`, et seulement de vrais avis recopiés
 * de la fiche Google : ne jamais écrire de témoignage ici (cf. l'en-tête de
 * `lib/reviews.ts`).
 *
 * ⚠️ **Deux mises en page, choisies sur le nombre d'avis** — les garder toutes
 * les deux, chacune répond à un problème que l'autre ne sait pas traiter :
 *
 * - **Un seul avis → carte centrée** (`SoloReview`). Une bande pleine largeur
 *   avec sa colonne d'auteur à gauche suppose qu'on empile des voix ; seule,
 *   elle laisse une grande zone vide à droite d'une citation courte et se lit
 *   comme une section inachevée. La carte, elle, resserre la largeur à 38 rem,
 *   grossit la citation et centre le tout : le seul avis devient la pièce
 *   montrée, pas le premier d'une liste qui manque.
 * - **Deux avis ou plus → bandes pleine largeur** (`ReviewBand`). Surtout pas
 *   une grille de cartes : la première version reprenait la grille à trois
 *   colonnes du reste du site, chaque carte tombait à ~380 px de large et un
 *   avis de 420 caractères s'y étirait sur une dizaine de lignes — arbitré
 *   « trop vertical ». En bande, l'identité de l'auteur tient dans une colonne
 *   fixe à gauche et la citation dispose du reste : la longueur d'un avis ne
 *   pilote plus la hauteur de la section, ce qui compte puisqu'on ne choisit
 *   pas ce que les clients écrivent.
 *
 * Le basculement est automatique : ajouter un deuxième avis à `REVIEWS` suffit
 * à retrouver les bandes, il n'y a rien d'autre à toucher.
 */

const bandVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/*
 * L'ambre de Tailwind est prévu pour un fond sombre : `amber-400` sur le blanc
 * des cartes en thème clair ne donne que 1,67:1, très en dessous des 3:1 qu'un
 * objet graphique porteur d'information doit tenir (WCAG 1.4.11) — et une note
 * en étoiles EST l'information. D'où le cran plus foncé en clair. Ne pas
 * réunifier les deux thèmes sur une seule valeur.
 */
const STAR_CLASS = "fill-amber-600 text-amber-600 dark:fill-amber-400 dark:text-amber-400";

/** « 4,8 » en français, « 4.8 » en anglais — écrit à la main, cf. formatEuros. */
function formatRating(rating: number, locale: string): string {
  const value = rating.toFixed(1);
  return locale === "fr" ? value.replace(".", ",") : value;
}

export function TestimonialsList({ data }: { data: GoogleReviews }) {
  const { t, locale } = useI18n();
  const solo = data.reviews.length === 1;

  return (
    <section className="section-padding border-t border-[var(--border)] overflow-hidden">
      <div className="section-container min-w-0">

        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="eyebrow mb-5">{t("testimonials.eyebrow")}</span>
          <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            {t("testimonials.title1")}{" "}
            <span className="relative inline-block font-semibold">
              {t("testimonials.titleAccent")}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
              />
            </span>
          </h2>

          {/*
            La note globale porte la crédibilité de la section : sans elle, des
            avis élogieux ressemblent à une sélection faite par nos soins. Le
            lien vers la fiche rend l'affirmation vérifiable en un clic — et il
            vaut attribution au sens des conditions Google. Il compte double
            depuis que le volume n'est plus annoncé sous le seuil : c'est lui
            qui rend la note contrôlable.
          */}
          <a
            href={GOOGLE_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[0.8125rem] text-[var(--muted)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
          >
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={STAR_CLASS} />
              ))}
            </span>
            <span className="font-semibold text-[var(--foreground)]">
              {formatRating(data.rating, locale)}/5
            </span>
            {/*
              Le volume n'est annoncé qu'au-delà du seuil de `reviews.ts` : en
              dessous, dire soi-même « 1 avis » retire à la note le crédit
              qu'elle apporte. La note affichée reste celle de la fiche, et le
              lien ci-dessous y mène — rien n'est maquillé, le compte n'est
              simplement pas mis en avant.
            */}
            <span>
              {data.showCount
                ? t(data.count > 1 ? "testimonials.onGoogle" : "testimonials.onGoogleOne").replace("{n}", String(data.count))
                : t("testimonials.onGoogleNoCount")}
            </span>
            <ArrowUpRight size={14} className="shrink-0" />
          </a>
        </motion.div>

        {solo ? (
          <SoloReview review={data.reviews[0]} />
        ) : (
          /*
            Largeur bornée à 56 rem : au-delà, une ligne de citation dépasse les
            quatre-vingts caractères et redevient pénible à lire — on aurait
            échangé un bloc trop haut contre des lignes trop longues.
          */
          <motion.div
            className="mx-auto flex max-w-4xl flex-col gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {data.reviews.map((review) => (
              <ReviewBand key={review.id} review={review} />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}

/**
 * L'avis unique — carte centrée.
 *
 * Trois réglages font la proportion, et ils se tiennent : la citation passe à
 * 22 px, la carte est bornée à 38 rem, et le texte est équilibré
 * (`text-balance`). À cette largeur, 22 px donnent une soixantaine de
 * caractères par ligne — dans la fourchette confortable de lecture — et un avis
 * court occupe deux ou trois lignes au lieu de s'étaler en une seule ligne
 * maigre au milieu du vide. La carte reste plus large que haute sans être une
 * barre.
 *
 * ⚠️ Le contraste ne repose sur aucune paire nouvelle : citation en
 * `--foreground` sur `--surface`, mentions secondaires en `--muted` sur
 * `--surface`, étoiles en ambre selon le thème — les trois sont déjà employées
 * ailleurs dans cette section. La citation est même plus lisible qu'en bande,
 * où elle est en `--muted` : ici elle porte la section, elle prend la couleur
 * du texte principal.
 */
function SoloReview({ review }: { review: GoogleReview }) {
  const { t } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto max-w-[38rem] rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-9 text-center shadow-[0_16px_44px_-20px_var(--shadow-card)] sm:px-12 sm:py-12"
    >
      <div className="flex justify-center gap-1" aria-label={`${review.rating}/5`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={17} className={STAR_CLASS} />
        ))}
      </div>

      {/* `whitespace-pre-line` : les avis contiennent de vrais sauts de ligne. */}
      <p className="mt-6 text-balance whitespace-pre-line text-[1.1875rem] font-light leading-[1.6] tracking-tight text-[var(--foreground)] sm:text-[1.375rem]">
        &ldquo;{review.text}&rdquo;
      </p>

      {/*
        Une traduction automatique n'est pas la parole du client : on l'annonce
        plutôt que de la faire passer pour ses mots.
      */}
      {review.translated && (
        <p className="mt-4 text-[0.75rem] uppercase tracking-wide text-[var(--muted)]">
          {t("testimonials.translated")}
        </p>
      )}

      <div className="mx-auto mt-8 h-px w-12 bg-[var(--border)]" aria-hidden />

      {/*
        Auteur et attribution sur une seule ligne d'items, centrée : le bloc de
        signature reste compact au lieu d'ajouter trois étages centrés sous la
        citation. Le texte, lui, est aligné à gauche du monogramme — deux lignes
        centrées l'une sur l'autre feraient un « sapin ».
      */}
      <div className="mt-7 flex items-center justify-center gap-3 text-left">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/15 text-[1rem] font-semibold text-[var(--accent-soft)]">
          {review.author.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[0.9375rem] font-semibold text-[var(--foreground)]">
            {review.author}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-[var(--muted)]">
            <span>{review.age}</span>
            <span aria-hidden>·</span>
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-[var(--accent-soft)] hover:underline"
            >
              {t("testimonials.readOnGoogle")}
              <ArrowUpRight size={13} className="shrink-0" />
            </a>
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/** Un avis en bande pleine largeur — la mise en page dès qu'il y en a plusieurs. */
function ReviewBand({ review }: { review: GoogleReview }) {
  const { t } = useI18n();

  return (
    <motion.article
      variants={bandVariant}
      className="grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow hover:shadow-[0_12px_32px_-8px_var(--shadow-card)] sm:grid-cols-[12.5rem_1fr] sm:gap-8 sm:p-8"
    >
      {/*
        Auteur. `order` inversé sous 640 px : la citation repasse en premier et
        l'auteur revient dessous, en ligne — le format classique d'un
        témoignage, et le seul lisible quand la colonne de gauche n'a plus de
        largeur à occuper.
      */}
      <div className="order-2 flex items-center gap-3 sm:order-1 sm:flex-col sm:items-start sm:gap-3 sm:self-start sm:border-r sm:border-[var(--border)] sm:pr-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/15 text-[0.9375rem] font-semibold text-[var(--accent-soft)]">
          {review.author.charAt(0)}
        </div>
        <div className="min-w-0 sm:w-full">
          <p className="truncate text-[0.9375rem] font-semibold text-[var(--foreground)]">
            {review.author}
          </p>
          <p className="text-[0.75rem] text-[var(--muted)]">{review.age}</p>
        </div>
        <div className="ml-auto flex gap-0.5 sm:ml-0" aria-label={`${review.rating}/5`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={13} className={STAR_CLASS} />
          ))}
        </div>
      </div>

      {/* Citation */}
      <div className="order-1 flex min-w-0 flex-col gap-3 sm:order-2">
        {/* `whitespace-pre-line` : les avis contiennent de vrais sauts de ligne. */}
        <p className="whitespace-pre-line text-[1rem] leading-[1.75] text-[var(--muted)]">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          {/*
            Une traduction automatique n'est pas la parole du client : on
            l'annonce plutôt que de la faire passer pour ses mots. Le `span`
            vide garde le lien à droite quand il n'y en a pas.
          */}
          {review.translated ? (
            <span className="text-[0.75rem] uppercase tracking-wide text-[var(--muted)]">
              {t("testimonials.translated")}
            </span>
          ) : (
            <span />
          )}
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[0.8125rem] text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--accent-soft)] hover:underline"
          >
            {t("testimonials.readOnGoogle")}
            <ArrowUpRight size={13} className="shrink-0" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
