/**
 * Pages d'intention locale — contenu.
 *
 * Ces pages visent des requêtes que l'accueil ne peut pas viser sans se
 * cannibaliser : « refonte de site web », « site web restaurant Annecy »,
 * « site web artisan Annecy ». Chercher une refonte et chercher la création d'un
 * site ne se fait pas avec les mêmes mots, et une page qui essaie de répondre
 * aux deux répond mal aux deux.
 *
 * Elles sont volontairement **françaises uniquement** : une page optimisée pour
 * « artisan à Annecy » n'a pas d'équivalent anglais qui aurait du sens.
 * `localesFor` (i18n/config.ts) en tient compte pour les hreflang.
 *
 * Le contenu vit ici et pas dans le JSX, comme `offers.ts` ou `projects.ts` :
 * c'est du texte commercial, il se relit et se corrige sans toucher au rendu.
 *
 * ⚠️ Aucune affirmation qui ne soit pas déjà publique sur le site : les tarifs
 * et délais viennent de `offers.ts`, et les réalisations citées sont celles du
 * portfolio. Pas de chiffre de satisfaction, pas de nombre de clients.
 */

import type { PageKey } from "@/lib/seo";

export type LandingSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export type Landing = {
  /** Clé dans la table SEO — porte le title et la description. */
  seoKey: PageKey;
  path: string;
  eyebrow: string;
  /** Libellé court, pour les liens du pied de page. */
  navLabel: string;
  /** Titre H1. Contient la requête visée, sans la répéter mécaniquement. */
  h1: string;
  h1Accent: string;
  intro: string;
  sections: LandingSection[];
  /** Alimente aussi le JSON-LD `FAQPage` — d'où l'écriture en questions réelles. */
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
};

