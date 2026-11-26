# Défauts de rédaction IA et conseils de relecture

Ce document recense les habitudes de style que les modèles de langage reproduisent lorsqu'on leur demande un texte sans contrainte de forme. Il sert de grille de relecture pour les documents de Luilka. Les fichiers du dossier sont écrits sans tiret cadratin ni tiret demi-cadratin.

## 1. Pourquoi une liste de défauts ne suffit pas

Un signe isolé ne prouve rien. Le tiret cadratin est le plus connu, mais sa fréquence varie énormément selon les modèles et les configurations. Chez les lecteurs humains, il n'est pas non plus un détecteur fiable. Une étude de 2024, rapportée en 2025, rapporte que 94 % des copies d'examen rédigées par ChatGPT n'ont pas été repérées par les correcteurs d'une université britannique, et que les experts en linguistique ne font guère mieux que le hasard sur des résumés d'articles [7]. OpenAI a retiré son propre classificateur de textes en 2023, jugé trop peu précis : l'annonce officielle donne 26 % de faux positifs et 9 % de faux négatifs [8].

L'intérêt de cette liste est donc pratique, pas policier. Elle sert à corriger un brouillon, pas à accuser un auteur. Le diagnostic vient de l'accumulation de plusieurs signaux : ponctuation, rythme, vocabulaire, structure des paragraphes et absence de faits vérifiables.

## 2. Ce que les mesures montrent

**Stylométrie.** Une étude sur ChatGPT-4o en anglais, en portugais brésilien et en espagnol mesure 12,5 tirets cadratins pour 1 000 mots dans les textes originaux anglais, contre 3,2 chez l'auteur humain. Dans les traductions, les textes humains n'en contiennent aucun, contre 10,1 pour le modèle en anglais. Les auteurs décrivent une préférence par défaut en génération directe, que l'on peut supprimer par une consigne explicite. Le corpus ne contient que douze textes, donc la portée reste limitée [1].

**Publication scientifique.** Sur 69 632 préprints medRxiv, la proportion de sections Discussion contenant au moins un tiret cadratin passe de 4,23 % avant la sortie publique de ChatGPT à 11,58 % après, soit 7,35 points de plus, avec un odds ratio de 2,96. La progression est graduelle : 8,0 % en 2024, 20,3 % en 2025. Les auteurs précisent qu'il s'agit d'un indicateur de population, pas d'un détecteur individuel, et que le dispositif observationnel n'établit pas de causalité [2].

**Communications publiques.** Dans 146 239 communiqués de bureaux parlementaires américains, la densité de tirets cadratins non espacés reste entre 0,10 et 0,12 pour 1 000 caractères de 2021 à 2024, puis monte à 0,217 en 2025. La part des communiqués concernés passe d'environ 13 % à 24,8 %. Le seuil fixé avant l'analyse n'ayant pas été franchi, les auteurs présentent l'interprétation comme exploratoire [3].

**Variation selon les modèles.** Graphite compare 10 000 articles humains et 90 000 textes générés par neuf modèles sur les mêmes sujets. Le tiret cadratin n'est plus un marqueur stable : GPT-6 Astra l'emploie environ huit fois moins souvent qu'un écrivain humain, Claude Opus 5 à peu près au même rythme, Gemini 3.1 Pro presque jamais [4]. Une règle du type « tiret cadratin égal IA » décrit une configuration à un moment donné, pas une catégorie de textes.

**Réécriture.** Sur 60 786 paires formées d'un texte académique humain et de sa réécriture par un modèle, les réécritures emploient des mots plus longs (d = 1,57), plus de nominalisations (d = 1,12) et une diversité lexicale plus élevée (d = 1,31). La première personne, les contractions et les questions disparaissent presque. Les mots injectés sont plutôt « pivotal », « underscore », « foster » et « furthermore ». Les célèbres « delve » et « crucial » ne sont pas surreprésentés dans ce contexte de réécriture, ce qui montre que les listes de mots dépendent de la tâche [5].

