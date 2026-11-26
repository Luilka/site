# Recherche : films de produit avec de vraies interfaces

**Statut** : version 1, 26 novembre 2026. Direction proposée, rien n'est décidé. Complète [la proposition de vidéo du héros](proposition-video-heros.md).
**Propriétaire** : @Espoir-Loem
**Documents liés** : [recherche UX](recherche-ux-confiance.md), [synthèse du thème](audit-theme.md)
**Demande du titulaire** : des vidéos avec de vrais éléments de motion, du son, de vraies interfaces de ce que fait Luilka, un mouvement du plus haut niveau, humain, pas robotique, à la hauteur d'un studio de pointe en UX.

## Ce que j'ai pu et n'ai pas pu faire

- **Référence du titulaire** : la vidéo YouTube donnée s'intitule « Google, Welcome to the Gemini era » (titre lu par le service de métadonnées public de YouTube). Je ne peux pas la regarder : je ne connais ni son rythme, ni son montage, ni son son. À préciser par le titulaire : ce qui plaît (cadence, présence de personnes, sons d'interface, musique, transitions ?).
- **Sources** : articles de blogs et de fabricants d'outils, donc intéressés, et aucun n'analyse les défauts typiques d'un mouvement fait par machine. Les principes de métier ci-dessous viennent de la pratique du motion design, pas d'une étude : ils sont à valider par un motion designer humain.

## Ce que disent les sources

| Constat | Source |
|---|---|
| Partir d'un vrai parcours dans le produit et n'ajouter du mouvement que pour éclairer la séquence, pour garder le réel crédible | [Grafit, démos SaaS](https://www.grafit.agency/blog/saas-product-demo-video), [Motionimo](https://motionimo.xyz/blog/saas-launch-video-examples) |
| Une idée par scène, une fonction par idée ; arc : le problème, l'ancienne façon, la révélation du produit, un seul appel à l'action | [ADDX Studio](https://addxstudio.com/work/saas-product-launch-video-guide) |
| Valider d'abord des images clés et un animatic minuté avant de polir, car c'est là que les changements coûtent peu | Même source |
| Linear : mode sombre, très peu de voix off, l'interface est le héros, 45 à 90 secondes, un travail par film | [Hound Studio](https://hound-studio.com/blog/22-best-product-launch-videos-2026-examples-formulas/) (secondaire) |
| Stripe : graphismes animés de code et de flux plutôt que capture d'écran, moins de 90 secondes | Même source |
| La vidéo doit fonctionner sans son ; la musique donne le rythme sans couvrir ni les libellés ni la voix | [Motion.so](https://motion.so/learn/ai-product-demo-video) |
| Un lissage du curseur et des zooms automatiques au clic sont les polissages les plus cités | [Arcade](https://www.arcade.software/post/product-launch-video-examples) (outil) |
| Animation pour la logique du logiciel, prises de vue réelles pour la confiance humaine ; la couleur et la typographie de la marque font du film une partie de l'identité | [Grafit](https://www.grafit.agency/blog/saas-product-demo-video) |

## Ce qui fait « robot » et ce que fait un humain (pratique du métier)

| Défaut typique | Ce que fait un motion designer humain |
|---|---|
| Tous les éléments entrent avec la même courbe et la même durée | Chaque élément a sa courbe, sa durée, son poids ; un élément lourd démarre lentement, un léger vite |
| Décalage régulier et symétrique des éléments | Décalage inégal, un chef de file, des mouvements qui se chevauchent |
| Pas d'anticipation ni de dépassement | Un recul avant le départ, un léger dépassement à l'arrivée, un rebond amorti |
| Curseur en ligne droite à vitesse constante | Arc de Bézier, accélération puis freinage, une hésitation, une micro-correction avant le clic, un temps d'arrêt après |
| Un « whoosh » identique sur chaque coupe | Le son suit un geste : toucher, frappe de clavier, glissement ; peu de sons, jamais le même deux fois de suite |
| Musique en boucle sans phrasé | Les coupes tombent sur les temps, avec un silence avant l'idée importante |
| Tout est centré, tout bouge en même temps | Une seule chose bouge à la fois pour guider l'œil, le reste se tient immobile |
| Données génériques (« Lorem », « John Doe ») | Données vraisemblables, dans la langue et le contexte du public (noms, lieux, montants, langue) |
| Aucun silence | Des temps de pause pour respirer |

## Direction proposée pour Luilka

1. **De vraies interfaces, pas des maquettes.** Enregistrer les produits qui tournent vraiment dans Chrome, sur un téléphone simulé, avec un curseur et un toucher pilotés par un script de trajectoires humaines (arcs, hésitations, pauses), puis les composer avec des zooms de caméra sur les actions importantes.
2. **Un parcours humain par film.** Une personne, un but, un contexte (par exemple suivre une tontine, trouver un artisan, publier une vidéo de travail) : la preuve avant la promesse, comme dans les principes de Pro.
3. **Un son qui suit les gestes.** Sons d'interface (toucher, glisser, frappe), un lit musical phrasé, un silence avant le résultat, un mixage où les sons ne couvrent jamais le libellé. Le film reste compréhensible sans son.
4. **Une identité sobre.** Palette de luxe (forêt, or, blanc), un seul trait doré, pas de lueur ni de particules ni de dégradés de maillage.
5. **Court.** 20 à 45 secondes, une idée par film.

## Ce qui est possible ici, et ce qui ne l'est pas

- **Possible tout de suite :** un film du site Luilka lui-même, en vraie interface (menu mobile en feuille, cartes, transition de page, contact), sur téléphone simulé. C'est vrai, vérifiable, et cela montre la qualité de ce que Luilka livre.
- **Possible avec votre accord :** les applications de vos projets, à condition que je puisse les lancer. Le dépôt Mitemo contient une application web et une application mobile : je ne l'ai pas cloné, car télécharger du code demande votre accord. Le dépôt local `luilka/pro` n'est qu'un gabarit d'application, pas le vrai produit Pro. Tala, Vuga et les projets clients n'ont pas d'interface lançable ici.
- **Limites :** je synthétise les sons d'interface par code : ce n'est pas du bruitage enregistré. Je ne peux pas égaler un motion designer humain ni garantir qu'un œil expert ne verra pas l'origine du film. Je recommande une passe finale par un humain (montage, étalonnage, mixage) avant toute diffusion publique. Aucun test de visiteurs n'existe.

## Plan

1. Valider la direction et une référence précise (rythme, ambiance) : titulaire.
2. Image clé et animatic minuté du premier film (30 secondes, le site), validés avant le rendu.
3. Outil de curseur humain et de caméra, testé sur une séquence courte.
4. Enregistrement de la vraie interface, composition, sons d'interface, lit musical, mixage.
5. Intégration au héros sous les mêmes règles (à l'écran seulement, son sur demande, image fixe, bouton Pause).
6. Films suivants sur les applications de projets, selon les interfaces disponibles.

## Décisions demandées

1. Premier film : le site Luilka (possible aujourd'hui), ou attendre une application de projet ?
2. Puis-je cloner Mitemo (dépôt public du titulaire) et essayer de le lancer pour l'enregistrer ?
3. Quelle personne et quel but montrer (le parcours humain) ?
4. Quel élément de la vidéo de référence faut-il retenir ?
