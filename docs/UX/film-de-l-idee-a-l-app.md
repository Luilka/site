# Film « De l'idée à l'app » : chronologie en motion design

**Statut** : version 2, 27 novembre 2026. Remplace la version 1, jugée trop proche du thème du site, sans photo humaine et trop « IA » par le titulaire. À relire et à écouter par le titulaire avant toute publication.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [recherche vidéo](recherche-video-motion.md), [proposition de vidéo du héros](proposition-video-heros.md), [décisions](../Product/decisions.md) (D-022)

## Ce que c'est

Un film de motion design de 32 secondes qui raconte, comme une chronologie, le chemin de l'idée à l'app, avec des formes, du texte, des écrans d'exemple, une voix et du son. Il présente l'agence et sa façon de travailler, pas un produit. Les textes sont ceux du site, sans chiffre ni promesse de résultat.

## Ce qui a changé depuis la version 1

| Reproche | Réponse de la version 2 |
|---|---|
| Trop le thème du site (fond blanc, grille de points parfaite) | Identité propre : fond vert très sombre et chaud, grain de pellicule différent à chaque image, vignette, caméra qui respire de quelques pixels, polices à contraste fort, aplats de couleur pleine page |
| Zéro photo humaine | Le vrai portrait GitHub d'Espoir LOEMBA, avec son nom et son rôle, en tirage collé au ruban. Deux emplacements (`scene-1.jpg`, `scene-2.jpg` dans `motion/idea-to-app/photos/`) attendent d'autres photos réelles |
| Trop « IA » | Scènes de durées inégales (3,4 s à 8 s), mise en page différente par scène (texte à gauche ou à droite, aplats pleine page, grille de composants légèrement inclinés), annotations tracées à main levée, un seul vrai rebond (le point de départ), silences réels dans le son, un temps d'arrêt avant la signature |
| Voix de synthèse robotique | Voix de Veyla (outil du titulaire, voix Piper « siwis », style « chaud », niveau YouTube) au lieu d'une voix générique ; la musique baisse sous la voix |

## Format

- 1920 sur 1080, 24 images par seconde, 32 secondes, H.264 avec son.
- Fichiers : `motion/idea-to-app/out/de-l-idee-a-l-app-fr.mp4` (avec voix) et `de-l-idee-a-l-app-en.mp4` (sans voix), environ 5 Mo chacun, encodés en H.264 (`crf 30`). Le grain est atténué par la compression.
- Source : `motion/idea-to-app/timeline.html` (langue par `?lang=fr` ou `?lang=en`, photos dans `photos/`) et `motion/idea-to-app/sound.py`. Les fichiers rendus ne sont pas versionnés.

## Chronologie

Une caméra se déplace de station en station, avec une chronologie discrète en bas de l'écran.

| Temps | Station | Ce qui se passe |
|---|---|---|
| 0,6 s | Idée (3,4 s) | Un disque doré apparaît avec un rebond marqué, une onde, trois formes en orbite qui s'en vont ; titre à gauche |
| 4,0 s | Cadrage (7,2 s) | Le tirage d'Espoir LOEMBA se pose, cinq personnes arrivent à des rythmes différents, fils pointillés tracés à la main vers le besoin, une bulle de parole |
| 11,2 s | Direction visuelle (3,6 s) | Quatre aplats de couleur montent à des vitesses différentes, « Aa » en serif, sans serif et italique ; titre en bas |
| 14,8 s | Design d'interface (8,0 s) | Un téléphone se dessine à gauche, trois annotations tracées à la main, un curseur trace un arc, hésite, appuie ; une personne approuve |
| 22,8 s | Livraison (4,4 s) | Six composants arrivent en désordre, légèrement inclinés |
| 27,2 s | App (4,8 s) | Le téléphone reste immobile un instant, des bascules s'activent, puis la signature « Luilka » et « Nous contacter » |

## Voix et son

- **Voix** : générée par Veyla (`veyla say`, style `chaud`, niveau `youtube`, 48 kHz 24 bits), six courtes phrases tirées des textes du site, calées sur chaque station. La dernière dit « Du design à l'application. Luilka. ».
- **Vérification** : relue par le Vosk de Veyla, elle est compréhensible. Une relecture automatique ne remplace pas l'écoute humaine : à écouter par le titulaire. « Luilka » n'a pas pu être confirmé ; sa prononciation est à valider.
- **Bande-son** : une vingtaine de repères seulement, avec de vrais silences, une nappe grave, un bruit de pièce continu pour ne jamais tomber au silence numérique, des barres frappées légèrement désaccordées plutôt que des sinus purs. Les repères viennent de la timeline, donc le son ne dérive pas de l'image. La musique est abaissée de 60 pour cent sous la voix.
- **Anglais** : pas de voix (Veyla n'a que la voix française installée). Une voix anglaise demanderait un modèle anglais ou un clonage de la voix du titulaire avec son consentement, selon le régime de Veyla.

## Sur le site

Le film est sur la page À propos, après la mission (D-023) : lecture sur clic, commandes du navigateur, rien n'est téléchargé avant la lecture (environ 5 Mo ensuite), sous-titres français pour la voix, transcription repliée dans les deux langues.

## Limites et suite

- Le film reste fait par code : je ne garantis pas qu'un œil expert ne le reconnaîtra pas. Une passe finale par un monteur humain (rythme, mixage, étalonnage) est recommandée avant diffusion publique.
- Une seule photo humaine réelle. Pour plus d'humain, envoyer 2 ou 3 photos du titulaire au travail ou de son espace (avec leur accord), qui prendront les emplacements prévus.
- Le film montre la méthode, pas les réalisations de clients. L'écran est un exemple, étiqueté « Interface d'exemple ».
- Le grain de pellicule se voit moins après compression : un encodage moins agressif le garderait, au prix d'un fichier bien plus lourd (de 50 à 115 Mo mesurés).
- Aucun test auprès de visiteurs. La publication sur YouTube est une action du titulaire.