**Génération.** GPT-4o utilise les propositions participiales 5,3 fois plus souvent que les humains, les nominalisations 2,1 fois, et place des mots comme « camaraderie » 162 fois et « tapestry » 155 fois plus souvent. Le réglage par instruction accentue l'écart au lieu de le réduire [6].

## 3. Réflexes et corrections

| Réflexe | Ce qui se voit | Correction |
|---|---|---|
| Tiret cadratin de confort | Une phrase coupée en deux par un tiret cadratin, souvent en fin de paragraphe | Remplacer par un point, une virgule, deux points ou des parenthèses. Réécrire la phrase si le tiret sert à simuler une chute |
| Liste de trois mécanique | Trois adjectifs ou trois avantages, dont le troisième n'apporte rien | Garder un ou deux éléments solides. Vérifier que chaque item apporte une information distincte |
| Formule de contraste | « Ce n'est pas X, c'est Y » répété d'une section à l'autre | Énoncer directement ce que l'on soutient, sans mise en scène |
| Ouverture creuse | « Dans le monde actuel », « dans le paysage en constante évolution », « il est important de noter que » | Supprimer l'ouverture et commencer par le fait |
| Prudence automatique | « il convient de noter », « on pourrait considérer », « en général », empilés | Vérifier l'affirmation. Si elle est juste, l'écrire au présent. Si elle est incertaine, préciser le degré d'incertitude une fois |
| Voix passive et nominalisations | « il a été procédé à une vérification », « l'implémentation a été réalisée » | Nommer l'acteur et employer un verbe conjugué |
| Vocabulaire gonflé | « crucial », « pivotal », « solide », « sous-tend », « met en lumière » | Remplacer par le mot que l'on dirait à voix haute : « clé », « montre », « soutient » |
| Transitions d'écolier | « en outre », « de plus », « par ailleurs », « notablement » en début de phrase | Employer « et », « mais », ou rien du tout |
| Rythme réglé comme une montre | Trois phrases du même genre, à peu près de la même longueur | Couper une phrase, en allonger une autre, laisser un fragment si le sens le demande |
| Paragraphes identiques | Deux à quatre phrases, ouverture générale, milieu en liste, clôture générale | Donner à chaque paragraphe une seule tâche et un fait précis |
| Conclusion qui répète | Dernier paragraphe qui résume ce qui vient d'être dit | Arrêter le texte sur le dernier fait utile |
| Faux détail vécu | Une anecdote sans date, sans nom, ou une référence qui ne s'ouvre pas | Retirer l'anecdote ou remplacer par un fait daté et sourcé |
| Gras et titres en excès | Presque chaque ligne est en gras | Réserver le gras aux repères réellement utiles |

## 4. Procédure de relecture

**Passe 1, recherche mécanique.** Chercher les caractères U+2014 et U+2013, puis les formules du tableau. Ne pas se contenter d'effacer : réécrire la phrase autrement.

**Passe 2, vérification.** Ouvrir chaque lien et confirmer chaque chiffre. Une affirmation chiffrée sans source sort du document.

**Passe 3, rythme.** Lire à voix haute. Dès que trois phrases se ressemblent, en modifier une. La voix repère ce que l'œil lisse.

**Passe 4, densité.** Pour chaque paragraphe, se demander quel fait précis il apporte. Un paragraphe qui pourrait figurer dans n'importe quel texte est supprimé.

**Passe 5, dernière ligne.** Couper la morale finale. Le lecteur préfère un dernier fait à une dernière leçon.

## 5. Consigne à donner au modèle

> Rédige en français. N'emploie ni tiret cadratin ni tiret demi-cadratin. N'ajoute pas de liste de trois lorsque deux éléments suffisent. Évite les formules « il est important de noter », « dans le paysage actuel » et « ce n'est pas X, c'est Y ». Chaque chiffre est accompagné d'une source vérifiable. Termine par un fait concret, pas par une conclusion générale.

