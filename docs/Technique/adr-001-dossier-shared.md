# ADR 001 : code réutilisable dans `shared`, composants par intention

Décision retenue : le code réutilisable vit dans `src/shared/`, les composants sont rangés par intention, et les « templates » s'appellent « sections ».

## Titre

Dossier `shared` et rangement des composants.

## Statut

retenue, D-004 et D-007 au registre

## Contexte

Avant le 26 novembre 2026, `src/components/` mélangeait des atomes (`ui/`), des blocs de marque (`patterns/`) et des sections de page (`templates/`). La logique d'interface (menu ouvert, validation de la newsletter, lien de détail) vivait dans les composants, et trois sections de la page d'accueil étaient le même composant copié. Le dépôt Pro pose le principe inverse : le code partagé est à un seul endroit, les composants ne font que du rendu.

## Options

| Option | Motif pour | Motif contre |
|---|---|---|
| Garder `ui/`, `patterns/`, `templates/` | Aucun déplacement | La logique reste dans les composants, les doublons restent |
| Tout dans `components/` avec des sous-dossiers | Un seul dossier racine | Les atomes et les hooks n'ont pas de place claire |
| `shared/` pour ce qui sert partout, `components/` rangé par intention | Une copie par chose, sens des dépendances clair | Plus de déplacements d'imports |

## Décision

Retenir la troisième option.

- `src/shared/` contient `ui`, `hooks`, `lib`, `i18n` et `types`. Il n'importe aucun composant de `components/`.
- `src/components/` contient `layout`, `cards`, `patterns` et `sections`.
- `templates/` devient `sections/`, y compris `(home)/` pour l'accueil.
- Les trois collections de l'accueil partagent `collection-section.tsx`.

Historique : proposée et retenue le 26 novembre 2026.

## Conséquences

- Les imports utilisent `@/shared/...` et `@/components/...`. Les anciens chemins `@/components/ui`, `@/i18n`, `@/lib` et `@/types` n'existent plus. `tests/test_architecture.py` vérifie qu'aucun import n'y renvoie.
- Une logique réutilisable se crée dans `shared/hooks` ou `shared/lib`, avec son test dans `tests/client/`.
- Un nouveau composant se range par intention : bloc d'une page dans `sections`, élément répété dans `cards`, bloc multi-pages dans `patterns`, cadre du document dans `layout`.

## Propriétaire

@Espoir-Loem.

## Date

26 novembre 2026
