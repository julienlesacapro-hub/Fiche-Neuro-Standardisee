# ADP — accident de plongée, version 7.3.0

Fichier unique : `index.html`. Aucun réseau, aucune dépendance externe, aucun compte.
Double-cliquez dessus, il s'ouvre dans votre navigateur et tout fonctionne.

ADP couvre la prise en charge complète d'un accident de plongée : la consultation initiale en
urgence, les consultations de suivi, et le compte rendu de séjour. L'examen neurologique standardisé
en est le cœur.

Sur téléphone et tablette, installez-le plutôt comme application : icône sur l'écran d'accueil,
plein écran, démarrage sans réseau. Voir *Installer sur téléphone et tablette* plus bas.

---

## Les deux sorties

| Sortie | Fichier | Comment l'obtenir |
|---|---|---|
| Document imprimable et enregistrable | PDF, 5 à 6 pages A4 | Bouton **PDF / Imprimer**, puis *Enregistrer au format PDF* ou *Microsoft Print to PDF* |
| Fichier exploitable, incrémental | `donnees_neuro.csv` | Réécrit automatiquement à chaque enregistrement de fiche |

Un seul CSV pour tous les sujets, toutes les consultations et tous les types de document.
Une ligne = une fiche. 874 colonnes.

Les pages du PDF, selon le type de consultation :

| Page | Consultation initiale | Consultation de suivi | Consultation de sortie |
|---|---|---|---|
| 1 | Accueil, plongée, plongeur, anamnèse et contacts | — | Accueil, plongée, plongeur, anamnèse et contacts |
| 2 | Examen clinique, ORL, échographie pleuro-pulmonaire | Examen clinique, ORL, échographie pleuro-pulmonaire | Examen clinique, ORL, échographie pleuro-pulmonaire |
| 3 | Examen neurologique | Examen neurologique | Examen neurologique |
| 4 | Grille ASIA | Grille ASIA | Grille ASIA |
| 5 | Schémas corporels, pallesthésie, scores, conclusion de l'examen clinique | Schémas corporels, pallesthésie, scores, conclusion de l'examen clinique | Schémas corporels, pallesthésie, scores, conclusion de l'examen clinique |
| 6 | Prise en charge, diagnostic retenu, orientation | Prise en charge, évolution, diagnostic, orientation | Prise en charge, évolution, diagnostic, orientation |

Les photographies jointes s'ajoutent en fin de document, six par page.

---

## Mise en place, une seule fois

1. Ouvrez `index.html` dans **Chrome** ou **Edge**.
2. Cliquez **Fichier de données**, choisissez un dossier de votre disque, autorisez l'écriture.

L'outil y maintient trois fichiers, réécrits à chaque enregistrement :

- `donnees_neuro.csv` — vos données, toutes fiches confondues
- `dictionnaire_variables.csv` — le codage de chaque colonne
- `sauvegarde_neuro.json` — sauvegarde intégrale, sans perte

Firefox et Safari ne gèrent pas l'écriture directe sur disque. Sur ces navigateurs, et sur tablette,
passez par **Exporter**, puis fusionnez sur le poste principal.

---

## Installer sur téléphone et tablette

Le fichier HTML seul fonctionne déjà hors ligne. L'installation ajoute une icône, le plein écran
et un démarrage immédiat.

Il faut pour cela servir l'outil en HTTPS. Deux voies :

1. **GitHub Pages**, gratuit. Suivez `README.md` du dépôt.
2. **Serveur interne** de l'établissement, si vous préférez ne rien exposer.

Ensuite, sur l'appareil :

| Appareil | Geste |
|---|---|
| Android (Chrome, Edge, Samsung Internet) | menu ⋮ › **Installer l'application** |
| iPhone, iPad (Safari uniquement) | bouton **Partager** › **Sur l'écran d'accueil** |
| Windows, macOS (Chrome, Edge) | icône d'installation dans la barre d'adresse |

Le menu **Installation hors ligne** de l'outil affiche ces étapes selon l'appareil, signale les
mises à jour disponibles et permet de vider le cache. Vider le cache n'efface aucune fiche.

Sur iPhone et iPad, l'écriture directe du CSV dans un dossier n'existe pas : Safari n'implémente
pas cette API. Exportez à la main, puis fusionnez sur le poste principal.

---

## Trois types de consultation, un seul outil

Le premier champ de la fiche, **Type de consultation**, décide de ce que la fiche demande et de
ce que le document imprimé raconte.

| Type | Ce que la fiche demande | Ce que le document produit |
|---|---|---|
| **Consultation initiale** | Tout : accueil, plongée, plongée précédente, facteurs favorisants, plongeur, anamnèse, examen complet | Un compte rendu de prise en charge en urgence |
| **Consultation de suivi** | L'examen clinique, l'examen neurologique et un encart d'évolution | Une fiche neurologique standardisée augmentée du paragraphe d'évolution |
| **Consultation de sortie / CRH** | Tout, plus l'évolution | Un compte rendu de séjour |

Sur une consultation de suivi, les encarts de plongée, de plongée précédente, de facteurs
favorisants, de plongeur et d'anamnèse **disparaissent** : ces données appartiennent à la fiche
initiale et ne se ressaisissent pas. Seuls l'anamnèse, l'examen général et l'examen neurologique sont
proposés en grisé depuis l'examen précédent ; les examens complémentaires, les traitements, le
diagnostic et la conclusion ne sont jamais repris (voir *Consultation de suivi ou de sortie*).

Le type est proposé, jamais imposé : la première fiche d'un dossier part sur *initiale*, les
suivantes sur *suivi*. Vous changez d'un clic, la fiche se recompose aussitôt.

---

## Les quatre pages de saisie

La fiche est découpée en quatre pages. Les onglets en haut mènent directement à l'une d'elles,
le bouton **Suivant** avance d'une page, **Précédent** recule. Chaque onglet porte son compte de
champs remplis, et se borde de vert quand la page est complète.