export const landings: Landing[] = [
  // ── Refonte ───────────────────────────────────────────────────────────
  {
    seoKey: "redesign",
    path: "/refonte-site-web",
    eyebrow: "Refonte",
    navLabel: "Refonte de site web",
    h1: "Refonte de site web à",
    h1Accent: "Annecy",
    intro:
      "Votre site existe déjà, mais il ne vous sert plus : trop lent, illisible sur téléphone, ou simplement plus à l'image de ce que vous faites aujourd'hui. Une refonte reprend le site à zéro sur le fond et la forme, en gardant ce qui marche déjà — à commencer par votre place dans Google.",
    sections: [
      {
        title: "Les signes qu'une refonte s'impose",
        body: "Un seul de ces points suffit à faire perdre des demandes tous les mois. Si vous en cochez trois, le site coûte plus qu'il ne rapporte.",
        bullets: [
          "Il faut zoomer et déplacer la page pour lire quoi que ce soit sur un téléphone",
          "Les pages mettent plus de deux ou trois secondes à s'afficher",
          "On ne vous trouve pas sur Google en cherchant votre métier et votre ville",
          "Les informations sont fausses : anciens horaires, ancien numéro, anciens tarifs",
          "Vous ne pouvez rien modifier sans rappeler celui qui l'a fait",
          "Il n'y a ni mentions légales ni page de confidentialité",
        ],
      },
      {
        title: "Garder le référencement acquis",
        body: "C'est la vraie peur d'une refonte, et elle est fondée : un site refait sans précaution disparaît des résultats pendant des mois. Je récupère la liste des adresses existantes, je fais pointer chacune vers sa nouvelle page par une redirection permanente, et je signale le nouveau plan du site à Google. Les pages qui étaient bien positionnées gardent leur adresse quand c'est possible. Le trafic ne repart pas de zéro.",
      },
      {
        title: "Comment ça se passe",
        bullets: [
          "On regarde ensemble le site actuel : ce qui doit rester, ce qui saute, ce qui manque",
          "Je reprends vos textes et vos photos, et je réécris ce qui doit l'être",
          "Vous validez une préversion en ligne, sur votre téléphone, avant que quiconque la voie",
          "Mise en ligne avec les redirections, le nom de domaine et l'hébergement — vous n'avez rien à faire",
        ],
      },
      {
        title: "Combien ça coûte",
        body: "Une refonte se facture comme une création, parce que c'est le même travail : à partir de 1 500 € pour un site de 3 à 5 pages, ou 700 € si une seule page suffit. Les tarifs sont publics et détaillés sur la page Offres — pas de devis opaque.",
      },
    ],
    faq: [
      {
        q: "Vais-je perdre ma position dans Google ?",
        a: "Non, si les redirections sont faites. Chaque ancienne adresse est redirigée vers la nouvelle page correspondante, ce qui transfère l'ancienneté et les liens existants. C'est inclus, pas une option.",
      },
      {
        q: "Combien de temps le site est-il indisponible ?",
        a: "Zéro. Le nouveau site est préparé sur une adresse de préversion, validé par vous, puis basculé sur votre nom de domaine. L'ancien reste en ligne jusqu'à la bascule.",
      },
      {
        q: "Puis-je garder mon nom de domaine et mes emails ?",
        a: "Oui. Le nom de domaine ne change pas, et les adresses email qui y sont rattachées continuent de fonctionner : elles ne dépendent pas du site.",
      },
      {
        q: "Et si je ne sais pas qui héberge mon site actuel ?",
        a: "C'est fréquent et ce n'est pas bloquant. Il suffit de retrouver l'accès au nom de domaine ; je m'occupe de retrouver et de récupérer le reste.",
      },
    ],
    ctaTitle: "Votre site mérite mieux",
    ctaBody:
      "Envoyez-moi l'adresse de votre site actuel : je vous dis ce qui coince et ce que je changerais. Réponse sous 24 h, sans engagement.",
  },

  // ── Restaurants ───────────────────────────────────────────────────────
  {
    seoKey: "restaurant",
    path: "/site-web-restaurant-annecy",
    eyebrow: "Restaurants",
    navLabel: "Site pour restaurant",
    h1: "Site web pour restaurant à",
    h1Accent: "Annecy",
    intro:
      "Un client qui cherche où manger ce soir décide en moins d'une minute, sur son téléphone, souvent depuis Google Maps. Un site de restaurant a un seul travail : répondre à ses quatre questions avant qu'il ne passe au restaurant suivant.",
    sections: [
      {
        title: "Les quatre questions qui décident",
        body: "Dans cet ordre, et c'est tout. Le reste est du décor.",
        bullets: [
          "Qu'est-ce qu'on mange, et à quel prix — la carte, à jour, lisible sans zoomer",
          "C'est ouvert quand — les horaires, y compris les jours de fermeture",
          "C'est où — l'adresse, avec l'itinéraire en un geste",
          "Comment je réserve — un numéro cliquable, ou un formulaire",
        ],
      },
      {
        title: "Une carte que vous modifiez sans m'appeler",
        body: "La carte change : un plat qui sort, un prix qui bouge, un menu du midi. Elle vit dans un fichier prévu pour ça, séparé du reste du site. Vous m'envoyez la modification par email et c'est en ligne dans la journée — c'est ce que couvre la maintenance à 90 €/mois, sans engagement. Si vous préférez la gérer vous-même, on en parle au cadrage.",
      },
      {
        title: "La fiche Google, aussi importante que le site",
        body: "À Annecy, beaucoup de clients ne verront jamais votre site : ils liront votre fiche Google Maps. Je la crée ou la reprends, et je la relie au site — mêmes horaires, mêmes photos, même adresse partout. Deux informations qui se contredisent, et Google fait moins confiance aux deux.",
      },
      {
        title: "La version anglaise, autour du lac",
        body: "Annecy vit du tourisme, et une partie de vos clients ne lisent pas le français. La version anglaise du site est une option à 490 € — c'est souvent ce qui fait la différence entre être choisi et être passé.",
      },
      {
        title: "Tarifs et délai",
        body: "À partir de 700 € pour une page complète avec carte, horaires et contact, livrée en 5 à 7 jours ouvrés. À partir de 1 500 € pour un site de plusieurs pages, avec le référencement local travaillé et la fiche Google. Tarifs publics, détaillés sur la page Offres.",
      },
    ],
    faq: [
      {
        q: "Je change ma carte souvent, c'est un problème ?",
        a: "Non, c'est prévu. La carte est stockée à part du reste du site : la modifier ne demande pas de retoucher le design. Vous envoyez la nouvelle version par email, elle est en ligne dans la journée.",
      },
      {
        q: "Peut-on prendre les réservations en ligne ?",
        a: "Oui, c'est une option à partir de 390 €. Beaucoup de restaurants s'en passent au départ : un numéro cliquable depuis un téléphone suffit souvent, et coûte moins cher à faire vivre.",
      },
      {
        q: "J'ai déjà une page Facebook, ça ne suffit pas ?",
        a: "Elle aide, mais elle ne remplace pas un site : vous ne maîtrisez ni son apparence, ni sa place dans Google, ni ce qui s'affiche à côté. Un site vous appartient et se positionne sur « restaurant » plus votre quartier.",
      },
      {
        q: "En combien de temps le site est-il en ligne ?",
        a: "5 à 7 jours ouvrés pour une page complète, 2 à 3 semaines pour un site de plusieurs pages. Le délai court à partir du moment où j'ai les photos et la carte.",
      },
    ],
    ctaTitle: "Remplir la salle, pas le site",
    ctaBody:
      "Dites-moi où vous en êtes — carte, photos, fiche Google. Je vous dis ce qui manque et ce que ça coûte. Réponse sous 24 h.",
  },

  // ── Artisans / TPE ────────────────────────────────────────────────────
  {
    seoKey: "artisan",
    path: "/site-web-artisan-annecy",
    eyebrow: "Artisans & TPE",
    navLabel: "Site pour artisan",
    h1: "Site web pour artisan à",
    h1Accent: "Annecy",
    intro:
      "Vous travaillez par le bouche-à-oreille et ça marche. Le problème, c'est tous ceux qui ne vous connaissent pas encore et qui tapent votre métier suivi d'« Annecy » dans Google. S'ils ne vous trouvent pas, ils appellent quelqu'un d'autre — et vous ne saurez jamais que l'appel a existé.",
    sections: [
      {
        title: "Être trouvé sur son métier et sa ville",
        body: "C'est tout l'enjeu, et ce n'est pas le même travail que d'avoir « un site ». Une page qui parle de vous en général ne se positionne sur rien. Une page par prestation, avec la zone couverte et des mots que les clients emploient vraiment, se positionne sur chacune.",
        bullets: [
          "Une page par prestation, plutôt qu'une liste sur la page d'accueil",
          "Les communes que vous desservez, nommées",
          "Votre fiche Google Business créée et reliée au site",
          "Le téléphone cliquable, en haut de chaque page",
        ],
      },
      {
        title: "Vous n'avez rien à préparer",
        body: "Pas de cahier des charges à rédiger, pas de textes à écrire. On se parle une fois, je pose les questions, et je m'occupe du reste : structure, textes, mise en page, mise en ligne. Vous validez une préversion sur votre téléphone avant que le site soit public.",
      },
      {
        title: "Des photos de vos chantiers valent tous les arguments",
        body: "C'est ce qui convainc, plus que n'importe quel texte. Des photos prises au téléphone suffisent — je m'occupe du cadrage et du poids des images. Si vous n'en avez pas encore, on démarre sans et on les ajoute ensuite.",
      },
      {
        title: "Sans avancer 700 € d'un coup",
        body: "La location existe pour ça : 200 € de mise en route puis 79 €/mois tout compris — hébergement, nom de domaine, maintenance et vos petites modifications — sur 24 mois. À noter, et c'est important : en location le site reste ma propriété. Vous pouvez le racheter au terme des 24 mois pour 500 €. À l'achat, il est à vous dès la livraison.",
      },
    ],
    faq: [
      {
        q: "Je n'ai pas de logo, ni de photos. C'est bloquant ?",
        a: "Non. On part de ce que vous avez, même si c'est peu : le design s'appuie sur vos couleurs et vos matières. Les photos peuvent s'ajouter après la mise en ligne, c'est prévu dans les retouches.",
      },
      {
        q: "Combien de temps je vais devoir y consacrer ?",
        a: "Un rendez-vous de cadrage, puis une relecture de la préversion. C'est tout. Je pose les questions et je rédige — vous n'avez pas de texte à fournir.",
      },
      {
        q: "Location ou achat ?",
        a: "L'achat coûte moins cher au total et le site est à vous immédiatement. La location évite d'avancer la somme et inclut la maintenance. Sur 24 mois de location vous payez plus qu'à l'achat, et le site ne devient le vôtre qu'en le rachetant au terme.",
      },
      {
        q: "Et une fois le site en ligne, je fais comment pour le modifier ?",
        a: "Vous m'écrivez, je le fais. C'est ce que couvre la maintenance : 90 €/mois sans engagement, ou 70 €/mois sur un an, avec deux heures de modifications par mois incluses.",
      },
    ],
    ctaTitle: "Vos futurs clients vous cherchent déjà",
    ctaBody:
      "Dites-moi votre métier et les communes que vous couvrez. Je vous dis sur quelles recherches il est réaliste de vous positionner. Réponse sous 24 h, sans engagement.",
  },
];

export function getLanding(path: string): Landing | undefined {
  return landings.find((l) => l.path === path);
}
