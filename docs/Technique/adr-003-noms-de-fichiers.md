# ADR 003 : noms de fichiers

Décision retenue : tout fichier `.ts` et `.tsx` est écrit en minuscules, mots reliés par des tirets, sans point. Exemples : `info-card.tsx`, `hero-section.tsx`, `use-retry.ts`, `shared-lib.test.ts`.

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

Retenir les tirets, avec une seule règle pour tous les fichiers `.ts` et `.tsx` de `src/` et de `tests/`.

| Type de fichier | Règle | Exemples |
|---|---|---|
| Composant (`.tsx`) | Le rôle se lit dans le suffixe : `-card`, `-section`, `-panel`. Il exporte un seul composant | `product-card.tsx`, `hero-section.tsx` |
| Hook (`.ts`) | Préfixe `use-`. Dans `shared/hooks/`, le préfixe est obligatoire | `use-open-menu.ts` |
| Fonction pure (`.ts`) | Un nom qui dit le traitement ou la donnée | `validate-email.ts`, `detail-href.ts` |
| Type (`.ts`) | Le sujet | `detail.ts`, `site.ts` |
| Test | Le sujet, puis `.test` | `newsletter-form.test.tsx`, `shared-lib.test.ts` |
| Déclaration | Le sujet, puis `.d` | `nexy-client.d.ts` |
| Segment de route | Imposé par Nexy : `[lang]`, `[slug].tsx`, `(home)` | `[slug].tsx` |
| Fichier de config à la racine | Imposé par l'outil | `vite.config.ts` |

Vitest ne lance que `tests/client/**/*.test.{ts,tsx}`. Les fichiers Python restent en `snake_case`, règle de Python.

Historique : proposée et retenue le 26 novembre 2026.

## Conséquences

- `tests/test_architecture.py` vérifie les noms attendus des atomes, des cartes et des sections d'accueil.
- `scripts/check_code_style.py` refuse tout nom hors de cette règle, et tout fichier de `hooks/` sans préfixe `use-`. Les fichiers de test du client, en PascalCase jusqu'au 26 novembre 2026, ont été renommés.
- Tout nouveau fichier porte un nom en tirets. Un nom avec un point ou des majuscules est refusé par le contrôle.
- `__nexy__/` reste généré. Si des fichiers périmés y traînent, on les supprime avant de reconstruire.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
