# AKWebSolution

Site vitrine Next.js pour présenter et vendre vos services de création de sites web. Design aligné avec votre logo : minimaliste, élégant, thème sombre.

## Structure du projet

Le projet Next.js se trouve dans le dossier **`akweb-temp`**. Pour travailler dessus :

```bash
cd akweb-temp
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Librairies installées

- **Next.js 16** (App Router, TypeScript, Tailwind CSS 4)
- **Framer Motion** – animations fluides et discrètes
- **Lucide React** – icônes épurées
- **Tailwind CSS** – design utilitaire, thème sombre

## Style

- Fond noir, texte gris clair / blanc
- Typographie : Outfit (sans-serif moderne)
- Animations légères au scroll et au chargement
- Sections : Hero, Services, Contact, Footer

## Commandes

| Commande        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Lancer le serveur de dev |
| `npm run build`| Build de production      |
| `npm run start`| Démarrer en production   |
| `npm run lint` | Vérifier le code         |

## Personnalisation

- **Email de contact** : modifier l’adresse dans `akweb-temp/src/components/Contact.tsx`
- **Services** : éditer le tableau dans `akweb-temp/src/components/Services.tsx`
- **Couleurs** : variables dans `akweb-temp/src/app/globals.css`

Si vous souhaitez que le projet soit à la racine (`d:\AKWEBSOLUTION`) au lieu de `akweb-temp`, vous pouvez déplacer le contenu de `akweb-temp` à la racine (y compris `package.json`, `src`, `public`, configs) puis lancer `npm install` à la racine.
