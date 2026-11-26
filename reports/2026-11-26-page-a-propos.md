# Rapport : page À propos d'après la maquette

**Date.** 26 novembre 2026.
**Périmètre.** `src/` (routes, sections, cards, patterns, ui, utils, i18n, types, content), `public/images/about/`, `tests/`, `docs/`, `AGENTS.md`, `__nexy__/`.
**Nature.** Instantané daté. Il ne fait pas foi sur l'état courant : voir [le registre des décisions](../docs/Product/decisions.md) et [la page À propos](../docs/UX/page-a-propos.md).

## Ce qui a changé

- La page À propos suit la maquette du titulaire (D-015) : fil d'Ariane, en-tête avec visuel, mission, valeurs en mosaïque, équipe, puis contact.
- Quatre illustrations abstraites en `svg` pour l'en-tête et la mission, listées dans `src/content/images.json`.
- Trois atomes partagés à la place de copies : `Picture`, `StripedPanel`, `PageTitle` et `PageLead`.
- Les liens du pied de page deviennent des boutons ronds bordés, comme sur la maquette.
- Les trois autres libellés « Journal » du pied de page et du menu Produits disent « Blog » (D-013).

## Ce qui n'est pas repris de la maquette

Son texte parle de PossaCode, une association de développeurs : la vision interdit de présenter Luilka ainsi. Seule la mise en page est reprise. Les cinq cartes d'équipe en double, le bouton rond des cartes et les quatre cartes d'étapes ne sont pas repris.

## Défauts évités au passage

- Une section sans contenu (valeurs ou équipe) n'est jamais affichée.
- Une sixième valeur ne fait pas échouer le rendu : elle prend sa place dans la grille.
- Les tests de source exigeaient `PageHero` ou `PageFrame` dans chaque page : ils acceptent aussi `AboutHero`.

## Contrôles

Voir [controles.md](../docs/Technique/controles.md). Les résultats de chaque commande figurent dans la pull request qui porte ce changement. La mise en page a été mesurée dans Chrome en local à 320, 390, 800 et 1280 pixels : aucun défilement horizontal.

## Questions ouvertes

À fournir par le titulaire : les autres membres de l'équipe, la validation ou la réécriture des cinq valeurs, de vraies images à la place des illustrations. Q-001, Q-003 et Q-004 restent ouvertes.
