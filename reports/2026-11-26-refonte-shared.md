# Rapport : refonte `shared` et documentation

**Date.** 26 novembre 2026.
**Périmètre.** `src/`, `tests/`, `scripts/`, `docs/`, `memoires/`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `.github/workflows/ci.yml`.
**Nature.** Instantané daté. Il ne fait pas foi sur l'état courant : voir [le registre des décisions](../docs/Product/decisions.md).

## Ce qui a changé

- Le code réutilisable est dans `src/shared/` (`ui`, `hooks`, `lib`, `i18n`, `types`). Les composants sont dans `layout`, `cards`, `patterns` et `sections`. Voir [ADR 001](../docs/Technique/adr-001-dossier-shared.md).
- Chaque fonction tient en 10 lignes, la logique a quitté les fichiers TSX. Voir [ADR 002](../docs/Technique/adr-002-regles-de-code.md).
- Les noms de fichiers n'ont plus de point. Voir [ADR 003](../docs/Technique/adr-003-noms-de-fichiers.md).
- La branche permanente s'appelle `develop`.
- La documentation suit les critères de Pro : [index](../docs/README.md), [registre](../docs/Product/decisions.md), [principes de design](../docs/UX/design-principles.md), `AGENTS.md` canonique.

## Défauts corrigés au passage

- Vitest lançait comme tests les fichiers à deux points.
- Le formulaire de la newsletter n'affichait plus son message.
- Un `print` de débogage restait dans `src/routes/[lang]/dependencies.py`.
- Le libellé de navigation et l'action de contact étaient écrits en dur.

## Contrôles

Voir [controles.md](../docs/Technique/controles.md). Les résultats de chaque commande figurent dans la pull request qui porte ce changement.

## Questions ouvertes

Q-001, Q-002 et Q-003 du registre.
