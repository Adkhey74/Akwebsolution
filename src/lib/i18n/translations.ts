/**
 * Traductions du site — même structure que le projet HernTaxi :
 * un seul objet `as const`, une clé par langue, sections imbriquées,
 * valeurs de type string ou string[].
 *
 * Accès via `t("section.cle")` (cf. context.tsx). Le français est la langue
 * de repli : toute clé absente en anglais retombe automatiquement sur le FR.
 */

export const translations = {
  fr: {
    // ── Header ──────────────────────────────────────────────────────────
    header: {
      home: "Accueil",
      projects: "Réalisations",
      offers: "Offres",
      blog: "Blog",
      about: "À propos",
      contact: "Contact",
      contactLong: "Nous contacter",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      mainNav: "Navigation principale",
      mobileNav: "Navigation mobile",
      menuLabel: "Menu de navigation",
      seeOffers: "Voir les offres",
      menuFooter: "Tarifs transparents · Sans engagement",
      appearance: "Apparence",
      language: "Langue",
      themeToggle: "Basculer entre le thème clair et le thème sombre",
      themeToggleShort: "Changer de thème",
    },

    // ── Hero ────────────────────────────────────────────────────────────
    hero: {
      badge: "Agence Web à Annecy · Sites sur mesure",
      title1: "Des sites web",
      titleAccent: "élégants",
      title2: "qui vous ressemblent",
      subtitle:
        "Développeur web freelance à Annecy. Sites rapides, clairs et adaptés à votre activité — une présence en ligne professionnelle, à votre image, en Haute-Savoie et partout en France.",
      ctaPrimary: "Démarrer mon projet",
      ctaSecondary: "Voir nos services",
      trust: ["Tarifs transparents", "Sans engagement", "Livraison rapide"],
      statExperience: "ans d'expérience",
      statClients: "Clients satisfaits",
      statResponse: "Délai de réponse",
    },

    // ── Services ────────────────────────────────────────────────────────
    services: {
      eyebrow: "Prestations",
      title1: "Tout ce qu'il faut pour",
      titleAccent: "réussir en ligne",
      intro:
        "Chaque prestation est pensée pour votre projet, de la conception jusqu'à la mise en ligne.",
      showcaseTitle: "Sites vitrines",
      showcaseDesc:
        "Présentez votre activité avec un site clair, moderne et responsive, conçu pour convertir vos visiteurs en clients.",
      responsiveTitle: "Design responsive",
      responsiveDesc:
        "Une expérience optimale sur tous les écrans : mobile, tablette et desktop, sans compromis.",
      perfTitle: "Performance",
      perfDesc:
        "Sites rapides et légers pour un meilleur référencement, une meilleure expérience et plus de conversions.",
      brandTitle: "Identité visuelle",
      brandDesc:
        "Design sur mesure aligné avec votre charte et votre image de marque pour vous démarquer.",
      seoTitle: "SEO",
      seoDesc:
        "Bases SEO solides pour améliorer votre visibilité dans les moteurs de recherche dès le lancement.",
      maintenanceTitle: "Maintenance",
      maintenanceDesc:
        "Mises à jour, sauvegardes et suivi pour un site toujours à jour, sécurisé et performant.",
    },

    // ── Réalisations (aperçu page d'accueil) ────────────────────────────
    work: {
      eyebrow: "Réalisations",
      title1: "Ce que nous avons",
      titleAccent: "déjà créé",
      seeAll: "Voir toutes les réalisations",
      caseStudy: "Voir l'étude de cas",
      caseStudyOf: "Voir l'étude de cas",
      liveSite: "Voir le site en ligne",
    },

    // Champs traduisibles des études de cas, indexés par slug.
    // La donnée non traduisible (images, année, url) reste dans lib/projects.ts.
    projects: {
      orbitgroup: {
        category: "Site vitrine premium",
        client: "Orbit Group — Sécurité & mobilité de dirigeants",
        sector: "Protection rapprochée & mobilité (executive protection)",
        summary:
          "Site vitrine premium et confidentiel pour un partenaire de sécurité et de mobilité au service des family offices, dirigeants et grands principaux. Design sombre, discret et haut de gamme, couverture internationale et prise de contact confidentielle.",
        tags: ["Sécurité", "Site vitrine premium", "Corporate"],
        challenge:
          "S'adresser à une clientèle très exigeante (family offices, dirigeants) exige d'inspirer une confiance absolue et de dégager du prestige, tout en restant d'une discrétion totale. Le site devait présenter les services, afficher une présence internationale crédible et offrir un canal de contact confidentiel — sans jamais exposer d'informations sensibles.",
        solution: [
          "Direction artistique sombre, sobre et luxueuse, qui traduit discrétion et précision opérationnelle.",
          "Structure claire : À propos, Services, Couverture, Réseau et Contact.",
          "Parcours de « demande confidentielle » dédié, mis en avant dès l'en-tête.",
          "Présence internationale matérialisée par une carte et des coordonnées (Paris, Genève, Nice, Monaco, Londres…).",
          "Animations fluides et haut de gamme, site rapide et 100 % responsive.",
        ],
        results: [
          "Une image en ligne à la hauteur d'un positionnement premium et confidentiel.",
          "Un canal de demande confidentielle clair et rassurant.",
          "Une couverture internationale mise en valeur.",
        ],
      },
      kabuki: {
        category: "Site vitrine",
        client: "Kabuki — Restaurant japonais",
        sector: "Restauration",
        summary:
          "Site vitrine pour un restaurant japonais : une carte appétissante, les incontournables mis en avant et la réservation en ligne, le tout dans une ambiance élégante et responsive.",
        tags: ["Restaurant", "Site vitrine", "Réservation"],
        challenge:
          "Le restaurant n'avait pas de présence en ligne à la hauteur de sa cuisine. Il fallait un site qui donne envie dès la première seconde, présente clairement le menu, mette en avant les plats signatures et permette de réserver sans friction — accessible aussi bien sur mobile qu'en salle.",
        solution: [
          "Design sur mesure, sombre et raffiné, qui reflète l'ambiance du restaurant.",
          "Page menu structurée et lisible, avec les incontournables mis en avant.",
          "Réservation en ligne intégrée directement dans le parcours.",
          "100 % responsive — pensé mobile d'abord, car la majorité des recherches restaurant se font sur téléphone.",
          "Bases SEO local pour être trouvé sur « restaurant japonais » dans sa zone.",
        ],
        results: [
          "Une vitrine en ligne professionnelle, à l'image de la cuisine.",
          "Réservation en ligne disponible 24h/24.",
          "Site rapide, visible sur Google dès le lancement.",
        ],
      },
      herntaxi: {
        category: "Site vitrine multi-pages",
        client: "HernTaxi — Société de taxi",
        sector: "Transport de personnes",
        summary:
          "Site vitrine multi-pages pour une société de taxi en Savoie : présentation des services (réservation, transferts vers les stations de ski, transport CPAM), pages dédiées et référencement local soigné.",
        tags: ["Site vitrine", "Multi-pages", "SEO"],
        challenge:
          "L'activité couvre plusieurs prestations très différentes (courses classiques, transferts stations de ski, transport médical CPAM). Il fallait une structure claire, une page par service pour bien se référencer, et un site qui inspire confiance à des clients pressés, souvent sur mobile.",
        solution: [
          "Architecture multi-pages avec une page dédiée par prestation (mieux référencée qu'une page unique).",
          "Mise en avant de la réservation et des coordonnées à chaque étape.",
          "Contenu et structure optimisés pour le SEO local (recherches « taxi » + zone).",
          "Design responsive et rapide, pensé pour une prise de décision immédiate.",
        ],
        results: [
          "Chaque service dispose de sa propre page, ciblée pour Google.",
          "Parcours de réservation clair et accessible sur mobile.",
          "Site en ligne : herntaxi.fr.",
        ],
      },
      thermochrono: {
        category: "Site e-commerce",
        client: "ThermoChrono — Boutique en ligne",
        sector: "E-commerce",
        summary:
          "Boutique e-commerce de gourdes connectées affichant la température en temps réel : catalogue produits, panier, paiement sécurisé (CB, Apple Pay) et livraison rapide.",
        tags: ["E-commerce", "Paiement sécurisé", "Responsive"],
        challenge:
          "Lancer une vraie boutique en ligne autour d'un produit innovant : présenter le produit de façon désirable, rassurer sur le paiement, et proposer un tunnel d'achat fluide qui convertit — sans intermédiaire ni commission.",
        solution: [
          "Boutique complète : catalogue, fiches produit soignées, panier et tunnel de commande.",
          "Paiement en ligne sécurisé (Visa, Mastercard, Apple Pay).",
          "Fiches produit orientées conversion, mise en avant de la valeur du produit.",
          "Design responsive et rapide, bases SEO pour attirer du trafic.",
        ],
        results: [
          "Boutique opérationnelle 24h/24, vente en direct sans intermédiaire.",
          "Tunnel d'achat fluide et paiement sécurisé.",
          "Site en ligne : thermochrono.fr.",
        ],
      },
    },

    // ── Méthode / budget ────────────────────────────────────────────────
    method: {
      eyebrow: "Méthode",
      title1: "Comment ça",
      titleAccent: "se passe",
      intro:
        "Pas besoin de connaître les sites web. Trois étapes, et vous savez à chaque instant où en est votre projet.",
      step1Title: "Cadrage",
      step1Lead: "On définit ensemble",
      step1Body:
        "Vos pages, vos textes, et ce que vos clients doivent trouver en premier. Vous n'avez rien à préparer — je pose les questions.",
      step2Title: "Conception",
      step2Lead: "Vous validez avant publication",
      step2Body:
        "Je conçois le site et vous le montre sur une préversion en ligne : le vrai site, sur votre téléphone, avant que qui que ce soit puisse le voir.",
      step3Title: "Mise en ligne",
      step3Lead: "Je m'occupe de la technique",
      step3Body:
        "Nom de domaine, hébergement, référencement Google, mentions légales. Puis je reste joignable pour vos retouches.",
      budgetLabel: "Budget",
      budgetFrom: "à partir de",
      budgetNote:
        "Le tarif dépend du nombre de pages et de ce que le site doit faire. Je vous dis laquelle des trois offres vous convient — gratuitement, avant tout engagement. Livraison de 5 jours à 3 semaines.",
      ctaTalk: "Parlons de votre projet",
      ctaDetails: "Voir le détail des offres",
      maintenanceNote:
        "Maintenance en option à partir de 70 €/mois — hébergement, sauvegardes et vos modifications faites pour vous.",
    },

    // ── À propos (aperçu) ───────────────────────────────────────────────
    about: {
      eyebrow: "Qui suis-je",
      title1: "Un développeur",
      titleAccent: "à votre écoute",
      body: "développeur web freelance basé en France. J'accompagne les indépendants et petites entreprises qui veulent une présence en ligne claire, professionnelle et efficace — du sur mesure, du début à la fin.",
      bodyIntro: "Je m'appelle",
      credentials: ["Basé en France", "Next.js · React", "Réponse sous 24 h"],
      more: "En savoir plus sur moi",
      photoAlt: "Adil — Créateur AKWebSolution",
    },

    // ── Contact ─────────────────────────────────────────────────────────
    contact: {
      eyebrow: "Passons à l'action",
      title1: "Parlons de",
      titleAccent: "votre projet",
      reassurance: "Réponse sous 24 h · Tarifs transparents · Sans engagement",
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.fr",
      projectType: "Type de projet",
      projectTypePlaceholder: "Sélectionner (optionnel)",
      /** Rappel de la formule choisie sur /offres, si le visiteur vient de là. */
      presetLabel: "Formule sélectionnée",
      projectTypes: [
        "Page Vitrine Rapide",
        "Site Vitrine Complet",
        "Site Pro & Sur Mesure",
        "Autre / Je ne sais pas encore",
      ],
      message: "Message",
      messagePlaceholder: "Décrivez votre projet, vos besoins, vos questions…",
      consent:
        "J'accepte que mes informations soient utilisées pour être recontacté(e). Voir la",
      consentLink: "politique de confidentialité",
      error:
        "Vérifiez votre nom, un email valide, votre message et le consentement — ou écrivez à contact@akwebsolutions.fr",
      orWhatsApp: "Ou par WhatsApp :",
      submit: "Envoyer le message",
      submitting: "Envoi…",
      successTitle: "Message envoyé !",
      successBody: "Je vous réponds dans les 24 h. À très bientôt.",
      successAgain: "Envoyer un autre message",
    },

    // ── Footer ──────────────────────────────────────────────────────────
    footer: {
      keywords: [
        "Sites vitrines",
        "Sur mesure",
        "Design responsive",
        "SEO",
        "Performance",
        "Next.js",
        "Identité visuelle",
        "Tarifs transparents",
        "Livraison rapide",
      ],
      tagline:
        "Création de sites web sur mesure, élégants et performants pour votre activité.",
      navTitle: "Navigation",
      servicesTitle: "Prestations",
      services: [
        "Sites vitrines",
        "Design responsive",
        "Performance & SEO",
        "Identité visuelle",
        "Maintenance",
      ],
      startTitle: "Démarrer",
      startBody: "Un projet en tête ? Tarifs transparents, réponse sous 24 h.",
      seeOffers: "Voir les offres",
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      credit: "Conçu & développé par AKWebSolution",
      location: "Annecy · Haute-Savoie · France",
      footerNav: "Navigation footer",
    },

    // ── Page Offres ─────────────────────────────────────────────────────
    offers: {
      title: "Des offres claires, à votre mesure",
      intro:
        "Pas besoin de connaître les sites web — on s'occupe de tout. Choisissez ce qui correspond à votre situation, on fait le reste.",
      from: "À partir de",
      deliveryIn: "Livraison en",
      deliveryCustom: "Délai :",
      includesPrefix: "Tout ce qui est inclus dans",
      includesSuffix: ", plus :",
      choose: "Choisir cette offre",
      popular: "Populaire",
      optionsEyebrow: "À la carte",
      optionsTitle1: "Complétez votre",
      optionsTitleAccent: "offre",
      optionsIntro: "À ajouter à n'importe quelle offre, selon vos besoins.",
      footnote: "Vous ne savez pas quelle formule choisir ?",
      footnoteLink: "Écrivez-nous",
      footnoteEnd: ", on vous guide gratuitement.",

      landingTitle: "Page Vitrine Rapide",
      landingResult:
        "Soyez visible en ligne en moins d'une semaine, sans budget excessif.",
      landingTarget: "Idéal pour tester votre concept avant d'investir davantage",
      landingDelivery: "5 à 7 jours ouvrés",
      landingFeatures: [
        "Une page complète et soignée : présentation, services, contact",
        "Mise en page à partir d'une structure éprouvée, à vos couleurs et vos photos",
        "S'affiche parfaitement sur téléphone, tablette et ordinateur",
        "Formulaire de contact et bouton d'appel direct",
        "Référencé sur Google, mentions légales et RGPD conformes",
        "Mise en ligne, nom de domaine et hébergement configurés pour vous",
        "1 série de retouches, à demander dans les 14 jours",
      ],

      starterTitle: "Site Vitrine Complet",
      starterResult:
        "Soyez trouvé par les clients qui cherchent votre métier près de chez eux.",
      starterTarget:
        "Idéal pour les activités établies qui veulent attirer de nouveaux clients",
      starterDelivery: "2 à 3 semaines",
      starterFeatures: [
        "3 à 5 pages, dont une page dédiée par service",
        "Rendez-vous de cadrage : vos pages et votre parcours client définis ensemble",
        "Préversion en ligne : vous validez le site réel avant sa mise en ligne",
        "Référencement local travaillé : « votre métier + Annecy », données structurées",
        "Fiche Google Business créée et reliée à votre site",
        "Sections avis clients, réalisations et à propos",
        "Suivi des visites installé, sans cookie ni bandeau de consentement",
        "1er mois de maintenance offert",
        "2 séries de retouches",
      ],

      proTitle: "Site Pro & Sur Mesure",
      proResult:
        "Un site premium qui vous démarque et donne envie de vous contacter.",
      proTarget: "Idéal pour les projets ambitieux qui veulent marquer les esprits",
      proDelivery: "Selon le projet",
      proFeatures: [
        "Jusqu'à 8 pages entièrement personnalisées",
        "Version anglaise du site incluse",
        "Animations fluides pour une expérience haut de gamme",
        "Section blog ou actualités — vos articles publiés pour vous",
        "Optimisation SEO technique complète : structure, vitesse, données structurées",
        "1 mois d'accompagnement après la mise en ligne",
      ],

      optionExtraPage: "Page supplémentaire",
      optionEnglish: "Version anglaise du site",
      optionEnglishNote:
        "Idéal pour l'hôtellerie, la restauration, les activités et les transferts autour du lac et vers Genève.",
      optionBooking: "Réservation ou prise de rendez-vous en ligne",
      optionReviews: "Vos avis Google affichés automatiquement sur le site",
      optionCopywriting: "Rédaction de vos textes",
      priceFrom: "à partir de",

      // ── Achat / Location ────────────────────────────────────────────────
      // `{n}` est remplacé par la durée d'engagement lue dans lib/offers.ts.
      modeLegend: "Choisir entre l'achat et la location",
      modePurchase: "Achat",
      modeRental: "Location",
      purchaseOnly: "Achat unique",
      purchaseMaintenanceNote: "+ maintenance en option à partir de",
      rentalSetupPrefix: "+",
      rentalSetupSuffix: "de mise en route",
      rentalCommitment: "engagement {n} mois",
      rentalIncludesTitle: "Compris dans la mensualité",
      rentalIncludes: [
        "Hébergement, nom de domaine et certificat de sécurité",
        "Maintenance, sauvegardes et mises à jour de sécurité",
        // `{n}` : plafond partagé avec la maintenance, cf. lib/offers.ts.
        "{n} heures de modifications par mois, faites pour vous",
        "Support prioritaire, réponse sous 24 h ouvrées",
      ],
      rentalNote:
        "Rien de lourd à sortir au démarrage : votre site est mis en ligne, hébergé et suivi pendant toute la durée de l'engagement.",
      rentalOwnershipTitle: "Propriété du site",
      rentalOwnership:
        "En location, le site reste la propriété d'AKWebSolution : la mensualité couvre son usage, son hébergement et son suivi.",
      rentalBuyoutPrefix: "Au terme des {n} mois de location, vous pouvez en devenir propriétaire pour",
      chooseRental: "Choisir la location",
    },

    // ── Maintenance ─────────────────────────────────────────────────────
    maintenance: {
      eyebrow: "Après la mise en ligne",
      title: "Maintenance",
      introStart: "Votre site suivi toute l'année.",
      introStrong: "Vos modifications faites pour vous, sans rien apprendre",
      introEnd: "— vous envoyez un email, c'est en ligne dans la journée.",
      legend: "Choisissez votre formule de maintenance",
      tabFlex: "Sans engagement",
      tabAnnual: "Engagement 1 an",
      noteFlex: "Résiliable à tout moment, sans préavis.",
      // `{n}` est remplacé par l'économie dérivée des deux tarifs.
      noteAnnual: "Soit {n} € économisés sur l'année.",
      saveBadge: "-{n} €",
      featuresTitle: "Ce qui est inclus",
      perMonth: "/ mois",
      cta: "Demander la maintenance",
      offered:
        "1er mois offert avec les offres Site Vitrine Complet et Site Pro & Sur Mesure.",
      features: [
        "{n} heures de modifications par mois : textes, images, nouvelles sections",
        "Hébergement, nom de domaine et certificat de sécurité inclus",
        "Sauvegardes quotidiennes et restauration en cas de problème",
        "Mises à jour de sécurité et de performance",
        "Rapport mensuel : visiteurs, provenance, demandes de contact",
        "Support prioritaire, réponse sous 24 h ouvrées",
        "Correction des bugs et des pannes sans supplément",
      ],
    },

    // ── Page Réalisations ───────────────────────────────────────────────
    workPage: {
      eyebrow: "Portfolio",
      title1: "Nos",
      titleAccent: "réalisations",
      intro:
        "Sites vitrines, interfaces sur mesure et designs responsives — chaque réalisation est pensée pour refléter l'identité de notre client.",
      ctaEyebrow: "Votre projet",
      ctaTitle1: "Vous avez un projet",
      ctaTitleAccent: "similaire ?",
      ctaBody: "Discutons-en. Tarifs transparents, réponse sous 24 h.",
      ctaButton: "Démarrer mon projet",
      allWork: "Toutes les réalisations",
      nextProject: "Réalisation suivante :",
      challenge: "Le défi",
      solution: "La solution",
      result: "Le résultat",
      sector: "Secteur",
      year: "Année",
      techs: "Technologies",
      gallery: "Aperçu du projet",
    },

    // ── Page À propos ───────────────────────────────────────────────────
    aboutPage: {
      eyebrow: "À propos",
      role: "Créateur",
      roleSub: "AKWebSolution · Développeur freelance",
      title1: "Je crée des sites qui",
      titleAccent: "travaillent pour vous",
      p1Intro: "Je m'appelle",
      p1: "développeur web freelance basé en France. Sous le nom",
      p1End:
        ", j'accompagne les indépendants et les petites entreprises qui veulent une présence en ligne claire, professionnelle et efficace.",
      p2: "Chaque projet est une collaboration : je prends le temps de comprendre votre métier et vos besoins avant de concevoir une solution qui vous ressemble. Pas de template — du sur mesure, du début à la fin.",
      p3: "J'utilise des technologies modernes (Next.js, React, Tailwind CSS) pour livrer des sites rapides, bien référencés et faciles à faire évoluer. Je travaille à distance avec des clients partout en France.",
      commitment: "Mon engagement",
      values: [
        "Design soigné, responsive, adapté à votre activité",
        "Code propre et performant (Next.js, React, Tailwind)",
        "Tarifs transparents, délais annoncés, sans mauvaise surprise",
        "Réponse sous 24 h et suivi personnalisé",
      ],
      ctaContact: "Me contacter",
      ctaWork: "Mes réalisations",
    },

    // ── Blog & 404 ──────────────────────────────────────────────────────
    blog: {
      eyebrow: "Le blog",
      title1: "Conseils web,",
      titleAccent: "SEO",
      title2: "& performance",
      intro:
        "Guides pratiques sur la création de sites, le référencement et la performance web — écrits par Adil, développeur web freelance à Annecy (Haute-Savoie).",
      emptyTitle: "Les premiers articles arrivent bientôt",
      emptyBody:
        "Un nouvel article toutes les deux semaines : conseils concrets pour réussir votre présence en ligne. En attendant, découvrez mes offres.",
      emptyCta: "Voir les offres",
      read: "Lire l'article",
    },

    notFound: {
      code: "Erreur 404",
      title: "Page introuvable",
      body: "La page que vous recherchez n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
    },

    common: {
      skipLink: "Aller au contenu",
      whatsapp: "Nous contacter sur WhatsApp",
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  en: {
    header: {
      home: "Home",
      projects: "Work",
      offers: "Pricing",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      contactLong: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
      menuLabel: "Navigation menu",
      seeOffers: "View pricing",
      menuFooter: "Transparent pricing · No commitment",
      appearance: "Appearance",
      language: "Language",
      themeToggle: "Switch between light and dark theme",
      themeToggleShort: "Change theme",
    },

    hero: {
      badge: "Web studio in Annecy · Bespoke websites",
      title1: "Websites that are",
      titleAccent: "elegant",
      title2: "and truly yours",
      subtitle:
        "Freelance web developer based in Annecy, France. Fast, clear websites built around your business — a professional online presence that looks like you, in Haute-Savoie and across France.",
      ctaPrimary: "Start my project",
      ctaSecondary: "See our services",
      trust: ["Transparent pricing", "No commitment", "Fast delivery"],
      statExperience: "years of experience",
      statClients: "Happy clients",
      statResponse: "Response time",
    },

    services: {
      eyebrow: "Services",
      title1: "Everything you need to",
      titleAccent: "succeed online",
      intro:
        "Every service is tailored to your project, from the first sketch through to going live.",
      showcaseTitle: "Business websites",
      showcaseDesc:
        "Present your business with a clear, modern and responsive site, designed to turn visitors into clients.",
      responsiveTitle: "Responsive design",
      responsiveDesc:
        "A great experience on every screen: mobile, tablet and desktop, with no compromise.",
      perfTitle: "Performance",
      perfDesc:
        "Fast, lightweight sites for better search rankings, a better experience and more conversions.",
      brandTitle: "Visual identity",
      brandDesc:
        "Bespoke design aligned with your brand guidelines and image, so you stand out.",
      seoTitle: "SEO",
      seoDesc:
        "Solid SEO foundations to improve your visibility in search engines from day one.",
      maintenanceTitle: "Maintenance",
      maintenanceDesc:
        "Updates, backups and monitoring, so your site stays current, secure and fast.",
    },

    work: {
      eyebrow: "Work",
      title1: "What we have",
      titleAccent: "already built",
      seeAll: "See all our work",
      caseStudy: "Read the case study",
      caseStudyOf: "Read the case study",
      liveSite: "Visit the live site",
    },

    projects: {
      orbitgroup: {
        category: "Premium business website",
        client: "Orbit Group — Executive security & mobility",
        sector: "Close protection & mobility (executive protection)",
        summary:
          "A premium, discreet website for a security and mobility partner serving family offices, executives and high-profile principals. Dark, understated high-end design, international coverage and a confidential enquiry channel.",
        tags: ["Security", "Premium site", "Corporate"],
        challenge:
          "Speaking to a highly demanding clientele (family offices, executives) means inspiring absolute trust and conveying prestige, while remaining completely discreet. The site had to present the services, show credible international reach and offer a confidential contact channel — without ever exposing sensitive information.",
        solution: [
          "Dark, restrained and luxurious art direction, conveying discretion and operational precision.",
          "Clear structure: About, Services, Coverage, Network and Contact.",
          "A dedicated “confidential enquiry” path, surfaced right from the header.",
          "International reach made tangible through a map and locations (Paris, Geneva, Nice, Monaco, London…).",
          "Smooth, high-end animations, a fast site and fully responsive layout.",
        ],
        results: [
          "An online image that matches a premium, confidential positioning.",
          "A clear and reassuring confidential enquiry channel.",
          "International coverage brought to the front.",
        ],
      },
      kabuki: {
        category: "Business website",
        client: "Kabuki — Japanese restaurant",
        sector: "Restaurants",
        summary:
          "A website for a Japanese restaurant: an appetising menu, signature dishes brought to the front, and online booking — all in an elegant, fully responsive setting.",
        tags: ["Restaurant", "Business site", "Booking"],
        challenge:
          "The restaurant had no online presence worthy of its cooking. It needed a site that makes you hungry within a second, lays the menu out clearly, highlights the signature dishes and lets people book without friction — usable on a phone as much as in the dining room.",
        solution: [
          "Bespoke design, dark and refined, reflecting the atmosphere of the restaurant.",
          "A structured, readable menu page with the signature dishes brought forward.",
          "Online booking built directly into the journey.",
          "Fully responsive — mobile first, since most restaurant searches happen on a phone.",
          "Local SEO foundations to be found for “Japanese restaurant” in the area.",
        ],
        results: [
          "A professional online presence, in the image of the cooking.",
          "Online booking available 24/7.",
          "A fast site, visible on Google from launch.",
        ],
      },
      herntaxi: {
        category: "Multi-page business website",
        client: "HernTaxi — Taxi company",
        sector: "Passenger transport",
        summary:
          "A multi-page website for a taxi company in Savoie: services laid out clearly (booking, ski resort transfers, medical transport), a dedicated page per service and carefully tuned local SEO.",
        tags: ["Business site", "Multi-page", "SEO"],
        challenge:
          "The business covers several very different services (standard journeys, ski resort transfers, state-covered medical transport). It needed a clear structure, one page per service to rank well, and a site that reassures customers in a hurry, usually on their phone.",
        solution: [
          "Multi-page architecture with a dedicated page per service (ranks better than a single page).",
          "Booking and contact details surfaced at every step.",
          "Content and structure tuned for local SEO (“taxi” + area searches).",
          "Fast, responsive design, built for an immediate decision.",
        ],
        results: [
          "Each service has its own page, targeted for Google.",
          "A clear booking journey, accessible on mobile.",
          "Live at herntaxi.fr.",
        ],
      },
      thermochrono: {
        category: "E-commerce website",
        client: "ThermoChrono — Online shop",
        sector: "E-commerce",
        summary:
          "An online shop for smart water bottles with real-time temperature display: product catalogue, cart, secure payment (cards, Apple Pay) and fast delivery.",
        tags: ["E-commerce", "Secure payment", "Responsive"],
        challenge:
          "Launching a real online shop around an innovative product: presenting it desirably, reassuring buyers about payment, and offering a smooth checkout that converts — with no middleman and no commission.",
        solution: [
          "A complete shop: catalogue, polished product pages, cart and checkout.",
          "Secure online payment (Visa, Mastercard, Apple Pay).",
          "Conversion-focused product pages that put the product's value front and centre.",
          "Fast, responsive design with SEO foundations to draw traffic.",
        ],
        results: [
          "A shop trading 24/7, selling direct with no middleman.",
          "A smooth checkout and secure payment.",
          "Live at thermochrono.fr.",
        ],
      },
    },

    method: {
      eyebrow: "Process",
      title1: "How it",
      titleAccent: "works",
      intro:
        "You don't need to know anything about websites. Three steps, and you always know where your project stands.",
      step1Title: "Scoping",
      step1Lead: "We define it together",
      step1Body:
        "Your pages, your copy, and what your clients should find first. Nothing to prepare on your side — I ask the questions.",
      step2Title: "Design & build",
      step2Lead: "You approve before it goes live",
      step2Body:
        "I build the site and show it to you on a private preview link: the real site, on your own phone, before anyone else can see it.",
      step3Title: "Launch",
      step3Lead: "I handle the technical side",
      step3Body:
        "Domain name, hosting, Google indexing, legal notices. Then I stay reachable for your tweaks.",
      budgetLabel: "Budget",
      budgetFrom: "from",
      budgetNote:
        "The price depends on how many pages you need and what the site has to do. I'll tell you which of the three packages fits — free of charge, with no commitment. Delivery from 5 days to 3 weeks.",
      ctaTalk: "Let's talk about your project",
      ctaDetails: "See full pricing",
      maintenanceNote:
        "Optional maintenance from €70/month — hosting, backups and your changes made for you.",
    },

    about: {
      eyebrow: "About me",
      title1: "A developer who",
      titleAccent: "actually listens",
      body: "a freelance web developer based in France. I work with independents and small businesses who want a clear, professional and effective online presence — bespoke, from start to finish.",
      bodyIntro: "My name is",
      credentials: ["Based in France", "Next.js · React", "Reply within 24h"],
      more: "More about me",
      photoAlt: "Adil — founder of AKWebSolution",
    },

    contact: {
      eyebrow: "Let's get started",
      title1: "Let's talk about",
      titleAccent: "your project",
      reassurance: "Reply within 24h · Transparent pricing · No commitment",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      projectType: "Project type",
      projectTypePlaceholder: "Select (optional)",
      presetLabel: "Selected package",
      projectTypes: [
        "Single-page site",
        "Full business website",
        "Bespoke pro website",
        "Other / Not sure yet",
      ],
      message: "Message",
      messagePlaceholder: "Tell me about your project, your needs, your questions…",
      consent:
        "I agree that my details may be used to get back to me. See the",
      consentLink: "privacy policy",
      error:
        "Please check your name, a valid email, your message and the consent box — or write to contact@akwebsolutions.fr",
      orWhatsApp: "Or on WhatsApp:",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message sent!",
      successBody: "I'll get back to you within 24 hours. Talk soon.",
      successAgain: "Send another message",
    },

    footer: {
      keywords: [
        "Business websites",
        "Bespoke",
        "Responsive design",
        "SEO",
        "Performance",
        "Next.js",
        "Visual identity",
        "Transparent pricing",
        "Fast delivery",
      ],
      tagline:
        "Bespoke websites — elegant, fast and built around your business.",
      navTitle: "Navigation",
      servicesTitle: "Services",
      services: [
        "Business websites",
        "Responsive design",
        "Performance & SEO",
        "Visual identity",
        "Maintenance",
      ],
      startTitle: "Get started",
      startBody: "Got a project in mind? Transparent pricing, reply within 24h.",
      seeOffers: "View pricing",
      rights: "All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy",
      credit: "Designed & built by AKWebSolution",
      location: "Annecy · Haute-Savoie · France",
      footerNav: "Footer navigation",
    },

    offers: {
      title: "Clear packages, sized to you",
      intro:
        "You don't need to know anything about websites — I take care of everything. Pick what matches your situation, I'll do the rest.",
      from: "From",
      deliveryIn: "Delivered in",
      deliveryCustom: "Timeline:",
      includesPrefix: "Everything in",
      includesSuffix: ", plus:",
      choose: "Choose this package",
      popular: "Popular",
      optionsEyebrow: "Add-ons",
      optionsTitle1: "Round out your",
      optionsTitleAccent: "package",
      optionsIntro: "Add any of these to any package, depending on your needs.",
      footnote: "Not sure which package to pick?",
      footnoteLink: "Write to us",
      footnoteEnd: " — we'll guide you, free of charge.",

      landingTitle: "Single-Page Site",
      landingResult: "Be visible online in under a week, without overspending.",
      landingTarget: "Ideal for testing your idea before investing further",
      landingDelivery: "5 to 7 working days",
      landingFeatures: [
        "One complete, polished page: introduction, services, contact",
        "Laid out from a proven structure, in your colours and with your photos",
        "Looks perfect on phone, tablet and desktop",
        "Contact form and one-tap call button",
        "Indexed on Google, legal notices and GDPR compliant",
        "Going live, domain name and hosting all set up for you",
        "1 round of revisions, to be requested within 14 days",
      ],

      starterTitle: "Full Business Website",
      starterResult:
        "Get found by the clients searching for your trade near them.",
      starterTarget:
        "Ideal for established businesses looking to attract new clients",
      starterDelivery: "2 to 3 weeks",
      starterFeatures: [
        "3 to 5 pages, including a dedicated page per service",
        "Scoping call: your pages and your client journey defined together",
        "Online preview: you approve the real site before it goes live",
        "Local SEO work: “your trade + Annecy”, structured data",
        "Google Business profile created and linked to your site",
        "Reviews, portfolio and about sections",
        "Visitor analytics installed, with no cookies and no consent banner",
        "First month of maintenance free",
        "2 rounds of revisions",
      ],

      proTitle: "Bespoke Pro Website",
      proResult: "A premium site that sets you apart and invites people to reach out.",
      proTarget: "Ideal for ambitious projects that want to make an impression",
      proDelivery: "Depends on the project",
      proFeatures: [
        "Up to 8 fully custom pages",
        "English version of the site included",
        "Smooth animations for a high-end feel",
        "Blog or news section — your articles published for you",
        "Full technical SEO: structure, speed, structured data",
        "1 month of support after launch",
      ],

      optionExtraPage: "Additional page",
      optionEnglish: "English version of the site",
      optionEnglishNote:
        "Ideal for hotels, restaurants, activities and transfers around the lake and towards Geneva.",
      optionBooking: "Online booking or appointment scheduling",
      optionReviews: "Your Google reviews displayed automatically on the site",
      optionCopywriting: "Copywriting for your content",
      priceFrom: "from",

      // ── Buy / Rent ──────────────────────────────────────────────────────
      modeLegend: "Choose between buying and renting",
      modePurchase: "Buy",
      modeRental: "Rent",
      purchaseOnly: "One-off purchase",
      purchaseMaintenanceNote: "+ optional maintenance from",
      rentalSetupPrefix: "+",
      rentalSetupSuffix: "set-up fee",
      rentalCommitment: "{n}-month commitment",
      rentalIncludesTitle: "Included in the monthly fee",
      rentalIncludes: [
        "Hosting, domain name and security certificate",
        "Maintenance, backups and security updates",
        "{n} hours of changes per month, made for you",
        "Priority support, reply within 24 working hours",
      ],
      rentalNote:
        "Nothing heavy to pay upfront: your site goes live, stays hosted and is looked after for the whole commitment period.",
      rentalOwnershipTitle: "Site ownership",
      rentalOwnership:
        "While renting, the site remains the property of AKWebSolution: the monthly fee covers its use, hosting and upkeep.",
      rentalBuyoutPrefix: "At the end of the {n}-month rental, you can become its owner for",
      chooseRental: "Choose renting",
    },

    maintenance: {
      eyebrow: "After launch",
      title: "Maintenance",
      introStart: "Your site looked after all year round.",
      introStrong: "Your changes made for you, with nothing to learn",
      introEnd: "— you send an email, it's live the same day.",
      legend: "Choose your maintenance plan",
      tabFlex: "No commitment",
      tabAnnual: "1-year plan",
      noteFlex: "Cancel any time, no notice period.",
      noteAnnual: "That's €{n} saved over the year.",
      saveBadge: "-€{n}",
      featuresTitle: "What's included",
      perMonth: "/ month",
      cta: "Request maintenance",
      offered:
        "First month free with the Full Business Website and Bespoke Pro Website packages.",
      features: [
        "{n} hours of changes per month: copy, images, new sections",
        "Hosting, domain name and security certificate included",
        "Daily backups and restore if anything goes wrong",
        "Security and performance updates",
        "Monthly report: visitors, sources, contact requests",
        "Priority support, reply within 24 working hours",
        "Bugs and outages fixed at no extra cost",
      ],
    },

    workPage: {
      eyebrow: "Portfolio",
      title1: "Our",
      titleAccent: "work",
      intro:
        "Business websites, bespoke interfaces and responsive design — every project is built to reflect our client's identity.",
      ctaEyebrow: "Your project",
      ctaTitle1: "Got something",
      ctaTitleAccent: "similar in mind?",
      ctaBody: "Let's talk. Transparent pricing, reply within 24 hours.",
      ctaButton: "Start my project",
      allWork: "All our work",
      nextProject: "Next project:",
      challenge: "The challenge",
      solution: "The solution",
      result: "The outcome",
      sector: "Sector",
      year: "Year",
      techs: "Tech stack",
      gallery: "Project gallery",
    },

    aboutPage: {
      eyebrow: "About",
      role: "Founder",
      roleSub: "AKWebSolution · Freelance developer",
      title1: "I build websites that",
      titleAccent: "work for you",
      p1Intro: "My name is",
      p1: "a freelance web developer based in France. Under the name",
      p1End:
        ", I work with independents and small businesses who want a clear, professional and effective online presence.",
      p2: "Every project is a collaboration: I take the time to understand your trade and your needs before designing something that looks like you. No templates — bespoke, from start to finish.",
      p3: "I use modern technology (Next.js, React, Tailwind CSS) to deliver fast websites that rank well and are easy to grow. I work remotely with clients all over France.",
      commitment: "My commitment",
      values: [
        "Careful, responsive design, tailored to your business",
        "Clean, fast code (Next.js, React, Tailwind)",
        "Transparent pricing, stated deadlines, no nasty surprises",
        "Reply within 24 hours and personal follow-up",
      ],
      ctaContact: "Get in touch",
      ctaWork: "See my work",
    },

    blog: {
      eyebrow: "The blog",
      title1: "Web advice,",
      titleAccent: "SEO",
      title2: "& performance",
      intro:
        "Practical guides on building websites, search rankings and web performance — written by Adil, freelance web developer in Annecy, France.",
      emptyTitle: "The first articles are coming soon",
      emptyBody:
        "A new article every two weeks: practical advice for a successful online presence. In the meantime, take a look at my packages.",
      emptyCta: "View pricing",
      read: "Read the article",
    },

    notFound: {
      code: "Error 404",
      title: "Page not found",
      body: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back to home",
    },

    common: {
      skipLink: "Skip to content",
      whatsapp: "Contact us on WhatsApp",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fr;
