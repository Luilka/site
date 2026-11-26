# Luilka : principes de design

**Statut** : version 1, 26 novembre 2026
**Usage** : ces principes sont opposables en revue d'interface. Toute déviation est écrite avec son motif, sa date et son propriétaire dans le [registre des décisions](../Product/decisions.md).
**Documents liés** : [vision](../Product/vision.md), [audit de la page d'accueil](audit-accueil.md), [grille de relecture](../Redaction/ia-defauts-et-tips.md)

Chaque principe a un énoncé, un contre-exemple et un lien vers sa source. Un élément d'interface qui ne se rattache à aucun principe ni à une exigence d'accessibilité est retiré.

## 1. Une seule action

**Énoncé.** Le bouton de devis, qui ouvre un courriel, est l'action unique du hero et de la section contact. Une page a une tâche.

**Contre-exemple.** Trois boutons de même poids dans le hero, ou un formulaire de contact qui double le courriel sans raison écrite.

**Lien.** [Vision](../Product/vision.md), [audit](audit-accueil.md).

## 2. La preuve avant la promesse

**Énoncé.** Une réalisation montre un nom et un sous-titre vrais. Aucun chiffre n'est écrit sans source documentée.

**Contre-exemple.** « Plus de 300 projets livrés » sans liste, ou une carte dont le sous-titre promet un livrable que la page de détail ne montre pas.

**Lien.** [Audit](audit-accueil.md), D-009.

## 3. Une carte mène quelque part, ou ne promet rien

**Énoncé.** Une carte qui porte une flèche ou un libellé d'action est un lien vers une page qui existe. Une carte d'information n'a ni flèche ni survol trompeur.

**Contre-exemple.** Une carte `div` avec une flèche et aucune destination.

**Lien.** [Audit](audit-accueil.md).

## 4. Un plan de titres lisible

**Énoncé.** Un `h1` par page, un `h2` par section, un `h3` par carte. Un nom de projet est un titre, pas un texte en gras.

**Contre-exemple.** Un nom de réalisation en `<b>`, absent du plan de titres.

**Lien.** [Audit](audit-accueil.md), WCAG 2.2 critère 1.3.1.

## 5. Un texte pour chaque carte

**Énoncé.** Chaque étape, produit, service et section a sa propre phrase. Une carte avec la phrase de sa voisine n'a pas d'usage.

**Contre-exemple.** Le même paragraphe répété dans quatre cartes d'étapes.

**Lien.** [Audit](audit-accueil.md), [grille de rédaction](../Redaction/ia-defauts-et-tips.md).

## 6. Deux langues, un seul vocabulaire

**Énoncé.** Le français et l'anglais ont les mêmes sections, les mêmes noms de services et la même navigation. Une action garde le même nom partout. Tout texte visible vient du dictionnaire.

**Contre-exemple.** Un libellé écrit en français sur la page anglaise, ou « Devis » dans le hero et « Contact » dans le pied de page pour la même action.

**Lien.** D-002, D-013, [architecture](../Technique/architecture.md).

## 7. Un mouvement discret

**Énoncé.** Le mouvement sert l'entrée d'un élément, pas la décoration. `prefers-reduced-motion` est respecté : sans mouvement, le contenu s'affiche tel quel.

**Contre-exemple.** Une animation en boucle sur un bandeau, ou un contenu masqué tant que l'animation n'a pas fini.

**Lien.** `src/routes/layout.tsx`, WCAG 2.2 critère 2.3.3.

## 8. Un menu qui se lit au clavier

**Énoncé.** Le menu déroulant s'ouvre au survol et au focus, se ferme avec Escape ou quand le focus le quitte, et annonce son état par `aria-expanded` et `aria-controls`.

**Contre-exemple.** Un menu qui ne s'ouvre qu'à la souris, ou dont le focus reste piégé.

**Lien.** `src/shared/hooks/use-dismiss.hook.ts`, `tests/client/dropdown-navigation.test.tsx`.

## 9. Des cibles lisibles, un contraste tenu

**Énoncé.** Les cibles tactiles font 24 sur 24 pixels CSS au minimum, 44 en objectif. Le contraste est de 4,5:1 pour le texte courant, 3:1 pour les grands textes et les composants. Le focus reste visible : aucun parent ne le coupe.

**Contre-exemple.** Un `main` avec `overflow-y-hidden` qui coupe le contour de focus.

**Lien.** WCAG 2.2 critères 1.4.3 et 2.5.8, [audit](audit-accueil.md).

## 10. Des états prévus

**Énoncé.** Chaque vue a son chargement, son erreur, son vide et son succès. Une erreur dit ce qui s'est passé et ce qu'il faut faire, sans s'excuser. Un message du formulaire est annoncé par `role="alert"` ou `role="status"`.

**Contre-exemple.** Un formulaire qui n'affiche rien quand l'adresse est invalide.

**Lien.** `tests/client/feedback-states.test.tsx`, `tests/client/newsletter-form.test.tsx`.

## 11. Des icônes qui servent

**Énoncé.** Une icône d'interface vient de Lucide et accompagne un texte, une action ou un état : flèche de retour, coche ou alerte d'un message, séparateur d'étapes. Le logo est le SVG plein fourni par le studio, défini une seule fois dans le sprite du document. Une icône décorative porte `aria-hidden="true"`. Une icône seule, comme le courriel du pied de page, a un nom accessible.

**Contre-exemple.** Un vélo pour séparer les étapes d'un processus, ou trois icônes de réseaux sociaux qui ne mènent nulle part.

**Lien.** `src/components/layout.tsx`, `tests/client/icons.test.tsx`, AGENTS.md section 10.

## 12. Des tokens, pas des valeurs

**Énoncé.** Les couleurs, tailles et espaces viennent des tokens de `src/globale.css`. Tailwind est un détail d'implémentation, jamais la source du style.

**Contre-exemple.** Une couleur hexadécimale écrite dans un composant.

**Lien.** `nexy-styling`, [architecture](../Technique/architecture.md).
