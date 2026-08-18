import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/blog";
import { entryPrice, formatEuros, hosting, maintenance } from "@/lib/offers";

/**
 * Les tarifs cités sont DÉRIVÉS de `lib/offers.ts`, jamais recopiés.
 *
 * Les deux premiers articles écrivaient les prix en toutes lettres : le
 * passage de la Page Vitrine Rapide à 900 € a obligé à repasser à la main
 * dans trois fichiers rédactionnels, avec le risque qu'un article publié
 * contredise la page /offres. Ici, un changement de tarif se propage seul.
 */
function Content() {
  return (
    <>
      <p>
        Vous avez décidé de faire un site. Reste la question qui bloque souvent
        plusieurs semaines : à qui le confier ? À Annecy, vous trouverez des
        agences installées, des développeurs indépendants, des plateformes en
        ligne — et des discours qui se contredisent d’un rendez-vous à l’autre.
      </p>
      <p>
        Autant l’annoncer tout de suite :{" "}
        <strong>je suis développeur web freelance à Annecy</strong>, donc j’ai
        un intérêt évident dans la réponse. C’est précisément pour ça que je
        commence par les cas où une agence est le meilleur choix — et ils
        existent. Ce qui suit est le raisonnement que je tiendrais à un ami qui
        me pose la question sans rien vouloir m’acheter.
      </p>

      <h2 id="difference-reelle">
        Ce qui change vraiment — et ce qui ne change pas
      </h2>
      <p>
        La différence entre un freelance et une agence n’est ni la qualité, ni
        la technologie. C’est la <strong>structure</strong>.
      </p>

      <Image
        src="/images/blog/freelance-ou-agence-web-annecy.webp"
        alt="Deux structures de verre violet côte à côte : un empilement de blocs et une colonne unique"
        width={1376}
        height={768}
        className="h-auto w-full"
        sizes="(max-width: 720px) 100vw, 720px"
      />

      <p>
        <strong>Dans une agence</strong>, plusieurs personnes se répartissent le
        travail : un chef de projet, un graphiste, un développeur, parfois un
        rédacteur et un spécialiste du référencement. Vous parlez le plus
        souvent au chef de projet, qui transmet. C’est une organisation faite
        pour traiter plusieurs dossiers en parallèle, et pour continuer de
        tourner quand quelqu’un part en vacances ou quitte l’entreprise.
      </p>
      <p>
        <strong>Chez un freelance</strong>, la même personne cadre le projet,
        dessine les pages, écrit le code, met en ligne et répond au téléphone
        six mois plus tard. Aucun intermédiaire : ce que vous dites arrive
        directement à celui qui exécute, et ce qu’il vous répond n’a pas été
        reformulé en chemin.
      </p>
      <p>
        Ce qui <strong>ne change pas</strong> mérite d’être dit, parce que c’est
        là que se nichent la plupart des arguments de vente douteux : les outils
        sont les mêmes, l’hébergement est le même, les règles du référencement
        sont les mêmes, et les obligations légales aussi. Personne ne détient
        une technologie que l’autre n’aurait pas. Vous n’achetez pas une
        technique différente — vous achetez une{" "}
        <strong>organisation</strong> différente.
      </p>

      <h2 id="combien-ca-coute">Les budgets réellement pratiqués</h2>
      <p>
        Pour un site vitrine, les ordres de grandeur sont assez stables :
      </p>
      <ul>
        <li>
          <strong>Plateforme en ligne (Wix, Squarespace…) : 100 € à 300 € par
          an.</strong>{" "}
          Le moins cher à l’achat, payé en temps passé et en résultat générique.
        </li>
        <li>
          <strong>Développeur freelance : 800 € à 3 000 €.</strong> Autour
          d’Annecy, les tarifs affichés par les prestataires locaux sur du site
          vitrine s’étalent d’environ 490 € à 1 850 €.
        </li>
        <li>
          <strong>Agence web : 3 000 € à 10 000 €</strong>, et bien au-delà pour
          un projet incluant image de marque, contenus et campagnes.
        </li>
      </ul>
      <p>
        L’écart n’est pas de la marge : c’est du coût réel. Une agence porte des
        locaux, des salaires, un commercial et un chef de projet — des charges
        qu’un indépendant n’a pas. Pour un projet à plusieurs métiers, cette
        structure est ce que vous payez et ce dont vous avez besoin. Pour un
        site vitrine d’artisan ou de restaurant, elle est surdimensionnée.
      </p>
      <p>
        Le détail des postes qui font varier un devis — nombre de pages,
        rédaction, photos, version anglaise, frais récurrents — est dans mon
        article{" "}
        <Link href="/blog/combien-coute-site-vitrine-annecy-2026">
          combien coûte un site vitrine à Annecy
        </Link>
        .
      </p>

      <h2 id="quand-choisir-agence">Quand une agence est le bon choix</h2>
      <p>
        Quatre situations où je vous conseillerais sincèrement d’aller voir une
        agence plutôt que moi :
      </p>
      <ul>
        <li>
          <strong>Plusieurs métiers en même temps.</strong> Si vous avez besoin
          d’une identité visuelle complète, d’un site, de campagnes payantes, de
          photos et de vidéos, coordonnés sur le même trimestre, une structure
          qui héberge ces métiers en interne vous fera gagner du temps.
        </li>
        <li>
          <strong>Un gros volume dans un délai court.</strong> Quarante pages à
          produire en trois semaines, c’est une affaire d’effectif, pas de
          talent. Une personne seule ne plie pas le temps.
        </li>
        <li>
          <strong>Une exigence de continuité contractuelle.</strong> Certains
          appels d’offres, marchés publics ou grands comptes imposent une
          société avec plusieurs salariés, une assurance spécifique ou des
          engagements de service. C’est un critère administratif, et il ne se
          négocie pas.
        </li>
        <li>
          <strong>Vous voulez une garantie de remplacement.</strong> Si la
          personne qui s’occupe de votre site tombe malade, une agence a
          quelqu’un d’autre. Un indépendant, non — et c’est un vrai point
          faible, sur lequel je reviens plus bas.
        </li>
      </ul>
      <p>
        Si vous cochez deux de ces quatre cases, prenez une agence. Y compris si
        le courant passe mieux avec un freelance : le courant ne compense pas
        une contrainte structurelle.
      </p>

      <h2 id="quand-choisir-freelance">Quand un freelance est le bon choix</h2>

      <Image
        src="/images/blog/freelance-ou-agence-web-annecy-interlocuteurs.webp"
        alt="Une chaîne de petites sphères de verre reliées en série, face à une sphère unique reliée directement"
        width={1376}
        height={768}
        className="h-auto w-full"
        sizes="(max-width: 720px) 100vw, 720px"
      />

      <p>
        À l’inverse, quatre signes que votre projet n’a pas besoin d’une
        structure :
      </p>
      <ul>
        <li>
          <strong>Le projet tient dans une tête.</strong> Un site vitrine de une
          à huit pages ne demande pas de coordination : le découper entre quatre
          personnes crée du travail de coordination, pas de la qualité.
        </li>
        <li>
          <strong>Vous voulez parler à celui qui fait.</strong> C’est le point
          le plus sous-estimé. Expliquer votre métier à quelqu’un qui va le
          reformuler pour un développeur qu’on ne vous présentera jamais, ça se
          voit dans le résultat.
        </li>
        <li>
          <strong>Vous avez des modifications régulières et minuscules.</strong>{" "}
          Un prix qui bouge, un horaire d’été, une photo à changer. Chez un
          indépendant, c’est un email et c’est en ligne dans la journée. Dans
          une structure, la même demande passe par un ticket, un devis, un
          planning.
        </li>
        <li>
          <strong>Votre budget est celui d’une TPE.</strong> Sans que ça
          signifie renoncer au sur mesure : mes tarifs démarrent à{" "}
          {formatEuros(entryPrice)} € et ils sont publics, ce qui n’est pas la
          norme dans ce métier.
        </li>
      </ul>
      <p>
        Le point faible d’un indépendant, il faut le regarder en face :{" "}
        <strong>il n’y a qu’une personne</strong>. Une grippe, un congé, une
        surcharge, et votre demande attend. La bonne question à poser n’est donc
        pas « êtes-vous disponible ? » — tout le monde répond oui — mais « que
        se passe-t-il si vous êtes indisponible deux semaines, et qui a les
        accès à mon site dans ce cas ? ».
      </p>

      <h2 id="le-vrai-risque">Le vrai risque n’est ni le prix ni la taille</h2>
      <p>
        Le problème que je vois le plus souvent n’a en réalité rien à voir avec
        le choix freelance ou agence. C’est celui-ci :{" "}
        <strong>ne plus pouvoir récupérer son propre site.</strong>
      </p>
      <blockquote>
        Le prestataire ne répond plus, le nom de domaine a été déposé à son nom,
        l’hébergement est sur un compte dont vous n’avez pas les accès — et vous
        repartez de zéro, en perdant l’adresse que vos clients connaissent.
      </blockquote>
      <p>
        C’est une situation banale, et elle arrive aussi bien avec une agence
        qu’avec un indépendant. Trois précautions suffisent à l’éviter, et elles
        se vérifient <strong>avant</strong> de signer :
      </p>
      <ul>
        <li>
          <strong>Le nom de domaine doit être déposé à votre nom</strong>, pas à
          celui du prestataire. C’est l’adresse de votre entreprise : elle vous
          appartient. C’est la règle chez moi, et elle est écrite sur ma page
          offres.
        </li>
        <li>
          <strong>Vous devez pouvoir obtenir les accès</strong> à l’hébergement
          et au domaine sur simple demande, sans avoir à négocier.
        </li>
        <li>
          <strong>Ce que vous emportez en partant doit être écrit</strong>, pas
          promis à l’oral.
        </li>
      </ul>
      <p>
        Un mot sur les formules dites « clé en main » à quelques dizaines
        d’euros par mois, très proposées aux artisans par démarchage
        téléphonique : ce sont souvent des <strong>locations</strong> sur 36 ou
        48 mois, présentées comme des achats. Au terme, le site n’est pas à
        vous, et son arrêt vous ramène à zéro.
      </p>
      <p>
        La location n’est pas un piège en soi — je propose moi-même une formule
        en location, parce qu’elle évite d’avancer plusieurs centaines d’euros
        d’un coup. Ce qui distingue une location saine d’un piège, c’est la
        transparence de trois chiffres. Demandez-les, à moi comme à n’importe
        qui : <strong>combien par mois, pendant combien de mois, et combien
        pour racheter le site à la fin.</strong> Les miens sont affichés sur ma
        page <Link href="/offres">offres</Link>. Si votre interlocuteur ne peut
        pas vous donner les trois, vous savez ce qu’il vous reste à faire.
      </p>

      <h2 id="questions-a-poser">Les sept questions à poser avant de signer</h2>

      <Image
        src="/images/blog/freelance-ou-agence-web-annecy-questions.webp"
        alt="Sept plaques de verre violet alignées en arc, éclairées une à une par un faisceau"
        width={1376}
        height={768}
        className="h-auto w-full"
        sizes="(max-width: 720px) 100vw, 720px"
      />

      <p>
        Elles valent pour une agence comme pour un indépendant. Les réponses
        vous apprendront plus que n’importe quel portfolio.
      </p>
      <ul>
        <li>
          <strong>Qui va réellement écrire le site, et est-ce que je lui
          parlerai ?</strong>{" "}
          Une réponse évasive est déjà une réponse.
        </li>
        <li>
          <strong>Le nom de domaine sera-t-il déposé à mon nom ?</strong> La
          question qui règle à elle seule le risque décrit plus haut.
        </li>
        <li>
          <strong>Qu’est-ce que je paie en plus du site, et tous les
          ans ?</strong>{" "}
          L’hébergement et le nom de domaine ont un coût récurrent, toujours.
          Chez moi c’est {hosting.monthly} €/mois, facturé{" "}
          {formatEuros(hosting.yearly)} € à l’année, dès la mise en ligne et
          annoncé sur la page offres. Un prestataire qui répond « rien » ne
          l’a pas chiffré.
        </li>
        <li>
          <strong>Si je change de prestataire dans deux ans, qu’est-ce que
          j’emporte ?</strong>{" "}
          Le domaine, les contenus, les photos, le site lui-même : faites
          préciser, point par point.
        </li>
        <li>
          <strong>Combien de temps pour changer un texte, et est-ce
          facturé ?</strong>{" "}
          C’est ce que vous vivrez au quotidien, bien plus que la mise en ligne.
          Une maintenance sérieuse s’annonce en heures et en délai — la mienne
          est à {maintenance.flex} €/mois sans engagement.
        </li>
        <li>
          <strong>Puis-je voir trois sites livrés, en ligne, et appeler un de
          ces clients ?</strong>{" "}
          Des maquettes ne prouvent rien. Un site en ligne depuis deux ans, si.
        </li>
        <li>
          <strong>Vos prix sont-ils publics ?</strong> Ils ne le sont quasiment
          jamais. Ça ne disqualifie personne, mais un devis construit devant
          vous, à partir d’une grille affichée, se discute d’égal à égal.
        </li>
      </ul>

      <h2 id="et-si-je-le-fais-moi-meme">Et si je le fais moi-même ?</h2>
      <p>
        C’est une option légitime, et parfois la bonne : pour tester une idée,
        occuper une adresse ou dépanner le temps d’un lancement, une plateforme
        en ligne fait le travail pour quelques centaines d’euros par an.
      </p>
      <p>
        Ses limites apparaissent plus tard : un rendu qui ressemble à celui du
        voisin, un référencement local difficile à travailler finement, et
        surtout du temps — beaucoup de temps — pris sur votre métier. Si votre
        site doit vous ramener des clients plutôt que simplement exister, c’est
        là que le calcul bascule.
      </p>

      <h2 id="conclusion">La question à se poser, finalement</h2>
      <p>
        Freelance ou agence, ce n’est pas tout à fait la bonne question. La
        bonne, c’est :{" "}
        <strong>
          qui répondra au téléphone dans deux ans, et qu’est-ce que je possède
          vraiment ?
        </strong>{" "}
        Un projet à plusieurs métiers ou à gros volume appelle une agence. Un
        site vitrine qui doit être trouvé sur « votre métier + Annecy », tenu à
        jour et modifiable en une journée appelle un indépendant.
      </p>
      <p>
        Si vous en êtes là, vous trouverez mes tarifs — publics — sur ma page{" "}
        <Link href="/offres">offres</Link>, des sites livrés et en ligne dans
        mes <Link href="/projets">réalisations</Link>, et les délais réels dans
        l’article{" "}
        <Link href="/blog/combien-de-temps-pour-creer-un-site-internet">
          combien de temps faut-il pour créer un site internet
        </Link>
        . Et si vous voulez me poser les sept questions ci-dessus, la page{" "}
        <Link href="/contact">contact</Link> est faite pour ça : réponse sous
        24 h, sans engagement.
      </p>
    </>
  );
}

export const article: Article = {
  slug: "freelance-ou-agence-web-annecy",
  title: "Freelance ou agence web à Annecy : comment choisir ?",
  excerpt:
    "Ce qui change vraiment entre un indépendant et une agence, les budgets réellement pratiqués autour d’Annecy, et les sept questions à poser avant de signer.",
  metaTitle: "Freelance ou agence web à Annecy : comment choisir",
  metaDescription:
    "Freelance ou agence web à Annecy ? Les différences réelles, les budgets pratiqués et les 7 questions à poser avant de confier son site à un prestataire.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  author: "Adil",
  keywords: [
    "freelance ou agence web",
    "agence web Annecy",
    "développeur web freelance Annecy",
    "choisir prestataire site internet",
    "création site internet Annecy",
  ],
  image: {
    src: "/images/blog/freelance-ou-agence-web-annecy.webp",
    alt: "Deux structures de verre violet face à face — le choix entre un freelance et une agence web",
  },
  readingMinutes: 9,
  Content,
};
