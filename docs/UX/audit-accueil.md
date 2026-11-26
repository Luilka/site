# Audit de la page d'accueil

**Statut** : audit du 23 novembre 2026, mis à jour le 26 novembre 2026
**Documents liés** : [principes de design](design-principles.md), [registre des décisions](../Product/decisions.md)

Perimetre : `src/routes/[lang]/index.tsx` et ses composants.

## Cadre

Qui arrive : un responsable produit ou marketing qui cherche un studio de design, souvent sur telephone, avec peu de temps.

Travail a faire : comprendre ce que Luilka dessine, voir des preuves concretes, puis contacter le studio.

Motif de depart : une page qui parle de developpement, d hebergement ou de communaute de developpeurs, ou des cartes qui promettent une action sans mener nulle part.

Chose a rendre facile : lire la promesse de design, puis trouver le bouton de contact.

## Structure HTML constatee

- Le HTML sert au navigateur est une coquille (`"mode":"shell"` dans `__nexy_page`, `useCSR = True`). Le `h1`, les sections et le texte de page n existent qu apres hydratation. Le referenceur et la lecture sans JavaScript ne voient que l en-tete et le pied de page au premier passage.
- Le plan de titres est correct dans le code source : un seul `h1` dans le hero, un `h2` par section, des `h3` dans les cartes. Une exception : `WorkCard` utilise `<b>` pour le nom du projet, donc le projet n entre pas dans le plan de titres.
- `main` porte `overflow-y-hidden`. Cela peut couper le contour de focus et gener le comportement collant de l en-tete.
- `ProcessBand` est repete cinq fois. Ses mots sont decoratifs mais announces cinq fois aux lecteurs d ecran. Il n a ni titre ni role.
- Les cartes produits et realisations portent une fleche et un libelle qui suggerent un lien, alors que ce sont des `div` sans destination. Les cartes de service n ont pas de lien, ce qui est coherent avec leur role d information.
- Le libelle `Navigation principale` est ecrit en francais sur la page anglaise.

## Alignement avec Luilka

Luilka est un studio de design. Le contenu actuel raconte autre chose.

- `BrandService.tagline()` parle d `Ingenierie d echelle`.
- Le texte `process` parle de PossaCode et de 300 developpeurs formes. Il est repete dans les quatre cartes d etapes.
- Les etapes sont `Cadrage`, `Conception`, `Developpement`, `Maintenance`, soit un pipeline technique.
- Les services sont `Design`, `Software`, `Maintenance`, `Devops`, soit trois services sur quatre hors du design.
- Les trois produits n ont pas de description. La section leur donne a tous le meme texte generique.
- Les trois sections de la page d accueil partagent le meme paragraphe `section`.
- Le texte `A propos` parle de PossaCode, pas de Luilka.
- La description de contact se termine par `et`, ce qui laisse une phrase inachevee.

## Decision

Le design reste identique : memes sections, memes grilles, memes cartes, memes classes CSS, memes couleurs.

- Reecrire les textes pour decrire un studio de design et retirer les references au developpement, a l hebergement et aux formations.
- Donner a chaque etape, a chaque produit et a chaque section sa propre phrase. Une carte avec sa phrase a un usage ; une carte avec la phrase de sa voisine n en a pas.
- Garder les cinq bandeaux visuels, mais les retirer de l arbre d accessibilite avec `aria-hidden`. Leur texte est decoratif.
- Remplacer le `<b>` du nom de realisation par un `h3`, avec la meme regle CSS pour ne pas changer le rendu.
- Ne pas ajouter de lien fictif ni de nouveau panneau. Le bouton de devis reste l action unique du hero et du contact.

## Changements appliques

- Textes du hero, des etapes, des services, des produits, des realisations, de l a propos, du contact, du pied de page et de la devise de marque reecrits pour un studio de design.
- Une phrase par etape, par produit et par section d accueil, au lieu d un paragraphe repete.
- Services, produits, realisations et liens de pied de page traduits separement en francais et en anglais.
- Bandeau de processus retire de l arbre d accessibilite, nom de realisation passe en `h3`.
- Titre de la section services renomme `Concevoir l'experience, ecrire le produit` pour dire que Luilka travaille aussi les mots du produit, pas seulement son apparence.
- Quatre cartes services courtes, dans l'ordre demande : `UX Design`, `UI design`, `Software` et `COM`. `Software` dit que Luilka construit l'application jusqu'a la mise en ligne. `COM` couvre la page produit, le ton et les messages du quotidien. Les deux cartes precisent que le service peut etre commande seul. Chaque carte tient en une phrase courte. Le meme vocabulaire est utilise dans le menu Services, en francais et en anglais.
- Grille services passe a quatre colonnes sur grand ecran, deux sur tablette et une sur telephone.
- Realisations : quatre cartes, nom et un seul sous-titre chacune. `Yano` : `UX Design: mobile App`. `Vox Congo` : `UX Design & UI design : Mobile App`. `Mitemo` : `Full Projet & all Service`. `Privatis Capital Invest` : `Rebranding, et Design système , charte graphique`. Les phrases de livrable sont retirees de la home et reservees a la page de projet dediee. Aucun chiffre non documente.
- Espace entre les etapes et l a propos reduit de 60px a 32px, car aucun bandeau ne les separe.
- Positionnement explicite : design to app, avec une strategie centree sur l utilisateur. Luilka concoit, ecrit et construit, et chaque service peut etre commande seul. Le hero, l a propos et la section services le disent. Le titre de la page A propos devient « Un studio de design centre sur l utilisateur ». Meme formulation en anglais. Les anciennes mentions « nous ne developpons pas le code » ont ete retirees.
- La route `/` affiche directement l accueil en francais. Le hook `useLanguageRedirect` et ses utilitaires sont retires : plus de detection de la langue du navigateur ni de redirection vers `/fr` ou `/en`.

