# Registre des décisions

**Statut** : version 1, 26 novembre 2026
**Rôle** : source canonique des décisions retenues et des questions ouvertes. Une décision modifiée garde sa ligne d'historique.
**Règle** : aucune modification silencieuse. Rouvrir une décision demande la nouvelle preuve, la date, la décision remplacée et les documents touchés.

## Décisions retenues

| Id | Décision | Date | Propriétaire | Source |
|---|---|---|---|---|
| D-001 | Les branches permanentes sont `main`, `staging` et `develop`. La CI tourne sur ces trois branches et sur chaque pull request. | 26 novembre 2026 | @Espoir-Loem | `.github/workflows/ci.yml` |
| D-002 | Le site est bilingue, français et anglais, avec un préfixe `/fr` ou `/en`. La route `/` affiche l'accueil en français sans redirection. | 23 novembre 2026 | @Espoir-Loem | [audit](../UX/audit-accueil.md) |
| D-003 | Le site garde le rendu client (`useCSR = True`). Le HTML servi est une coquille et le contenu arrive après hydratation. | 23 novembre 2026 | @Espoir-Loem | [audit](../UX/audit-accueil.md), Q-001 |
| D-004 | Le code réutilisable vit dans `src/shared/`, TypeScript et Python dans les mêmes dossiers (`ui`, `hooks`, `utils`, `i18n`, `types`). Les composants sont rangés dans `layout`, `cards`, `patterns` et `sections`. | 26 novembre 2026 | @Espoir-Loem | [ADR 001](../Technique/adr-001-dossier-shared.md) |
| D-005 | Une fonction ou un composant tient en 10 lignes. Aucune logique dans un fichier TSX. Un seul `.map()` par composant. Aucun commentaire sauf JSDoc. | 26 novembre 2026 | @Espoir-Loem | [ADR 002](../Technique/adr-002-regles-de-code.md) |
| D-006 | Les fichiers TSX portent un nom simple et regroupent une famille de composants : `cards.tsx`, `buttons.tsx`. Les fichiers `.ts` de `shared/` s'écrivent `<nom>.<dossier>.ts` : `use-retry.hook.ts`. Un hook commence par `use-`. | 26 novembre 2026 | @Espoir-Loem | [ADR 003](../Technique/adr-003-noms-de-fichiers.md) |
| D-007 | Les anciens « templates » s'appellent « sections ». | 26 novembre 2026 | @Espoir-Loem | [ADR 001](../Technique/adr-001-dossier-shared.md) |
| D-008 | La documentation suit les critères du dépôt Pro : classement par métier, index complet, modèle d'ADR unique, notes datées, contrôle par script. | 26 novembre 2026 | @Espoir-Loem | [mémoire](../../memoires/2026-11-26-structure-shared.md) |
| D-009 | Luilka se présente comme un studio de design qui conçoit, écrit et construit. Chaque service peut être commandé seul. | 23 novembre 2026 | @Espoir-Loem | [vision](vision.md) |
| D-010 | Les KPI du site sont définis dans `kpi.md`, avec identifiant, formule, source, propriétaire, cible et disponibilité. Une cible est « À nommer » ou cite sa règle. | 26 novembre 2026 | @Espoir-Loem | [kpi.md](kpi.md) |
| D-011 | `src/shared/utils/` est le seul dossier d'utilitaires : fonctions pures sans état, TypeScript et Python côte à côte. Il n'existe pas de dossier `lib/` ni `misc/`. | 26 novembre 2026 | @Espoir-Loem | [ADR 001](../Technique/adr-001-dossier-shared.md) |
| D-012 | Le dossier `__nexy__/` produit par `nx build` est versionné, comme dans le dépôt NexyPy/docs (branche `v2`), pour que l'hébergeur le trouve au déploiement. Il ne s'édite jamais à la main. Ses `__pycache__`, son dossier `.temp` et `build-cache.json` (chemins locaux) restent ignorés. | 26 novembre 2026 | @Espoir-Loem | [dépôt NexyPy/docs, branche v2](https://github.com/NexyPy/docs/tree/v2) |
| D-013 | Tout libellé visible suit la langue de la page : navigation, pastilles de page, pied de page, action de contact et nom accessible du logo viennent du dictionnaire. La page française dit « Nous contacter », « À propos », « Produits », « Réalisations » et « Carrières ». Le mot « Blog » reste « Blog » dans les deux langues. La page anglaise garde ses libellés. | 26 novembre 2026 | @Espoir-Loem | [audit des pages](../UX/audit-pages-et-concurrence.md) |
| D-014 | Le bandeau de processus de l'accueil défile en boucle, et le bandeau incliné derrière lui porte un motif de lignes obliques. Le défilement s'arrête avec `prefers-reduced-motion` et sous le pointeur. Le bandeau est décoratif (`aria-hidden`) et ne porte aucune information. Cette décision fait exception au principe 7 des principes de design. | 26 novembre 2026 | @Espoir-Loem | [principes de design](../UX/design-principles.md) |
| D-015 | La page À propos suit la maquette du titulaire : fil d'Ariane, en-tête avec visuel, mission, valeurs en mosaïque, équipe, puis contact. Seule la mise en page est reprise : le texte de la maquette parle de PossaCode et n'est pas publié. Les valeurs reformulent des textes existants et sont à valider. L'équipe n'affiche que les personnes confirmées. Les quatre étapes quittent cette page et restent sur l'accueil. | 26 novembre 2026 | @Espoir-Loem | [page À propos](../UX/page-a-propos.md) |

## Questions ouvertes

| Id | Question | Déclencheur | Propriétaire |
|---|---|---|---|
| Q-001 | Faut-il servir le contenu rendu côté serveur pour le référencement et la lecture sans JavaScript ? | Le HTML initial ne contient que l'en-tête et le pied de page | à trancher |
| Q-003 | Le `<title>` du document est fixe. Faut-il le localiser et le varier par page ? | `src/routes/layout.tsx` | à trancher |
| Q-004 | Quel outil de mesure d'usage, sans identifiant permanent de visiteur, alimente les mesures `SITE`, `PERF` et `SEO` ? | 15 mesures de `kpi.md` sont à instrumenter | à trancher |

## Historique

- 26 novembre 2026 : création du registre. D-001 à D-009 inscrites, Q-001 à Q-003 ouvertes.
- 26 novembre 2026 : D-010 inscrite pour les KPI, Q-004 ouverte pour l'outil de mesure.
- 26 novembre 2026 : D-006 rouverte et remplacée par `<nom>.<dossier>` ([ADR 003](../Technique/adr-003-noms-de-fichiers.md)). D-004 précisée pour le Python. D-011 inscrite pour `utils`.
- 26 novembre 2026 : D-006 rouverte une seconde fois à la demande du titulaire : les TSX ont des noms simples groupés par famille, le suffixe de dossier ne reste que pour les `.ts`. La règle du `.map()` passe du fichier au composant (D-005). [ADR 003](../Technique/adr-003-noms-de-fichiers.md).
- 26 novembre 2026 : D-012 inscrite. La règle « `__nexy__/` n'est jamais commité » est rouverte à la demande du titulaire. Preuve : le dépôt NexyPy/docs versionne ce dossier. Documents touchés : `AGENTS.md`, `.gitignore`, `pyproject.toml` (exclusion de `ruff`), `docs/Technique/controles.md`.
- 26 novembre 2026 : D-013 inscrite. La question Q-002 est close : le libellé « Contact us » de la page française est traduit, et la règle vaut pour tous les libellés visibles. Elle s'appuie sur la demande du titulaire de corriger les constats de l'audit des pages. Documents touchés : `AGENTS.md`, `docs/UX/design-principles.md`, `docs/UX/audit-accueil.md`.
- 26 novembre 2026 : D-013 précisée à la demande du titulaire : le mot « Blog » reste « Blog » en français comme en anglais, au lieu de « Journal ».
- 26 novembre 2026 : D-014 inscrite à la demande du titulaire. Le principe 7 donnait en contre-exemple une animation en boucle sur un bandeau. Il est précisé : l'exception est écrite, limitée au bandeau de processus, et s'arrête avec `prefers-reduced-motion`. Documents touchés : `docs/UX/design-principles.md`, `AGENTS.md`.
- 26 novembre 2026 : D-015 inscrite à la demande du titulaire, qui a demandé de suivre la maquette de la page À propos. Documents touchés : `AGENTS.md`, `docs/UX/page-a-propos.md`, `docs/README.md`.
