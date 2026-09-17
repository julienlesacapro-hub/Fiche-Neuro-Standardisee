# ADP — accident de plongée, version 7.1.0

Fichier unique : `fiche_neuro.html`. Aucun réseau, aucune dépendance externe, aucun compte.
Double-cliquez dessus, il s'ouvre dans votre navigateur et tout fonctionne.

ADP couvre la prise en charge complète d'un accident de plongée : la consultation initiale en
urgence, les consultations de suivi, et le compte rendu de séjour. La fiche d'examen neurologique
standardisée des versions précédentes en est le cœur, elle n'a pas bougé.

Sur téléphone et tablette, installez-le plutôt comme application : icône sur l'écran d'accueil,
plein écran, démarrage sans réseau. Voir *Installer sur téléphone et tablette* plus bas.

---

## Les deux sorties

| Sortie | Fichier | Comment l'obtenir |
|---|---|---|
| Document imprimable et enregistrable | PDF, 5 à 6 pages A4 | Bouton **PDF / Imprimer**, puis *Enregistrer au format PDF* ou *Microsoft Print to PDF* |
| Fichier exploitable, incrémental | `donnees_neuro.csv` | Réécrit automatiquement à chaque enregistrement de fiche |

Un seul CSV pour tous les sujets, toutes les consultations et tous les types de document.
Une ligne = une fiche. 677 colonnes.

Les pages du PDF, selon le type de consultation :

| Page | Consultation initiale | Consultation de suivi | Consultation de sortie |
|---|---|---|---|
| 1 | Accueil, plongée, plongeur, anamnèse | — | Accueil, plongée, plongeur, anamnèse |
| 2 | Examen clinique et ORL | Examen clinique et ORL | Examen clinique et ORL |
| 3 | Examen neurologique | Examen neurologique | Examen neurologique |
| 4 | Grille ASIA | Grille ASIA | Grille ASIA |
| 5 | Schémas corporels, pallesthésie | Schémas corporels, pallesthésie | Schémas corporels, pallesthésie |
| 6 | Prise en charge et conclusion | Prise en charge, évolution, conclusion | Prise en charge, évolution, conclusion |

Les photographies jointes s'ajoutent en fin de document, six par page.

---

## Mise en place, une seule fois

1. Ouvrez `fiche_neuro.html` dans **Chrome** ou **Edge**.
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
initiale et ne se ressaisissent pas.

Le type est proposé, jamais imposé : la première fiche d'un dossier part sur *initiale*, les
suivantes sur *suivi*. Vous changez d'un clic, la fiche se recompose aussitôt.

---

## Les quatre pages de saisie

La fiche est découpée en quatre pages. Les onglets en haut mènent directement à l'une d'elles,
le bouton **Suivant** avance d'une page, **Précédent** recule. Chaque onglet porte son compte de
champs remplis, et se borde de vert quand la page est complète.

| Page | Contenu |
|---|---|
| 1. Anamnèse et plongée | Identification, accueil et prise en charge initiale, plongeur, plongée, plongée précédente, facteurs favorisants, anamnèse |
| 2. Examen général | Constantes et surveillance, examen par appareil, conscience, pupilles et fonctions supérieures, ORL, signes fonctionnels, signes subjectifs, lésions cutanées |
| 3. Examen neurologique | Réflexes, force motrice, miction, coordination, sensibilités, grille ASIA, scores de sévérité |
| 4. Conclusion | Actes et examens complémentaires, prescriptions, évolution, conclusion, pièces jointes |

La synthèse rédigée reste visible en permanence, quelle que soit la page.

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

Aucun score vestibulaire consensuel ne figure dans la fiche A3 ni dans le générateur de courriers
du service, et je n'en ai trouvé aucun publié qui corresponde. Plutôt que d'en inventer un,
l'outil vous laisse **composer le vôtre** : bouton **Définir la grille**.

