# Synthèse du thème : confiance, sérieux, conversion

**Statut** : version 2, 26 novembre 2026, **appliquée** par D-021 (palette de luxe : forêt, or, fond blanc), qui remplace le vert `#0c5a41` de D-020. Restent à faire : jetons nommés par rôle, jetons d'état, rayons réduits à trois, redessin des illustrations en fragments d'interface.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [décisions](../Product/decisions.md), [audit des pages](audit-pages-et-concurrence.md), [principes de design](design-principles.md), [vision](../Product/vision.md)
**Sources** : notes de `research_notes/Positionnement design Luilka Afrique Congo/`, palettes de 12 sites mesurées le 26 novembre 2026, calculs de contraste WCAG 2.2.

## Objectif du titulaire

Le site doit inspirer **confiance**, **professionnalisme** et **respect**, et il doit **convertir** le visiteur en client et le faire s'engager. Le thème est un moyen : chaque choix se juge à ces cinq mots.

## Ce que font les studios et les marques de référence

| Référence | Philosophie visible | Traduction dans l'interface |
|---|---|---|
| Apple | Le produit est le héros, l'interface s'efface | Neutres purs, un seul bleu réservé à l'action, très grandes images |
| Pentagram | Le travail signé parle, les auteurs sont nommés | Blanc, texte noir, un rouge rare, projets en grand dès l'accueil |
| IDEO | La méthode centrée sur les personnes est la marque | Récits de cas, photos de personnes, une couleur vive tenue |
| Linear, Vercel | Précision, vitesse, rigueur | Presque noir, typographie nette, aucune couleur décorative |
| Stripe | Confiance financière par la clarté | Neutres, une couleur de marque très localisée, preuves chiffrées |
| Andela, Qoder | Crédibilité entreprise, appel clair | Fond clair, boutons sombres, un vert sobre, capture produit en grand |

Ce que les studios admirés ont en commun : **peu de couleurs, une seule action évidente, et la preuve (travail, personnes, résultats) en grand.** Ce sont des constats sur leur apparence, pas une mesure de leur efficacité commerciale.

## Ce que la recherche en psychologie permet de dire

Prudence : l'effet d'une couleur dépend du contexte et de la culture, et les études sont moins solides que les slogans. Seuls les points suivants sont assez établis pour guider un choix.

1. **Le jugement est rapide.** Les visiteurs forment une opinion sur l'allure d'un site en une fraction de seconde (Lindgaard et collègues, 2006, environ 50 millisecondes). Le haut de l'accueil doit donc déjà paraître ordonné et sûr.
2. **Ce qui est beau paraît plus utilisable et plus fiable.** C'est l'effet d'esthétique et d'utilisabilité (Kurosu et Kashimura, 1995, prolongé par Tractinsky). Il joue sur la confiance, pas sur la fiabilité réelle : il faut tenir la promesse.
3. **La fluidité de lecture rassure.** Un contenu facile à traiter est jugé plus vrai et plus agréable. Contraste élevé, peu de styles, espaces réguliers.
4. **L'élément isolé attire l'œil.** Effet d'isolation de Von Restorff : une couleur employée rarement signale l'action principale. Si trois couleurs rivalisent, aucune ne guide.
5. **Moins de choix, plus de décision.** Loi de Hick : un seul appel à l'action par écran accélère le passage au contact.
6. **Les couleurs ont des associations de marque mesurables** : le bleu est associé à la compétence et le rouge à l'excitation (Labrecque et Milne, *Journal of the Academy of Marketing Science*, 2012). L'association du noir au raffinement n'a pas été vérifiée dans cette session : ne pas l'invoquer.
7. **La confiance vient surtout des preuves** : travaux réels, noms, visages, délais, périmètre assumé. Aucune couleur n'y supplée.

## Verdict sur le thème

- **Confiance et respect.** Noir, blanc et gris neutres, sans dégradé ni effet : franc, sobre, sans enjeu d'identité géographique (exclu par le positionnement).
- **Professionnalisme.** Peu de couleurs, grille régulière, contraste fort (texte noir sur blanc 19,8 pour 1, blanc sur noir 19,8).
- **Conversion.** Une seule couleur d'action, la même partout : le bouton de contact. Le reste est neutre pour que cette action soit la plus visible. Aujourd'hui l'accueil en a quatre (noir, bleu, violet, gris) : l'œil ne sait pas où aller.
- **Engagement.** Il vient du contenu : réalisations en grand, un cas raconté, un visage de l'équipe, une réponse promise. Pas de la couleur.

## Votre signature, relevée dans vos projets

Lecture des feuilles de style locales de vos projets récents (Sina, portfolio, Muse, ancien portfolio) le 26 novembre 2026. Mitemo et Pro n'ont pas de feuille de style lisible dans leurs dépôts publics : leur identité visuelle n'a pas été relevée.

| Projet | Base | Accent | Détail |
|---|---|---|---|
| Sina | Blanc cassé `#fcfcfc`, texte `#171717` | Vert menthe `#72e3ad` | Neutres sans teinte, bordures fines |
| Ancien portfolio | Blanc, texte `#0a0a0a`, mode sombre | Vert `#2f834f` | Neutres sans teinte |
| Portfolio | Blanc, `#0a0a0a`, gris `#f2f2f2` | Orange `#ff4f00` | Titres en police d'affichage, étiquettes en monospace |
| Muse | Blanc, `#171717`, mode sombre `#0a0a0a` | Aucun | Neutres seuls |

