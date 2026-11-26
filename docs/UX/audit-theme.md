# Synthèse du thème : confiance, sérieux, conversion

**Statut** : version 2, 26 novembre 2026. Remplace la version 1 (accent jaune-vert), écartée par le titulaire. D-018 reste la base.
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
6. **Le noir et le blanc évoquent le raffinement, le bleu la compétence, le rouge l'excitation** (Labrecque et Milne, 2012, sur des marques). Ce sont des associations moyennes, pas des lois.
7. **La confiance vient surtout des preuves** : travaux réels, noms, visages, délais, périmètre assumé. Aucune couleur n'y supplée.

## Verdict sur le thème

- **Confiance et respect.** Noir, blanc et gris neutres, sans dégradé ni effet : franc, sobre, sans enjeu d'identité géographique (exclu par le positionnement).
- **Professionnalisme.** Peu de couleurs, grille régulière, contraste fort (texte noir sur blanc 19,8 pour 1, blanc sur noir 19,8).
- **Conversion.** Une seule couleur d'action, la même partout : le bouton de contact. Le reste est neutre pour que cette action soit la plus visible. Aujourd'hui l'accueil en a quatre (noir, bleu, violet, gris) : l'œil ne sait pas où aller.
- **Engagement.** Il vient du contenu : réalisations en grand, un cas raconté, un visage de l'équipe, une réponse promise. Pas de la couleur.

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

Accent proposé : **vert profond `#0c5a41`** (blanc dessus : 8,2 pour 1). Il est sobre comme chez Andela et Qoder, évoque la réussite sans l'excitation du rouge, et il n'est ni le bleu des produits génériques ni un code de marque déjà saturé chez les studios. Alternative : aucun accent, comme Linear et Vercel, le bouton noir seul portant l'action. Le choix est un choix d'identité, non mesuré auprès de visiteurs.

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
3. Quatre étapes : noir, graphite, gris, accent sur « Livraison ».
4. Bandeau incliné : gris uni. Bouton de contact : accent au survol.
5. Redessiner les 11 illustrations selon les règles ci-dessus.
6. Nouvelle décision D-019 et mise à jour des principes de design.

## Limites

- Palettes lues dans le HTML et trois feuilles de style par site, accueil seulement. Instagram, Koto et Deadwater n'ont pas pu être lus.
- Les références de psychologie sont citées de mémoire d'auteur et d'année, sans relecture des articles dans cette session : à vérifier avant publication.

## Sources

- Notes de recherche : `research_notes/Positionnement design Luilka Afrique Congo/white_space_positionnement.md`.
- Sites consultés le 26 novembre 2026 : andela.com, qoder.com, apple.com, linear.app, stripe.com, vercel.com, figma.com, framer.com, pentagram.com, work.co, instrument.com, fantasy.co.
- Contrastes : formule de luminance relative de WCAG 2.2.
