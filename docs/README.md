# Documentation Luilka

**Statut** : structure version 1, 26 novembre 2026
**Règle typographique** : aucun tiret cadratin ni demi-cadratin, aucun emoji, aucun caractère chinois, japonais ou coréen, aucun marqueur de correction en attente dans les fichiers de `docs/`, `reports/` et `memoires/`
**Langue** : français. Le site lui-même est bilingue, français et anglais.

Cette documentation range les documents par métier, pour que chaque personne sache quel fichier elle lit et lequel elle met à jour. Le script `scripts/check_docs.py` vérifie que chaque fichier de `docs/` est listé ici.

## Organisation

| Dossier | Métier concerné | Fichiers présents | Rôle |
|---|---|---|---|
| Racine de `docs/` | Navigation | `README.md` | Entrée unique de la documentation et règles de mise à jour |
| `Product/` | Produit | `vision.md`, `decisions.md`, `kpi.md` | Dire pourquoi le site existe, ce qu'il montre, garder le registre des décisions et définir les KPI |
| `UX/` | Design et recherche | `design-principles.md`, `audit-accueil.md`, `audit-pages-et-concurrence.md`, `audit-theme.md`, `page-a-propos.md`, `propositions/accueil-actuelle.webp`, `propositions/accueil-option-a.webp`, `propositions/accueil-option-b.webp` | Principes opposables en revue d'interface, audit de la page d'accueil, audit des pages, des couleurs et des pages de détail face à la concurrence, propositions de couleur, page À propos |
| `Redaction/` | Rédaction et contenu | `ia-defauts-et-tips.md` | Garder une voix humaine et éviter les tics de rédaction automatique |
| `Technique/` | Ingénierie | `README.md`, `architecture.md`, `controles.md`, `adr-001-dossier-shared.md`, `adr-002-regles-de-code.md`, `adr-003-noms-de-fichiers.md` | Décrire la structure du code, les contrôles et les décisions techniques |

Hors de `docs/` :

| Dossier | Rôle |
|---|---|
| `memoires/` | Pistes de raisonnement datées, sources et conséquences, une note par arbitrage |
| `reports/` | Rapports datés. Ils ne font pas foi sur l'état courant |
| `research_notes/` | Notes de recherche brutes qui nourrissent les rapports. Elles ne sont pas contrôlées par `check_docs.py` |

## Par où commencer

1. Lire [la vision](Product/vision.md) pour le pourquoi.
2. Lire [les principes de design](UX/design-principles.md) avant de toucher une interface.
3. Lire [l'architecture](Technique/architecture.md) avant de créer un fichier dans `src/`.
4. Consulter [le registre des décisions](Product/decisions.md) avant de rouvrir une question déjà tranchée.
5. Consulter [les KPI](Product/kpi.md) avant toute mesure ou tout tableau de bord.
6. Consulter [les contrôles](Technique/controles.md) avant d'ouvrir une pull request.
7. Relire un texte destiné aux visiteurs avec [la grille de rédaction](Redaction/ia-defauts-et-tips.md).

## Règles de mise à jour

- Une décision structurante s'écrit dans `Product/decisions.md` avec sa date, son motif, son propriétaire et sa source. Une décision technique a en plus un ADR dans `Technique/`.
- Une question ouverte reste dans la table « Questions ouvertes » jusqu'à son arbitrage. Elle n'entre pas dans le code avant d'être passée en décision.
- Un changement de structure du code met à jour `Technique/architecture.md` dans la même pull request.
- Un changement de texte ou d'interface visible met à jour `UX/` si un principe ou un constat change.
- Une piste de raisonnement qui vaut la peine d'être gardée va dans `memoires/`, avant le code et pas après.
- Une nouvelle mesure s'écrit dans `Product/kpi.md` avec son identifiant, sa formule et sa source. Une cible se nomme par une décision du registre.
- Un ADR suit le modèle unique décrit dans [Technique/README.md](Technique/README.md).
- Tout contrôle déterministe devient un script dans `scripts/` et une étape de la CI.
- Les rapports de `reports/` sont des instantanés datés. Une divergence se corrige dans la source de vérité, puis se trace dans un rapport.

## Ordre de prévalence

En cas de divergence : le registre des décisions, puis l'ADR concerné, puis `Technique/architecture.md`, puis `UX/`, puis `memoires/`.