Vous y saisissez les items, leurs modalités et leurs poids, au format `Libellé=poids` séparé par
une barre verticale, par exemple `Absent=0 | Modéré=1 | Sévère=3`. Un modèle de départ est
proposé, à garder ou à remplacer entièrement.

La grille vit dans les **réglages du poste**, pas dans la fiche : elle s'applique à toutes les
fiches et part avec l'export des réglages pour être recopiée sur un autre poste. Chaque item
garde une clé stable (`vest_1`, `vest_2`…) : renommer un libellé ou réordonner la grille ne
déplace pas les réponses déjà enregistrées, et chaque item devient une colonne du CSV.

Cette grille n'est validée par rien. L'outil la calcule, il ne la cautionne pas.

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
2. **Le bouton Rechercher**, à côté de ce champ. Une fenêtre accepte un numéro, un nom, un prénom
   ou une date de naissance, écrite 12/04/1988 ou 1988-04-12 indifféremment. Les accents et la
   casse sont ignorés. Cliquez le sujet : tout se remplit.
3. **Le nom saisi directement.** Si vous remplissez le nom ou la date de naissance avant le numéro
   de dossier et qu'un sujet correspond, un bandeau propose de reprendre son dossier.

La recherche porte sur les fiches présentes dans la base locale de ce poste. Un sujet examiné
ailleurs n'apparaît qu'après fusion du fichier de données.

---

## Reprise automatique d'un dossier connu

Dès que vous saisissez un **numéro de dossier déjà enregistré** :

- nom, prénom, sexe, date de naissance, date et heure de l'accident se remplissent seuls ;
- un bandeau rappelle la date de l'examen précédent ;
- sur chaque champ encore vide, la valeur de cet examen apparaît **en grisé**. Un clic la reprend.
  Pour les champs texte, un petit bouton `↩` fait la même chose ;
- le bouton **Reprendre tout l'examen précédent** remplit d'un coup tous les champs vides, schémas
  corporels et reliefs osseux compris. Les valeurs déjà saisies ne sont jamais écrasées.

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
résidu mictionnel.

Chaque fiche donne la manœuvre, le résultat normal, ce qui compte comme pathologique et les pièges
courants. Quatre d'entre elles portent un schéma au trait.

### Ajouter vos propres photos et vidéos

Dans une fiche technique, le champ en bas accepte une image ou une vidéo. Le fichier est stocké
dans la base locale du navigateur de ce poste. Il n'entre **ni dans le PDF, ni dans le fichier de
données, ni dans les sauvegardes de fiches**.

Le menu **Aides à l'examen** liste toutes les fiches et le nombre de médias attachés, et permet
d'exporter la médiathèque en un seul fichier JSON pour la copier sur un autre poste.

Une réserve sur le contenu : une vidéo d'un signe positif filmée sur un patient est une donnée de
santé identifiante. Filmez un volontaire, ou floutez, ou recueillez un consentement écrit et
conservez-le. L'outil ne gère pas ce consentement à votre place.

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

1. Copiez `fiche_neuro.html` sur la tablette, ouvrez-le. Il fonctionne hors ligne.
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
- `dictionnaire_variables.csv` donne le libellé et le codage des 677 colonnes.

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

Pour les analyses courantes, les colonnes de synthèse suffisent. Les colonnes de détail servent
aux analyses topographiques fines.

---

## Changements de la version 7.1.0

L'outil change de nom : **ADP**, pour accident de plongée. Il ne se limite plus à l'examen
neurologique, il porte le dossier entier.

- **Trois types de consultation** : initiale, suivi, sortie. Le type décide des encarts affichés
  et du document imprimé. Voir *Trois types de consultation*.
- **Quatre pages de saisie** avec un bouton **Suivant**, des onglets et un compte de remplissage
  par page. Voir *Les quatre pages de saisie*.
