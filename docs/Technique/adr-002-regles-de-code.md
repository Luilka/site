# ADR 002 : règles de code du client

Décision retenue : 10 lignes par fonction, aucune logique dans les TSX, un seul `.map()` par composant, aucun commentaire sauf JSDoc.

## Titre

Règles d'écriture du code client.

## Statut

retenue, D-005 au registre

## Contexte

Le dépôt Pro fixe un niveau d'exigence mesurable et appliqué par des outils. Luilka avait une cinquantaine de composants de plus de 10 lignes, dont une page d'accueil de 41 lignes et un en-tête de 54 lignes, avec de la logique mêlée au rendu.

## Options

| Option | Motif pour | Motif contre |
|---|---|---|
| Règles écrites, relues à la main | Aucun outil à ajouter | Dérive entre deux relectures |
| Règles écrites et appliquées par outils | La dérive est bloquée en CI | Les composants se découpent en petits fichiers |
| Seuil plus large, par exemple 30 lignes | Moins de fichiers | Le rendu et la logique se remêlent |

## Décision

Retenir la deuxième option.

- ESLint applique `max-lines-per-function` à 10, lignes vides et commentaires non comptés, signature et accolades comprises, et `no-inline-comments`.
- `scripts/check_code_style.py` refuse tout commentaire autre qu'un bloc `/** ... */` et tout composant TSX avec plus d'un appel à `.map()`.
- Un fichier TSX regroupe les composants d'une famille (`cards.tsx`, `layout.tsx`), avec du rendu seulement. Un composant déclaré pour un seul fichier vit dans ce fichier. Chaque composant a au plus un `.map()`.

Historique : proposée et retenue le 26 novembre 2026.

## Conséquences

- Un composant dont le rendu dépasse 10 lignes se découpe en sous-composants, un par fichier.
- Les données de rendu (listes, textes, classes) vivent dans des constantes ou dans le dictionnaire, pas dans la fonction.
- Les tests suivent la même règle de `.map()`. Un test qui transforme une liste utilise `Array.from(liste, fonction)`.
- La CI échoue sur toute fonction trop longue ou tout commentaire interdit. Une exception se discute par une réouverture de D-005.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
