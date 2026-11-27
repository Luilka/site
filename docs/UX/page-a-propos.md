# Page À propos

**Statut** : version 1, 26 novembre 2026
**Propriétaire** : @Espoir-Loem
**Décisions liées** : D-015, D-016
**Source** : maquette du titulaire, dossier `maquette/` du dépôt local, non versionné
**Documents liés** : [vision](../Product/vision.md), [principes de design](design-principles.md), [audit des pages](audit-pages-et-concurrence.md)

## Cadre

Qui arrive : un responsable produit ou marketing qui hésite entre plusieurs studios, souvent sur téléphone, et veut savoir qui est derrière Luilka et comment le studio travaille.

Travail à faire : se faire une idée de la méthode et des personnes en moins d'une minute, puis écrire.

Motif de départ : une page qui ressemble à celle de n'importe quel studio, sans visage et sans méthode concrète.

Chose à rendre facile : passer de « qui sont-ils » à « je leur écris » sans changer de page.

## Ordre de la page

| Bloc | Ce que fait la page | D'où vient le texte |
|---|---|---|
| En-tête | Fil d'Ariane, titre, une phrase, un visuel | Titre et description de `pages.about` du dictionnaire |
| Mission | Titre, deux paragraphes, trois visuels | Les deux paragraphes `about` déjà publiés sur l'accueil |
| Valeurs | Cinq tuiles en mosaïque, la première au centre | Voir « Textes à valider » |
| Équipe | Une carte par personne confirmée : portrait, nom, rôle et bouton rond vers le profil GitHub | Nom, rôle et compte GitHub donnés par le titulaire |
| Contact | Le bloc de contact des autres pages | Dictionnaire, inchangé |

Le bloc des valeurs et celui de l'équipe disparaissent quand leur liste est vide : une section sans contenu n'est jamais affichée.

## Ce qui n'est pas repris de la maquette

- **Le texte.** La maquette parle de PossaCode, une association de développeurs (« PossaCode est une association qui forme et réunit les développeurs »). La [vision](../Product/vision.md) interdit de présenter Luilka comme une communauté de développeurs. Seule la mise en page est reprise.
- **Les cinq cartes d'équipe en double.** La maquette répète six fois la même carte « Espoir LOEMBA, CEO ». Seule la première personne existe pour l'instant, avec le rôle « Founder » : il n'y a pas encore de CEO. La grille est prévue pour six profils, sur trois colonnes et deux rangées. Ajouter une personne se fait dans le dictionnaire (nom, rôle, compte GitHub), sans toucher au composant.
- **Les quatre cartes d'étapes.** Elles quittent cette page et restent sur l'accueil.
- **Les colonnes de liens du pied de page.** Elles viennent aussi de PossaCode. Le pied de page de Luilka est inchangé, sauf ses liens de réseaux qui deviennent des boutons ronds comme sur la maquette.

## Textes à valider

Le dépôt ne contient aucune liste de valeurs. Les cinq tuiles reformulent ce que le site affirme déjà, pour ne rien ajouter de nouveau. Le titulaire les valide ou les remplace dans `src/shared/i18n/dictionaries.i18n.ts`.

| Valeur | Source dans le dépôt |
|---|---|
| Observer avant de dessiner | Texte À propos : « part d'un besoin observé » |
| Vérifier avec les gens | Texte À propos : « se vérifie avec les gens qui utiliseront le produit », étape 03 de l'accueil |
| Livrer une interface prête à construire | Accroche de l'accueil et étape 04 |
| Écrire dès la première maquette | Description du service UI design : « les mots sont intégrés dès la première maquette » |
| Des preuves sourcées | [Vision](../Product/vision.md), « Ce que le site ne fait pas », et principe 2 des principes de design |

Les deux phrases d'introduction (« Ce qui guide chaque projet... » et « Les personnes qui conçoivent, écrivent et construisent avec vous ») viennent de la ligne « conçoit, écrit et construit » de D-009.

## Images

Les quatre visuels sont des illustrations abstraites en `svg`, sans texte ni faux écran (`public/images/about/`), listées dans `src/content/images.json`. Pour mettre de vraies images, déposer le fichier `webp` dans `public/images/about/` puis changer `src`, `width` et `height` de l'entrée. Le portrait d'une personne est son avatar GitHub (`https://github.com/<compte>.png`), chargé depuis github.com à chaque visite avec `referrerpolicy="no-referrer"` (D-016). Il suit les changements de photo de la personne sur GitHub. Les initiales restent derrière la photo : elles s'affichent si GitHub ne répond pas, et seules pour une personne sans compte. Le bouton rond de la carte mène au profil GitHub.

## Images provisoires

Quatre images sont des maquettes d'application provisoires, choisies pour montrer le type de rendu voulu : l'en-tête et la mission de cette page (`public/images/about/hero.webp`, `mission.webp`), et les réalisations Yano et Vox Congo (`public/images/work/`). Ce sont des visuels de tiers trouvés sur Pinterest, recadrés à la taille des emplacements. Ils servent de repère de style pendant le développement. Ils ne doivent pas rester en ligne : les remplacer par des maquettes dont Luilka détient les droits, avec le même nom de fichier, avant la mise en production. Titulaire : @Espoir-Loem.

## À fournir par le studio

- Les autres membres de l'équipe : nom, rôle et compte GitHub.
- La validation, ou la réécriture, des cinq valeurs.
- De vraies images pour l'en-tête et la mission, si elles existent.

## Limites

- La mise en page a été vérifiée dans Chrome en local à 320, 390, 800 et 1280 pixels, pas sur Vercel.
- Les six profils ont été vérifiés avec six cartes de test, pas avec six personnes réelles.
- Aucun test auprès de visiteurs. Le choix de la mosaïque et de l'ordre des blocs suit la maquette, pas une mesure.
