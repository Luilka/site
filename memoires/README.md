# Mémoires de raisonnement

**Statut.** Ouvert le 26 novembre 2026.
**Rôle.** Conserver les pistes de raisonnement datées, les sources consultées et les conséquences, pour qu'un autre agent reprenne sans refaire la même recherche.
**Règle.** Ce dossier ne remplace pas [le registre des décisions](../docs/Product/decisions.md). Le registre porte la décision opposable. Une note porte le chemin qui y mène, les options écartées et les sources. Aucune note ne crée de décision à elle seule.

## Nommage

Une note porte le nom `AAAA-MM-JJ-sujet-court.md`. Le modèle s'appelle `modele-de-note.md`. Une note n'est pas renommée après coup : une correction est ajoutée avec sa date, ou une nouvelle note est créée avec un lien vers la précédente. `scripts/check_docs.py` vérifie le nom.

## Structure minimale

Toute note contient, dans cet ordre : la date et le sujet, une seule question vérifiable, les sources datées, les options examinées, la conclusion, la conséquence, le lien vers la décision concernée.

## Usages

- Écrire une note avant un arbitrage structurant, pas après avoir commencé le code.
- Garder les sources dans la note, pas seulement dans la conversation.
- Ne pas recopier le registre des décisions. Le lien suffit.
- Aucun tiret cadratin, aucun emoji, aucun marqueur de correction en attente.

## Notes présentes

- [2026-11-26-structure-shared.md](./2026-11-26-structure-shared.md), raisonnement derrière D-004 à D-008.
- [modele-de-note.md](./modele-de-note.md), modèle à recopier pour une nouvelle note.
