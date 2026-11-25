# Note de raisonnement : structure `shared` et critères de documentation

**Date.** 26 novembre 2026.
**Sujet.** Reprendre pour Luilka le niveau d'exigence du dépôt Pro, pour le code et pour la documentation.

## Question

Quelle structure de code et quel style de documentation donnent à Luilka le niveau d'exigence du dépôt Pro, sans copier ce qui ne concerne pas un site vitrine ?

## Sources

- Dépôt `Espoir-Loem/Pro`, consulté le 26 novembre 2026. Source primaire : `AGENT.md`, `CLAUDE.md`, `docs/README.md`, `docs/Technique/adr-001-stack.md`, `memoires/README.md`, `scripts/check_code_style.py`, `scripts/check_docs.py`, `eslint.config.mjs`.
- [Audit de la page d'accueil](../docs/UX/audit-accueil.md), 23 novembre 2026. Source primaire sur l'état du site.

## Options examinées

| Option | Motif pour | Motif contre | Source |
|---|---|---|---|
| Copier la documentation de Pro telle quelle | Rapide | Pro porte 59 fichiers pour un réseau social, Luilka est un site vitrine | `docs/README.md` de Pro |
| Reprendre les critères, pas le volume | Même rigueur, volume proportionné | Demande de choisir ce qui s'applique | `AGENT.md` de Pro |
| Garder la documentation actuelle | Aucun travail | Un seul audit à la racine de `docs/`, aucun registre, aucun contrôle | état du dépôt |

## Conclusion

Reprendre les critères de Pro : classement par métier, index complet, registre de décisions numéroté, modèle d'ADR unique, notes datées, `AGENTS.md` canonique et `CLAUDE.md` en simple renvoi, contrôles par script. Écarter ce qui ne s'applique pas : phases produit, KPI, conformité juridique, opérations de modération, croissance.

## Conséquence

- `docs/` reçoit `Product/`, `Technique/`, `UX/` et `Redaction/`. `docs/audit-accueil.md` devient `docs/UX/audit-accueil.md`.
- `scripts/check_docs.py` et `tests/test_check_docs.py` sont ajoutés, avec une étape de CI.
- `AGENTS.md` est réécrit en sections numérotées et `CLAUDE.md` renvoie vers lui.
- Propriétaire : @Espoir-Loem.

## Lien

- Décisions : D-004, D-005, D-006, D-007 et D-008 dans [decisions.md](../docs/Product/decisions.md).
- ADR : [001](../docs/Technique/adr-001-dossier-shared.md), [002](../docs/Technique/adr-002-regles-de-code.md), [003](../docs/Technique/adr-003-noms-de-fichiers.md).