- **Sept encarts nouveaux**, transcrits de la fiche A3 du service : mode d'entrée et prise en
  charge initiale, le plongeur, les paramètres de la plongée, ceux de la plongée précédente, les
  facteurs favorisants, l'anamnèse, l'examen général par appareil.
- **Constantes et surveillance** : un relevé horodaté par ligne, agrégé dans le CSV.
- **Scores de sévérité** : MEDSUBHYP déduit des données déjà saisies, et un score vestibulaire
  dont vous composez la grille. Voir *Scores de sévérité*.
- **Calculs automatiques** : IMC, durée totale de plongée, délai sortie → symptômes, délai
  symptômes → prise en charge, intervalle de surface. Tous passent minuit correctement.
- **Paragraphe d'évolution** assemblé et copiable pour le compte rendu de sortie.
- Le fichier de données passe de 500 à **677 colonnes**. Les colonnes existantes n'ont pas changé
  de nom ni de codage : un CSV de la version 6.3 se fusionne sans retouche.
- Les deux faces du corps restent **côte à côte** sur les trois schémas — sensibilités, signes
  subjectifs, lésions cutanées — y compris sur un téléphone de 360 px.

### Ce qui n'est pas encore là

Le compte rendu de sortie reprend pour l'instant la mise en page de l'outil. **L'en-tête du
service, le bloc signature et les identifiants RPPS du générateur de courriers arrivent en
version 7.2.0.**

---

## Changements de la version 6.3

- **Correction : le bouton NC du Glasgow ne répondait pas.** La valeur texte `NC` était insérée
  dans le code de la page avec des guillemets qui refermaient l'attribut trop tôt. Le clic
  déclenchait une erreur au lieu d'enregistrer la cotation. Corrigé, et couvert par un test
  qui clique réellement sur le bouton au lieu d'appeler la fonction.
- **Correction : un clic perdu après une date incomplète.** Quitter un champ de date
  reconstruisait le formulaire, ce qui détachait le bouton que l'on venait de viser. Il fallait
  cliquer deux fois. Le formulaire ne se reconstruit plus au départ du champ.
- **Cutané plantaire** : la réponse indifférente est verte comme la flexion, et ne compte plus
  comme une anomalie. Seule l'extension est pathologique. La synthèse mentionne la réponse
  indifférente comme un fait d'examen, pas comme une anomalie.
- **Réflexe très vif** coté en rouge, comme un réflexe aboli.
- **Examen pupillaire** ajouté en tête des fonctions supérieures : symétrie, anisocorie avec la
  pupille la plus large, mydriase, myosis, réflexe photomoteur, chacun avec son côté. Fiche
  d'aide dédiée, reprise dans la synthèse et sur le PDF.
- **Encart du score ASIA replié au départ** : c'est un résultat, pas une saisie.
- **Sensibilités** : les boutons *Tout normal*, *Tout non testable* et *Effacer* sont désormais
  visibles sur le schéma comme sur le tableau.
- **Téléphone** : les deux faces du corps restent côte à côte. Une bande dorsale y fait environ
  7 pixels de haut : pour coter métamère par métamère sur un petit écran, passez par le tableau
  des 28 métamères, ou tournez le téléphone.
- **Titres de photos** : onze propositions (examen pupillaire, lésion cutanée, otoscopie droite,
  otoscopie gauche, paramètres de plongée, ordinateur de plongée, appareil respiratoire de
  plongée, fiche de prise en charge pré-hospitalière, ordonnance médicamenteuse, document du
  patient, autre). Le menu ne fait que remplir le champ : chaque titre se modifie ou se complète
  librement ensuite.

### Ce qui change dans le fichier de données

| Variable | Changement |
|---|---|
| `pup_sym`, `pup_aniso`, `pup_aniso_cote`, `pup_myd`, `pup_myd_cote`, `pup_myo`, `pup_myo_cote`, `pup_rpm`, `pup_rpm_cote` | nouvelles |

