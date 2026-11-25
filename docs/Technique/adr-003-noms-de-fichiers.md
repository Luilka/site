# ADR 003 : noms de fichiers `<nom>.<dossier>.ts(x)`

Décision retenue : tout fichier `.ts` et `.tsx` de `src/` porte le nom du dossier qui le range, en suffixe : `product.card.tsx`, `hero.section.tsx`, `use-retry.hook.ts`, `validate-email.util.ts`.

## Titre

Noms de fichiers du client.

## Statut

retenue, D-006 au registre. Rouverte le 26 novembre 2026 à la demande du titulaire : la règle « tirets, sans point » est remplacée par `<nom>.<dossier>`.

## Contexte

Le titulaire nommait ses fichiers `<nom>.<rôle>.tsx` (`heading.section.tsx`, `step.card.tsx`). Une première refonte les a remplacés par des tirets (`info-card.tsx`) pour deux raisons, constatées le 26 novembre 2026.

1. Nexy génère un fichier Python par composant dans `__nexy__/` et en tire le nom de la fonction. `info.card.tsx` donne `def Info.card(...)`, une erreur de syntaxe pour `mypy`.
2. Le motif de test `**/*.*.{ts,tsx}` de Vitest prenait tout fichier à deux points pour un fichier de test.

Le titulaire a ensuite demandé le format `<nom>.<dossier>`, qui rend le rôle d'un fichier lisible dans un onglet, un résultat de recherche ou une pile d'appels. Les deux causes se traitent sans renoncer à ce format.

## Options

| Option | Motif pour | Motif contre |
|---|---|---|
| Tirets, sans point (`info-card.tsx`) | Aucun contournement | Le rôle ne se lit que si le nom le contient |
| `<nom>.<dossier>` (`info.card.tsx`) | Le dossier se lit dans le nom du fichier | Nexy génère du Python invalide pour ces noms, à exclure de `mypy` |
| `snake_case` | Valide pour Python | Contraire aux usages React |

## Décision

Retenir `<nom>.<dossier>`, avec le nom du dossier au singulier.

| Dossier | Suffixe | Exemple |
|---|---|---|
| `components/cards` | `.card` | `product.card.tsx` |
| `components/sections` | `.section` | `hero.section.tsx` |
| `components/layout` | `.layout` | `header.layout.tsx` |
| `components/patterns` | `.pattern` | `page-frame.pattern.tsx` |
| `shared/ui` | `.ui` | `button.ui.tsx` |
| `shared/hooks` | `.hook`, préfixe `use-` obligatoire | `use-open-menu.hook.ts` |
| `shared/utils` | `.util` | `validate-email.util.ts` |
| `shared/i18n` | `.i18n` | `dictionaries.i18n.ts` |
| `shared/types` | `.type` | `detail.type.ts` |
| `content` | `.content` | `detail-models.content.ts` |

Règles communes :
- Le suffixe est celui du dossier de premier niveau sous `components/` ou `shared/`. Un sous-dossier (`layout/navigation/`) garde le suffixe de son parent : `nav-entry.layout.tsx`.
- Un nom qui finit déjà par le suffixe ne le répète pas : `product-card` devient `product.card`.
- Le nom avant le suffixe est en minuscules, mots reliés par des tirets.
- Un dossier entre parenthèses (`(home)`) n'est pas un dossier de rangement : `hero.section.tsx` y garde le suffixe de `sections`.
- Exceptions imposées par les outils : `index.ts` (barrel), `*.d.ts`, `*.test.ts(x)`, les segments de route de Nexy (`[lang]`, `[slug].tsx`, `layout.tsx`, `errors.tsx`) et les configs à la racine (`vite.config.ts`).
- Les fichiers Python restent en `snake_case`, règle de Python, et vivent dans les mêmes dossiers de `shared/`.

Vitest ne lance que `tests/client/**/*.test.{ts,tsx}`. `pyproject.toml` exclut `__nexy__/` de `mypy` : ce dossier est généré et ses noms de fonction ne sont pas du Python valide.

Historique : retenue le 26 novembre 2026 (tirets), rouverte et remplacée le 26 novembre 2026 par `<nom>.<dossier>` à la demande du titulaire.

## Conséquences

- `scripts/check_code_style.py` refuse tout nom de `src/` qui n'a pas le suffixe de son dossier, et tout fichier de `hooks/` sans préfixe `use-`.
- `tests/test_architecture.py` vérifie les noms attendus des atomes, des cartes et des sections d'accueil.
- Déplacer un fichier d'un dossier à un autre impose de le renommer.
- Le code généré de `__nexy__/` n'est plus analysé par `mypy`. Les types du code écrit à la main le restent.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