Travail en équipe (Akieni Academy, dossiers locaux `sap`, `KOP`, `Tea Cozy` et autres) : un seul dossier lu, `sap`, avec un vert foncé `#1c3f34`, un crème `#f6f0e4` et un or `#c9a24b`. Ce n'est pas forcément votre choix : en équipe, la palette est souvent décidée à plusieurs. Les autres projets d'équipe n'ont pas été relevés (à nommer : lesquels portent votre design).

Ce que cela dit de votre goût :
1. **Neutres sans teinte partout, un seul accent au plus.** Le thème noir et blanc de D-018 prolonge ce que vous faites déjà.
2. **Le vert revient deux fois sur quatre.** Il appuie le vert comme accent, plutôt qu'un jaune ou un violet que vous n'employez nulle part.
3. **Un vert foncé et sobre dans le travail d'équipe aussi** (`sap`), ce qui renforce le vert profond plutôt que le menthe.
4. **Une touche d'écriture technique** (monospace pour les étiquettes) dans le portfolio : une piste pour la « touche Luilka », à garder en petit, pour les étiquettes et les numéros d'étape.

Contrastes à respecter si le vert de vos projets est repris : le menthe `#72e3ad` ne supporte que du texte noir (12,5 pour 1) et jamais du texte blanc (1,6). Le vert `#2f834f` passe tout juste avec du blanc (4,7). Le vert profond `#0c5a41` est le plus sûr (8,2 avec du blanc).

## Marques proches de votre approche

Mêmes ressorts que vos projets (neutres, un accent, rigueur technique) : Linear, Vercel et Qoder pour l'interface, Pentagram et IDEO pour la preuve et la méthode. Je n'ai pas relevé d'autres marques à ce jour : la liste complète d'un benchmark reste à faire (à nommer : titulaire et date).

## Proposition

### Palette

| Rôle | Valeur | Emploi |
|---|---|---|
| Papier | `#ffffff` | Fonds |
| Encre | `#0a0a0a` | Texte, boutons, sections sombres |
| Graphite | `#262626` | Second noir |
| Gris | `#e8e8e8` | Cartes |
| Texte secondaire | `#404040` | Descriptions (10,4 sur blanc) |
| **Accent d'action** | à trancher | Un seul, pour le contact et l'étape finale |

Accent proposé : **vert profond `#0c5a41`** (blanc dessus : 8,2 pour 1). Il est sobre comme chez Andela et Qoder, évoque la réussite sans l'excitation du rouge, et il n'est ni le bleu des produits génériques ni un code de marque déjà saturé chez les studios. Le vert est aussi celui que vous employez déjà dans Sina et votre ancien portfolio. Alternative : aucun accent, comme Linear, Vercel et Muse, le bouton noir seul portant l'action. Le choix est un choix d'identité, non mesuré auprès de visiteurs.

### Règles

1. Une couleur d'accent seulement, jamais en texte courant sur blanc sans vérifier 4,5 pour 1.
2. Un seul appel à l'action fort par écran, toujours au même libellé.
3. Le noir sert à poser l'autorité : bandeau, contact, pied de page. Le blanc sert la lecture.
4. Pas de couleur décorative : le violet et le bleu vif sortent de l'interface.

### Illustrations

Les illustrations actuelles sont bleu et violet (le bleu `#2a4cb5` revient 34 fois), ce qui contredit le thème. Règles pour les refaire, en attendant de vraies captures :

1. **Montrer l'artefact, pas une métaphore** : fragments d'interface (liste, fil de décisions, diagramme de planning), en noir, graphite et gris, avec l'accent seul sur l'élément « validé ». Cela illustre la position « une preuve devient une décision d'interface ».
2. **Formes simples et rythme régulier** : la fluidité de lecture (point 3) vaut pour les images aussi.
3. **Pas de visage ni de scène inventés** : une personne dans une illustration doit être réelle, avec son accord.
4. **Remplacer dès que possible par de vraies captures** de Tala, Vuga, Pro et des projets. La preuve réelle l'emporte sur toute illustration.

## Ce que le thème ne fait pas

- Il ne remplace pas le contenu : sans travaux montrés ni noms de clients, aucune couleur ne donne confiance.
- Aucun test de visiteurs n'a été fait. Les effets décrits sont des tendances de la littérature, pas des résultats pour Luilka. Un test A/B ou 5 entretiens sur l'accueil le diraient (à nommer : titulaire et date).
- Le chiffre de conversion visé reste « À nommer » (voir [kpi.md](../Product/kpi.md)).

## Plan

1. Trancher l'accent (vert profond ou aucun) : titulaire @Espoir-Loem.
2. Jetons : retirer `--accent-blue`, `--accent-purple`, `--blue` ; ajouter `--graphite` et l'accent.
3. Quatre étapes : noir, graphite, gris, accent sur « Lancement ».
4. Bandeau incliné : gris uni. Bouton de contact : accent au survol.
5. Redessiner les 11 illustrations selon les règles ci-dessus.
6. Nouvelle décision D-019 et mise à jour des principes de design.

## Limites

- Palettes lues dans le HTML et trois feuilles de style par site, accueil seulement. Instagram, Koto et Deadwater n'ont pas pu être lus.
- Les références de psychologie ont été vérifiées sur leurs notices le 26 novembre 2026 (voir [la recherche UX](recherche-ux-confiance.md)), pas sur les articles complets.

## Sources

- Notes de recherche : `research_notes/Positionnement design Luilka Afrique Congo/white_space_positionnement.md`.
- Sites consultés le 26 novembre 2026 : andela.com, qoder.com, apple.com, linear.app, stripe.com, vercel.com, figma.com, framer.com, pentagram.com, work.co, instrument.com, fantasy.co.
- Contrastes : formule de luminance relative de WCAG 2.2.
