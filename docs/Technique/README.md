# Technique : architecture, décisions et contrôles

**Métier.** Ingénierie du site : serveur Python, client React, contrôles.
**Statut.** Socle rédigé le 26 novembre 2026.
**Règle.** Le registre [decisions.md](../Product/decisions.md) porte la décision. Un ADR en donne le contexte et les options.
**Modèle ADR unique.** Titre, Statut, Contexte, Options, Décision, Conséquences, Propriétaire, Date, chacun en titre de niveau 2. Statuts admis : retenue, proposée, à trancher. `scripts/check_docs.py` vérifie les huit sections.
**Accessibilité.** WCAG 2.2 niveau AA visé. Cibles de 24 sur 24 pixels CSS au minimum, contraste 4,5:1 pour le texte courant et 3:1 pour les grands textes et les composants.

## Fiches

| Fiche | Question traitée | Propriétaire | Statut |
|---|---|---|---|
| [architecture.md](architecture.md) | Quels dossiers, quelles responsabilités, quel flux d'une URL à l'écran | @Espoir-Loem | retenue |
| [controles.md](controles.md) | Quels contrôles tournent en local et en CI | @Espoir-Loem | retenue |
| [adr-001-dossier-shared.md](adr-001-dossier-shared.md) | Où vit le code réutilisable, et pourquoi « sections » | @Espoir-Loem | retenue, D-004 et D-007 |
| [adr-002-regles-de-code.md](adr-002-regles-de-code.md) | Quelles limites de taille, de logique et de commentaires | @Espoir-Loem | retenue, D-005 |
| [adr-003-noms-de-fichiers.md](adr-003-noms-de-fichiers.md) | Pourquoi des tirets et jamais de points dans les noms | @Espoir-Loem | retenue, D-006 |

## Liens de cadrage

[Vision](../Product/vision.md), [registre des décisions](../Product/decisions.md), [principes de design](../UX/design-principles.md).
