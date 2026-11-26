# ADR 003 : noms de fichiers du client

Décision retenue : les fichiers TSX portent un nom simple et regroupent une famille de composants (`cards.tsx`, `buttons.tsx`). Les fichiers `.ts` portent le dossier en suffixe (`use-retry.hook.ts`).

## Titre

Noms de fichiers du client.

## Statut

retenue, D-006 au registre. Rouverte deux fois le 26 novembre 2026 à la demande du titulaire.

## Contexte

La règle a changé trois fois le même jour. Tirets (`info-card.tsx`), puis `<nom>.<dossier>.tsx` (`info.card.tsx`), puis noms simples pour les TSX. Les deux premiers donnaient plus de 100 fichiers de composants de 7 à 15 lignes, dont beaucoup n'avaient qu'un seul utilisateur. Nexy génère aussi du Python invalide pour un nom à point dans `__nexy__/`.

## Options

| Option | Motif pour | Motif contre |
|---|---|---|
| Un fichier par composant, suffixe de dossier | Chaque fichier se trouve par son nom | Une centaine de petits fichiers |
| Un fichier pluriel par famille | Lisible d'un seul tenant, comme la colocalisation de Next.js | Les fichiers grossissent, un seul `.map()` par composant |

## Décision

Retenir un fichier pluriel par famille pour les TSX, avec des exports nommés.

| Famille | Fichier |
|---|---|
| Cartes | `src/components/cards.tsx` |
| Cadre du site | `src/components/layout.tsx` |
| Blocs partagés | `src/components/patterns.tsx` |
| Sections de page | `src/components/sections.tsx` |
| Atomes | `src/shared/ui/buttons.tsx`, `links.tsx`, `cards.tsx`, `badges.tsx`, `inputs.tsx`, `containers.tsx`, `icon-tiles.tsx` |

Règles communes :
- Un composant déclaré pour un seul fichier est déclaré dans ce fichier. `src/routes/layout.tsx` contient son document, `src/routes/[lang]/index.tsx` ses sections d'accueil.
- Les routes gardent un export par défaut, imposé par Nexy.
- Les fichiers `.ts` de `shared/` et `content/` s'écrivent `<nom>.<dossier>.ts`, le dossier au singulier : `.hook`, `.util`, `.i18n`, `.type`, `.content`. Un hook commence par `use-`.
- Exceptions imposées par les outils : `index.ts`, `*.d.ts`, `*.test.ts(x)`, les segments de route de Nexy et les configs à la racine.
- Les fichiers Python restent en `snake_case`.

Vitest ne lance que `tests/client/**/*.test.{ts,tsx}`. `pyproject.toml` exclut `__nexy__/` de `mypy`.

Historique : retenue le 26 novembre 2026 (tirets), remplacée par `<nom>.<dossier>`, puis par les noms simples groupés, à la demande du titulaire.

## Conséquences

- `scripts/check_code_style.py` refuse un `.ts` sans le suffixe de son dossier, un hook sans `use-` et tout composant avec plus d'un `.map()`.
- La règle d'un seul `.map()` s'applique par composant, non plus par fichier (D-005).
- Les tests lisent les familles : `tests/test_architecture.py` vérifie les exports de chaque fichier.
- Un fichier de famille peut dépasser 100 lignes, chaque fonction reste sous 10 lignes.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
