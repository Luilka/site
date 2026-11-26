# Recherche : motion du site, micro-interactions, toasts et curseurs

**Statut** : version 1, 27 novembre 2026. Propositions, rien n'est décidé ni codé.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [principes de design](design-principles.md), [film « De l'idée à l'app »](film-de-l-idee-a-l-app.md), [décisions](../Product/decisions.md) (Q-004 ouverte)
**Demande du titulaire** : un motion design de site au niveau des meilleurs studios du monde (apparition des éléments dans le viewport, micro-interactions), des toasts pour les messages (envoi, erreur, hors connexion), un suivi de curseur façon Figma avec le nom de la personne.

## 1. Ce que disent les sources sur les meilleurs studios

Sources : articles de blogs et d'agences, donc intéressés. Aucune ne donne de mesure. Les noms reviennent d'une source à l'autre, ce qui n'en fait pas un classement.

| Studio | Ce que les sources en disent |
|---|---|
| Active Theory | Studio de 3D temps réel ; un système de particules piloté par le curseur est cité comme référence ([20i](https://www.20i.com/blog/the-internet-is-still-fun/), [MotionKit](https://motionkit.io/blog/best-animated-websites-to-inspire-you)) |
| Locomotive | Auteur de la bibliothèque de défilement doux ; son propre site reste sobre, avec de petites animations et des effets de défilement discrets ([School of Motion](https://schoolofmotion.com/blog/websites-with-great-animation-2026)) |
| Resn | Narration cinématographique, textes déclenchés par le mouvement |
| Immersive Garden | Défilement avec physique selon la vitesse et la direction, transitions atmosphériques |
| Obys | Typographie et chorégraphie du défilement, transitions de page nettes |
| Basement Studio, Unseen Studio, Lusion, Darkroom Engineering | Cités comme primés, sans détail dans les sources lues |

Monks n'apparaît dans aucun résultat : je n'en dis rien.

**Techniques récurrentes.** Apparition par fondu et translation de 30 à 60 pixels quand l'élément atteint 70 à 85 pour cent du viewport ([ZUMKAI](https://zumkai.com/en/post/motion-design-web-complete-guide)) ; animations CSS pilotées par le défilement avec `view()` ; défilement doux ; typographie cinétique ; transitions de page.

**Ce que les meilleurs ont en commun** : une langue de mouvement cohérente, peu d'effets mais très soignés, et le mouvement au service d'un récit. Les sites très lourds en 3D sont des vitrines de studios de création, pas des modèles pour un site qui doit convertir sur téléphone avec des données chères.

## 2. Ce que disent les sources sur l'accessibilité et la performance

- `prefers-reduced-motion` : quand il est actif, le mouvement doit disparaître, pas seulement raccourcir ; il peut changer en cours de visite et se lit avec `matchMedia` ([web.dev](https://web.dev/articles/prefers-reduced-motion)). Une règle globale `animation: none !important` est contestée, car tous les appareils ne rendent pas l'animation de façon fluide ([Smashing](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/)).
- Toasts : `role="status"` avec `aria-live="polite"` pour l'information ; ne réserver l'annonce insistante qu'aux messages critiques ; un toast avec un bouton n'est pas adapté à une zone vivante ; peu de toasts réels passeraient un audit WCAG ([Home Office](https://design.homeoffice.gov.uk/accessibility/interactivity/notifications), [Adrian Roselli](https://adrianroselli.com/2020/01/defining-toast-messages.html), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role)).
- Non couvert par mes recherches : le coût des animations de défilement sur les Core Web Vitals. À mesurer sur le site, pas à supposer.

## 3. Langue de mouvement proposée pour Luilka

Le luxe, ici, est la retenue : peu d'éléments qui bougent, chacun avec un poids, un rythme et une raison. Mêmes principes que le film.

**Jetons de mouvement** (une seule fois, dans `src/globale.css`) : durées 150 ms (retour immédiat), 300 ms (état), 700 ms (apparition), courbes `ease-out` marquées pour l'entrée, `ease-in` brève pour la sortie ; aucun rebond sauf un moment fort par page.

**Apparition au défilement**
- Une seule fois par élément, déclenchée quand 20 pour cent de l'élément entre dans le viewport.
- Titres : montée ligne par ligne derrière un masque, décalage de 90 ms ; paragraphes : fondu et translation de 24 pixels ; images : dévoilement par découpe (`clip-path`) ; cartes : décalage de 60 ms et d'ordre inégal.
- Jamais au-dessus de la ligne de flottaison (le plus grand élément du haut de page s'affiche tout de suite : ne pas retarder le LCP).
- Seulement `transform` et `opacity` (pas de mise en page animée) pour ne pas dégrader le CLS ni l'INP.
- Sous `prefers-reduced-motion`, aucun déplacement : l'élément apparaît.
- Aucun défilement détourné ni défilement doux imposé (accessibilité et téléphones modestes).

**Micro-interactions**
- Boutons : retour de survol en 150 ms, enfoncement à 0,98 à l'appui, anneau de focus visible (déjà en place).
- Liens : soulignement qui se dessine de gauche à droite.
- Cartes : légère montée de l'image (1,03) et flèche qui glisse, sans changer la taille de la carte.
- Menu mobile : déjà en feuille latérale ; ajouter l'entrée décalée des liens.
- Formulaire : champ qui se met en avant au focus, validation en direct, bouton d'envoi qui devient un état « envoi » puis « envoyé ».
- Transition de page : les transitions natives existent déjà ; en affiner la courbe.
- Barre de progression de lecture : un trait doré fin en haut des pages longues, optionnel.

**Aucun chiffre animé** : un compteur inventerait des chiffres sans source (règle du dépôt).

## 4. Toasts et messages d'état

**Cas à couvrir** : message envoyé, erreur d'envoi, abonnement à la lettre réussi ou refusé, copie réussie, hors connexion et retour de la connexion.

**Règles proposées**
1. Une zone vivante `role="status"` `aria-live="polite"` toujours présente dans la page, où les messages sont insérés ; les erreurs bloquantes restent aussi dans le formulaire (le toast complète, il ne remplace jamais le message en ligne).
2. Au plus 3 toasts, 5 secondes, qui se mettent en pause au survol et au focus ; fermeture par Échap et par un bouton de 44 pixels nommé.
3. Pas de bouton d'action dans un toast (la recherche déconseille) : « Réessayer » est un bouton du formulaire.
4. **Hors connexion** : un bandeau persistant (non un toast qui disparaît) dit « Vous êtes hors connexion. Le formulaire ne peut pas être envoyé. », puis un toast annonce le retour. On ne promet pas d'envoi différé tant qu'il n'est pas construit.
5. Un message dit ce qui s'est passé et ce qu'il faut faire, sans s'excuser (règle du dépôt), en français et en anglais.
6. Le mouvement d'entrée disparaît sous `prefers-reduced-motion`.

## 5. Curseur façon Figma : deux choses différentes

**A. Un curseur à soi, local (possible)** : une pastille dorée qui suit le pointeur avec un petit retard, et une étiquette avec le nom que la personne a choisi (ou « Vous »). Rien ne quitte l'appareil. Contraintes : désactivé au tactile et sous `prefers-reduced-motion`, le curseur natif reste visible, jamais sur un champ de saisie. C'est un effet de style, pas de la présence.

**B. Les curseurs des autres visiteurs en direct, avec leur nom (réel mais déconseillé pour l'instant)** : cela demande un serveur temps réel (WebSocket), et chaque position de souris et chaque nom devient une donnée personnelle qui transite. Cela entre en conflit avec la règle du dépôt (aucune donnée d'usage avant la décision Q-004), avec la promesse de confiance et de respect du site, et demande consentement, noms anonymes, modération des noms, coût d'hébergement, et une réouverture écrite d'une décision. Les sources lues ne traitent pas la base légale. Je ne le recommande pas sur la page d'accueil ; s'il est voulu, ce serait une page d'atelier dédiée, sur consentement, avec des noms générés, sans stockage.

## 6. Plan par tranches (test d'abord, un commit par unité)

1. Jetons de mouvement et apparition au défilement (hook `use-in-view`, composant `Reveal` remplacé), avec tests et mesure CLS et LCP avant et après.
2. Système de toasts (`ToastRegion`, `use-toast`), détection du réseau, branchement sur le formulaire de lettre et le contact.
3. Micro-interactions des boutons, liens, cartes, menu mobile.
4. Chorégraphie du héros et du bandeau.
5. Curseur à soi (option A), si validé.
6. Audit `prefers-reduced-motion`, performance (INP, CLS) et accessibilité dans Chrome.

## 7. Décisions demandées

1. Valider la direction « retenue et précise » plutôt que « spectaculaire et lourde » pour un site qui doit convertir sur téléphone.
2. Valider les règles de toast, en particulier le bandeau hors connexion.
3. Curseur : option A seule, ou option B sur une page d'atelier avec réouverture écrite ?
4. Budget de performance à nommer (LCP, INP, CLS) : titulaire.
5. Par quelle tranche commencer (je suggère 1 puis 2).

## 8. Limites

- Sources de blogs et d'agences, sans mesure d'efficacité ; aucune étude ne montre que ces effets améliorent la conversion de Luilka.
- Coût réel des animations non mesuré.
- Aucun test auprès de visiteurs.