Le fichier passe de 491 à 500 colonnes. Un CSV de la version 6.2 se fusionne sans perte.

---

## Changements de la version 6.2

- **Glasgow : cotation NC.** Chacune des trois modalités accepte « non cotable » : œdème
  palpébral, intubation, aphasie connue. Le total n'est alors pas calculé, parce qu'un total
  amputé d'un item n'a pas de sens, mais les modalités cotées restent visibles, imprimées et
  exportées. La variable `gcs_nc` compte les modalités NC : un `gcs_tot` vide avec `gcs_nc`
  renseigné signifie score non calculable, et non score oublié.
- **Dates et heures au clavier.** Les champs acceptent la frappe directe en JJ/MM/AAAA et
  HH:MM, séparateurs posés tout seuls. Une date impossible passe en rouge et n'est pas
  enregistrée. Le bouton calendrier reste disponible à côté.
- **Pièces jointes photographiques.** Un encart en fin de fiche reçoit jusqu'à douze photos,
  chacune avec un titre choisi (examen cutané, otoscopie, lésion cutanée, schéma annoté,
  champ visuel, document remis, ou un titre libre). Elles s'impriment sur une page dédiée du
  PDF, deux par ligne, titre au-dessus.
- **Dépôt de fichiers retiré des fiches techniques.** Les images qui documentent un examen
  précis appartiennent à la fiche du sujet, pas à une notice générique.
- **Interprétation acoumétrique** recalculée dès qu'un item ORL change, avec un bouton
  **Actualiser** pour forcer le calcul.
- **Textes d'orientation revus** : services USIC, neurovasculaire, USC et réanimation ;
  avis réanimateur, cardiologique et ORL ; imagerie cérébrale, rachidienne et thoracique.
  Retrait de l'avis neurochirurgical, des consignes de surveillance et de la sortie contre
  avis médical. Les modes de transport sont conservés.
- **Fiches techniques revues** selon vos corrections : triangle lumineux dans la stadification
  otoscopique, Valsalva franchement retardé, trépidation épuisable chez le sujet hypothermique
  et à coter pathologique jusqu'à preuve du contraire, référence sensitive à la face externe
  du bras, piqûre au manche du marteau à réflexes, report vers le bas conditionné à la
  répétition de l'anomalie.

### Les photographies et le règlement

Une photographie de patient est une donnée de santé identifiante au sens de l'article 9 du
RGPD, même sans le visage. Elle est enregistrée **avec la fiche** : elle suit la base locale,
les sauvegardes JSON et le PDF. Elle n'entre **jamais** dans le fichier de données, qui ne
reçoit que `pj_nb` et `pj_titres`.

Trois conséquences pratiques :

1. Cadrez au plus juste. Une lésion cutanée se documente sans le visage et sans les signes
   distinctifs (tatouages, bijoux, cicatrices sans rapport).
2. Le consentement du sujet relève de vous. L'outil ne le recueille pas et ne le trace pas.
3. Une sauvegarde JSON contenant des photos est un fichier de santé identifiant : chiffrez le
   support, ne l'envoyez pas par messagerie ordinaire.

Les photos sont réduites à 1600 pixels sur le côté le plus long et ré-encodées en JPEG. Une
photo de téléphone de 4 Mo tombe à quelques centaines de kilooctets, ce qui reste net à
l'impression sans faire gonfler la base ni les sauvegardes.

### Ce qui change dans le fichier de données

| Variable | Changement |
|---|---|
| `gcs_y`, `gcs_v`, `gcs_m` | acceptent la valeur texte `NC` en plus des entiers |
| `gcs_nc` | nouvelle : nombre de modalités non cotables |
| `pj_nb`, `pj_titres` | nouvelles : nombre et titres des photographies jointes |

