# Luilka

Site du studio produit Luilka, construit avec Nexy, React et Tailwind CSS.

## Versions figees

| Composant | Version |
|-----------|---------|
| Python | 3.13.15 |
| Node | 26.13.1 (LTS) |
| Nexy | 2.11.2 ou plus |
| React | 19.3.1 |
| Tailwind CSS | 4.3.5 |
| Motion | 14.14.0 |
| Lucide | 1.77.0 |
| Vite | 7.3.8 |

Les versions sont exactes dans `pyproject.toml` et `package.json`. Les lockfiles `uv.lock` et `package-lock.json` sont committes.

## Demarrage

```bash
uv sync
npm ci
uv run nx dev
```

Le site repond sur http://localhost:3000.

## Commandes de qualite

```bash
uv run ruff check .
uv run ruff format --check .
uv run mypy
uv run pytest
npm run lint
npm run typecheck
npm run check:style
npm test
uv run nx test --client
uv run nx build
```

La CI execute les memes commandes dans `.github/workflows/ci.yml`.

## Structure

```text
src/routes/                    pages React, un fichier par URL
src/shared/ui/                 atomes: bouton, badge, carte, champ, lien, conteneur
src/shared/hooks/              logique reutilisable: menu ouvert, newsletter, nouvel essai
src/shared/utils/                fonctions pures, TypeScript et Python: classes, liens de detail, validation, lecture des JSON
src/shared/i18n/               dictionnaires, langue et contenu
src/shared/types/              types partages
src/components/layout/         en-tete, navigation, pied de page, document
src/components/cards/          cartes: produit, service, travail, etape, info
src/components/patterns/       blocs reutilises par plusieurs pages
src/components/sections/       sections de page, dont (home)/ pour l'accueil
src/content/                   navigation et slugs partages avec Python
src/globale.css                unique feuille de style, tokens et classes @apply
src/brand/                     contenu de marque injecte par le conteneur Nexy
src/actions/                   actions serveur
scripts/                       controles deterministes rejoues en CI
tests/                         tests Python
tests/client/                  tests Vitest
```

## Liens

Tous les liens passent par `src/shared/ui/links.tsx`, un adaptateur autour du composant `Link` de Nexy. Il ajoute le curseur de pointeur et garde les props d'ancrage HTML.

Le fichier `src/shared/types/nexy-client.d.ts` donne une signature TypeScript propre au composant `Link` genere. La correspondance dans `tsconfig.client.json` ne concerne que la verification des types. A l'execution, Vite utilise le `Link` de Nexy.

## Regles de travail

TDD, SOLID et KISS. Un test ecrit avant le code, une assertion par test, une classe par intention.
L'experience de la personne qui visite le site passe avant la notation technique.
Aucun emoji et aucun caractere que l'on ne tape pas au clavier dans le code, l'interface, les logs ou les messages.
Les skills Nexy sont dans `.agents/skills/` et `.claude/skills/`.

## Documentation

L'index est dans [docs/README.md](docs/README.md). Les regles pour les agents sont dans [AGENTS.md](AGENTS.md). `npm run check:docs` verifie la typographie, les liens, l'index, les ADR et la numerotation. Les KPI sont dans [docs/Product/kpi.md](docs/Product/kpi.md), controles par `npm run check:kpi`.

## Regles de code

- Une fonction ou un composant tient en 10 lignes au plus, signature et accolades comprises (ESLint `max-lines-per-function`).
- Un fichier TSX regroupe les composants d'une même intention et ne contient que du rendu. La logique va dans un hook de `src/shared/hooks/` ou une fonction de `src/shared/utils/`.
- Un seul appel a `.map()` par composant.
- Aucun commentaire, sauf un bloc JSDoc `/** ... */`. `scripts/check_code_style.py` le controle.
- Ce qui sert a plusieurs endroits vit dans `src/shared/`. Une seule copie.
