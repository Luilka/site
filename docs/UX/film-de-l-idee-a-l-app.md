# Film « De l'idée à l'app » : chronologie en motion design

**Statut** : version 1, 27 novembre 2026. Film produit en français et en anglais, à relire par le titulaire avant toute publication.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [recherche vidéo](recherche-video-motion.md), [proposition de vidéo du héros](proposition-video-heros.md), [décisions](../Product/decisions.md) (D-022)

## Ce que c'est

Un film de motion design de 32 secondes qui raconte, comme une chronologie de formes, de textes et d'écrans, le chemin de l'idée à l'app. Il présente l'agence et sa façon de travailler, pas un produit. Les textes sont ceux du site (les quatre étapes et la phrase d'accroche), sans chiffre ni promesse de résultat.

## Format

- 1920 sur 1080, 24 images par seconde, 32 secondes, H.264 avec son.
- Deux versions : `de-l-idee-a-l-app-fr.mp4` et `de-l-idee-a-l-app-en.mp4` (environ 2,3 Mo chacune).
- Fichiers dans `motion/idea-to-app/out/` (non versionnés : ils se régénèrent depuis la source).
- Source : `motion/idea-to-app/timeline.html` (langue choisie par `?lang=fr` ou `?lang=en`) et `motion/idea-to-app/sound.py`.

## Chronologie

Une caméra se déplace de station en station le long d'une chronologie fixe en bas de l'écran. Les points de repère de la chronologie s'allument à l'arrivée de chaque étape.

| Temps | Station | Ce qui se passe |
|---|---|---|
| 0,8 s | Idée | Un point apparaît, une onde s'étend, trois formes (cercle, carré, triangle) se mettent à tourner autour |
| 6,0 s | Cadrage | Cinq personnes arrivent l'une après l'autre, des fils pointillés les relient au besoin, une bulle de parole apparaît |
| 11,2 s | Direction visuelle | Quatre pastilles de couleur entrent de directions différentes, deux « Aa » (serif et sans serif) montent, une règle se trace |
| 16,4 s | Design d'interface | Un téléphone se dessine, l'interface d'exemple se compose, un curseur trace un arc, survole puis clique ; une personne donne un retour validé |
| 22,0 s | Livraison | Le téléphone se décompose en six composants posés dans une grille |
| 26,6 s | App | Le téléphone revient animé, trois bascules s'activent, des ondes dorées s'étendent, la signature « Luilka » et « Nous contacter » apparaissent |

## Travail du mouvement

- Chaque élément a sa courbe, sa durée et son décalage : entrées en `easeOutExpo` pour les textes, dépassement `easeOutBack` pour les points et les pastilles, déplacements de caméra en `easeInOutCubic`.
- Les titres montent derrière un masque mot à mot, le sous-titre suit après un battement.
- Le curseur suit un arc de Bézier avec un freinage, une pause avant le clic, un léger retrait au moment de l'appui, une onde après.
- Les formes de la première station sortent en accélérant pendant le déplacement de caméra.
- La grille de points du fond défile à 55 % de la vitesse de la caméra pour donner de la profondeur.
- Interface d'exemple : c'est un écran d'exemple, étiqueté « Interface d'exemple » ou « Example interface ». Ce n'est le travail d'aucun client.

## Son

Synthétisé par code, un événement par geste, à partir de la même liste d'événements que l'image (la timeline exporte ses repères, donc le son ne peut pas dériver) : nappe grave, déplacements de caméra en souffle doux, bulles pour les personnes, petites cloches pour les pastilles, clics et glissements pour l'interface, une note montante au succès, un accord de cloches à la fin. Il commence et finit dans le silence.

Il n'a été que mesuré (crête 0,70, niveau moyen environ moins 21 dB), pas écouté par un humain. Il se mixe à plat : c'est un son d'interface synthétique, pas du bruitage enregistré.

## Limites et suite

- Je ne peux pas garantir qu'un œil expert ne reconnaîtra pas un film fait par code. Une passe finale par un monteur ou un motion designer humain (rythme, mixage, étalonnage) est recommandée avant diffusion publique.
- Le film montre la méthode, pas les réalisations de clients. Il peut s'enrichir de vos écrans réels avec l'accord des clients.
- Aucune voix, aucune musique d'auteur, aucun visage réel.
- Aucun test auprès de visiteurs.
- La publication sur YouTube est une action du titulaire.
- Une version courte pour le héros de l'accueil pourra en être tirée.
