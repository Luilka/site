# ADR 003 : noms de fichiers sans point

Décision retenue : les noms de fichiers de composants utilisent des tirets, par exemple `info-card.tsx` et `hero-section.tsx`.

## Titre

Noms de fichiers des composants.

## Statut

retenue, D-006 au registre

## Contexte

Une première version de la refonte nommait les fichiers `info.card.tsx` et `hero.section.tsx`. Deux problèmes sont apparus le 26 novembre 2026.

1. Nexy génère un fichier Python par composant dans `__nexy__/` et en tire le nom de la fonction. `info.card.tsx` donne `def Info.card(...)`, ce qui est une erreur de syntaxe et fait échouer `mypy`.
2. Le motif de test `**/*.*.{ts,tsx}` de Vitest prenait tout fichier à deux points pour un fichier de test.

## Options

| Option | Motif pour | Motif contre |
|---|---|---|
| Garder les points et patcher la génération | Noms plus lisibles | Dépend d'un code généré que l'on ne modifie pas |
| Noms avec tirets | Valide pour Nexy, `mypy` et Vitest | Suffixe moins distinct |
| Noms en `snake_case` | Valide pour Python | Contraire à la convention des fichiers React du projet |

## Décision

Retenir les tirets. Le rôle se lit dans le suffixe : `-card`, `-section`. Vitest ne lance que `tests/client/**/*.test.{ts,tsx}`.

Historique : proposée et retenue le 26 novembre 2026.

## Conséquences

- `tests/test_architecture.py` vérifie les noms attendus des atomes, des cartes et des sections d'accueil.
- Tout nouveau composant porte un nom en tirets. Un nom avec un point est refusé en revue.
- `__nexy__/` reste généré. Si des fichiers périmés y traînent, on les supprime avant de reconstruire.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
