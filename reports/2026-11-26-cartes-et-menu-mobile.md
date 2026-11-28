# Rapport : cartes en plein cadre et menu mobile en feuille

**Date.** 26 novembre 2026.
**Périmètre.** `src/components/cards.tsx`, `src/components/layout.tsx`, `src/shared/hooks/`, `src/globale.css`, `public/images/products/`, `tests/`, `docs/`, `__nexy__/`.
**Nature.** Instantané daté. Il ne fait pas foi sur l'état courant : voir [le registre des décisions](../docs/Product/decisions.md).

## Ce qui a changé

- Les cartes de réalisations et de produits affichent leur visuel sur toute la carte, le texte en absolu sur un panneau flou (D-017).
- Le menu mobile est une feuille latérale à droite, avec un fond flou à grille de petits carrés, un bouton « Fermer », le focus dans la feuille et le défilement bloqué.
- Les trois illustrations de produits sont resserrées au centre du cadre pour survivre au recadrage.

## Défauts évités au passage

- La mise au point automatique dans la feuille ne se déclenchait pas avec `requestAnimationFrame` dans un onglet sans visibilité : un court délai la rend fiable.

## Contrôles

Voir [controles.md](../docs/Technique/controles.md). Mesures faites dans Chrome en local, pas sur Vercel.

## Questions ouvertes

Q-001, Q-003 et Q-004 restent ouvertes.