Cette consigne ne remplace pas la relecture. Les études montrent qu'une instruction explicite réduit un tic particulier, comme le tiret cadratin, sans corriger automatiquement le rythme, le vocabulaire ou la structure des paragraphes [1][5][6].

## 6. Limites

Un texte sans tics peut rester généré. Un texte avec des tics peut avoir été écrit à la main. Le but de cette grille est de rendre les documents plus précis, pas de trancher une origine.

Les études citées portent surtout sur l'anglais, sur des textes académiques ou journalistiques, et sur des modèles dont les versions évoluent vite. Les fréquences relevées en 2026 ne seront pas celles de 2027. La seule règle durable est de relire, de vérifier les sources et de remplacer le général par le précis.

Cette grille s'applique à tous les documents de `docs`, de `memoires` et de `reports`, dont [la vision](../Product/vision.md), les dossiers `UX` et `Technique`, et aux textes visibles du site, en français comme en anglais. Elle est appliquée avant chaque commit documentaire, avec les cinq passes de la section 4 et les contrôles mécaniques de la section 8.

## 7. Références

1. *The Style of Machines : A Stylometric Study of LLM Generation and Translation*, ACL 2026 : https://aclanthology.org/2026.stygenai-1.5.pdf  
2. *Em-ergence of the em-dash : a population-level rise in em-dash frequency in medRxiv preprints*, 2026 : https://arxiv.org/abs/2606.29540  
3. *The em-dash em-beds in Congress*, 2026 : https://arxiv.org/abs/2608.05889  
4. Graphite, *AI Tells*, 16 septembre 2026 : https://graphite.io/research/ai-tells  
5. TextPulse, *Stylometric Fingerprints of AI Rewriting*, 2026 : https://textpulse.ai/research/ai-style-fingerprints  
6. *Do LLMs write like humans ? Variation in grammatical and rhetorical styles*, PNAS, 2025 : https://pmc.ncbi.nlm.nih.gov/articles/PMC11874169/  
7. *Too many em dashes ? Weird words like 'delves' ? Spotting text written by ChatGPT is still more art than science*, The Conversation, 30 juillet 2025 : https://theconversation.com/too-many-em-dashes-weird-words-like-delves-spotting-text-written-by-chatgpt-is-still-more-art-than-science-259629  
8. OpenAI, *New AI classifier for indicating AI-written text*, annonce officielle, 2023 : https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text  
9. Proofed, *The AI Editing Checklist* : https://proofed.com/knowledge-hub/ai-editing-checklist-how-to-spot-and-fix-ai-writing-patterns  
10. Dynatrace, *Remove AI writing patterns from content* : https://styleguide.dynatrace.com/docs/best-practices/remove-ai-writing-patterns-from-content  
11. Dragonfly Editorial, *AI Tells, and How to Fix Them* : https://dragonflyeditorial.com/ai-tells  
12. Geri Mileva, *AI writing patterns to avoid* : https://www.gerimileva.com/ai-writing-patterns-to-avoid-a-practical-list-of-ai-telltales

## 8. Contrôles mécaniques

Ces contrôles portent sur tous les fichiers de `docs`, `memoires` et `reports`, rejoués par `scripts/check_docs.py` (commande `npm run check:docs`). La sortie attendue est vide.

| Contrôle | Ce qui est vérifié |
|---|---|
| Tirets interdits | Aucune occurrence de U+2014 ni de U+2013 |
| Caractères CJK | Aucun idéogramme han, hiragana, katakana ni hangul |
| Marqueurs temporaires | Aucun marqueur de correction en attente ; écrire « à nommer » ou « à trancher » à la place |
| Liens relatifs | Chaque chemin local pointe vers un fichier existant |
| Index | Chaque fichier de `docs` est listé dans `docs/README.md` |
| Numérotation | D-001 et suivants, Q-001 et suivants dans le registre, sans saut |
| Sources | Chaque chiffre porte une source datée ; l'étude de 2024 reste datée de 2024, la source du classificateur OpenAI est l'annonce officielle et le pulse LinkedIn renvoie à son URL publique |