## Decision sur l en-tete

Le dropdown suit maintenant le modele du menu d Andela : un panneau pleine largeur sous l en-tete, un titre et un surtitre, une carte imagee par service avec sa phrase et son lien d exploration, puis une colonne de liens de navigation. Une seule image par carte remplace l image unique qui changeait au survol. Les libelles et les URLs de navigation restent les memes, notamment `Services` vers `/services` et `Products` vers `/products`. Le survol, le focus, Escape, `aria-expanded`, `aria-controls` et la classe `is-open` sont conserves.

Non touche : le rendu CSR et le `overflow-y-hidden` de `main`. Ils sont documentes plus haut et demanderaient un changement de comportement, pas seulement de contenu.

## Etats a couvrir

- Chargement : le contenu arrive apres hydratation, il faut eviter un saut visible.
- Erreur : adresse email invalide dans la newsletter.
- Succes : confirmation de la newsletter et ouverture du courriel pour le devis.
- Contenu long : noms de projets qui reviennent a la ligne, trois cartes produits, quatre cartes d etapes.

## Etats de page

Les trois etats suivent la convention de fichiers speciaux de Nexy, a la racine de `src/routes` : `notfound.tsx`, `errors.tsx` et `loading.tsx`. Le texte est ecrit en francais et en anglais.

- 404 : `src/routes/notfound.tsx`. Une adresse inconnue repond avec le code HTTP 404 et affiche le code, le titre, une phrase et un lien vers l accueil.
- Erreur : `src/routes/errors.tsx`. Le serveur l utilise pour les erreurs 500 ; cote client, `FeedbackBoundary` branche `ErrorBoundary` sur ce meme fichier. Le bouton `Réessayer` remonte le composant.
- Chargement : `src/routes/loading.tsx`, annonce par `role="status"`.

Les pages d apercu `/fr/chargement` et `/fr/erreurs` ont ete retirees. Les trois etats restent couverts par `tests/client/feedback-states.test.tsx`, y compris la reprise apres une erreur de rendu.

## Fiches dynamiques et routes inconnues

Les fiches vivent dans la structure de dossiers Nexy : `src/routes/[lang]/blog/[slug].tsx`, `work/[slug].tsx`, `products/[slug].tsx` et `services/[slug].tsx`. Les listes correspondantes sont passees en `blog/index.tsx`, `products/index.tsx` et `services/index.tsx` pour eviter un conflit de modules generes entre un fichier plat et un dossier du meme nom. Les URL `/blog`, `/products` et `/services` ne changent pas.

`src/routes/[lang]/dependencies.py` verifie la langue et le slug avec `notFound()` de Nexy. Une adresse comme `/about`, `/fr/work/inconnu` ou `/en/blog/inconnu` repond donc avec un vrai code HTTP 404 et affiche `notfound.tsx`. Cote client, les memes verifications rendent le panneau 404 au lieu de l accueil.

Les types partages et les modeles dynamiques sont dans `src/shared/types/` : `site.type.ts`, `detail.type.ts` et un index. Les slugs ont une seule source, `src/content/details.json`, lue par le serveur et par le client. `tsconfig.json` et `tsconfig.client.json` couvrent le glob `**/*.*.{ts,tsx}`. Vitest ne lance que `tests/client/**/*.test.{ts,tsx}`.

## Resume

```text
Qui:        Responsable produit ou marketing en visite rapide, souvent sur telephone.
Travail:    Comprendre le studio de design, voir des preuves, contacter Luilka.
Structure:  Hero, a propos, etapes, services, produits, realisations, contact.
Etats:      404, erreur de rendu avec retry, chargement CSR, email invalide, confirmation newsletter.
Retranche:  Texte de developpement, phrases repetees, lecture des bandeaux decoratifs.
```

## Mise a jour du 26 novembre 2026

- Le libelle `Navigation principale` vient maintenant du dictionnaire : `Main navigation` sur la page anglaise.
- Le formulaire de la newsletter affiche de nouveau son message, avec `role="alert"` pour une adresse invalide et `role="status"` pour une adresse valide.
- Le code est range selon l'[architecture](../Technique/architecture.md) : `shared/` pour le reutilisable, `sections/` a la place de `templates/`.
- Logo : le symbole `finger` du sprite est le SVG plein fourni par le studio (`fill="currentColor"`). Il sert au logo de l'en-tete, au visuel de la section a propos et a `public/luilka.svg`.
- Icones Lucide la ou elles servent : chevron entre les etapes du bandeau (le velo est retire), coche ou alerte avec le message de la newsletter, fleche de retour sur les pages de detail, lien courriel dans le pied de page a la place de trois icones qui ne menaient nulle part.
- Question close par D-013 : le libelle `Contact us` est traduit sur la page francaise.
