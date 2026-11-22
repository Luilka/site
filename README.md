# Luilka

Site du studio produit Luilka, construit avec Nexy, React et Tailwind CSS.

## Versions figees

| Composant | Version |
|-----------|---------|
| Python | 3.13.15 |
| Node | 26.13.1 (LTS) |
| Nexy | 2.8.0 |
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
npm test
uv run nx test --client
uv run nx build
```

La CI execute les memes commandes dans `.github/workflows/ci.yml`.

## Structure

```text
src/routes/                    pages React, un fichier par URL
src/components/ui/             atomes: bouton, badge, carte, champ, lien, conteneur
src/components/patterns/       composants de marque et d'interface
src/components/templates/      sections de page composees pour les pages
src/content/                   navigation partagee et dictionnaires francais et anglais
src/globale.css                unique feuille de style, tokens et classes @apply
src/contexts/                  etat de la langue
src/brand/                     contenu de marque injecte par le conteneur Nexy
src/actions/                   actions serveur
tests/                         tests Python
tests/client/                  tests Vitest
```

## Liens

Tous les liens passent par `src/components/ui/link.tsx`, un adaptateur autour du composant `Link` de Nexy. Il ajoute le curseur de pointeur et garde les props d'ancrage HTML.

Le fichier `src/types/nexy-client.d.ts` donne une signature TypeScript propre au composant `Link` genere. La correspondance dans `tsconfig.client.json` ne concerne que la verification des types. A l'execution, Vite utilise le `Link` de Nexy.

## Regles de travail

TDD, SOLID et KISS. Un test ecrit avant le code, une assertion par test, une classe par intention.
L'experience de la personne qui visite le site passe avant la notation technique.
Aucun emoji et aucun caractere que l'on ne tape pas au clavier dans le code, l'interface, les logs ou les messages.
Les skills Nexy sont dans `.agents/skills/` et `.claude/skills/`.
