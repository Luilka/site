# Rapport : corrections de l'audit des pages

**Date.** 26 novembre 2026.
**Périmètre.** `src/` (layout, sections, cards, patterns, hooks, utils, i18n, types, content), `public/images/`, `tests/`, `docs/`, `AGENTS.md`, `pyproject.toml`, `__nexy__/`.
**Nature.** Instantané daté. Il ne fait pas foi sur l'état courant : voir [le registre des décisions](../docs/Product/decisions.md) et [l'audit](../docs/UX/audit-pages-et-concurrence.md).

## Ce qui a changé

- Menu de navigation sur téléphone, avec fermeture au clavier. Le seuil de l'en-tête passe à 1140 pixels. Voir [l'architecture](../docs/Technique/architecture.md).
- Libellés dans la langue de la page (D-013). « Blog » reste « Blog » en français et en anglais.
- Titre des pages intérieures à la taille d'affichage, sans titre de section en double ni paragraphe générique répété.
- Bandeau de processus qui défile en boucle et fond incliné à lignes obliques (D-014), arrêtés sous `prefers-reduced-motion`.
- Logo dessiné par le composant `Logo`, sans sprite ni `<use>`.
- Couvertures abstraites en `svg` pour les quatre réalisations et les trois produits, un registre `src/content/images.json`, et une page de détail qui ne répète plus sa description.
- Transitions de page : en-tête fixe, nouvelle page qui monte, couverture partagée entre la carte et la page.
- Liens LinkedIn, TikTok et YouTube dans le pied de page, affichés seulement quand l'adresse est renseignée dans `src/content/social.json`. LinkedIn est renseigné, TikTok et YouTube attendent leur adresse.
- Année du pied de page calculée, contrastes corrigés pour deux textes de cartes.

## Défauts corrigés au passage

- L'accueil mesurait 528 pixels de large dans un écran de 320, à cause du bandeau de processus et des colonnes du pied de page.
- L'en-tête de bureau débordait entre 1001 et environ 1120 pixels avec les libellés français, et deux menus s'affichaient ensemble à 1000 pixels pile.
- `nx start` supprime `__nexy__/nexy.prod` en s'arrêtant. Un test garde maintenant ce fichier versionné.

## Contrôles

Voir [controles.md](../docs/Technique/controles.md). Les résultats de chaque commande figurent dans la pull request qui porte ce changement. Les mesures de largeur et de transition ont été faites dans Chrome en local, pas sur Vercel.

## Questions ouvertes

Q-001, Q-003 et Q-004 du registre. À trancher par le titulaire : la couleur signature, l'ordre de la navigation, le sort du journal et de la newsletter, les adresses de TikTok et de YouTube, et le style des couvertures de réalisations.
