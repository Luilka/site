# Page À propos

**Statut** : version 1, 26 novembre 2026
**Propriétaire** : @Espoir-Loem
**Décision liée** : D-015
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
| Équipe | Une carte par personne confirmée | Nom et rôle repris de la maquette |
| Contact | Le bloc de contact des autres pages | Dictionnaire, inchangé |

Le bloc des valeurs et celui de l'équipe disparaissent quand leur liste est vide : une section sans contenu n'est jamais affichée.

## Ce qui n'est pas repris de la maquette

- **Le texte.** La maquette parle de PossaCode, une association de développeurs (« PossaCode est une association qui forme et réunit les développeurs »). La [vision](../Product/vision.md) interdit de présenter Luilka comme une communauté de développeurs. Seule la mise en page est reprise.
- **Les cinq cartes d'équipe en double.** La maquette répète six fois « Espoir LOEMBA, CEO ». Une seule carte est publiée. Ajouter une personne se fait dans le dictionnaire, sans toucher au composant.
- **Le bouton rond des cartes d'équipe.** Aucun profil n'est à lier pour l'instant, et aucun lien n'est inventé.
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

Les quatre visuels sont des illustrations abstraites en `svg`, sans texte ni faux écran (`public/images/about/`), listées dans `src/content/images.json`. Pour mettre de vraies images, déposer le fichier `webp` dans `public/images/about/` puis changer `src`, `width` et `height` de l'entrée. Une carte d'équipe sans photo affiche les initiales de la personne.

## À fournir par le studio

- Les autres membres de l'équipe : nom, rôle, photo.
- La validation, ou la réécriture, des cinq valeurs.
- De vraies images pour l'en-tête et la mission, si elles existent.

## Limites

- La mise en page a été vérifiée dans Chrome en local à 320, 390, 800 et 1280 pixels, pas sur Vercel.
- Aucun test auprès de visiteurs. Le choix de la mosaïque et de l'ordre des blocs suit la maquette, pas une mesure.
