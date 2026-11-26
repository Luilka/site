# Proposition : une vidéo de réalisations dans le héros

**Statut** : chemin A appliqué le 26 novembre 2026 (D-021) avec une pièce de motion design construite sur la marque ; le diaporama du chemin B (D-019) est retiré.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [recherche UX](recherche-ux-confiance.md), [synthèse du thème](audit-theme.md), [audit des pages](audit-pages-et-concurrence.md)

## Cadre

Qui arrive : un responsable produit qui compare des studios, souvent sur téléphone, parfois avec des données chères et une connexion instable.
Travail à faire : voir en quelques secondes ce que Luilka dessine.
Motif de départ : le panneau rayé du héros est décoratif et ne montre aucune preuve.
Chose à rendre facile : voir le travail réel dès le haut de la page.

## Proposition

Remplacer **le panneau rayé du héros de l'accueil seulement** par une courte boucle muette de réalisations. Le panneau rayé reste intact sur la page À propos (valeur centrale) : rien d'autre ne change.

## Pourquoi c'est une bonne idée

- Le mouvement montre le travail réel, c'est la preuve que la recherche place en premier (réalisations en grand, haut de l'accueil).
- Une vidéo muette est discrète : aucun son à couper, aucune permission.

## Ce qu'il faut pour ne rien casser

1. **Poids.** Les illustrations actuelles pèsent 36 Ko en tout. Une vidéo pèse des dizaines de fois plus, sur un public mobile aux données chères. Budget proposé : 1 Mo au plus, à mesurer (à nommer : titulaire).
2. **Image d'abord.** Une image fixe (`poster`) s'affiche tout de suite et sert de plus grand élément de la page. La vidéo ne se charge qu'après, et seulement si la connexion le permet.
3. **Pas de vidéo** quand le visiteur a demandé moins de mouvement (`prefers-reduced-motion`) ou activé l'économie de données (`saveData`) : il voit l'image fixe.
4. **Contrôle.** Une vidéo qui bouge plus de 5 secondes doit pouvoir être mise en pause (WCAG 2.2, critère 2.2.2) : un bouton Pause, nommé, de 24 pixels au moins.
5. **Mobile.** Lecture en ligne (`playsinline`), muette, en boucle ; deux fichiers (`webm` et `mp4`) pour la compatibilité.
6. **Contenu décoratif.** Aucune information n'est portée par la vidéo seule : le titre, la phrase et le bouton restent le contenu. La vidéo est masquée aux lecteurs d'écran.
7. **Réalisations réelles, avec l'accord des clients.** Je ne peux pas inventer ces images : enregistrements d'écran de Yano, Vox Congo, Mitemo, Privatis ou Tala, Vuga, Pro, 6 à 8 secondes en boucle.

## Trois chemins

| Chemin | Contenu | Poids | Dépend de |
|---|---|---|---|
| A. Boucle vidéo | Enregistrements d'écran, 6 à 8 secondes | Environ 1 Mo (à mesurer) | Vos enregistrements et l'accord des clients |
| B. Diaporama sans vidéo | Fondu enchaîné des couvertures existantes | Aucun poids de plus | Rien, mais ce sont des illustrations provisoires |
| C. Image fixe d'une vraie réalisation | Une capture réelle en grand | Faible | Une capture |

Recommandation : **B maintenant**, pour tester l'emplacement et le rythme sans rien casser, puis **A** quand les enregistrements existent, dans le même composant (une source vidéo optionnelle, repli sur l'image).

## Ce qui est touché

- `src/routes/[lang]/index.tsx` : `HeroSection` remplace `StripedPanel` par un composant `HeroReel`.
- `src/components/patterns.tsx` : `HeroReel` (rendu), un hook de `src/shared/hooks/` pour la lecture, la pause et les préférences.
- `src/content/images.json` : liste des visuels du héros.
- Tests : le panneau rayé de l'accueil n'est plus attendu ; celui de la page À propos le reste.

Rien n'est modifié dans les cartes, le menu, le bandeau ni la page À propos.

## Mesures de réussite (à nommer)

Taux de clic sur le contact depuis l'accueil (KPI à nommer, Q-004 pour la collecte), poids de la page d'accueil, plus grand élément chargé. Aucune cible n'est inventée.

## Décisions demandées

1. Chemin B maintenant, A ensuite ?
2. Budget de poids de la vidéo (proposition : 1 Mo) ?
3. Quelles réalisations montrer, avec quel accord ?

## Réalisation : la pièce de motion design

Source : `motion/hero-reel/timeline.html`. Chaque image est calculée à partir du temps par une fonction unique `draw(t)`, sans animation automatique du navigateur, donc rejouable et modifiable seconde par seconde.

- **Format** : 1080 sur 880 (le cadre du héros en double densité), 24 images par seconde, 8 secondes, boucle sans coupure (la dernière image rejoint la première), sans son.
- **Rythme** : une introduction de 0,6 s (logo, parcours en pointillé), puis quatre étapes de 1,7 s, puis 0,8 s de fondu de sortie.
- **Chaque étape** : le segment du parcours se dessine (accélération puis freinage, `easeInOutCubic`), le point se pose avec un léger dépassement (`easeOutBack`), le chiffre, l'étiquette et les lignes de texte montent derrière un masque en cascade (`easeOutExpo`, décalage de 0,1 s), puis le tout sort en accélérant (`easeInCubic`) pendant que l'étape suivante arrive, avec un battement de 0,2 s.
- **Retenue** : un seul trait doré de 1,5 pixel, un chiffre en serif à fort contraste, pas de lueur, pas de particules, pas de dégradé de maillage. Poussée de caméra de 3,5 % sur toute la durée.
- **Texte** : les quatre descriptions de la page d'accueil, mot pour mot.
- **Poids** : 202 Ko (MP4), contre un budget de 1 Mo.

Rendu : ouvrir la page dans Chrome, appeler `draw(t)` pour `t = i / 24`, capturer 192 images, encoder en H.264 (`crf 26`, `yuv420p`, `faststart`). L'image fixe est la capture à 1,65 s.

Limites : la pièce montre la méthode, pas les réalisations réelles ; elle sera à remplacer ou à compléter par vos enregistrements d'écran avec l'accord des clients. Aucun test de visiteurs n'a été fait.

