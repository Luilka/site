# Audit des pages, des couleurs et des pages de détail face à la concurrence

**Statut** : audit du 26 novembre 2026, version 1
**Propriétaire** : @Espoir-Loem
**Documents liés** : [audit de la page d'accueil](audit-accueil.md), [principes de design](design-principles.md), [vision](../Product/vision.md), [registre des décisions](../Product/decisions.md)
**Sources** : captures du site en local le 26 novembre 2026 (1280 et 390 pixels de large), notes de `research_notes/Positionnement design Luilka Afrique Congo/`, pages de concurrents consultées le 26 novembre 2026.

## Verdict

Pas encore. Le travail technique est au niveau visé : code, contrôles, accessibilité de base, déploiement. Le visage public ne l'est pas. Trois écarts pèsent sur l'image d'un studio de design qui vise les grands studios :

1. **Aucune preuve visible.** Les réalisations et les produits sont des rectangles gris avec une icône. Un studio de design se juge à ce qu'il montre.
2. **Les pages de détail ne disent rien.** Une page de projet fait une quarantaine de mots, sans image, et répète un paragraphe générique. Elle est la page la plus décisive pour un client qui compare des studios.
3. **Aucune identité.** La palette est neutre et froide, sans couleur signature, et aucun signe visuel ne dit « Kinshasa » ni « Afrique » (seule la page Job nomme Kinshasa). Le positionnement de la recherche en fait pourtant le point d'ancrage.

Le contenu est correct et honnête (aucun chiffre inventé, aucun faux lien). Le manque est visuel et narratif, pas rédactionnel.

## Cadre

Qui arrive : un responsable produit ou marketing qui compare des studios, souvent sur téléphone, avec peu de temps.

Travail à faire : se faire une idée du niveau du studio en deux minutes, voir un projet qui ressemble au sien, puis écrire.

Motif de départ : ne rien voir de concret, ne pas trouver la navigation sur téléphone, lire un texte qui pourrait être celui de n'importe quel studio.

Chose à rendre facile : atteindre un projet et voir ce que Luilka a décidé et obtenu.

## Constats par page

| Page | Constat | Gravité |
|---|---|---|
| Toutes, téléphone | Sous 1000 pixels, la navigation disparaît et rien ne la remplace : ni menu, ni bouton. Il reste le logo, la langue et « Contact us ». Services, Produits, Réalisations, Blog et Job ne s'atteignent plus depuis l'en-tête : seuls le pied de page et les boutons « Découvrir plus » de l'accueil y mènent, et la page Job n'a aucun de ces accès. | Haute |
| Toutes | Titre `h1` des pages intérieures (« Nos services », « Parlons de votre projet », « Yano ») affiché à la taille du texte courant, sans hiérarchie visuelle. | Haute |
| Toutes | Langues mélangées sur la page française : « About », « Services », « Products », « Works », « Blog », « Job », « Contact us », « More », « Subscribe to our newsletter », pastille « Works ». | Haute |
| Accueil | Les quatre réalisations et les trois produits sont des cartes grises sans image. Les quatre étapes sont des chiffres 01 à 04 sans lien visible avec le texte. | Haute |
| Accueil | La même bande « Concept, UX Design, UI Design, Code, Test, Production » apparaît trois fois dans le défilement : elle ralentit la lecture sans rien apprendre. | Moyenne |
| Services, Réalisations, Job | Le même paragraphe (« Notre stratégie est centrée sur l'utilisateur... ») sert d'introduction à des sections différentes. | Moyenne |
| Services, Réalisations, Job | Le titre de la page et le titre de la section disent la même chose l'un sous l'autre (« Nos services » deux fois). | Moyenne |
| Job | Les offres (CDI à Kinshasa, ingénieur front-end React, design engineer) parlent de développement, alors que la vision écarte l'image d'un studio de développeurs. À arbitrer avec la vision. | Moyenne |
| Pied de page | « Copyright 2025 » alors que nous sommes en 2026. | Basse |
| Détail | Voir la section suivante. | Haute |

## Les pages de détail

### Ce que fait aujourd'hui une page de projet

`/fr/work/yano` affiche un titre, une pastille, une description d'une ligne (« UX Design: mobile App »), puis une carte qui répète le titre et le paragraphe générique, puis un bouton « Nos réalisations ». Aucune image, aucun contexte, aucun résultat. Les pages de service et de produit suivent le même modèle : la description est affichée deux fois, dans l'en-tête puis dans la carte. Pour les réalisations, le texte de la carte est le paragraphe générique de la section, pas un texte sur le projet (`detail-models.content.ts` lui donne `c.section`).

### Ce que font les concurrents

Observé le 26 novembre 2026, à titre indicatif :

| Studio | Page | Contenu |
|---|---|---|
| Ojú | `/work/gangan/` | Environ 450 mots, 4 images. Une phrase de résultat en titre, puis Résultats, Le brief, L'intuition, L'identité, Le produit, Les décisions qui ont compté. |
| Novacraft | `/showcase/podzyme` | Environ 840 mots, 5 images. Les surfaces du produit, les fonctions qui comptent, puis un appel à l'action « Want a platform like this? ». |
| Luilka | `/fr/work/yano` | Environ 40 mots, aucune image. |

Les deux concurrents racontent une décision et son effet. C'est ce qui permet à un client de se projeter, et c'est ce que le positionnement de la recherche demande : la continuité entre recherche, interface et livrable, montrée par un cas.

### Ce qu'une page de projet devrait porter

Ordre proposé, du plus important au moins important pour la personne qui compare :

1. Une phrase qui dit ce qui a changé pour les utilisateurs du projet.
2. Une image principale du produit (écran réel).
3. Le contexte et la demande en deux ou trois phrases.
4. Deux ou trois décisions de design, chacune avec une image et la raison.
5. Le livrable remis et ce que le client en a fait.
6. Un appel à l'action qui reprend le service concerné (« Vous avez un projet comme celui-ci ? »).

Chaque chiffre affiché cite sa source auprès du client (règle de `AGENTS.md`). Tant qu'un chiffre n'est pas confirmé par le client, la page n'en affiche pas. Les images, textes et accords de publication sont à fournir par le studio : ils ne s'inventent pas.

### Les pages de service et de produit

Une page de service gagne à répondre à quatre questions : ce que Luilka fait, ce que le client reçoit, comment cela se passe, et un projet qui le montre. La page `/fr/services/ux-design` ne répond à aucune des quatre au-delà d'une phrase. Les produits (Tala, Vuga, Pro) n'ont pas de capture d'écran : tant qu'ils n'existent pas à montrer, la carte promet plus que la page ne tient. Leur place sur la page d'accueil est à justifier (voir les décisions à prendre).

## Couleurs

### Ce que le site utilise

Tokens de `src/globale.css` :

| Usage | Valeur |
|---|---|
| Texte | `#1a1a1f` (17,3 pour 1 sur blanc) |
| Texte secondaire | `#3c3c45` (10,9 pour 1 sur blanc) |
| Fond des cartes | `#cfd1db`, dégradé jusqu'à `#a9abb4` |
| Fond doux | `#f6f6fa` |
| Lien, accent | `#2a4cb5` et `#2a2ae6` (7,5 et 8,2 pour 1 sur blanc) |
| Violet | `#9b5de5` (4,1 pour 1 sur blanc) |
| Bouton sombre | `#0d0d10` (19,4 pour 1 sur blanc) |

### Contrastes à corriger

Seuils WCAG 2.2 AA : 4,5 pour 1 pour le texte courant, 3 pour 1 pour les grands textes et les icônes.

| Élément | Rapport | Constat |
|---|---|---|
| Icône blanche sur carte grise (réalisations, produits) | 2,3 pour 1 | Sous le seuil de 3 pour 1. Ces icônes sont décoratives (`aria-hidden`), mais elles sont le seul contenu visuel de la carte. |
| Sous-titre « Luilka » `#6a6a74` sur fond de carte produit | 3,5 pour 1 | Texte de 12 pixels sous le seuil de 4,5 pour 1. |
| Description produit `#55555e` sur fond bas du dégradé | 3,7 pour 1 | Texte de 14 pixels sous le seuil de 4,5 pour 1. |
| « marque » en violet `#9b5de5` | 4,1 pour 1 | Passe en grand texte (3 pour 1), pas en texte courant. C'est un titre de 46 pixels : acceptable. |

Ces rapports sont calculés sur les valeurs des tokens et des classes, pas mesurés sur un rendu. La mesure du fond exact d'un dégradé varie du haut au bas de la carte.

### Face à la concurrence

Couleurs les plus fréquentes dans le HTML et la première feuille de style de chaque site, le 26 novembre 2026. C'est un indice, pas une charte :

| Studio | Couleurs dominantes observées |
|---|---|
| Ojú | Fond crème (`#fbfaf7`, `#f2efe9`), rouille (`#d4550f`, `#8f2f0a`) |
| NAKA Creatives | Encre bleu-vert (`#0c1a1c`), fond crème (`#f7f5f0`), orange (`#f96300`) |
| Studio Bao | Cyan (`#0086c4`), sable (`#bdaa89`), fond blanc |
| Defijn | Vert vif (`#a1f300`, `#00be93`), violet (`#7568dc`), encre (`#001b1f`) |
| Mantaray Africa | Bleu profond (`#038`), jaune (`#fecf42`) |
| Novacraft | Violet (`#6b25e0`), nuit (`#050309`), fond chaud (`#f0ede6`) |
| Luilka | Gris-lavande (`#cfd1db`), bleu (`#2a4cb5`), violet sur deux mots |

Chaque concurrent a une couleur qu'on retient et, souvent, un fond chaud. Luilka n'a ni l'un ni l'autre : le gris-lavande froid ressemble à un modèle de site, et le dégradé bleu vers violet des deux mots du titre est le seul signal d'identité.

### Ce que cela dit de Luilka

La palette est sûre et lisible, elle ne dessert pas le studio. Elle ne le distingue pas non plus : dans une présentation de dix studios, Luilka serait le gris. Le positionnement choisi (carrefour entre recherche, interface et livrable, ancrage congolais) demande une couleur qui porte ce choix.

Deux pistes, sans en trancher une :

- **Couleur signature unique** sur fond chaud : on garde la rigueur et on ajoute une marque reconnaissable. À choisir avec la dimension culturelle du studio et vérifier qu'elle tient le contraste sur blanc et sur sombre.
- **Neutres chauds et un accent** : on remplace le gris-lavande par un neutre chaud, on garde le bleu comme accent d'action, et on réserve le violet à un seul usage.

Dans les deux cas, les tokens de `src/globale.css` restent la seule source (principe des [principes de design](design-principles.md)), et le changement se fait dans les tokens, pas dans les composants.

## Priorités

| Priorité | Action | Effort estimé |
|---|---|---|
| P0 | Menu de navigation sur téléphone, le support principal. Sans lui, la navigation passe par le bas de page. | Faible |
| P0 | Traduire les libellés mélangés (navigation, pied de page, pastilles, bouton de contact) selon la langue. Cela touche la question Q-002. | Faible |
| P0 | Donner une vraie hiérarchie au `h1` des pages intérieures et supprimer le doublon titre de page, titre de section. | Faible |
| P1 | Refaire la page de détail d'un projet avec la structure ci-dessus, en commençant par un seul projet complet (images et texte fournis par le studio). | Moyen, dépend du contenu |
| P1 | Remplacer les rectangles gris de la section Réalisations par de vraies images, ou retirer la section tant qu'elles n'existent pas. | Dépend du contenu |
| P1 | Corriger les trois contrastes ci-dessus. | Faible |
| P2 | Choisir une couleur signature et un fond chaud, puis les passer dans les tokens. | Moyen, à décider |
| P2 | Un texte propre par section au lieu du paragraphe générique répété. | Faible |
| P2 | Pages de service avec livrable, déroulé et projet associé. | Moyen |
| P3 | Réduire la bande de processus à une seule occurrence, ou la retirer. | Faible |
| P3 | Année du pied de page calculée, pas écrite à la main. | Faible |

Les efforts sont des estimations de travail, pas des mesures.

## Décisions à prendre

À inscrire au registre des décisions une fois tranchées (nouvelle ligne et date, jamais de modification silencieuse) :

1. **Réalisations sans images.** Quels projets Luilka peut montrer, avec quelles images, et avec l'accord de qui ? Sans cela, retirer la section ou la remplacer par une explication de méthode.
2. **Produits Tala, Vuga, Pro.** Existent-ils à montrer (captures, démonstration) ? Si non, les sortir de la page d'accueil. La vision les nomme, mais une carte sans contenu affaiblit les réalisations qui suivent.
3. **Offres d'emploi.** Garder trois offres de développement sur la page Job est-il cohérent avec la vision d'un studio de design ?
4. **Couleur signature.** Laquelle, et qui valide qu'elle porte l'ancrage congolais ?
5. **Ton de la page de détail.** Un cas raconté (type Ojú) ou une fiche courte (type Novacraft) ?

## Limites

- Échantillon : six studios pour les couleurs, deux pages de cas pour le contenu. Le comptage des couleurs vient du HTML et de la première feuille de style, il ne remplace pas une capture de chaque site.
- Aucun test auprès de visiteurs : les constats viennent d'une lecture des pages et des rapports de contraste, pas de mesures d'usage. Aucune donnée d'usage n'est collectée tant que la question Q-004 est ouverte.
- Les captures ont été prises sur un serveur local en production (`nx start`), pas sur Vercel.
- Les pages de blog et d'à-propos ont été regardées en surface, sans lecture des articles.

## Sources

- Notes de recherche : `research_notes/Positionnement design Luilka Afrique Congo/white_space_positionnement.md` (positionnement, studios concurrents, consultés le 23 novembre 2026).
- Pages consultées le 26 novembre 2026 : ojustudio.com (page `/work/gangan/`), novacraft.africa (page `/showcase/podzyme`), et les accueils de nakacreatives.com, studiobao.africa, defijn.io et mantaray.africa pour les couleurs.
- Contrastes : formule du rapport de luminance relative de WCAG 2.2, calculée sur les valeurs de `src/globale.css` et de `src/components/`.