| Page | Contenu |
|---|---|
| 1. Anamnèse et plongée | Identification, accueil et prise en charge initiale, plongeur (avec photo de l'ordonnance), plongée (profil, durées, paliers, procédure de ré-immersion), plongée précédente, facteurs favorisants, anamnèse, contacts |
| 2. Examen général | Constantes et surveillance, examen par appareil, conscience, pupilles et fonctions supérieures, ORL, signes fonctionnels, signes subjectifs, lésions cutanées |
| 3. Examen neurologique | Réflexes, force motrice, miction, coordination, sensibilités, grille ASIA, scores de sévérité, conclusion de l'examen clinique |
| 4. Conclusion | Recompression, actes, examens complémentaires, échographie pleuro-pulmonaire, traitements prescrits, évolution, diagnostic retenu, orientation, pièces jointes |

La synthèse rédigée reste visible en permanence, quelle que soit la page.

---

## Le profil de plongée et les durées

L'encart « Paramètres de la plongée accidentelle » (page 1) décrit la plongée : heures, profondeur,
paliers, type de profil et, le cas échéant, la procédure de ré-immersion. Le schéma se dessine seul,
se redessine à chaque frappe et s'imprime en noir et blanc sur la page 1 du PDF.

### Heures, profondeur et paliers

- **DS** départ surface (heure d'immersion), **DF** départ fond (heure), **HS** heure de sortie de
  l'eau, **Pmax** profondeur maximale atteinte.
- **Paliers** : une ligne par palier, avec le gaz, la profondeur et la durée à la profondeur. La case
  *paliers de sécurité réalisés (non obligatoires)* propose 1 min à 6 m et 5 min à 3 m, modifiables.

### Les quatre types de profil

Un bouton à vignette choisit le type ; sans choix, le profil carré est dessiné. Le titre du type
est inscrit sur le schéma.

| Type | Ce que dessine le schéma | Données propres au type |
|---|---|---|
| **Carré** | descente, séjour au fond, remontée | aucune |
| **Inversé** | plus profond en fin de plongée : un premier plateau moins profond, puis le passage à Pmax | profondeur de la 1re phase ; heure d'arrivée à Pmax (facultative : sans elle, le passage est dessiné aux deux tiers du séjour au fond) |
| **Yoyo** | remontées et réimmersions répétées | nombre de remontées, amplitude, remontées jusqu'à la surface ou non, intervalle de surface le plus long |
| **Remontée progressive** | descente à Pmax, puis remontée lente et ondulée **pendant DT**, jusqu'au départ du fond (DF) ; la remontée finale (DTR) part ensuite de cette profondeur | profondeur au départ du fond ; sans valeur, 40 % de Pmax est dessiné (au moins 3 m au-dessus du premier palier) |

Une plongée à **yoyo** se définit par des remontées et des réimmersions d'**au moins 10 m** de
variation de profondeur ; si elles atteignent la surface, l'**intervalle de surface** doit être
**inférieur ou égal à 15 minutes**. Une alerte signale le cas contraire, ainsi que l'absence de coche
sur le facteur favorisant « Plongées ludion (yo-yo) ». Le CSV porte une colonne calculée
`pl_yoyo_crit`.

### DT, DTR et DTP : les heures ou les durées

Les relations : **DT = DF − DS**, **DTR = HS − DF**, **DTP = HS − DS = DT + DTR**. Les heures ne sont
pas obligatoires : la DTR et la DTP sont des champs ordinaires, proposés d'après les heures, que l'on
peut aussi **saisir directement**. Une valeur saisie n'est plus recalculée.

| Ce que vous renseignez | Ce que l'outil en tire |
|---|---|
| DS, DF et HS | DT, DTR et DTP |
| DTR et DTP | DT = DTP − DTR |
| DTP seule (avec Pmax et les paliers) | DTR **estimée** d'après le modèle ci-dessous, puis DT = DTP − DTR ; le schéma écrit « (estimée) » |
| DTR seule | DT inconnue : le schéma dessine un séjour au fond de durée nominale |

La colonne `pl_dtr_src` du CSV dit d'où vient la DTR : `1` d'après les heures, `2` saisie, `3`
estimée, `4` déduite de DTP − DT.

### Le modèle de remontée

- **Vitesse de remontée standard : entre 9 et 12 m/min** jusqu'au premier palier ;
- **entre deux paliers, et du dernier palier à la surface : 10 secondes par mètre** ;
- les durées s'additionnent en secondes, et l'**arrondi à la minute supérieure se fait une seule
  fois, à la fin de la DTR** (pas à chaque changement de palier).

La **DTR attendue** s'affiche en fourchette : la vitesse la plus rapide (12 m/min) donne le minimum,
la plus lente (9 m/min) le maximum. Exemple : 40 m, 3 min à 6 m et 5 min à 3 m, soit 12 à 13 min.
La DTR estimée est le milieu de la fourchette, arrondi à la minute supérieure.

Quand la DTR est connue, l'outil en **déduit la vitesse de remontée** (distance jusqu'au premier
palier ÷ temps de montée, une fois retirés les paliers et les changements de palier). Au-dessus de
12 m/min, une alerte indique une remontée plus rapide que la vitesse standard. Le CSV porte
`pl_dtr_att_min`, `pl_dtr_att_max` et `pl_vit_remontee`.

Pour une remontée progressive, la remontée finale part de la profondeur du départ du fond, et non
de Pmax : c'est elle qui sert au calcul de la DTR attendue.

### Remontée rapide ou non conforme : procédure de ré-immersion

Un encart décrit la procédure, toujours modifiable. Les valeurs proposées sont celles de la
procédure usuelle :

- **Remontée rapide (RR)** : ré-immersion **en moins de 3 min** après l'émersion (sans émersion, le
  plongeur a décidé d'interrompre sa remontée), retour à **mi-profondeur** pendant **5 min**, puis
  remontée à la vitesse standard (9 à 12 m/min), puis **au minimum 1 min à 6 m et 5 min à 3 m** ;
- **Remontée non conforme** : au minimum 1 min à 6 m et 5 min à 3 m.

On indique si la procédure a été réalisée, l'émersion et son délai, la profondeur de ré-immersion
(la moitié de Pmax est proposée), les durées. La description est **rédigée d'après ces paramètres**,
reste modifiable à la main, et passe dans la synthèse et sur le PDF.

---

## Prise en charge : recompression, actes, examens, traitements, diagnostic

La page 4 suit l'ordre de la prise en charge.

1. **Recompression** : table, heures de mise en pression et de fin, séances, complications. Les tables
   proposées sont OHB15, A15IOT, A18IOT, A18, B18, A18HeOx, B18HeOx, C18, et « autre » ; **B18** est
   proposée d'office sur une consultation initiale. L'**heure de fin** est calculée (mise en pression
   plus durée de la table : 90, 115, 115, 90, 150, 110, 150 et 300 min dans l'ordre ci-dessus) et reste
   modifiable.
2. **Actes**, dans cet ordre : voie veineuse périphérique, **bilan biologique** (bilan accident de
   plongée et bilan œdème pulmonaire d'immersion cochés d'office sur une consultation initiale), puis
   **sondage vésical** (à demeure, évacuateur, ou non) avec le **volume initial évacué**.
3. **Examens complémentaires** : chaque examen réalisé (OUI) ouvre son **résultat**. ECG ; radiographie
   thoracique ; scanner thoracique (le plus fréquent) ou cérébral ; IRM cérébrale (la plus fréquente en
   consultation initiale) ou médullaire ; échographie cardiaque / recherche de FOP ; doppler
   transcrânien ; échographie pleuro-pulmonaire ; autres examens ; examens demandés.
   - **ECG** : fréquence cardiaque (bpm) et QTc (ms) ; le compte rendu est rédigé tout seul
     (« RSR à xx bpm, d'axe non dévié, sans trouble de la conduction ni de la repolarisation. QTc à xx
     ms. »), modifiable, et repris dans la synthèse. Il n'est rédigé qu'une fois la fréquence ou le QTc
     saisi.
   - **Doppler transcrânien** : le résultat se note pour trois conditions, **sans sensibilisation**,
     **après sensibilisation allongée** et **pendant un test de Flack** : absence de shunt D-G, shunt
     de bas grade, shunt de haut grade.
   - **Échographie pleuro-pulmonaire** : cocher OUI ouvre l'encart du même nom, plus bas.
4. **Échographie pleuro-pulmonaire** : douze champs par poumon, soit 24, sur deux thorax dessinés (face
   antérieure, patient vu de face ; face postérieure, patient vu de dos). Chaque poumon porte deux
   rangées (supérieure, inférieure) de trois champs, de l'extérieur vers la ligne médiane :
   **latéral, médian, médial**. On choisit une cotation (**A**, **B**, **B++**, **C**, **PNO**) puis on
   clique les champs ; un second clic avec la même cotation efface le champ. *Champs vides → A* cote A
   les champs restés vides, *Gomme* efface. Un champ non coté est non examiné. La synthèse et le PDF
   (page 2) donnent le nombre de zones et la liste des anomalies ; un pneumothorax est signalé en rouge.
5. **Traitements prescrits** : oxygène normobare, avec sa modalité (**masque à haute concentration**,
   15 L/min proposés, ou **VNI** avec PEP, aide inspiratoire, fréquence respiratoire et FiO₂),
   **(méthyl)prednisolone** (dose quotidienne calculée à 1 mg/kg d'après le poids, 3 jours, l'une et
   l'autre modifiables), remplissage, antalgiques, autres traitements.
6. **Évolution** (consultations de suivi et de sortie).
7. **Diagnostic retenu** : un ou plusieurs diagnostics associés, parmi accident de désaturation
   (types : médullaire, cérébral, vestibulaire, cutané, ostéo-articulaire, pulmonaire ; case *Sévère*),
   œdème pulmonaire d'immersion, barotraumatisme (oreille moyenne, oreille interne, sinus, surpression
   pulmonaire, dentaire, plaquage de masque), accident biochimique (hyperoxie, hypercapnie, narcose,
   intoxication au monoxyde de carbone), noyade. Quand plusieurs diagnostics sont retenus, un **diagnostic
   principal** peut être désigné, s'il est déterminé. Le diagnostic figure dans la synthèse, entre les
   examens paracliniques et la conduite à tenir.
8. **Orientation et commentaires**, puis les **pièces jointes**.

La **conclusion de l'examen clinique** (examen neurologique normal, anormal ou à recontrôler) ferme
l'onglet « Examen neurologique », en page 3.

### Consultation de suivi ou de sortie

Seuls l'anamnèse, l'examen général et l'examen neurologique sont proposés en grisé depuis l'examen
précédent. La recompression, les actes, les examens complémentaires, les traitements, le diagnostic et
la conclusion ne sont **jamais repris** : ils sont nécessairement différents, et un examen coché de
nouveau est un **nouvel examen**.

---

## Habitudes toxiques et ordonnance

- **Alcool** : *consommation d'alcool* (évaluation en quatre stades) ou *alcool sevré* (depuis le,
  avec l'évaluation antérieure en quatre stades). Les deux réponses s'excluent. Le bouton **?** ouvre
  l'aide d'après Santé publique France : repères de consommation à moindre risque, verre standard,
  pyramide de sévérité et critères CIM-10 de la dépendance. Les définitions des stades « à risque » et
  « nocif » reprennent la typologie usuelle, la page de Santé publique France ne les détaillant pas.
- **Ordonnance** : dans l'encart « Antécédents et traitements », le bouton **Photo de l'ordonnance**
  joint une photographie à la fiche. C'est une pièce jointe comme les autres (titre « Ordonnance
  médicamenteuse », même limite de douze photos), visible en miniature dans l'encart, mentionnée dans la
  synthèse et imprimée avec les pièces jointes.

---

## Constantes et surveillance

Un relevé par ligne, horodaté, comme sur la fiche papier. **+ Ajouter un relevé** crée une ligne
à l'heure courante, la croix la retire. Vingt-quatre relevés au maximum.

Le PDF imprime le tableau complet. Le fichier de données porte une ligne par fiche : il reçoit la
**première et la dernière valeur**, le **minimum** et le **maximum** de chaque paramètre, la durée
de surveillance et le nombre de mictions notées. Le détail relevé par relevé reste dans la fiche
et sur le PDF ; il ne part pas dans le CSV, où une ligne par fiche est la règle.

---

## Scores de sévérité

L'encart se trouve en fin de page 3, après la grille ASIA.

### MEDSUBHYP

Les six items du score se **déduisent de ce que vous avez déjà saisi** : l'âge, la douleur
vertébrale, l'évolution avant recompression, les signes sensitifs objectifs, les myotomes clés
des membres inférieurs, et l'atteinte sphinctérienne. La valeur déduite est encadrée de vert.
Un clic sur une autre modalité tranche à votre place ; l'item passe alors en fond ambré et la
fiche retient qu'il a été coté à la main.

Le score se cote **à l'arrivée, à 12 heures et à 24 heures**. Le moment est proposé à partir du
délai accident → examen, vous le corrigez d'un clic. **Au-delà de 24 heures le score n'a plus
d'intérêt pronostique : il n'est pas renseigné**, et l'encart le dit.

Le seuil de gravité est 6. Le score et le seuil viennent du travail du service publié dans
*Emergency Medicine Journal* (André *et al.*, 2022, DOI 10.1136/emermed-2021-211227).

> **Un point à confirmer.** Le poids de la modalité « parésies » de l'item moteur ne figure pas
> sur la fiche A3 du service : la case du barème est vide. La valeur **4** retenue ici est une
> hypothèse, alignée sur la progression des autres modalités (paraplégie 5, signes sensitifs 4).
> L'encart et le PDF le signalent. Confirmez-la avant d'exploiter les scores pour une analyse.

### Score vestibulaire

La grille est celle du service, intégrée à l'outil. Cinq items, de 0 à **19 points** :

| Item (colonne) | Modalités et points |
|---|---|
| Vertige rotatoire (`vest_vertige`) | absent 0 · non permanent ou simple sensation vertigineuse 1 · permanent 2 |
| Nystagmus (`vest_nystagmus`) | absent 0 · présent dans le regard décentré dans le sens de la secousse rapide 1 · présent dans le regard centré 2 · présent dans le regard décentré dans le sens de la secousse lente 3 |
| Signes neurovégétatifs (`vest_nv`) | absents 0 · nausées 1 · nausées et rares vomissements, notamment après mobilisation 2 · vomissements fréquents (plus de 3) ou permanents 3 |
| Instabilité (`vest_instab`) | absente 0 · présente debout yeux fermés 1 · présente debout yeux ouverts 2 · verticalisation impossible 3 |
| Symptômes cochléaires, surdité ou acouphènes (`vest_cochl`) | absents 0 · présents 8 |

Comme pour MEDSUBHYP, chaque item est **déduit de ce que vous avez déjà saisi**, la valeur déduite
est encadrée, et un clic sur une autre modalité tranche à votre place :

- **nystagmus** : d'après les positions du regard où il est vu, rapportées au côté de sa secousse
  rapide (seulement vers la secousse rapide 1, aussi regard centré 2, aussi vers la secousse
  lente 3) ; « non » à la question *Nystagmus* donne 0 ;
- **instabilité** : verticalisation impossible 3, équilibre perdu yeux ouverts 2, perdu yeux fermés
  seulement 1, conservé dans les deux cas 0 ;
- **symptômes cochléaires** : troubles de l'audition ou acouphènes ;
- **vertige** : « non » à la question *Vertiges* donne 0 ; « oui » ne dit pas s'il est permanent,
  vous tranchez ;
- **signes neurovégétatifs** : rien de ce qui est saisi ne les renseigne, vous les cotez ici.

Le total n'est calculé que si les cinq items ont une valeur. La grille ne définit aucun seuil de
gravité, l'outil n'en affiche donc pas. Le total (`vest_total`) et les cinq items (valeur
retenue, cotée ou déduite) sont des colonnes du CSV. L'éditeur de grille des premiers essais est
retiré : la grille s'écrit dans la constante `VEST`, en tête du script de `index.html`.

---

## Le paragraphe d'évolution pour le compte rendu

Sur une consultation de suivi ou de sortie, l'encart **Évolution** demande le nombre de séances,
la présence de complications thérapeutiques, le sens de l'évolution, les examens réalisés et les
examens demandés.

Sous l'encart, un cadre bleu assemble ces réponses en un **paragraphe rédigé**, prêt pour le
compte rendu de sortie. Il se recalcule à chaque frappe. Le bouton **Copier** le met dans le
presse-papiers.

---

## Retrouver un sujet

Trois entrées mènent au même résultat.

1. **Le numéro de dossier.** Tapez-le dans le premier champ : s'il est déjà connu, l'identité et
   les données de l'accident se remplissent seules, et l'examen précédent est proposé en grisé.
2. **Le bouton Rechercher**, à côté de ce champ. Une fenêtre accepte un numéro de dossier, un
   **numéro d'accident de plongée**, un nom, un prénom ou une date de naissance, écrite 12/04/1988 ou
   1988-04-12 indifféremment. Les accents et la casse sont ignorés. Cliquez le sujet : tout se
   remplit. La liste de gauche se filtre de la même façon et affiche le numéro d'accident.
3. **Le nom saisi directement.** Si vous remplissez le nom ou la date de naissance avant le numéro
   de dossier et qu'un sujet correspond, un bandeau propose de reprendre son dossier.

La recherche porte sur les fiches présentes dans la base locale de ce poste. Un sujet examiné
ailleurs n'apparaît qu'après fusion du fichier de données.

---

## Reprise automatique d'un dossier connu

Dès que vous saisissez un **numéro de dossier déjà enregistré** :

- nom, prénom, sexe, date de naissance, date et heure de l'accident se remplissent seuls ;
- un bandeau rappelle la date de l'examen précédent ;
- sur chaque champ encore vide de l'**anamnèse, de l'examen général et de l'examen neurologique**, la
  valeur de cet examen apparaît **en grisé**. Un clic la reprend. Pour les champs texte, un petit
  bouton `↩` fait la même chose. La recompression, les actes, les examens complémentaires, les
  traitements, le diagnostic et la conclusion ne sont jamais proposés : un examen coché de nouveau est
  un nouvel examen ;
- le bouton **Reprendre tout l'examen précédent** remplit d'un coup tous les champs vides de ces
  encarts, schémas corporels et reliefs osseux compris. Les valeurs déjà saisies ne sont jamais
  écrasées.

L'examinateur, la date et l'heure de l'examen ne sont jamais repris.

---

## Remplir une fiche

**Tout renseigner comme NORMAL** remplit tous les items en une fois. Vous ne modifiez ensuite que
ce qui est anormal.

**Ctrl + S** enregistre. Un brouillon est sauvegardé toutes les 4 secondes.

Un champ dont la question commandante change de réponse est effacé automatiquement. Exemple :
si vous repassez « Nystagmus » de OUI à NON, le côté, la position du regard et le sens du nystagmus
disparaissent du fichier de données. Aucune valeur fantôme ne subsiste.

### Les schémas corporels

Deux schémas restent en topographie libre, là où le métamère n'apporte rien :
les signes subjectifs et les lésions cutanées. Ils fonctionnent de la même façon :

1. choisissez la **cotation à appliquer** dans la barre du haut ;
2. cliquez les zones concernées ;
3. re-cliquer une zone avec la même cotation l'efface. La gomme aussi.

Chaque cotation a son propre motif, visible à l'écran comme sur le PDF imprimé en noir et blanc.

| Schéma | Cotations |
|---|---|
| Signes subjectifs | fourmillements, picotements, peau cartonnée, brûlures, décharges électriques, engourdissement |
| Lésions cutanées | marbrures (cutis marmorata), érythème, œdème localisé, prurit, emphysème sous-cutané, purpura |

Les sensibilités, elles, ne se cotent plus par zone anatomique mais par métamère. Voir la section
suivante.

### La pallesthésie

Elle ne se cote pas sur le zonage anatomique mais sur **12 reliefs osseux** : crâne (médian),
clavicule, épaule, coude, poignet, doigt, grill costal, EIAS, rotule, malléole interne,
malléole externe, orteil. Tous bilatéraux sauf le crâne.

Chaque relief et chaque côté offrent les quatre boutons directement : **Diminuée**, **Exagérée**,
**Abolie**, **Normale**. Un clic suffit, il n'y a pas de mode à sélectionner au préalable comme
sur les schémas corporels. Une case laissée sur « Normale » signifie relief testé et normal.

### Sensibilités non examinées

Si l'examen des sensibilités n'a pas été réalisé, répondez NON à **Examen des sensibilités
réalisé**. Les 112 colonnes de métamères, les 23 colonnes de reliefs et les scores ASIA sortent
alors **vides** (valeur manquante).

Attention à la différence de sens entre les deux échelles :

- sur les **reliefs** et les **zones**, `0` veut dire testé et normal ;
- sur les **métamères**, `0` veut dire sensibilité **absente**, ce qui est le maximum de gravité.
  Le normal y vaut `2`. Ce codage est celui de la norme ISNCSCI, je ne l'ai pas inventé.

Une cellule vide veut toujours dire non testé, dans les deux cas.

### Les métamères et le score ASIA

Les sensibilités épicritique et thermoalgique se cotent sur les **28 métamères** de la norme
ISNCSCI, de C2 à S4-5, côté droit et côté gauche. Chaque case propose quatre boutons :

| Bouton | Valeur enregistrée | Sens | Points ASIA |
|---|---|---|---|
| **2** | 2 | normale | 2 |
| **↓** | 1 | hypoesthésie | 1 |
| **↑** | 3 | hyperesthésie | 1 |
| **0** | 0 | anesthésie | 0 |
| **NT** | 9 | non testable | exclu du total |

Hypo- et hyperesthésie valent toutes deux 1 point dans la norme ISNCSCI. L'outil garde la
distinction pour le compte rendu et n'en fait qu'un seul point pour le score. La pallesthésie
n'entre pas dans le score ASIA.

Deux façons de remplir, au choix, sur le même écran.

**Le schéma** (vue par défaut). Deux silhouettes, antérieure et postérieure, où les métamères
sont dessinés. Choisissez la cotation dans la barre, puis cliquez :

- en mode **par zone anatomique**, un clic sur la jambe, le thorax ou la main cote d'un coup
  tous les métamères de cette zone. C'est la vitesse de la version précédente ;
- en mode **par métamère**, un clic ne cote qu'une bande. C'est la précision quand elle sert.

Vous voyez immédiatement où passe le niveau : le vert s'arrête, le rose commence.

**Le tableau des 28 métamères**, accessible par l'onglet voisin, reste la vue exhaustive :
une ligne par niveau, le repère anatomique de la norme rappelé sur chaque ligne, et le chevron
qui reporte une ligne sur tous les niveaux situés en dessous.

Trois raccourcis rendent la saisie rapide :

- **Tout normal** remplit les 28 lignes d'un côté ou des deux ;
- le chevron **▼** en bout de ligne reporte la cotation de cette ligne sur **tous les métamères
  situés en dessous**. C'est le geste qui correspond à l'examen réel : vous descendez jusqu'au
  premier niveau anormal, vous cotez, vous reportez ;
- chaque ligne rappelle le **point de repère anatomique** de la norme (protubérance occipitale
  externe pour C2, mamelon pour T4, ombilic pour T10, région périanale pour S4-5).

La force motrice utilise les **10 myotomes clés** (C5 à T1, L2 à S1), cotés MRC 0 à 5, plus la
contraction anale volontaire (VAC) et la pression anale profonde (DAP).

L'outil calcule alors : totaux tact léger et piqûre sur 112 chacun, UEMS et LEMS sur 50 chacun,
niveau sensitif droit et gauche, niveau moteur droit et gauche, niveau neurologique (NLI),
préservation sacrée, grade AIS de A à E.

**Ce calcul est indicatif.** Les totaux, le niveau sensitif et le niveau moteur des segments
pourvus d'un myotome clé suivent la norme. Un myotome clé coté 5 reste intact même si le dermatome
correspondant est altéré : le niveau moteur peut donc passer sous le niveau sensitif, et c'est
conforme.

Dans les segments sans myotome clé (C1 à C4, T2 à L1, S2 à S5), la norme présume le niveau moteur
égal au niveau sensitif « si la fonction motrice sus-jacente est normale ». L'outil applique cette
condition de façon mécanique, là où un examinateur juge. Vérifiez sur la grille officielle avant
toute décision.

### Otoscopie et fonction tubaire

L'encart ORL cote, à droite et à gauche :

- **otoscopie** selon la classification de **Haines et Harris modifiée par Rui et Flottes** :
  `1` rougeur du manche du marteau, `2` rougeur diffuse du tympan qui est rétracté,
  `3` épanchement séreux de la caisse, `4` épanchement de sang dans la caisse,
  `5` perforation tympanique. Le `0` ne fait pas partie de la classification : il est ajouté
  pour coter un tympan normal, qu'il faut bien pouvoir enregistrer ;
- **épanchement rétrotympanique** : présent ou absent ;
- **manœuvre de Valsalva** : `2 = perméable`, `1 = difficile`, `0 = impossible` ;
- **Weber** : non latéralisé, latéralisé à droite, latéralisé à gauche ;
- **Rinne** : positif (conduction aérienne supérieure à l'osseuse, normal) ou négatif.

### Lésions cutanées de désaturation

Cochez **Lésions cutanées présentes**, choisissez le type dans la barre, cliquez les zones du
schéma. Six types, chacun avec son motif à l'impression : marbrures, érythème, œdème localisé,
prurit, emphysème sous-cutané, purpura.

Le fichier de données reçoit le nombre de zones atteintes, un compteur par type, et un indicateur
par grande région corporelle (tronc antérieur, tronc postérieur, membres supérieurs, membres
inférieurs).

### Reporter un réflexe sur d'autres

Renseignez un réflexe et ses qualités, puis cliquez **copier vers…** sur sa ligne. Cochez les
réflexes qui doivent recevoir la même cotation, ou utilisez les raccourcis *Tous*, *Même côté*,
*Membres supérieurs*, *Membres inférieurs*. La valeur et les qualités (polycinétique, étendu) sont
reportées à l'identique. Les réflexes non cochés ne bougent pas.

### Nystagmus et VNS

La **position du regard** accepte plusieurs modalités simultanées : regard centré, latéral droit,
latéral gauche, vers le haut, vers le bas. Elle se renseigne trois fois, indépendamment :
pour le nystagmus clinique, pour le nystagmus spontané sous VNS, et pour le NIV.

Dans le fichier de données, chaque position devient une colonne binaire (`nys_regard_centre`,
`nys_regard_lat_g`…), plus une colonne texte listant les positions cochées.

### Trépidations

Le caractère **épuisable ou inépuisable** se cote séparément à droite et à gauche. Les deux champs
apparaissent quand la trépidation est bilatérale, un seul quand elle est unilatérale.

---

## Aides à l'examen

Un bouton **?** apparaît à côté des items techniquement délicats : Hoffmann, Babinski,
trépidations, réflexes polycinétiques et étendus, Weber, Rinne, Valsalva, otoscopie, cotation MRC,
VAC et DAP, nystagmus, VNS, NIV, Barré, Mingazzini, Glasgow, test des métamères, pallesthésie,
résidu mictionnel, consommation d'alcool.

Chaque fiche donne la manœuvre, le résultat normal, ce qui compte comme pathologique et les pièges
courants. Quatre d'entre elles portent un schéma au trait.

### Photographies

Les fiches techniques sont des textes et des schémas. Les photographies qui documentent un examen
précis se joignent à la **fiche du sujet**, dans l'encart *Pièces jointes* en fin de page 4 (jusqu'à
douze photos, chacune avec un titre, réduites à 1600 pixels, enregistrées avec la fiche et imprimées
sur des pages dédiées du PDF). La photo de l'ordonnance se joint depuis l'encart « Antécédents et
traitements ». Elles n'entrent pas dans le fichier de données, qui ne reçoit que leur nombre et leurs
titres.

Une photographie de patient reste une donnée de santé identifiante, visage ou pas. Cadrez au plus
juste, recueillez le consentement, et chiffrez le support de toute sauvegarde JSON qui en contient.

---

## Douchette code-barres

Une douchette USB ou Bluetooth se déclare comme un clavier : elle tape le code en quelques
dizaines de millisecondes, puis envoie Entrée. Aucun pilote, aucune configuration.

L'outil reconnaît cette rafale **quel que soit le champ actif**, retire la chaîne du champ où elle
est tombée, et la place dans le n° de dossier. La recherche du dossier part aussitôt, l'identité se
remplit, un bip confirme.

La détection repose sur la vitesse moyenne de frappe : au plus 15 ms par caractère sur toute la
rafale. Une douchette émet entre 1 et 5 ms par caractère, un dactylographe rapide reste au-dessus
de 60 ms. Une saisie au clavier n'est donc jamais lue comme un scan. Testé jusqu'à 40 ms par
caractère sans faux positif.

Réglages dans le bouton **Douchette** de la barre du haut :

- activer ou désactiver la capture globale ;
- une **règle d'extraction** facultative, sous forme d'expression régulière, si le bracelet encode
  plus que l'identifiant. Exemple : `(\d{8,12})` sur `IPP:8012345678/X` retient `8012345678`.
  Un champ de test affiche le résultat en direct.

---

## Pseudonymisation de l'identifiant scanné

Sans précaution, scanner le bracelet fait entrer le numéro patient de l'hôpital dans la colonne
`dossier`. Le fichier devient alors ré-identifiable par quiconque a accès au système d'information
hospitalier, et l'argument de pseudonymisation tombe.

L'option **empreinte salée** règle ce point. Le numéro lu passe dans SHA-256 avec un sel secret,
et seul le résultat tronqué est enregistré, sous la forme `P-496F54D8F5E4`. Le numéro d'origine
n'est écrit nulle part : ni dans la fiche, ni dans le PDF, ni dans le CSV, ni dans la sauvegarde
JSON. Vérifié par test automatisé.

Le même patient rescanné redonne le même pseudonyme, donc le lien entre ses examens répétés est
conservé, et la reprise automatique du dossier connu fonctionne à l'identique.

### Le sel est la pièce critique

Un numéro à dix chiffres ne compte que dix milliards de valeurs possibles. Une empreinte non salée
se retrouve par force brute en quelques secondes : la pseudonymisation ne vaudrait rien. C'est le
sel secret qui la rend solide.

- **Conservez-le hors du dossier de données** : gestionnaire de mots de passe, coffre du service.
  Le bouton *Télécharger le sel* produit un petit fichier texte à ranger ailleurs.
- **Saisissez le même sel sur chaque poste.** Deux sels différents donnent deux pseudonymes
  différents pour le même patient, et la fusion ne relie plus ses examens.
- **Sel perdu, lien perdu.** Les fiches déjà enregistrées gardent leur pseudonyme, mais un nouveau
  scan du même patient produira un pseudonyme différent.

### Saisie directe

Quand la pseudonymisation est active, une valeur **tapée directement** dans le champ n° de dossier
n'est pas transformée. C'est voulu : vous gardez la possibilité d'utiliser vos propres numéros
d'inclusion. Un avertissement s'affiche sous le champ, et la colonne `dossier_pseudo` indique
fiche par fiche si l'identifiant est une empreinte (1) ou une valeur brute (0).

Pour pseudonymiser un identifiant sans douchette, utilisez le bouton **Scanner / pseudonymiser**
à côté du champ : une petite fenêtre reçoit le numéro, calcule l'empreinte, et n'en garde rien.

---

## Ré-examiner un sujet

Ouvrez une fiche du sujet dans la liste de gauche, puis **Ré-examen du sujet**, ou saisissez
simplement le numéro de dossier dans une fiche neuve.

**Ré-examen du sujet** ouvre directement une **consultation de suivi** : l'identité, le dossier
et les données de l'accident sont repris, les encarts de plongée et de plongeur restent sur la
fiche initiale. Changez le type en *sortie / CRH* pour la dernière consultation, ou pour une
consultation intermédiaire dont vous voulez un compte rendu de séjour.

`num_ex` classe les examens d'un sujet dans l'ordre chronologique et se recalcule automatiquement,
y compris si vous saisissez a posteriori un examen antérieur.

---

## Saisie sur tablette, puis fusion

1. Copiez `index.html` sur la tablette, ouvrez-le. Il fonctionne hors ligne.
2. En fin de mission : **Exporter** → *Télécharger la sauvegarde JSON*.
3. Sur le poste principal : **Importer / Fusionner**, déposez le fichier.

La fusion se fait sur `fiche_id`. Une fiche déjà présente n'est remplacée que si la version
importée est plus récente. Un double import ne crée pas de doublon.

---

## Analyser les données

```r
d <- read.csv2("donnees_neuro.csv", fileEncoding = "UTF-8-BOM", na.strings = "")
```

```python
import pandas as pd
d = pd.read_csv("donnees_neuro.csv", sep=";", encoding="utf-8-sig")
```

- Séparateur par défaut : point-virgule. Modifiable dans **Exporter** (virgule pour R et Python).
- **Cellule vide = valeur manquante (NA).** Aucune valeur par défaut n'est inventée.
- `dictionnaire_variables.csv` donne le libellé et le codage des 874 colonnes.

### Codages principaux

| Famille | Codage |
|---|---|
| Questions oui / non | `1 = OUI`, `0 = NON` |
| Côté | `1 = D`, `2 = G`, `3 = bilatéral` |
| Réflexes ostéotendineux | `0 = absent`, `1 = présent`, `2 = très vif` |
| Qualités des réflexes | `<réflexe>_poly`, `<réflexe>_etendu` : `1 = présent`, `0 = absent`, vide = réflexe non testé |
| Cutané plantaire | `0 = flexion`, `1 = neutre`, `2 = extension` |
| Force motrice | MRC `0` à `5` |
| Douleur | `eva_type` : `1 = EVA`, `2 = EN`, `3 = non évaluable` ; `eva_score` : `0` à `10` |
| Reliefs de pallesthésie | `1 = diminuée`, `2 = exagérée`, `3 = abolie`, `0 = normale` |
| Métamères (ISNCSCI) | `2 = normale`, `1 = hypoesthésie`, `3 = hyperesthésie`, `0 = anesthésie`, `9 = non testable`. Attention : ici `0` est le maximum de gravité. Le score ASIA compte `1` et `3` pour 1 point |
| Lésions cutanées | `1 = marbrures`, `2 = érythème`, `3 = œdème`, `4 = prurit`, `5 = emphysème`, `6 = purpura`, `0 = aucune` |
| Otoscopie | Haines et Harris modifiée `0` à `5` ; `valsalva_*` : `2 = perméable`, `1 = difficile`, `0 = impossible` |
| Interprétation acoumétrique | `orl_interp` : `0` symétrique, `1` transmission D, `2` transmission G, `3` transmission bilatérale, `4` perception D, `5` perception G, `8` discordant |
| Déficit moteur par membre | `def_msd`, `def_msg`, `def_mid`, `def_mig`, `def_sph` : `1 = OUI`, `0 = NON` |
| Weber, Rinne | `weber` : `0 = non latéralisé`, `1 = droite`, `2 = gauche` ; `rinne_*` : `1 = positif`, `0 = négatif` |
| Grade AIS | `A` à `E`, texte. `asia_nli` : métamère, texte |
| Zones des signes subjectifs | `1` à `6` selon le ressenti, `0 = aucun` |
| Identifiant | `dossier_pseudo` : `1 = empreinte salée SHA-256`, `0 = valeur saisie telle quelle` |
| Orientation | `1 = domicile`, `2 = médecine`, `3 = surveillance continue`, `4 = soins intensifs`, `5 = transfert` ; `orientation_txt` : texte libre complémentaire |
| Position du regard | une colonne binaire par position + une colonne texte (valeurs séparées par `\|`) |
| Trépidation | `trep_pied_qual_D`, `trep_pied_qual_G` : `1 = épuisable`, `2 = inépuisable` |
| Adressé par | `adresse_par` : `1 = SAMU 83`, `2 = SCMM`, `3 = autre SAMU`, `4 = autre` (établissement, avec son type et son nom) ; `adresse_etab_type` : `1 = SAU`, `2 = centre hyperbare`, `3 = non défini` |
| Moyen d'évacuation | `evac_moyen` : `1` moyens propres, `2` VSAV / pompiers, `3` SMUR routier, `7` hélicoptère médicalisé, `8` hélicoptère non médicalisé, `6` autre |
| Sonde vésicale | `ac_sonde` : `2 = sonde à demeure`, `3 = sondage évacuateur`, `0 = non` ; `ac_sonde_vol` : volume initial évacué (mL) |
| Table de recompression | `tb_table` : `1 = OHB15`, `2 = A15IOT`, `3 = A18IOT`, `4 = A18`, `5 = B18`, `6 = A18HeOx`, `7 = B18HeOx`, `8 = C18`, `9 = autre` (texte dans `tb_table_autre`) ; `tb_duree` : durée de la table en minutes, calculée |
| ECG | `im_ecg`, `ecg_fc` (bpm), `ecg_qtc` (ms), `ecg_txt` (compte rendu, texte) |
| (Méthyl)prednisolone | `rx_solu`, `rx_solu_dose` (mg par jour), `rx_solu_jours` (jours), `rx_solu_h` (heure de la 1re dose) |
| Type de profil de plongée | `pl_profil_type` : `1 = carré`, `2 = inversé`, `3 = yoyo`, `4 = remontée progressive` ; inversé : `pl_prof1`, `pl_h_inv` ; yoyo : `pl_yoyo_nb`, `pl_yoyo_amp`, `pl_yoyo_surf` (`1 = oui`, `0 = non`), `pl_yoyo_int`, et `pl_yoyo_crit` (`1` si les critères du yoyo sont remplis, `0` sinon, calculé) ; remontée progressive : `pl_prof_df` (profondeur au départ du fond) |
| Score vestibulaire | `vest_vertige`, `vest_nystagmus`, `vest_nv`, `vest_instab` : `0` à `3` ; `vest_cochl` : `0` ou `1` (8 points) ; `vest_total` : `0` à `19` |
| Échographie pleuro-pulmonaire | 24 colonnes de zones `ech_<a ou p>_<D ou G>_<s ou i>_<lat, mdn ou mdl>` : `1 = A`, `2 = B`, `3 = B++`, `4 = C`, `5 = PNO`, vide = zone non examinée ; `ech_nb` (zones cotées), `ech_nb_A`, `ech_nb_B`, `ech_nb_Bpp`, `ech_nb_C`, `ech_nb_PNO`, `ech_anom_D`, `ech_anom_G` (zones hors A par poumon), `ech_pno`, `ech_zones` (liste), `ech_txt` (commentaire) |
| Procédure de décompression | `pl_proc` : `1 = ordinateur`, `2 = tables MN23`, `5 = tables MT 92`, `3 = autres tables`, `4 = sans procédure` |
| Durées du profil | `pl_dt` (DT, calculée), `pl_dtr` (DTR) et `pl_duree_tot` (DTP), en minutes, calculées d'après les heures ou saisies ; `pl_dtr_src` : `1` d'après les heures, `2` saisie, `3` estimée, `4` déduite de DTP − DT ; `pl_dtr_att_min`, `pl_dtr_att_max` : DTR attendue (modèle de remontée) ; `pl_vit_remontee` : vitesse de remontée déduite (m/min) |
| Procédure de ré-immersion | `pl_reimm_type` : `1 = remontée rapide (RR)`, `2 = remontée non conforme` ; `pl_reimm_faite` : `1 = réalisée`, `0 = non réalisée` ; `pl_rr_emersion` (`1`/`0`), `pl_rr_delai`, `pl_rr_prof`, `pl_rr_duree`, `pl_rr_pal6`, `pl_rr_pal3` (minutes ou mètres) ; `pl_reimm_txt` : description |
| Alcool sevré | `tox_alcool_sevre` (case), `alcool_sevre_date`, `alcool_sevre_stade` : `1` à `4`, comme `alcool_stade` |
| Examens complémentaires | `im_rp`, `im_tdm_thor`, `im_tdm_cer`, `im_irm_cer`, `im_irm_med`, `im_eto`, `im_dtc`, `im_echopp` : `1 = OUI`, `0 = NON` ; résultat de chacun dans `<examen>_res` (texte) |
| Doppler transcrânien | `dtc_repos` (sans sensibilisation), `dtc_sensib` (après sensibilisation allongée), `dtc_flack` (pendant un test de Flack) : `0 = absence de shunt D-G`, `1 = shunt de bas grade`, `2 = shunt de haut grade` ; `dtc_txt` : commentaire |
| Oxygène prescrit | `rx_o2_mode` : `1 = masque à haute concentration`, `2 = VNI` ; `rx_o2_debit` (L/min) ; `rx_vni_pep`, `rx_vni_ai` (cmH₂O), `rx_vni_fr` (/min), `rx_vni_fio2` (%) |
| Diagnostic retenu | `dg_liste` (une colonne binaire par diagnostic : `dg_liste_add`, `dg_liste_opi`, `dg_liste_baro`, `dg_liste_bioch`, `dg_liste_noyade`) ; types : `dg_add_types_*`, `dg_baro_types_*`, `dg_bioch_types_*` ; `dg_add_grave` (`1` = sévère) ; `dg_principal` : `add`, `opi`, `baro`, `bioch` ou `noyade` ; `dg_txt` : précisions |
| Conclusion de l'examen clinique | `conclusion` : `1 = examen neurologique normal`, `2 = anormal`, `3 = à recontrôler` |
| Listes à cases | une colonne binaire par case (`atcd_med_hta`, `tox_tabac`, `atcdp_add`…) et une colonne texte (valeurs séparées par `\|`) |
| Menus déroulants | `niv_loisir`, `niv_pro`, `niv_ens`, `organisme` : codes numériques listés dans le dictionnaire ; `99 = autre (à préciser)` |
| Paliers | `pl_pal_nb`, `pl_pal_secu`, `pl_pal_duree`, `pl_pal_prof_max`, `pl_pal_txt`, puis le détail des six premiers (`pl_pal1_gaz`, `pl_pal1_prof`, `pl_pal1_duree`, `pl_pal1_secu`…) |

### Structure des colonnes

| Bloc | Contenu |
|---|---|
| Identification | `fiche_id`, `dossier`, `num_ex`, dates, heures, `delai_min`, `sexe`, `age`, `poste` |
| Examen | un item = une colonne, dont nystagmus, VNS, NIV, Hoffmann, résidus mictionnels |
| ORL | `oto_D`, `oto_G`, `epanch`, `valsalva_D`, `valsalva_G`, `weber`, `rinne_D`, `rinne_G` |
| Sensibilités, synthèse | `sens_lt_score`, `sens_pp_score`, scores par côté, `sens_lt_nt`, `sens_pal_nb`… |
| Sensibilités, détail | 112 colonnes de métamères (`sens_lt_*`, `sens_pp_*`) + 23 colonnes de reliefs (pallesthésie) |
| Force ASIA | 20 colonnes de myotomes (`f_c5_D`… `f_s1_G`), `vac`, `dap` |
| Synthèse ASIA | `asia_lt`, `asia_pp`, `asia_uems`, `asia_lems`, `asia_sens_D/G`, `asia_mot_D/G`, `asia_nli`, `asia_sacre`, `asia_ais` |
| Signes subjectifs | `subj_nb`, un compteur par ressenti, 48 colonnes de zones |
| Lésions cutanées | `cut_present`, `cut_nb`, un compteur par type, indicateurs de région, 48 colonnes de zones |
| Plongeur | nationalité, IMC, antécédents (une colonne par case), habitudes toxiques et paquets-années `tabac_pa`, antécédents en plongée, niveaux, organisme, certificat médical |
| Plongée accidentelle | procédure, heures DS / DF / HS, `pl_prof`, `pl_dt`, `pl_dtr`, `pl_duree_tot`, paliers |

Pour les analyses courantes, les colonnes de synthèse suffisent. Les colonnes de détail servent
aux analyses topographiques fines.

---

## Changements de la version 7.3.0

Cette version nettoie le code et applique les modifications du 2 octobre 2026. Aucun patient réel
n'ayant été saisi dans les versions d'essai, **les versions précédentes ne sont plus lues ni
converties**.

### Nettoyage

- Les conversions de fiches des anciennes versions (texte libre devenu choix codé, anciennes colonnes,
  anciens codes) et les options « historiques » sont supprimées.
- **Nouvelle base locale** : 7.3.0 ne reprend pas les fiches enregistrées par les versions
  précédentes dans le navigateur. Elles restent dans leur ancienne base, sans effet. Les **réglages du
  poste** sont à ressaisir : nom du poste, séparateur, douchette, sel de pseudonymisation, et la
  reconnexion du dossier de données (un clic sur *Fichier de données*).
- Le fichier de données ne se fusionne qu'avec des fichiers produits par la même version.
- L'éditeur de grille du score vestibulaire des premiers essais est retiré (la grille est intégrée).

### Saisie

- **Recherche d'un dossier** : le numéro d'**accident de plongée** s'ajoute au numéro de dossier, au
  nom, au prénom et à la date de naissance. La liste de gauche le filtre aussi et l'affiche.
- **Habitudes toxiques** : *alcool sevré*, avec la date de sevrage et l'évaluation antérieure en quatre
  stades.
- **Antécédents et traitements** : photo de l'ordonnance, jointe à la fiche.
- **Niveau de plongée professionnel** : « plongeur démineur », « nageur de combat » et
  « scaphandrier d'intervention » disparaissent ; s'ajoutent *plongeur d'armes (Marine nationale)* et
  *plongeur d'armes (armée de terre)* ; « plongeur de bord » perd la mention Marine nationale.
- **Procédure de décompression** : *tables MN23* remplace *tables MN 90*.
- **Profil** : la remontée progressive se dessine **pendant DT** ; la DTR et la DTP se saisissent
  directement ; modèle de remontée (9 à 12 m/min, 10 s par mètre entre paliers) ; vitesse déduite et
  alerte de remontée rapide ; encart de **procédure de ré-immersion** (RR et remontée non conforme).
  Voir *Le profil de plongée et les durées*.
- **Facteurs favorisants** : les conditions environnementales ne sont plus classées parmi les facteurs
  favorisants dans la synthèse (« mer calme » n'est pas un facteur aggravant) : elles forment une
  phrase à part, *Conditions environnementales*.
- **Score ASIA** : bouton *Actualiser le calcul* dans l'en-tête de l'encart, qui le déplie ; l'encart
  se rafraîchit aussi seul quand on cote la page.
- **Page 3** : la *conclusion de l'examen clinique* ferme l'onglet « Examen neurologique ».
- **Page 4** réorganisée : *Recompression*, puis *Actes* (voie veineuse, bilan biologique, sondage
  vésical avec son volume initial évacué), puis *Examens complémentaires* (avec résultat par examen,
  scanner thoracique ou cérébral, IRM cérébrale ou médullaire, ECG et doppler transcrânien déplacés
  ici, résultat du doppler par condition d'épreuve), l'*échographie pleuro-pulmonaire* (qui ne
  s'ouvre que si l'examen est coché), les *traitements prescrits* (oxygène au masque ou en VNI avec
  PEP, AI, FR et FiO₂), l'évolution, le **diagnostic retenu** (remplace la conclusion de l'examen), puis
  l'orientation.
- **Diagnostic retenu** : accident de désaturation (types, case *Sévère*), œdème pulmonaire
  d'immersion, barotraumatisme (types), accident biochimique (types), noyade ; plusieurs diagnostics
  possibles, avec un diagnostic principal si déterminé.
- **Synthèse** : un bloc *Diagnostic retenu* s'insère entre les examens paracliniques et la conduite
  à tenir.
- **Consultation de suivi ou de sortie** : seuls l'anamnèse, l'examen général et l'examen neurologique
  sont proposés en grisé ; les examens complémentaires, les traitements, le diagnostic et la conclusion
  ne sont jamais repris. *Reprendre tout l'examen précédent* suit la même règle.

### Fichier de données

- **810 → 874 colonnes** : 69 ajoutées, 5 retirées.
- **Retirées** : `ac_ecg` (devient `im_ecg`), `ac_doppler` (devient `im_dtc`), `im_tdm` (scindé en
  `im_tdm_thor` et `im_tdm_cer`), `im_irm` (scindé en `im_irm_cer` et `im_irm_med`), `im_res` (remplacé
  par un résultat par examen).
- **Ajoutées** : alcool sevré (`tox_alcool_sevre`, `alcool_sevre_date`, `alcool_sevre_stade`),
  profondeur au départ du fond (`pl_prof_df`), procédure de ré-immersion (`pl_reimm_*`, `pl_rr_*`),
  origine de la DTR et remontée attendue (`pl_dtr_src`, `pl_dtr_att_min`, `pl_dtr_att_max`,
  `pl_vit_remontee`), volume du sondage (`ac_sonde_vol`), résultats des examens (`im_*_res`), doppler
  (`im_dtc`, `dtc_*`), `im_echopp`, oxygène prescrit (`rx_o2_mode`, `rx_o2_debit`, `rx_vni_*`) et
  diagnostic retenu (`dg_*`).
- **Recodés** : `ac_sonde` (2 à demeure, 3 évacuateur, 0 non) ; `tb_table` (code de la table) ;
  `niv_pro` (nouvelle liste) ; `pl_proc` 2 devient « tables MN23 ». La colonne `conclusion` garde ses
  codes ; elle désigne désormais la conclusion de l'examen clinique, le diagnostic étant porté par
  `dg_*`.

### À valider de votre côté

Ces points viennent d'une interprétation de vos notes ; chacun se corrige dans une constante, en tête
du script de `index.html`.

- **Modèle de remontée** (`V_REM_MIN`, `V_REM_MAX`, `S_PAR_M`, `dtrSecondes`) : l'arrondi se fait **une
  seule fois, à la fin de la DTR** ; le trajet du dernier palier à la surface est compté à 10 s par
  mètre comme un changement de palier ; la DTR estimée est le milieu de la fourchette.
- **Remontée progressive** : la profondeur au départ du fond est une donnée que vous ne m'aviez pas
  précisée. Elle se saisit ; à défaut, 40 % de Pmax est dessiné.
- **Procédure de ré-immersion** : le délai, la profondeur (moitié de Pmax), la durée (5 min) et les
  paliers (1 min à 6 m, 5 min à 3 m) sont des propositions modifiables (`RR_DELAI_MAX`, `RR_DUREE`,
  `PAL_RR`). La procédure n'est pas dessinée sur le schéma.
- **Doppler transcrânien** : les trois conditions (sans sensibilisation, après sensibilisation allongée,
  pendant un test de Flack) se cotent indépendamment ; la formulation « sensibilisation allongée » est
  reprise telle quelle.
- **Types de diagnostic** (`DG_ADD`, `DG_BARO`, `DG_BIOCH`) : listes proposées, à corriger.
- **Valeurs d'office** d'une consultation initiale (`DEF_INITIALE`) : aspirine NON, table B18, bilans
  OUI.
- **Pagination du PDF** : la page de prise en charge (page 6) peut déborder sur une septième page quand
  la fiche est très remplie, la synthèse reprenant en phrases ce que les encadrés détaillent.

---

## Historique

- **7.3.0** : nettoyage, nouvelle base locale, profil et durées, procédure de ré-immersion, page 4
  réorganisée, diagnostic retenu.
- **7.2** : alerte et évacuation, le plongeur, la plongée accidentelle (profil, paliers), synthèse
  rédigée, échographie pleuro-pulmonaire, score vestibulaire, ECG, tables de recompression.
- **7.1** : ADP, trois types de consultation, quatre pages de saisie, constantes, scores de sévérité,
  fiche A3 du service.
- **6 et antérieures** : fiche d'examen neurologique standardisée, sensibilités par métamère, score ASIA,
  signes subjectifs et lésions cutanées, pièces jointes photographiques.

---

## Données personnelles

Par défaut, le CSV ne contient **ni nom, ni prénom, ni date de naissance**. Il contient le numéro
de dossier que vous saisissez, le sexe et l'âge calculé. L'identité complète ne figure que sur le PDF.

La case *inclure nom, prénom et date de naissance* dans **Exporter** lève cette séparation. Si vous
la cochez, le fichier devient un traitement de données de santé identifiantes au sens du RGPD
(art. 9) : registre des traitements, base légale, information des personnes et chiffrement du
support relèvent alors de votre responsabilité.

---

## Sauvegarde

Les fiches vivent dans la base locale du navigateur **et** dans le dossier connecté. Vider les
données de navigation efface la base locale. Le dossier connecté et les sauvegardes JSON sont
votre filet de sécurité : copiez-les ailleurs régulièrement.

---

## Trois points à vérifier de votre côté

**1. Le vocabulaire du nystagmus.** J'ai encodé vos termes tels quels, sans les réinterpréter :

- côté de la secousse rapide : D / G
- position du regard : regard centré / latéral droit / latéral gauche / multidirectionnel
- sens : même sens que la secousse rapide / sens inverse / girato-rotatoire

Si « dans le même sens que la secousse rapide ou inversement » désigne autre chose que le sens du
nystagmus, dites-le, je change les libellés et le codage.

**2. Le libellé de l'équilibre.** « Équilibre statique Yeux Ouverts : OUI / NON » est ambigu sur la
fiche papier. Le libellé retenu est **« Équilibre statique conservé »**, OUI = normal.

**3. Le niveau moteur ASIA dans les segments sans myotome clé.** La norme ISNCSCI y demande de
reprendre le niveau sensitif « si la fonction motrice sus-jacente est intacte ». J'ai traduit cette
phrase par une règle mécanique : sous le dernier myotome clé intact, le niveau moteur descend
jusqu'au niveau sensitif, sans dépasser le myotome clé suivant. Un examinateur peut décider
autrement devant un tableau dissocié. C'est la raison du bandeau « calcul indicatif » affiché dans
l'outil et imprimé sur la page 2.
