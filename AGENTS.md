# AGENTS.md

**Rôle.** Source canonique unique pour tout agent qui travaille sur Luilka. `CLAUDE.md` renvoie ici et ne duplique aucune règle.
**Langue.** Français pour la documentation, les rapports et les échanges. Le site est bilingue, français et anglais. Tout le code est en anglais : identifiants, noms de fichiers, messages techniques.
**Typographie.** Aucun tiret cadratin, aucun tiret demi-cadratin, aucun caractère chinois, japonais ou coréen, aucun emoji, aucun marqueur de correction en attente. Quand un titulaire ou un choix manque, écrire « à nommer » ou « à trancher ». Le texte est simple et écrit pour des personnes.
**Règle d'or.** Ne pas coder pour coder. Auditer l'expérience, écrire le test, puis le minimum de code, puis mesurer. Un code court et vérifié vaut mieux qu'un code écrit vite.
**Titulaire par défaut.** `@Espoir-Loem`, chef de projet et auteur par défaut des commits et des messages publiés sur GitHub.

## 1. Périmètre et posture

Luilka est le site vitrine d'un studio de design. C'est un projet Nexy : routage côté client, React 19, Tailwind 4, textes en français et en anglais.

- Le site sert une visite rapide, souvent sur téléphone. Il montre ce que Luilka dessine, des preuves, puis un contact.
- Aucun élément d'interface n'est ajouté pour décorer. Chaque élément répond à un besoin de la visite ou à une exigence d'accessibilité. Sinon il est retiré.
- Aucun chiffre n'est écrit sans source. Aucun lien n'est fictif.
- Aucune cible de KPI n'est inventée : elle est « À nommer » ou cite sa règle. Aucune donnée d'usage n'est collectée avant la décision Q-004.

## 2. Sources de vérité

| Fichier | Rôle |
|---|---|
| `docs/README.md` | Index de la documentation et règles de mise à jour |
| `docs/Product/vision.md` | Pourquoi le site existe |
| `docs/Product/decisions.md` | Registre canonique des décisions et des questions ouvertes |
| `docs/Product/kpi.md` | Définition des KPI : formule, source, propriétaire, cible |
| `docs/Technique/architecture.md` | Structure du code et responsabilités des dossiers |
| `docs/Technique/controles.md` | Contrôles locaux et étapes de la CI |
| `docs/Technique/README.md` | Modèle d'ADR unique et liste des ADR |
| `docs/UX/design-principles.md` | Principes opposables en revue d'interface |
| `docs/Redaction/ia-defauts-et-tips.md` | Voix humaine et tics de rédaction automatique à éviter |
| `memoires/` | Pistes de raisonnement datées, sources et conséquences |

Ordre de prévalence en cas de divergence : `docs/Product/decisions.md`, puis l'ADR concerné, puis `docs/Technique/architecture.md`, puis `docs/UX/`, puis `memoires/`. Les rapports de `reports/` sont des instantanés datés et ne font pas foi sur l'état courant.

## 3. Décisions opposables et questions ouvertes

Décisions retenues : D-001 à D-010. Questions ouvertes : Q-001, Q-002, Q-003 et Q-004.

Aucune question ouverte n'entre dans le code avant son inscription au registre avec date, motif, propriétaire et source. Toute demande qui contredit une décision retenue impose une réouverture écrite : nouvelle preuve, date, décision remplacée, documents touchés. Aucune modification silencieuse.

## 4. Stack retenue

| Couche | Choix | Contrainte |
|---|---|---|
| Serveur | Python 3.13, Nexy 2.11.2 ou plus, FastAPI | Typage `mypy` strict, `ruff` |
| Client | React 19.3.1, TypeScript 5.9.3, Vite 7.3.8 | Rendu client, D-003 |
| Style | Tailwind CSS 4.3.5, tokens dans `src/globale.css` | Un outil de style est un détail, jamais une source de style |
| Mouvement et icônes | Motion 14.14.0, Lucide 1.77.0 | `prefers-reduced-motion` respecté |
| Tests | pytest, Vitest 5.1.1, Testing Library | Un test par comportement |
| Contrôles | ESLint 10.15.0, `scripts/check_code_style.py`, `scripts/check_docs.py`, `scripts/check_kpi.py` | Rejoués en CI |

Les versions sont exactes. Les lockfiles sont commités. Aucune dépendance en `latest`, `canary`, `beta` ou `rc`.

## 5. Ordre de travail

1. Si le changement a une vue (page, composant, formulaire, message, erreur), auditer l'expérience d'abord : charger `nexy-ux-audit` et écrire le constat.
2. Écrire le test qui échoue, puis le minimum de code qui le fait passer, puis refactoriser.
3. Lancer les contrôles de la section 8 et rapporter ce qu'ils affichent, échecs compris.
4. Mettre à jour la documentation touchée (section 12).

## 6. Règles d'écriture du code

