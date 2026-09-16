# Fiche d'examen neurologique standardisé — version 5

Fichier unique : `fiche_neuro.html`. Aucun réseau, aucune dépendance externe, aucun compte.
Double-cliquez dessus, il s'ouvre dans votre navigateur et tout fonctionne.

Sur téléphone et tablette, installez-le plutôt comme application : icône sur l'écran d'accueil,
plein écran, démarrage sans réseau. Voir *Installer sur téléphone et tablette* plus bas.

---

## Les deux sorties

| Sortie | Fichier | Comment l'obtenir |
|---|---|---|
| Fiche imprimable et enregistrable | PDF, 3 pages A4 | Bouton **PDF / Imprimer**, puis *Enregistrer au format PDF* ou *Microsoft Print to PDF* |
| Fichier exploitable, incrémental | `donnees_neuro.csv` | Réécrit automatiquement à chaque enregistrement de fiche |

Un seul CSV pour tous les sujets et tous les examens. Une ligne = une fiche. 481 colonnes.

Les trois pages du PDF : examen clinique et ORL, grille ASIA complète, schémas corporels et
conclusion.

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

| Bouton | Valeur | Sens |
|---|---|---|
| **2** | 2 | normale |
| **1** | 1 | altérée (hypo ou hyper) |
| **0** | 0 | absente |
| **NT** | 9 | non testable |

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

- **otoscopie** selon la classification de Teed : `0 = normal`, `1` congestion du manche du marteau,
  `2` congestion diffuse du tympan, `3` hémorragie intratympanique, `4` perforation ;
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
- `dictionnaire_variables.csv` donne le libellé et le codage des 481 colonnes.

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
| Métamères (ISNCSCI) | `2 = normal`, `1 = altéré`, `0 = absent`, `9 = non testable`. Attention : ici `0` est le maximum de gravité |
| Lésions cutanées | `1 = marbrures`, `2 = érythème`, `3 = œdème`, `4 = prurit`, `5 = emphysème`, `6 = purpura`, `0 = aucune` |
| Otoscopie | Teed `0` à `4` ; `valsalva_*` : `2 = perméable`, `1 = difficile`, `0 = impossible` |
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