Le fichier passe de 488 à 491 colonnes. Un CSV de la version 6 se fusionne sans perte.
**Les photographies ne transitent pas par le CSV** : un import CSV ne les restaure pas.
Pour déplacer des fiches avec leurs photos entre deux postes, utilisez l'export JSON.

---

## Changements de la version 6

- **Recherche d'un sujet** par numéro de dossier, nom, prénom ou date de naissance, avec reprise
  automatique de l'identité et des données de l'accident. Si vous tapez un nom déjà connu sans
  numéro de dossier, l'outil propose le dossier correspondant.
- **Otoscopie** recodée selon Haines et Harris modifiée par Rui et Flottes, cinq stades.
- **Interprétation automatique du couple Weber / Rinne** : transmission, perception, atteinte
  bilatérale, ou signalement d'une discordance entre les deux tests. Affichée dans l'encart ORL,
  imprimée et versée au fichier de données.
- **Aides à l'examen** : un bouton **?** à côté des items techniques ouvre la manœuvre, le résultat
  normal, ce qui compte comme pathologique et les pièges. Seize fiches, avec des schémas au trait
  pour le Weber, le Rinne, le Hoffmann et le Babinski.
- **Vos propres photos et vidéos** peuvent être attachées à chaque fiche technique. Elles restent
  sur le poste, dans la base locale, et n'entrent ni dans le PDF ni dans le fichier de données.
  Le menu **Aides à l'examen** permet d'exporter la médiathèque pour la copier sur un autre poste.
- **Force motrice par membre** : on demande d'abord s'il existe un déficit, membre par membre.
  Une réponse NON cote les cinq myotomes clés à 5 et referme le détail, qui reste ouvrable pour
  corriger un item isolé. Même principe pour le sphincter anal. Un membre déclaré déficitaire
  mais coté sans déficit déclenche un avertissement.
- **Motricité globale** (paralysie faciale, Barré, Mingazzini) déplacée en tête de l'encart force :
  c'est le dépistage qui passe avant le testing segmentaire.
- **Sensibilités sur silhouette métamérique** : les métamères sont dessinés sur les figures
  antérieure et postérieure. Remplissage par zone anatomique ou métamère par métamère, avec une
  cotation clinique (normale, hypoesthésie, hyperesthésie, anesthésie, non testable) qui alimente
  directement le score ASIA.
- **Page 2 du PDF** : la grille ASIA est complétée par les deux cartes en couleur, tact léger et
  piqûre, lisibles d'un coup d'œil là où une grille de 112 cases demande un déchiffrage.
- **Nouvelle icône** : casque de plongée au trait, dessin original.

### Ce qui change dans le fichier de données

| Variable | Changement |
|---|---|
| `oto_D`, `oto_G` | échelle Teed 0-4 remplacée par Haines et Harris 0-5. **Les anciennes valeurs ne se traduisent pas automatiquement** : un `3` voulait dire hémorragie intratympanique, il veut maintenant dire épanchement séreux. Si vous aviez déjà des fiches, reprenez ces deux colonnes à la main. |
| `sens_lt_*`, `sens_pp_*` | le code `3` (hyperesthésie) s'ajoute. Les codes 0, 1, 2 et 9 gardent leur sens. |
| `orl_interp`, `orl_interp_txt` | nouvelles, déduites du Weber et du Rinne. |
| `def_msd`, `def_msg`, `def_mid`, `def_mig`, `def_sph` | nouvelles. |

Le fichier passe de 481 à 488 colonnes. Un CSV de la version 5 se fusionne sans perte :
les colonnes absentes sortent vides.

---

## Changements de la version 5

- **Encart ORL** : otoscopie cotée selon Teed, épanchement rétrotympanique, perméabilité tubaire
  par manœuvre de Valsalva, tests de Weber et de Rinne.
- **Lésions cutanées de désaturation** : schéma corporel dédié, six types, six motifs à l'impression.
- **Sensibilités par métamère** : le zonage anatomique laisse place aux 28 métamères de la norme
  ISNCSCI, tact léger et piqûre, droite et gauche, avec report d'une ligne vers tous les niveaux
  inférieurs.