- TDD. Le test et le code sont dans le même commit logique.
- Une fonction fait un traitement, une classe porte une intention, un dossier regroupe des intentions voisines. Jamais de dossier `utils/` ou `misc/`.
- SOLID et KISS sont opposables en revue. Aucune abstraction pour un cas qui n'existe pas.
- Aucune fonction, méthode ou composant ne dépasse 10 lignes, signature et accolades comprises. Le seuil est appliqué par ESLint (`max-lines-per-function`).
- Aucune logique dans les fichiers TSX : un composant ne fait que du rendu. La logique va dans un hook de `src/shared/hooks/` ou une fonction de `src/shared/lib/`.
- Un seul composant par fichier TSX, nommé comme le fichier. Un seul appel à `.map()` par fichier TSX.
- Aucun commentaire, sauf un bloc de documentation `/** ... */` sur une fonction exportée. `scripts/check_code_style.py` le contrôle.
- Tous les fichiers `.ts` et `.tsx` sont en minuscules, mots reliés par des tirets, sans point : `info-card.tsx`, `use-retry.ts`, `shared-lib.test.ts`. Nexy tire un nom de fonction Python du nom du fichier (D-006). Un hook commence par `use-`.
- La réutilisation prime. La deuxième copie est un signal, la troisième est un défaut. Le code partagé va dans `src/shared/` (D-004).
- React idiomatique : état dans `useState` et `useReducer`, effets dans `useEffect`, jamais de script DOM écrit à la main. Charger `nexy-react` pour tout fichier `.tsx`.
- Tous les liens passent par `src/shared/ui/link.tsx`, l'adaptateur autour du `Link` de Nexy.
- Avant de corriger un bug, lire le code de la librairie concernée et écrire un test qui le reproduit.
- `__nexy__/` est généré : ne jamais l'éditer, ne jamais le commiter.

## 7. Structure du dépôt

```text
src/routes/                 pages, un fichier par URL
src/shared/ui/              atomes : bouton, badge, carte, champ, lien, conteneur
src/shared/hooks/           logique réutilisable
src/shared/lib/             fonctions pures
src/shared/i18n/            dictionnaires, langue, contenu
src/shared/types/           types partagés
src/components/layout/      en-tête, navigation, pied de page, document
src/components/cards/       cartes
src/components/patterns/    blocs réutilisés par plusieurs pages
src/components/sections/    sections de page, dont (home)/
src/content/                navigation et slugs partagés avec Python
scripts/                    contrôles déterministes
docs/  memoires/  reports/  documentation, notes et rapports
tests/  tests/client/       tests Python et Vitest
```

## 8. Commandes et contrôles

Lancer les commandes dans l'environnement virtuel `.venv`, ou avec `uv run`, par exemple `uv run nx dev`. Hors de l'environnement, les paquets du projet sont introuvables. Ne jamais lancer `nx skills`.

| Commande | Rôle |
|---|---|
| `uv run nx dev`, `nx build`, `nx start` | Développer, construire, servir |
| `uv run nx check` | `ruff` et `mypy` |
| `uv run nx test` | `pytest` puis tests client |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc` sur `tsconfig.client.json` |
| `npm run check:style` | Commentaires et appels `.map()` |
| `npm run check:docs` | Typographie, liens, index, ADR, notes |
| `npm run check:kpi` | Sections, identifiants et cibles de `docs/Product/kpi.md` |
| `npm test` | Vitest |

La CI rejoue les mêmes contrôles sur `main`, `staging`, `develop` et chaque pull request. Toute vérification déterministe devient un script dans `scripts/` puis une étape de la CI.

## 9. Git, branches, commits

- Branches permanentes : `main`, `staging`, `develop`. Aucun push direct. Branches de travail : `feature/*`, `bugfix/*`, `refactor/*` depuis `develop`.
- Conventional Commits : `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`. Le message dit pourquoi.
- Un commit, une unité : une fonction, une logique ou une structure. Un refactor et une fonctionnalité ne partagent jamais un commit.
- Aucun co-auteur de modèle, aucun trailer `Co-authored-by`, aucune mention « Generated with ». Les outils IA accélèrent le travail, ils ne signent rien.

## 10. Design et contenu

- Les principes de `docs/UX/design-principles.md` sont opposables en revue.
- Aucun emoji. Les icônes sont de vrais SVG, décoratives avec `aria-hidden="true"` ou nommées.
- Texte simple, en minuscules sauf la première lettre, avec des verbes clairs : « Enregistrer », pas « Soumettre ». Une action garde le même nom partout.
- Une erreur dit ce qui s'est passé et ce qu'il faut faire. Elle ne s'excuse pas.
- Une page, une tâche. Les URL, titres, libellés et intertitres s'accordent.
- Accessibilité WCAG 2.2 AA : cibles de 24 sur 24 pixels CSS au minimum, contraste 4,5:1 pour le texte courant et 3:1 pour les grands textes.
- Éviter le texte robotique. Suivre `docs/Redaction/ia-defauts-et-tips.md`.

## 11. Skills

Installés dans `.agents/skills/` et `.claude/skills/`. Charger celui qui correspond à la tâche :

- `nexy-principles` : ordre de travail, KISS, SOLID, TDD, pas d'emoji, vrais SVG, texte humain. À charger avant d'écrire du code.
- `nexy-ux-audit` : audit UX et architecture de l'information avant de construire ou de changer une vue.
- `nexy-react` : routes, layouts et composants React 19.
- `nexy-styling` : style Tailwind et tokens de `src/globale.css`.

## 12. Conduite en cas de contradiction

Arrêter l'action. Vérifier l'ordre de prévalence de la section 2. Si la demande contredit une décision retenue, proposer une réouverture écrite et attendre un humain nommé. Si le doute porte sur un titulaire ou un chiffre, poser une question plutôt que d'inventer.

## 13. Mise à jour documentaire

- Après tout changement structurant, mettre à jour le registre des décisions, l'ADR, `docs/Technique/architecture.md`, l'index `docs/README.md` et, si le raisonnement vaut la peine d'être gardé, une note de `memoires/`.
- Écrire un rapport daté dans `reports/` pour un changement qui touche plusieurs dossiers.
- Avant de terminer, vérifier : typographie interdite, liens relatifs résolus, numérotation D et Q sans saut, blocs de code fermés.
- `CLAUDE.md` reste un court renvoi vers ce fichier. Aucune règle n'est dupliquée ailleurs.
