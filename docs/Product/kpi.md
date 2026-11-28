# KPI de suivi du site

**Version.** 1.
**Date.** 26 novembre 2026.
**Statut.** Définitions posées. Cibles et propriétaires à nommer avant le premier tableau de bord.
**Périmètre.** Bugs, qualité du code, UX, accessibilité, performance, SEO, usage du site et produit, sur l'ensemble de l'application. Aucune cible chiffrée n'est inventée dans cette fiche.

## 1. Principes

Chaque mesure possède un identifiant, un nom, une formule, une source, un propriétaire, une cible et une disponibilité. Les identifiants sont stables et ne sont pas réutilisés. Une mesure sans source n'est pas publiée.

- Une cible est soit « À nommer », soit une valeur qui cite sa règle : une décision du [registre](decisions.md), un critère WCAG ou un seuil publié par web.dev. `scripts/check_kpi.py` refuse toute autre cible.
- La disponibilité dit si la mesure existe déjà (`disponible`) ou si elle demande un outil qui n'est pas en place (`à instrumenter`).
- L'usage se mesure avec les outils de D-026 (Vercel Web Analytics, Vercel Speed Insights, Plausible, et Google Analytics 4 derrière l'accord du visiteur). Aucun autre traceur et aucun événement personnalisé ne sont introduits sans décision écrite.
- Les mesures d'usage reprennent quatre événements canoniques : `quote_click` (clic sur le bouton de devis), `newsletter_valid` (adresse valide envoyée), `language_switch` (changement de langue) et `page_not_found` (affichage de la page 404).
- Le propriétaire de chaque mesure est @Espoir-Loem à titre intérimaire.

## 2. Bugs

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| BUG-01 | Bugs ouverts | Nombre d'issues ouvertes avec le libellé `type/bug` | GitHub Issues, horodatage de l'extraction | @Espoir-Loem, intérimaire | À nommer | disponible |
| BUG-02 | Délai de tri | Médiane entre l'ouverture et l'ajout d'un libellé de priorité | Historique GitHub Issues | @Espoir-Loem, intérimaire | À nommer | disponible |
| BUG-03 | Taux de réouverture | Bugs rouverts divisés par bugs fermés sur la période | Historique GitHub Issues | @Espoir-Loem, intérimaire | À nommer | disponible |

## 3. Qualité du code

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| QUA-01 | Réussite de la CI | Exécutions réussies divisées par exécutions, sur `develop` | GitHub Actions, extrait daté | @Espoir-Loem, intérimaire | À nommer | disponible |
| QUA-02 | Fonctions trop longues | Nombre d'erreurs `max-lines-per-function` de `npm run lint` | ESLint, sortie de la CI | @Espoir-Loem, intérimaire | 0, règle D-005 | disponible |

## 4. UX

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| UX-01 | Réussite de tâche | Personnes qui ouvrent le courriel de devis divisées par personnes testées | Protocole de test enregistré | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| UX-02 | Temps de tâche | Médiane en secondes entre l'arrivée et le clic sur le bouton de devis | Protocole de test enregistré | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| UX-03 | Clarté déclarée | Note donnée à la phrase « je sais ce que Luilka conçoit », échelle à nommer | Questionnaire daté | @Espoir-Loem, intérimaire | À nommer | à instrumenter |

## 5. Accessibilité

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| ACC-01 | Violations automatiques | Nombre de violations de niveau AA par page, sur les pages publiques | Audit automatique daté | @Espoir-Loem, intérimaire | 0, WCAG 2.2 AA | à instrumenter |
| ACC-02 | Contrastes sous le seuil | Paires de tokens de `src/globale.css` sous 4,5:1 pour le texte courant | Calcul sur les tokens, daté | @Espoir-Loem, intérimaire | 0, WCAG 2.2 critère 1.4.3 | à instrumenter |

## 6. Performance

Les seuils de référence sont ceux de web.dev, mesurés au 75e centile des visites sur téléphone : LCP 2,5 s, INP 200 ms, CLS 0,1.

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| PERF-01 | Plus grand affichage | LCP au 75e centile | Données de terrain, extrait daté | @Espoir-Loem, intérimaire | 2,5 s ou moins, seuil web.dev | à instrumenter |
| PERF-02 | Réactivité | INP au 75e centile | Données de terrain, extrait daté | @Espoir-Loem, intérimaire | 200 ms ou moins, seuil web.dev | à instrumenter |
| PERF-03 | Stabilité visuelle | CLS au 75e centile | Données de terrain, extrait daté | @Espoir-Loem, intérimaire | 0,1 ou moins, seuil web.dev | à instrumenter |

## 7. SEO

Le HTML servi est une coquille (D-003, question Q-001). Ces mesures disent si le contenu est vu par les moteurs.

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| SEO-01 | Couverture d'indexation | Pages indexées divisées par pages publiables | Données de recherche, extrait daté | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| SEO-02 | Signaux web essentiels | Part des URL qui passent LCP, INP et CLS aux seuils de la section 6 | Données de terrain, extrait daté | @Espoir-Loem, intérimaire | À nommer | à instrumenter |

## 8. Usage du site

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| SITE-01 | Demandes de devis | `quote_click` divisés par sessions | Événements canoniques | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| SITE-02 | Inscriptions newsletter | `newsletter_valid` divisés par sessions | Événements canoniques | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| SITE-03 | Part de l'anglais | Sessions en anglais divisées par sessions, avec `language_switch` pour les bascules | Événements canoniques | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| SITE-04 | Taux de 404 | `page_not_found` divisés par pages vues | Événements canoniques | @Espoir-Loem, intérimaire | À nommer | à instrumenter |

## 9. Produit

| Identifiant | Nom | Formule | Source | Propriétaire | Cible | Disponibilité |
|---|---|---|---|---|---|---|
| PROD-01 | Parcours vers le contact | Sessions qui passent de la page d'accueil à `quote_click` divisées par sessions sur la page d'accueil | Événements canoniques | @Espoir-Loem, intérimaire | À nommer | à instrumenter |
| PROD-02 | Pages avec une action | Pages publiques qui portent une action de contact visible divisées par pages publiques | Relevé des routes de `src/routes/`, daté | @Espoir-Loem, intérimaire | À nommer | disponible |
| PROD-03 | Parité des langues | Textes présents en français et en anglais divisés par textes du dictionnaire | Dictionnaires de `src/shared/i18n/`, extrait daté | @Espoir-Loem, intérimaire | À nommer | disponible |

## 10. Règles de mise à jour

Toute nouvelle mesure reçoit un identifiant de groupe, une formule écrite et une source avant d'entrer dans un tableau de bord. La suppression d'une mesure conserve son identifiant, avec la date d'arrêt et le motif. Les cibles, les seuils d'alerte et les propriétaires sont nommés par décision écrite dans le [registre](decisions.md), jamais dans un message. Le script `scripts/check_kpi.py` vérifie les sections, les identifiants, la forme des lignes et les cibles avant chaque fusion.