- **Force motrice par myotome clé** : les 10 myotomes de la norme remplacent les cinq groupes
  musculaires de la version 4. Contraction anale volontaire et pression anale profonde ajoutées.
- **Score ASIA calculé** : totaux, niveaux sensitifs et moteurs, NLI, préservation sacrée, grade
  AIS. Calcul indicatif, à vérifier sur la grille officielle.
- **Page 2 du PDF** : grille ASIA complète, présentable telle quelle en réunion ou en transfert.
- **Saisie sur téléphone** : barre de navigation basse par section, menu compact, tableaux
  redimensionnés. Vérifié de 360 à 1500 pixels de large, sans débordement horizontal.
- **Installation hors ligne** : manifeste, service worker, icônes. L'outil s'installe comme une
  application sur Android, iOS, Windows et macOS.
- **Projet natif** : enveloppe Capacitor pour Android et iOS, avec plugin d'impression et
  ressources graphiques prêtes.

### Correspondance des colonnes depuis la version 4

| Version 4 | Version 5 |
|---|---|
| `f_biceps_D`, `f_biceps_G` | `f_c5_D`, `f_c5_G` |
| `f_quadri_D`, `f_quadri_G` | `f_l3_D`, `f_l3_G` |
| `f_releveur_D`, `f_releveur_G` | `f_l4_D`, `f_l4_G` |
| `sens_epi_*`, `sens_tha_*` (zones) | sans équivalent, ignorées à l'import |

**Importer / Fusionner** fait la conversion de la force motrice automatiquement. L'ancien zonage
sensitif n'a pas d'équivalent métamérique fiable : traduire une « face externe de cuisse » en L2
ou L3 serait une invention. Ces colonnes sont ignorées, vos anciennes fiches gardent tout le reste.

---

## Changements de la version 4

- Prise en charge des douchettes code-barres, avec capture globale et règle d'extraction.
- Pseudonymisation par empreinte salée SHA-256 de l'identifiant scanné, sel conservé hors des exports.
- Nouvelle colonne `dossier_pseudo`.

---

## Changements de la version 3

- Correction du champ **N° de dossier** : la saisie était interrompue après la première lettre.
  Le formulaire ne se reconstruit plus à chaque frappe, et le curseur reste où vous l'avez laissé.
- Position du regard en choix multiple, pour le nystagmus, la VNS et le NIV.
- Report d'un réflexe et de ses qualités vers un ou plusieurs autres réflexes.
- Caractère de la trépidation coté séparément à droite et à gauche.
- Pallesthésie : les trois cotations sont proposées directement sur chaque relief, sans mode préalable.
- Texte libre complémentaire dans l'encart orientation.

Les colonnes `trep_pied_qual` et `trep_rot_qual` de la version 2 deviennent `trep_pied_qual_D`,
`trep_pied_qual_G`, `trep_rot_qual_D`, `trep_rot_qual_G`. `nys_regard` passe de code numérique à
liste de positions. Une fiche v2 réimportée conserve tout le reste ; ces quatre variables sont à
ressaisir si vous aviez déjà des données.

---

## Compatibilité avec la version 1

Les noms de colonnes des sensibilités ont changé : `sens_eff_*` devient `sens_epi_*` et
`sens_dou_*` devient `sens_tha_*`. **Importer / Fusionner** fait la conversion automatiquement,
y compris depuis un CSV de la version 1.

L'ancien zonage vibratoire (`sens_vib_*`) n'a pas d'équivalent : la pallesthésie se cote désormais
sur des reliefs osseux. Ces colonnes sont ignorées à l'import.

La cotation des zones est passée de binaire (`1 = hypo-sensible`) à trois états. Une donnée v1
importée devient donc `1 = hypoesthésie`, ce qui est cohérent.

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
