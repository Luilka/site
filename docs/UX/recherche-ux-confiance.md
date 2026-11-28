# Recherche UX : confiance, empathie et motifs de conversion

**Statut** : version 1, 26 novembre 2026. Propositions, rien n'est décidé.
**Propriétaire** : @Espoir-Loem
**Documents liés** : [synthèse du thème](audit-theme.md), [étude de Sina](etude-sina.md), [audit des pages](audit-pages-et-concurrence.md)
**Sources** : notices vérifiées le 26 novembre 2026 (liens ci-dessous), notes de `research_notes/Positionnement design Luilka Afrique Congo/contexte_marche_utilisateur.md`. Les articles complets n'ont pas tous été lus.

## 1. Ce que la recherche établit

| Constat | Source | Ce qu'il permet de dire | Ce qu'il ne dit pas |
|---|---|---|---|
| L'attrait visuel se juge en 50 millisecondes environ | [Lindgaard et collègues, 2006](https://www.nature.com/news/2006/060109/full/news060109-13.html) | Le haut de l'accueil doit paraître ordonné tout de suite | Que le visiteur reste ou achète après |
| Les gens jugent la crédibilité surtout sur l'apparence, mais un site trop « lisse » peut passer pour du marketing | [Stanford Web Credibility Guidelines](https://credibility.stanford.edu/guidelines) (Fogg, 2002, plus de 4 500 participants) | Un aspect professionnel adapté à l'objet du site est nécessaire | Qu'un site très brillant inspire plus confiance |
| La crédibilité demande des coordonnées claires (téléphone, adresse, email) et des informations vérifiables | Mêmes lignes directrices | Pied de page et page de contact complets, preuves que le visiteur peut contrôler | |
| Le bleu s'associe à la compétence, le rouge à l'excitation | [Labrecque et Milne, 2012](https://link.springer.com/content/pdf/10.1007/s11747-010-0245-y.pdf) | Une couleur d'accent porte une personnalité de marque, à choisir sciemment | Une loi : l'effet dépend du contexte et de la culture |

À ne pas citer sans source primaire : les pourcentages de blogs de marketing (« 77 % des acheteurs lisent les études de cas », « 90 % des décideurs sont influencés par la preuve sociale »). Les articles trouvés ne nomment pas de source.

## 2. L'empathie pour les visiteurs de Luilka

Vos notes de recherche décrivent un contexte précis. Elles se traduisent en exigences de design :

1. **Mobile d'abord, données chères, connexion intermittente.** Le terminal et les données sont les premiers obstacles. Conséquences : pages légères, images en `webp` dimensionnées, rien qui bloque sans réseau, état clair quand une image ne charge pas. Le poids de page et les Core Web Vitals sont **à mesurer** (cible à nommer : titulaire, date), aujourd'hui non mesurés.
2. **Le français ne suffit pas.** Le lingala et le kituba sont des langues nationales surtout orales. Le site est bilingue français et anglais (D-001) ; une version courte audio ou en lingala est une piste, pas une décision.
3. **La confiance est fragile** (arnaques fréquentes, mobile money très utilisé). Des signaux de sécurité et de transparence doivent être visibles : qui sommes-nous, où, comment payer, ce qui se passe après le contact.
4. **Langage simple, signaux redondants** : une action garde le même nom, un message d'erreur dit ce qui s'est passé et quoi faire, une icône n'est jamais seule.

## 3. Standards des grandes maisons

| Standard | Ce qu'on en retient pour Luilka |
|---|---|
| WCAG 2.2 AA | Contraste 4,5 pour 1 (3 pour 1 pour grands textes), cibles d'au moins 24 pixels, focus visible. Déjà opposable (AGENTS.md section 10) |
| Principes d'Apple pour l'interface (cités dans `docs/UX/design-principles.md` de Pro) | Finalité, liberté d'action, familiarité : l'interface s'efface devant le travail montré |
| Material de Google | Une hiérarchie typographique réduite, des états explicites (survol, focus, désactivé), du mouvement qui explique plutôt qu'il ne décore |
| Heuristiques de Nielsen | Visibilité de l'état, correspondance avec le monde réel (mots du visiteur), prévention des erreurs, reconnaissance plutôt que rappel |
| Core Web Vitals | Chargement du plus grand élément, réactivité, stabilité visuelle : à mesurer et à garder en budget |

Ces cadres donnent des **critères de revue**, pas une garantie de conversion.

## 4. Motifs qui convertissent sur un site de studio

Motifs récurrents chez les références étudiées ([thème](audit-theme.md), [Sina](etude-sina.md)). Chaque motif est une hypothèse à tester.

1. **Réalisations en grand dès le haut de l'accueil**, avec le résultat, pas l'adjectif. C'est le levier de confiance le plus fort et celui qui manque (images, accords de clients).
2. **Un cas raconté** : problème, décision, résultat, ce qui a été testé. Il répond à la position « une preuve devient une décision d'interface ».
3. **Visages et noms de l'équipe**, avec rôle et compte vérifiable. Fait (page À propos), à compléter avec les cinq autres profils.
4. **Un seul appel à l'action par écran**, au même libellé, répété en haut et en bas de page.
5. **Ce qui se passe après le contact** : délai de réponse promis, étapes, ce que Luilka fait et ne fait pas (frontière assumée). Réduit la peur d'un engagement flou.
6. **Réponses aux objections** : questions fréquentes (délai, budget indicatif, langues, paiement).
7. **Preuves vérifiables** : liens vers les projets réels, publications, comptes professionnels. Aucun chiffre sans source (règle du dépôt).
8. **Coordonnées complètes** : email, adresse, réseaux (LinkedIn fait ; TikTok et YouTube à fournir).
9. **Engagement par le contenu** : un blog ou des études de cas lisibles hors ligne, une lettre d'information. Sans contenu publié, cette piste est vide : à décider avant de la mettre en avant.

## 5. Plan d'application, par ordre d'effet attendu

1. Rendre l'action de contact unique et visible (même mot partout, accent).
2. Montrer une première réalisation réelle en haut de l'accueil (images à fournir).
3. Ajouter un bloc « ce qui se passe après » sur la page de contact.
4. Mesurer le poids des pages et les Core Web Vitals, fixer un budget.
5. Rédiger un cas raconté.
6. Compléter l'équipe et les coordonnées.

## 6. Limites

- Plusieurs notices seulement ; les articles complets, et les rapports de Nielsen Norman Group sur les sites B2B, n'ont pas été lus (leur contenu est payant ou n'a pas été accessible).
- Aucune étude n'établit que ces motifs convertissent pour Luilka. Seul un test auprès de visiteurs réels (entretiens ou comparaison de variantes) le dirait, après la décision Q-004 sur la collecte de données.
- Les standards cités sont des cadres de revue, pas des mesures.
