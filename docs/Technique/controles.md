# Contrôles

**Statut.** Retenue, 26 novembre 2026.
**Propriétaire.** @Espoir-Loem.
**Principe.** Toute vérification déterministe est un script, puis une étape de la CI. Le jugement humain sert aux arbitrages, pas à refaire ce qu'un script rejoue.

## Contrôles et emplacement

| Contrôle | Commande locale | Ce qu'il vérifie | Étape de la CI |
|---|---|---|---|
| Lint Python | `uv run ruff check .` | Règles `E`, `F`, `I`, `UP`, `B`, `S` | Check Python lint |
| Format Python | `uv run ruff format --check .` | Format unique | Check Python format |
| Types Python | `uv run mypy` | Typage strict de `src` et `tests` | Check Python types |
| Types client | `npm run typecheck` | `tsc` sur `tsconfig.client.json` | Check client types |
| Lint client | `npm run lint` | ESLint, dont 10 lignes par fonction | Check client lint |
| Style client | `npm run check:style` | Aucun commentaire sauf JSDoc, un `.map()` par composant, noms de fichiers | Check client code style |
| KPI | `npm run check:kpi` | Sections, 22 identifiants, forme des lignes, cibles sourcées | Check KPI sheet |
| Images | `npm run check:images` | `public/` : webp, avif ou svg, 200 ko au plus par raster, 50 ko par svg | Check images |
| Documentation | `npm run check:docs` | Typographie, liens, index, ADR, notes, numérotation | Check documentation |
| Tests Python | `uv run pytest` | Routes, structure, contenu | Run Python tests |
| Tests client | `npm test` | Composants et hooks | Run client tests |
| Build | `uv run nx build` | Le projet compile et génère `__nexy__/`, requis par les tests client | Build project |

`uv run nx check` lance `ruff` et `mypy`. `uv run nx test` lance `pytest` puis les tests client.

## Scripts

- `scripts/check_code_style.py`, testé par `tests/test_check_code_style.py`.
- `scripts/check_docs.py`, testé par `tests/test_check_docs.py`.
- `scripts/check_kpi.py`, testé par `tests/test_check_kpi.py`.

Un script est nommé clairement, idempotent et exécutable sans contexte humain. Il affiche ce qu'il a vérifié et chaque échec sur une ligne.

## Avant une pull request

Rejouer dans l'ordre : `uv run nx check`, `npm run lint`, `npm run typecheck`, `npm run check:style`, `npm run check:docs`, `npm run check:kpi`, `uv run nx test`, `uv run nx build`. Citer ce que chaque commande affiche, échecs compris.
