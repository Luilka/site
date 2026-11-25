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
| D-004 | Le code réutilisable vit dans `src/shared/`. Les composants sont rangés dans `layout`, `cards`, `patterns` et `sections`. | 26 novembre 2026 | @Espoir-Loem | [ADR 001](../Technique/adr-001-dossier-shared.md) |
| D-005 | Une fonction ou un composant tient en 10 lignes. Aucune logique dans un fichier TSX. Un seul `.map()` par fichier TSX. Aucun commentaire sauf JSDoc. | 26 novembre 2026 | @Espoir-Loem | [ADR 002](../Technique/adr-002-regles-de-code.md) |
| D-006 | Tous les fichiers `.ts` et `.tsx` sont en minuscules avec des tirets, sans point, y compris les tests. Un hook commence par `use-`. | 26 novembre 2026 | @Espoir-Loem | [ADR 003](../Technique/adr-003-noms-de-fichiers.md) |
| D-007 | Les anciens « templates » s'appellent « sections ». | 26 novembre 2026 | @Espoir-Loem | [ADR 001](../Technique/adr-001-dossier-shared.md) |
| D-008 | La documentation suit les critères du dépôt Pro : classement par métier, index complet, modèle d'ADR unique, notes datées, contrôle par script. | 26 novembre 2026 | @Espoir-Loem | [mémoire](../../memoires/2026-11-26-structure-shared.md) |
| D-009 | Luilka se présente comme un studio de design qui conçoit, écrit et construit. Chaque service peut être commandé seul. | 23 novembre 2026 | @Espoir-Loem | [vision](vision.md) |
| D-010 | Les KPI du site sont définis dans `kpi.md`, avec identifiant, formule, source, propriétaire, cible et disponibilité. Une cible est « À nommer » ou cite sa règle. | 26 novembre 2026 | @Espoir-Loem | [kpi.md](kpi.md) |

## Questions ouvertes

| Id | Question | Déclencheur | Propriétaire |
|---|---|---|---|
| Q-001 | Faut-il servir le contenu rendu côté serveur pour le référencement et la lecture sans JavaScript ? | Le HTML initial ne contient que l'en-tête et le pied de page | à trancher |
| Q-002 | Le libellé de l'action de contact de l'en-tête reste « Contact us » sur la page française. Faut-il le traduire ? | Texte repris tel quel dans le dictionnaire le 26 novembre 2026 | à trancher |
| Q-003 | Le `<title>` du document est fixe. Faut-il le localiser et le varier par page ? | `src/components/layout/document-head.tsx` | à trancher |
| Q-004 | Quel outil de mesure d'usage, sans identifiant permanent de visiteur, alimente les mesures `SITE`, `PERF` et `SEO` ? | 15 mesures de `kpi.md` sont à instrumenter | à trancher |

## Historique

- 26 novembre 2026 : création du registre. D-001 à D-009 inscrites, Q-001 à Q-003 ouvertes.
- 26 novembre 2026 : D-010 inscrite pour les KPI, Q-004 ouverte pour l'outil de mesure.
