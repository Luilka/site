# Étude de Sina et pistes d'amélioration du design de Luilka

**Statut** : version 1, 26 novembre 2026. Propositions, rien n'est décidé au-delà de D-018.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [synthèse du thème](audit-theme.md), [audit des pages et de la concurrence](audit-pages-et-concurrence.md), [principes de design](design-principles.md)
**Sources** : code local de Sina (`globals.css`, composants `ui/`, page d'accueil), 26 novembre 2026. Sina compte 8 commits d'un seul auteur : c'est une base de travail personnelle, pas un produit éprouvé.

## Ce qu'est Sina

Une plateforme de suivi de cours en UI, UX et développement. Son travail à faire (un étudiant suit sa progression) n'est pas celui de Luilka (un client choisit un studio). On en tire des **méthodes** de design, pas des écrans à copier.

## Ce que Sina fait bien

1. **Des jetons nommés par rôle, pas par couleur.** `surface`, `ink`, `muted`, `accent`, `border`, `error`, et des états `pending`, `progress`, `completed`. Changer de thème ne casse aucun nom.
2. **Un accent qui sert l'interaction**, pas la décoration : bordure et texte d'un bouton secondaire au survol, contour de focus, bouton principal.
3. **Un état est une couleur sémantique** avec son texte associé, jamais une couleur choisie à la main.
4. **Une seule famille de coins** (petits rayons, `rounded-xl` pour les cartes) et peu de variantes de composants (4 boutons, 5 badges).
5. **Clair et sombre** par les mêmes jetons.
6. **Un accueil réduit à l'essentiel** : un titre, une phrase, deux actions, trois faits en liste de définitions.

## Où Luilka s'en écarte

| Constat | Luilka aujourd'hui | Effet sur confiance et conversion |
|---|---|---|
| Focus invisible sur le noir | L'anneau de focus employait `--blue`, devenu noir avec D-018 : invisible sur le bandeau, le bloc de contact et le pied de page | Un utilisateur au clavier perd sa position. **Corrigé** : contour noir plus liseré blanc, visible sur les deux |
| Noms de jetons qui mentent | `--blue` vaut `#0a0a0a`, `--gray-2` et `--gray-3` n'ont pas de rôle | Le prochain changement de thème casse ou confond |
| Deux noms pour la même action | « J'ai besoin d'un devis » dans le héros, « Nous contacter » dans l'en-tête et le menu, « devis » dans le pied | Principe « une action garde le même nom partout » non respecté ; le visiteur hésite entre deux portes |
| Quatre rayons et plus | 10, 18, 22, 28 pixels, plus pleine rondeur | Rythme moins net que les références, qui tiennent deux ou trois rayons |
| Pas d'état sémantique | Les messages du formulaire n'ont pas de jetons d'erreur ou de succès propres | Cohérence et accessibilité à vérifier à chaque nouvel écran |
| Pas de mode sombre | Aucun | Optionnel : le thème noir et blanc le rend naturel, mais ce n'est pas un besoin prouvé |
| Accent absent de l'interaction | Les boutons secondaires ne changent que d'opacité | Moins de retour visible au survol et au focus |

## Pistes d'amélioration, classées par effet attendu

Chaque piste se juge à la confiance, au professionnalisme et à la conversion visés par le titulaire.

1. **Un seul nom et un seul bouton pour l'action de contact** (conversion). Choisir « Nous contacter » ou « Demander un devis », le garder partout, le montrer en accent. À trancher par @Espoir-Loem.
2. **Renommer les jetons par rôle** (professionnalisme, maintenance) : `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--ink-inverse`. Retirer `--blue`, `--gray-2`, `--gray-3`. Un commit, test à l'appui.
3. **Ajouter des jetons d'état** : succès, erreur, en cours, avec leur couleur de texte et leur contraste vérifié (4,5 pour 1).
4. **Trois rayons seulement** : petit (10), carte (18), panneau (28), plus la pleine rondeur pour les pastilles. Supprimer 22 et les valeurs isolées.
5. **Donner un rôle à l'accent** : survol et focus des actions, étape finale, état « validé ». Voir [le choix de l'accent](audit-theme.md).
6. **Réduire l'accueil à l'essentiel** : un titre, une phrase, une action, puis la preuve. Les quatre étapes et le bandeau ne doivent pas retarder la première réalisation. À mesurer quand Q-004 sera tranchée.
7. **Mode sombre** : seulement si un besoin est établi.

## Lien avec l'audit précédent

Ces pistes complètent [l'audit des pages et de la concurrence](audit-pages-et-concurrence.md), dont les points ouverts restent entiers : réalisations sans images, produits Tala, Vuga et Pro à montrer, ordre de la navigation. Une meilleure palette ne remplace pas ces preuves : elles font encore l'essentiel de la confiance.

## Limites

- Sina est un tableau de bord d'apprentissage ; certaines de ses pratiques (petits rayons, densité) ne conviennent pas à un site vitrine.
- Aucune mesure d'usage, ni de Sina ni de Luilka.
- Je n'ai lu que le code, pas Sina en fonctionnement.
