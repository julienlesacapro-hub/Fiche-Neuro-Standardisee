# ADP — accident de plongée, version 8.2.0

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
Une ligne = une fiche. 929 colonnes.

Sans bouton de plus, chaque enregistrement écrit aussi la fiche entière au format **JSON** dans le
dossier de données (un fichier par fiche), et chaque ouverture relit ce dossier pour la recherche d'un
sujet : voir *Mise en place, une seule fois*.

Sur une consultation de sortie, la fiche propose aussi le **compte rendu d'hospitalisation** : un texte enrichi
à copier, sans en-tête, écrit à partir de toutes les fiches du dossier (voir *Le compte rendu d'hospitalisation*).

Pour emporter **toutes les fiches en JSON d'un coup**, **Exporter** › **Exporter tout en JSON** les écrit
une par fichier dans un dossier de votre choix (Téléchargements par défaut), ou les réunit dans une
archive ZIP : voir *Exporter tout en JSON*.

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
2. Cliquez **Enregistrer** sur votre première fiche : l'outil vous demande un dossier de votre
   disque. Choisissez-le et autorisez l'écriture. On peut aussi le choisir à l'avance avec le bouton
   **Dossier de données**.

Le dossier n'est ensuite **jamais redemandé** : le navigateur le mémorise. À chaque enregistrement,
l'outil y écrit :

- `fiches/xxx-aaaa_bbbbbbbb-EXc.json` — la fiche entière, **un fichier par fiche**, par exemple
  `fiches/187-2026_50987654-EX1.json` : numéro d'accident, année de prise en charge, numéro de dossier, numéro
  d'examen (voir *Le nom des fichiers JSON*). Le nom ne porte ni nom, ni prénom, ni date de naissance ; le
  contenu reprend l'enveloppe de la sauvegarde JSON, avec un bloc `resume` (dossier, nom, prénom, naissance,
  dates) pour l'œil ;
- `donnees_neuro.csv` — vos données, toutes fiches confondues ;
- `dictionnaire_variables.csv` — le codage de chaque colonne.

Choisissez un **sous-dossier dédié** (par exemple `ADP-fiches`) : Chrome et Edge refusent Documents,
Téléchargements et les dossiers système.

### À l'ouverture : la recherche lit le dossier

À chaque **ouverture**, l'outil relit ce dossier. Les fiches qu'il contient et que ce poste ne connaît
pas encore rejoignent la base locale : la recherche par nom, prénom, date de naissance, numéro de
dossier ou d'accident les retrouve, **y compris celles enregistrées sur un autre poste** qui partage
le même dossier. Une fiche n'est remplacée que par une version **plus récente** ; un fichier déjà lu
et inchangé n'est pas relu. Le premier chargement d'un gros dossier peut prendre quelques secondes,
la barre du haut indique l'avancement.

À l'inverse, une fiche de ce poste qui manque au dossier (enregistrée avant son choix, ou quand il
n'était pas accessible) y est écrite à la connexion suivante : le dossier rejoint toujours l'état de
la base locale.

### Une autorisation par session, pas un nouveau choix

Chrome et Edge peuvent redemander, à l'ouverture, l'**autorisation** d'accéder au dossier. Ce n'est
pas un nouveau choix de dossier. Un bandeau le signale ; le premier clic dans la page, le bouton
**Autoriser**, ou **Enregistrer** ouvre la demande du navigateur. Choisissez **« Autoriser à chaque
visite »** pour qu'elle ne revienne plus. Si l'autorisation est refusée ou le dossier introuvable,
rien n'est perdu : la fiche est enregistrée dans le navigateur, et les fichiers se mettent à jour à
la prochaine connexion.

### Un dossier de recherche distinct (facultatif)

Par défaut, la recherche lit le dossier où l'outil écrit (« le même », réglage par défaut). Le
bouton **Dossier de données** permet de désigner un **autre** dossier, par exemple un dossier partagé
par le service. Il n'est que **lu** : l'outil n'y écrit jamais. Le dossier d'enregistrement reste lu
aussi.

### Les autres actions de la fenêtre « Dossier de données »

- **Relire le dossier maintenant** : relit sans attendre la prochaine ouverture.
- **Réécrire tout le dossier** : relit, puis réécrit **toutes** les fiches, le CSV et le dictionnaire.
- **Ne plus l'utiliser** : oublie le dossier mémorisé, sans rien effacer sur le disque.

### Supprimer une fiche

Supprimer une fiche dans l'outil **n'efface rien sur le disque** : son fichier est déplacé dans
`fiches/supprimees`, avec une copie complète (nom habituel suivi de `~` et de l'identifiant de la fiche). La
suppression est mémorisée : une relecture du dossier ne la ressuscite pas, sauf si la fiche a été modifiée depuis,
ou si vous la réimportez à la main. Les autres examens du dossier changent de rang, et leurs fichiers de nom.
Pour retirer vraiment une fiche du dossier, videz `fiches/supprimees` à la main.

### Fichiers lus

Sont lus : tous les `.json` du sous-dossier `fiches`, quel que soit leur nom, et à la racine les
`sauvegarde_neuro*.json`, les `fiche_*.json` et les fichiers au nom `xxx-aaaa_bbbbbbbb-EXc.json` (les sauvegardes
agrégées des versions précédentes ou une exportation déposée là, par exemple). Un fichier illisible
est compté et ignoré. Les dates, heures et nombres d'une fiche lue sont contrôlés avant son
enregistrement.

### Quand le navigateur ne propose pas de dossier

Le choix d'un dossier repose sur une fonction de **Chrome et d'Edge pour ordinateur** (API File System
Access). Firefox, Safari, les navigateurs de téléphone et de tablette ne l'ont pas, et certains réglages la
retirent : mode protégé du navigateur, extension, stratégie de l'établissement, page ouverte en HTTP ou
dans un cadre d'une autre page. Le bouton **Dossier de données** ne s'arrête plus sur une erreur sans
issue : il dit **pourquoi**, affiche un **diagnostic du navigateur** (copiable), et propose ce qui reste
possible :

- **Exporter tout en JSON** dans une archive ZIP (voir plus bas) ;
- **Télécharger le JSON de la fiche à chaque enregistrement** : une case à cocher. Le fichier
  `xxx-aaaa_bbbbbbbb-EXc.json` (par exemple `187-2026_50987654-EX1.json`) part alors dans le dossier de
  téléchargement du navigateur. Pour le fixer une fois pour toutes, réglez le navigateur (Paramètres ›
  Téléchargements › Emplacement) et désactivez *Demander où enregistrer chaque fichier avant de le télécharger*.
  Le navigateur numérote les copies d'une même fiche (`187-2026_50987654-EX1.json`, puis
  `187-2026_50987654-EX1 (1).json`) : à l'import, la version la plus récente l'emporte ;
- **Importer / Fusionner** un fichier, une archive ZIP ou un dossier entier.

Si Windows ouvre `index.html` dans un autre navigateur que Chrome ou Edge, faites un clic droit sur
`index.html`, **Ouvrir avec**, puis choisissez Edge ou Chrome. Le diagnostic donne le nom du navigateur
utilisé.

Si le navigateur offre le choix d'un dossier mais **refuse** celui que vous avez désigné (dossier système,
Documents ou Téléchargements eux-mêmes, accès bloqué), l'erreur est expliquée avec un bouton **Réessayer** :
choisissez alors un **sous-dossier dédié**.

---

## Exporter tout en JSON

**Exporter** › **Exporter tout en JSON** (ou, sur téléphone, le menu) écrit **toutes les fiches** de ce
poste au format JSON, **une fiche par fichier** nommé `xxx-aaaa_bbbbbbbb-EXc.json` (numéro d'accident, année
de prise en charge, numéro de dossier, numéro d'examen : `187-2026_50987654-EX1.json`, voir *Le nom des
fichiers JSON*), le format du dossier de données. Deux façons de le faire :

- **Dans un dossier de votre choix** (Chrome, Edge sur ordinateur). Le sélecteur s'ouvre sur
  **Téléchargements**. Chrome et Edge refusent que Téléchargements lui-même soit choisi : créez-y un
  sous-dossier (bouton *Nouveau dossier* du sélecteur), par exemple `ADP-JSON`, puis validez. Les fiches sont
  écrites **directement** dans ce dossier. Ce qui s'y trouve déjà n'est jamais supprimé, et un nouvel export
  met à jour les mêmes fichiers sans créer de doublon. Chaque fichier écrit est contrôlé (taille) et l'écran
  donne le nombre de fiches écrites, ou la raison de l'échec.
- **Dans une archive ZIP** (tous les navigateurs). Un seul fichier, `fiches_neuro_AAAA-MM-JJ.zip`, proposé dans
  **Téléchargements** ; selon le navigateur, vous pouvez choisir un autre emplacement, sinon il est enregistré
  directement dans son dossier de téléchargement. L'archive contient les mêmes fichiers, se décompresse avec
  l'Explorateur de fichiers et se réimporte telle quelle.

Pour reprendre ces fichiers sur un autre poste : **Importer / Fusionner** accepte un fichier `.json`, plusieurs
fichiers à la fois, une archive `.zip`, ou un **dossier entier** (tous les `.json` qu'il contient,
sous-dossiers compris ; le sous-dossier `supprimees` et les `.csv` sont ignorés). La fusion se fait sur
l'identifiant de fiche : une fiche n'est remplacée que par une version plus récente.

**Données de santé.** Chaque fichier contient l'identité du sujet et ses pièces jointes, sans protection :
gardez-les sur un support chiffré ou à accès restreint, et supprimez-les de Téléchargements une fois copiés.

---

## Le nom des fichiers JSON

Chaque fiche exportée en JSON, que ce soit dans le dossier de données, par **Exporter tout en JSON** (dossier choisi ou
archive ZIP) ou par le téléchargement à chaque enregistrement, porte un nom de la forme :

```
xxx-aaaa_bbbbbbbb-EXc.json        par exemple :  187-2026_50987654-EX1.json
```

| Élément | Signification | Règle |
|---|---|---|
| `xxx` | numéro d'accident | Au moins **trois chiffres** : le 1er de l'année donne `001`, le 187e `187`. Il est lu dans « Accident de plongée n° » de la **fiche initiale du dossier** (à défaut, dans un autre examen du dossier) ; seuls les chiffres comptent (`AD 12` donne `012`). Numéro absent : `000`. |
| `aaaa` | année de la prise en charge | Année du **premier examen du dossier**, la date d'« Entrée » du bandeau. Sans date d'examen : date d'arrivée, puis date de l'accident ; sinon `0000`. |
| `bbbbbbbb` | numéro de dossier | Le numéro saisi, **nettoyé** pour un nom de fichier : espaces retirés, accents supprimés, tout autre signe remplacé par `-`, 40 caractères au plus. Un numéro pseudonymisé (`P-…`) reste tel quel. Dossier absent : `sans-dossier`. |
| `c` | numéro d'examen | Le rang de la fiche dans le dossier, le même que « Examen n° » du bandeau : `EX1` pour le premier examen. |

Tous les fichiers d'un dossier portent ainsi le même accident, la même année et le même dossier, et se rangent par
examen dans l'Explorateur de fichiers. Le nom ne contient **ni nom, ni prénom, ni date de naissance**, mais il contient
le **numéro de dossier** et le numéro d'accident : voir *Données personnelles*.

**Deux fiches ne partagent jamais un fichier.** Quand le nom voulu est déjà pris par une autre fiche (deux numéros de
dossier qui ne diffèrent que par des espaces ou la casse, un fichier venu d'ailleurs, un fichier illisible), la fiche prend
le même nom suivi de `_` et de son identifiant : `187-2026_50987654-EX1_FMUV3SC519OI4.json`. Le fichier de l'autre fiche
n'est jamais écrasé. Dans un export (dossier ou ZIP), la même règle évite deux fichiers de même nom, majuscules et
minuscules étant confondues comme sous Windows. Un fichier de même nom déjà présent dans le dossier d'un export est remplacé.

**Dans le dossier de données, le nom suit la fiche.** Le numéro d'examen faisant partie du nom, il change quand les
examens du dossier changent de rang : un examen supprimé, un examen daté avant un autre, un examen plus ancien importé.
Il change aussi quand on corrige le numéro d'accident de la fiche initiale ou le numéro de dossier. À l'enregistrement,
l'outil **renomme** alors les fichiers concernés : chacun est écrit sous son nouveau nom (il contient la fiche entière), puis
l'ancien est retiré, sauf s'il a été modifié depuis la dernière lecture ou s'il porte une version plus récente (il est alors
gardé, et relu à l'ouverture suivante). Rien n'est perdu : deux examens qui échangent leurs rangs échangent leurs noms. Seuls
les fichiers qui contiennent **une seule fiche** sont renommés ; une sauvegarde agrégée n'est jamais touchée.

**Les fichiers des versions précédentes** (`fiches/fiche_<identifiant>.json`) restent lus. Ils ne sont pas renommés d'office
à l'ouverture : chacun l'est quand sa fiche est enregistrée, avec les autres examens du même dossier. **Réécrire tout le
dossier** (fenêtre *Dossier de données*, qui compte les fichiers encore à l'ancien nom) les renomme tous d'un coup.

**Dans `fiches/supprimees`**, le fichier d'une fiche supprimée porte son nom habituel suivi de `~` et de son identifiant
(`187-2026_50987654-EX1~FMUV3SC519OI4.json`) : deux fiches supprimées l'une après l'autre avec le même numéro d'examen ne
s'écrasent jamais.

**À l'import**, seul le contenu compte : n'importe quel nom de fichier convient. Utilisez la **même version** d'ADP sur tous
les postes qui partagent un dossier : une version antérieure ne lit pas les noms de la corbeille et ne renomme rien.

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

Sur iPhone et iPad, l'écriture directe dans un dossier n'existe pas : Safari n'implémente pas cette API.
Exportez à la main (**Exporter tout en JSON**, ou le téléchargement du JSON de chaque fiche à
l'enregistrement), puis fusionnez sur le poste principal.

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

## Les six onglets de saisie

La fiche est découpée en six onglets, dans l'ordre réel de la consultation. Les onglets en haut mènent
directement à l'un d'eux, le bouton **Suivant** du bas de page avance d'un onglet, **Précédent** recule. Le bandeau
patient porte aussi, à droite, un bouton **Suivant** qui nomme l'onglet à venir (Anamnèse, Examen, Neuro,
Examens compl., Conclusion) et y mène sans descendre en bas de page. Chaque onglet porte son compte de champs remplis, et se borde
de vert quand il est complet.

| Onglet | Contenu |
|---|---|
| 1. Administratif | Identification, mode d'entrée et prise en charge initiale (arrivée, médecin, adressé par, alerte, évacuation, soins sur place), **identité complémentaire** (nationalité, profession, adresse, téléphone, e-mail), contacts |
| 2. Anamnèse et plongée | Le plongeur (poids, taille et IMC, antécédents, habitudes toxiques, traitement, niveaux de plongée, avec photo de l'ordonnance), plongée (profil, apnée, durées, paliers, procédure de ré-immersion), plongée précédente, facteurs favorisants et conditions environnementales, anamnèse |
| 3. Examen clinique général | Constantes et surveillance, examen par appareil, conscience, pupilles et fonctions supérieures, ORL, signes fonctionnels, signes subjectifs, lésions cutanées |
| 4. Examen neurologique | Réflexes, force motrice, miction, coordination et examen vestibulaire, sensibilités, grille ASIA, scores de sévérité, conclusion de l'examen clinique |
| 5. Examens complémentaires | **Gaz du sang veineux** et **biologie** (horodatés, avec leurs valeurs normales), examens complémentaires (ECG, radiographie et scanners, IRM, échographie cardiaque, doppler transcrânien, autres examens, examens demandés), échographie pleuro-pulmonaire |
| 6. Conclusion et évolution | Recompression, actes, traitements prescrits, évolution (suivi et sortie), diagnostic retenu, sortie (consultation de sortie), orientation et commentaires, compte rendu d'hospitalisation (consultation de sortie), pièces jointes |

Sur une **consultation de suivi ou de sortie**, l'onglet « Anamnèse et plongée » n'a plus rien à montrer (la
plongée reste sur la fiche initiale) : il disparaît, et les onglets se renumérotent.

La synthèse rédigée reste visible en permanence, sous la fiche, quel que soit l'onglet.

### Le bandeau patient

Sous la barre d'outils, un **bandeau reste affiché en permanence**, quel que soit l'onglet et le défilement :
**nom, prénom, date de naissance (avec l'âge), numéro d'accident de plongée, numéro de dossier, numéro de
l'examen, date d'entrée et dernier diagnostic retenu**. À droite, le type de consultation et le bouton **Suivant** (voir
plus haut) : il porte le nom court de l'onglet suivant, ne s'affiche pas sur le dernier onglet, et propose *Examen* sur une
consultation de suivi ou de sortie, qui n'a pas d'onglet Anamnèse.

- La **date d'entrée** est celle du **premier examen du dossier** (la fiche la plus ancienne).
- Le **dernier diagnostic retenu** est celui de la fiche la plus récente du dossier qui en porte un, fiche ouverte
  comprise, écrit comme dans la synthèse (« Accident de désaturation (médullaire et vestibulaire) ») sans l'indication
  du diagnostic principal ; le texte complet est dans l'infobulle quand il est coupé.

Il suit la saisie ; une valeur absente s'affiche « — ». Un clic sur le bandeau ramène à l'onglet Administratif.
Sur téléphone, il passe sur plusieurs lignes. Il ne s'imprime pas.

### Le nombre total de plongées

L'encart « Le plongeur » (onglet « Anamnèse et plongée ») demande le **nombre total de plongées réalisées** (carnet de plongée), avec le nombre
moyen par an. Les deux figurent dans la synthèse (« 1200 plongées au total ; 80 par an en moyenne ») et dans le
CSV (`nb_plongees_total`).

---

## Le profil de plongée et les durées

L'encart « Paramètres de la plongée accidentelle » (onglet « Anamnèse et plongée ») décrit la plongée : heures, profondeur,
paliers, type de profil et, le cas échéant, la procédure de ré-immersion. Le schéma se dessine seul,
se redessine à chaque frappe et s'imprime en noir et blanc sur la page 1 du PDF.

### Heures, profondeur et paliers

- **DS** départ surface (heure d'immersion), **DF** départ fond (heure), **HS** heure de sortie de
  l'eau, **Pmax** profondeur maximale atteinte.
- **Paliers** : une ligne par palier, avec le gaz, la profondeur et la durée à la profondeur. La case
  *paliers de sécurité réalisés (non obligatoires)* propose 1 min à 6 m et 5 min à 3 m, modifiables.

### Les cinq types de profil

Un bouton à vignette choisit le type. **La remontée progressive est proposée d'office** sur une consultation
initiale, et c'est elle qui est dessinée quand aucun type n'est choisi (c'était le profil carré dans la 7.4.0). Le
titre du type est inscrit sur le schéma.

| Type | Ce que dessine le schéma | Données propres au type |
|---|---|---|
| **Carré** | descente, séjour au fond, remontée | aucune |
| **Inversé** | plus profond en fin de plongée : un premier plateau moins profond, puis le passage à Pmax | profondeur de la 1re phase ; heure d'arrivée à Pmax (facultative : sans elle, le passage est dessiné aux deux tiers du séjour au fond) |
| **Yoyo** | remontées et réimmersions répétées | nombre de remontées, amplitude, remontées jusqu'à la surface ou non, intervalle de surface le plus long |
| **Remontée progressive** | descente à Pmax, **plateau à Pmax**, puis remontée lente et ondulée **pendant DT**, jusqu'au départ du fond (DF) ; la remontée finale (DTR) part ensuite de cette profondeur | **durée à la profondeur maximale** (`pl_dpmax`, en minutes, comptée dans DT ; sans valeur, une minute ou deux sont dessinées, et au plus 80 % de DT) ; profondeur au départ du fond ; sans valeur, 40 % de Pmax est dessiné (au moins 3 m au-dessus du premier palier) |
| **Apnée** | pas de schéma : l'apnée se décrit par ses paramètres (voir ci-dessous) | nombre d'apnées, intervalle de surface, décompression éventuelle |

Une plongée à **yoyo** se définit par des remontées et des réimmersions d'**au moins 10 m** de
variation de profondeur ; si elles atteignent la surface, l'**intervalle de surface** doit être
**inférieur ou égal à 15 minutes**. Une alerte signale le cas contraire, ainsi que l'absence de coche
sur le facteur favorisant « Plongées ludion (yo-yo) ». Le CSV porte une colonne calculée
`pl_yoyo_crit`.

### L'apnée

Le type de profil **Apnée** change les paramètres demandés. Il se choisit de deux façons équivalentes : le bouton
« Apnée » du **type de profil**, ou « Apnée » du **type de plongée** (les deux boutons se suivent : choisir l'un
choisit l'autre, et en sortir en sort aussi ; un type de plongée de contexte, loisir, instruction, professionnelle ou
militaire, n'est jamais écrasé par le choix du profil).

| Paramètre | Champ |
|---|---|
| Profondeur maximale des apnées | `pl_prof` (Pmax : le champ s'intitule alors « Profondeur maximale des apnées (m) ») |
| Nombre d'apnées | `ap_nb` |
| Intervalle de surface entre les apnées (min) | `ap_interval` |
| Décompression après les apnées | `ap_decomp` : `0` aucune, `1` par réimmersion, `2` en surface |
| Par réimmersion | `ap_rim_int` (intervalle après la dernière apnée, min), `ap_rim_duree` (min), `ap_rim_prof` (m), `ap_rim_gaz` (type de gaz) |
| En surface | `ap_surf_int` (intervalle, min), `ap_surf_duree` (min), `ap_surf_gaz` (gaz respiré) |

L'heure d'immersion (DS), l'heure de sortie de l'eau (HS) et la durée totale (DTP) restent disponibles : HS sert au
délai « sortie de l'eau → premiers symptômes ». **Sont masqués**, et leurs valeurs retirées, le mélange respiré, la
procédure de décompression, DF, DT, DTR, les paliers et la procédure de ré-immersion, qui ne s'appliquent pas à
une apnée. Revenir à un autre type de profil les rend visibles, mais ne les rétablit pas. La synthèse écrit « Plongée en
apnée … 12 apnées, intervalle de surface 2 min, décompression par réimmersion (intervalle 10 min, durée 15 min,
profondeur 6 m, oxygène) » ; le papier imprime une ligne « Apnées » à la place du schéma.

### DT, DTR et DTP : les heures ou les durées

Les relations : **DT = DF − DS**, **DTR = HS − DF**, **DTP = HS − DS = DT + DTR**. Les heures ne sont
pas obligatoires : la DTR et la DTP sont des champs ordinaires, proposés d'après les heures, que l'on
peut aussi **saisir directement**. Une valeur saisie n'est jamais recalculée.

| Ce que vous renseignez | Ce que l'outil en tire |
|---|---|
| DS, DF et HS | DT, DTR et DTP |
| DTR et DTP | DT = DTP − DTR |
| DTP seule (avec Pmax et les paliers) | DTR **estimée** d'après le modèle ci-dessous, puis DT = DTP − DTR ; le schéma écrit « (estimée) » |
| DTR seule | DT inconnue : le schéma dessine un séjour au fond de durée nominale |

La colonne `pl_dtr_src` du CSV dit d'où vient la DTR : `1` d'après les heures, `2` saisie, `3`
estimée, `4` déduite de DTP − DT.

### Les heures qui manquent se complètent seules

Dans l'autre sens, **DS, DF et HS se déduisent** quand les autres données suffisent. L'outil part de
ce qui a été **saisi à la main**, heures et durées, et applique les relations ci-dessus :

| Vous avez saisi | L'outil propose |
|---|---|
| HS et DTP | DS = HS − DTP |
| DS et DTP | HS = DS + DTP |
| HS et DTR | DF = HS − DTR |
| DF et DTR | HS = DF + DTR |
| DS, DTP et DTR | DF = DS + (DTP − DTR) |
| DF, DTP et DTR | DS = DF − (DTP − DTR) |

Les déductions se combinent (HS, DTR et DTP donnent DS et DF) et passent minuit (HS à 00:10 et DTP de
30 min donnent DS à 23:40). Les heures proposées se retrouvent dans le schéma, la synthèse, le PDF et
le CSV.

Elles restent **modifiables** : une heure ou une durée saisie à la main n'est jamais remplacée, même
quand une autre donnée la contredit (une alerte sous le schéma le signale). Une proposition ne repose
que sur des valeurs saisies, jamais sur une autre proposition : une heure déduite de la DTP ne
« confirme » donc pas cette DTP. La **DTR estimée** d'après la profondeur et les paliers n'est qu'une
estimation, elle ne sert pas à déduire une heure.

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

## Facteurs favorisants et conditions environnementales

L'encart « Facteurs favorisants » (onglet « Anamnèse et plongée ») garde ses dix questions OUI / NON. Sous elles, un
bloc **Conditions environnementales** cote à chaque plongée :

- le **courant** : OUI ou NON (`ff_courant`) ;
- la **houle de surface** : OUI ou NON (`ff_houle`) ;
- la **visibilité** : bonne, mauvaise ou inférieure à 1 m (`ff_visib`, codes `1`, `2`, `3`) ;
- un **texte libre** de précisions (`ff_env`), avec quelques phrases à cliquer, qui complète.

La synthèse les écrit dans une phrase à part (« Conditions environnementales : courant, pas de houle de surface,
mauvaise visibilité, mer agitée. »). Ces quatre éléments **ne sont pas des facteurs favorisants** : ils n'entrent ni
dans la phrase « Facteurs favorisants », ni dans la règle « pas de facteur favorisant retrouvé », et « Tout normal »
n'y touche pas. Sur le papier, ils s'impriment avec les facteurs favorisants.

---

## Prise en charge : recompression, actes, examens, traitements, diagnostic

Cette section suit l'ordre de la prise en charge. Depuis la 8.1.2, les **examens complémentaires** (point 3), l'**échographie
pleuro-pulmonaire** (point 4) et la **biologie** (voir plus bas) ont leur propre onglet, « Examens complémentaires » ; la
recompression, les actes, les traitements, l'évolution, le diagnostic et l'orientation restent dans « Conclusion et évolution ».

1. **Recompression** : table, heures de mise en pression et de fin, séances, complications. Les tables
   proposées sont A15 (nommée OHB15 jusqu'à la 8.1.3), A15IOT, A18IOT, A18, B18, A18HeOx, B18HeOx, C18, et « autre » ; **B18** est
   proposée d'office sur une consultation initiale. L'**heure de fin** est calculée (mise en pression
   plus durée de la table : **95** (A15, portée de 90 à 95 min dans la 8.0.0), 115, 115, 90, 150, 110, 150 et
   300 min dans l'ordre ci-dessus) et reste modifiable.
2. **Actes**, dans cet ordre : voie veineuse périphérique, **bilan biologique** (bilan accident de
   plongée et bilan œdème pulmonaire d'immersion cochés d'office sur une consultation initiale), puis
   **sondage vésical** (à demeure, évacuateur, ou non) avec le **volume initial évacué**.
3. **Examens complémentaires** : chaque examen réalisé (OUI) ouvre son **résultat**. ECG ; radiographie
   thoracique ; scanner thoracique (le plus fréquent) ou cérébral ; IRM cérébrale (la plus fréquente en
   consultation initiale) ou médullaire ; échographie cardiaque ; doppler transcrânien ;
   échographie pleuro-pulmonaire ; autres examens ; examens demandés.
   - **Échographie cardiaque** : la recherche de shunt droite-gauche se fait au doppler transcrânien.
     Quand l'échographie est faite pour chercher un FOP, cochez **Recherche de FOP**, qui apparaît dès
     que l'examen est coché OUI : la mention passe dans la synthèse et sur le PDF.
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
   les champs restés vides, *Gomme* efface, et **Appliquer … aux 24 champs** applique d'un coup la
   cotation choisie à tous les champs, ceux déjà cotés compris (avec la gomme, le bouton efface les 24
   champs). Un champ non coté est non examiné. La synthèse et le PDF
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
l'onglet « Examen neurologique ».

### Consultation de suivi ou de sortie

Seuls l'anamnèse, l'examen général et l'examen neurologique sont proposés en grisé depuis l'examen
précédent. La recompression, les actes, les examens complémentaires, les traitements, le diagnostic et
la conclusion ne sont **jamais repris** : ils sont nécessairement différents, et un examen coché de
nouveau est un **nouvel examen**.

---

## Examens complémentaires : la biologie

L'onglet « Examens complémentaires » commence par deux encarts de biologie, **Gaz du sang veineux** puis **Biologie**, avant
l'ECG, l'imagerie et les autres examens. Chaque encart est **horodaté** : la date et l'heure du prélèvement sont celles de la
fiche dès qu'une valeur est saisie, et restent modifiables (un bilan rendu le lendemain se date du lendemain).

Chaque résultat est un **champ décimal** : virgule ou point, et un « < » ou un « > » devant la valeur est accepté (« < 5 »
pour une CRP sous le seuil de dosage). Sous le libellé, les **valeurs normales (VN)** ; à droite, l'**unité**. Une valeur
**hors des VN** s'écrit en **gras et en rouge**, dans la fiche et dans la synthèse, **sans autre mention** (la 8.2.0 a retiré les
mots « au-dessus des VN » et « en dessous des VN », ainsi que l'encart orange d'explication en tête de l'encart). L'en-tête de
l'encart dit seulement combien de valeurs sont saisies. Une saisie qui n'est
pas un nombre est refusée à la sortie du champ (la valeur enregistrée reste celle d'avant). Les bornes sont comprises dans les VN,
sauf pour la CRP (« < 5,0 » : 5,0 est hors VN).

Les valeurs normales, paramètre par paramètre, sont dans le tableau de *Les valeurs normales s'adaptent au sexe*, plus bas : celles de
la femme sont celles de votre feuille, celles de l'homme viennent de vos annotations.

L'**hémoglobine et l'hématocrite du bilan** sont reprises du gaz du sang **du même jour** tant que vous ne les saisissez pas
vous-même (même mécanique que l'heure de fin de table : proposées, puis modifiables) ; si la date du bilan diffère de celle du
gaz du sang, rien n'est repris et la valeur reprise est retirée.

Ces champs ne comptent pas dans la complétude de l'onglet (aucune valeur n'est attendue) et ne sont **jamais proposés en grisé**
depuis l'examen précédent : le prélèvement d'hier n'est pas celui d'aujourd'hui. Ils figurent dans le CSV (27 colonnes :
`gds_date`, `gds_h`, `gds_ph`, `gds_po2`, `gds_pco2`, `gds_hco3`, `gds_hb`, `gds_ht`, `gds_lac`, puis `lab_date`, `lab_h`,
`lab_leuco`, `lab_hb`, `lab_ht`, `lab_plq`, `lab_pnn`, `lab_fib`, `lab_dd`, `lab_prot`, `lab_creat`, `lab_dfg`, `lab_ck`,
`lab_crp`, `lab_alb`, `lab_myo`, `lab_tropo`, `lab_ntbnp`), en nombres à point décimal ; une valeur saisie avec « < » ou « > »
y reste du texte (`<5`). Les VN (celles de la femme et de l'homme quand elles diffèrent) et les unités sont dans le dictionnaire.

### Les valeurs normales s'adaptent au sexe

Depuis la 8.2.0, les VN suivent le **sexe** renseigné dans l'onglet Administratif (« Sexe » : M, F ou Autre) ou, à défaut, sur la première fiche du dossier qui
le porte. Votre feuille donne les VN de la **femme** ; vos annotations donnent celles de l'**homme** quand elles diffèrent (11 paramètres sur 23) :

| Encart | Paramètre | Unité | VN femme (feuille) | VN homme (annotation) |
|---|---|---|---|---|
| Gaz du sang veineux | pH veineux | | 7,33 - 7,38 | identique |
| | pO₂ veineux | mmHg | 33 - 37 | identique |
| | pCO₂ veineux | mmHg | 40 - 50 | identique |
| | HCO₃⁻ veineux | mmol/L | 24 - 30 | identique |
| | **Hb** | g/dL | 12 - 16 | **13,5 - 17,5** |
| | **Ht** | % | 37 - 46 | **40 - 50** |
| | lactates veineux | mmol/L | 0,5 - 2,2 | identique |
| Biologie | **leucocytes** | G/L | 4,020 - 11,420 | **4,090 - 11,000** |
| | **Hb** | g/dL | 12 - 16 | **13,5 - 17,5** |
| | **Ht** | % | 37 - 46 | **40 - 50** |
| | **plaquettes** | G/L | 185 - 445 | **161 - 398** |
| | **neutrophiles** | G/L | 1,78 - 6,946 | **1,692 - 7,500** |
| | fibrinogène | g/L | 2,0 - 4,0 | identique |
| | D-dimères | µg/mL | 0,00 - 0,50 | identique |
| | protéines totales | g/L | 64,0 - 83,0 | identique |
| | **créatinine** | µmol/L | 45,0 - 84,0 | **59,0 - 104,0** |
| | DFG CKD-EPI | mL/min/1,73 m² | 90 - 150 | identique |
| | **CK** | UI/L | 26 - 192 | **39 - 308** |
| | CRP | mg/L | < 5,0 | identique |
| | albumine | g/L | 35,0 - 52,0 | identique |
| | **myoglobine** | µg/L | 25,0 - 58,0 | **28,0 - 72** |
| | troponine | ng/L | 0 - 14 | identique |
| | **NT-pro-BNP** | ng/L | 10 - 202 | **10 - 63** (à vérifier, voir la fin des changements de la 8.2.0) |

- **Un homme** : le texte sous le libellé donne la VN de l'homme (« VN homme 13,5 - 17,5 »), qui décide aussi du gras et du rouge, de la colonne
  « VN » du tableau de la synthèse et du compte rendu, et de la ligne du dictionnaire.
- **Une femme** : mêmes emplacements, avec la VN de la femme (« VN femme 12 - 16 »).
- **Un paramètre identique pour les deux sexes** garde « VN 7,33 - 7,38 », sans mention du sexe.
- **Sexe non renseigné, ou « autre »** : l'application ne choisit pas. Elle écrit les deux fourchettes (« VN F 12 - 16 ; H 13,5 - 17,5 ») et ne
  met en gras et en rouge qu'une valeur **hors des deux** (pour l'hémoglobine : sous 12 ou au-dessus de 17,5).
- Le **sexe de la fiche ouverte** prime ; changer le sexe réaffiche aussitôt les VN et recolore les valeurs déjà saisies. Le CSV ne contient que
  les valeurs saisies : il ne change pas, les VN (femme et homme) sont dans le dictionnaire.
- Les « < » et « > » suivent la VN du sexe (« < 13 » en hémoglobine est sous les VN d'un homme, pas d'une femme).

### Dans la synthèse et le compte rendu

La synthèse écrit, après les examens paracliniques, un bloc **Résultats biologiques** : un **tableau** pour le gaz du sang, un
pour la biologie, avec une ligne par paramètre saisi au moins une fois (paramètre, VN, unité) et **une colonne par prélèvement
du dossier, le plus récent à gauche** (date et heure en tête). Les tableaux s'enrichissent donc de jour en jour : la synthèse
d'une fiche montre les prélèvements du dossier **jusqu'à cette fiche** ; le compte rendu d'hospitalisation montre **tous** ceux du
dossier. Les valeurs hors VN sont en gras et en rouge (en style en ligne : il suit la copie vers un traitement de texte) ; la colonne « VN » donne les valeurs normales du sexe
du patient (les deux fourchettes si le sexe n'est pas renseigné) ; dans
le texte brut, le tableau est un texte à tabulations. Les Hb et Ht du bilan reprises du gaz du sang ne font pas, à elles seules, un
tableau « Biologie » : elles figurent déjà dans celui du gaz du sang. Sur le papier, les tableaux s'impriment dans l'encart
« Synthèse » (une dizaine de centimètres de plus quand les 23 paramètres sont saisis).

---

## Habitudes toxiques et ordonnance

- **Alcool** : *consommation d'alcool* (évaluation en quatre stades) ou *alcool sevré* (depuis le,
  avec l'évaluation antérieure en quatre stades). Les deux réponses s'excluent. Le bouton **?** ouvre
  l'aide d'après Santé publique France : repères de consommation à moindre risque, verre standard,
  pyramide de sévérité et critères CIM-10 de la dépendance. Les définitions des stades « à risque » et
  « nocif » reprennent la typologie usuelle, la page de Santé publique France ne les détaillant pas.
- **Ordonnance** : dans l'encart « Antécédents et traitements », le bouton **Photo de l'ordonnance**
  joint une photographie à la fiche. C'est une pièce jointe comme les autres (titre « Ordonnance
  médicamenteuse », même limite de douze photos), visible en miniature dans l'encart et imprimée avec
  les pièces jointes. La synthèse ne la mentionne pas.

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

L'encart se trouve en fin d'onglet « Examen neurologique », après la grille ASIA.

### Ne pas mentionner les scores

MEDSUBHYP et le score vestibulaire n'ont de sens que pour un **accident de décompression**. Pour un autre
accident (barotraumatisme, œdème pulmonaire d'immersion, noyade…), la case **« Ne pas les mentionner dans la
synthèse »** (encart **Scores dans la synthèse**, juste sous les scores, onglet « Examen neurologique », `sc_masquer`)
les retire :

- de la **synthèse rédigée** ;
- du **compte rendu d'hospitalisation**, dès qu'une fiche du dossier porte la case (le score ASIA reste) ;
- de l'**impression** (l'encart « Scores de sévérité » n'est pas imprimé, et le titre de la page ne les cite plus) ;
- de la **ligne Excel ADP** (colonne BI vide, colonne BJ à « ns »).

Les scores restent **calculés dans la fiche** (colonnes `msh_total`, `vest_total` du CSV) et visibles à l'écran, avec un
bandeau qui le rappelle. La case est **reprise sur les autres fiches du dossier** (nouvelle fiche, ré-examen).
Quand le **diagnostic retenu** n'est pas un accident de décompression, un **rappel** s'affiche en tête de l'encart des
scores, avec un bouton qui coche la case : elle n'est jamais cochée à votre place.

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
  seulement 1 (un **Romberg positif** compte comme tel), conservé dans les deux cas 0 ;
- **symptômes cochléaires** : troubles de l'audition ou acouphènes ;
- **vertige** : « non » à la question *Vertiges* donne 0 ; « oui » ne dit pas s'il est permanent,
  vous tranchez ;
- **signes neurovégétatifs** : rien de ce qui est saisi ne les renseigne, vous les cotez ici.

Le total n'est calculé que si les cinq items ont une valeur. La grille ne définit aucun seuil de
gravité, l'outil n'en affiche donc pas. Le total (`vest_total`) et les cinq items (valeur
retenue, cotée ou déduite) sont des colonnes du CSV. L'éditeur de grille des premiers essais est
retiré : la grille s'écrit dans la constante `VEST`, en tête du script de `index.html`.

---

## La synthèse rédigée

Elle reste visible sous la fiche, quelle que soit la page, et s'imprime en page 6 du PDF. Elle suit le plan d'une
observation d'entrée, en **paragraphes distincts dont le titre est en gras et souligné** : *Le plongeur*,
*La plongée*, *Histoire des symptômes*, *Prise en charge initiale*, *Antécédents et terrain*, *Constantes*,
*À l'examen général, on retrouve*, *À l'examen neurologique, on retrouve*, *Au total*, *Examens paracliniques*,
*Diagnostic retenu*, *Conduite à tenir*. Chaque phrase vient d'un champ renseigné ; une négation (« absence
de… ») n'est écrite que si l'item a été examiné. Le bouton **Copier** met le texte dans le presse-papiers **en
texte enrichi** (titres soulignés et anomalies en gras, pour un traitement de texte ou un dossier patient) et en
texte brut pour un champ simple, où il n'y a ni gras ni souligné ; sur Firefox, aussi en **RTF**, que lisent les éditeurs de
dossier patient qui ignorent le HTML (voir *Copier vers un traitement de texte ou le dossier patient*).

### Ce qui est anormal est en gras

Tout constat anormal de l'examen ; dans l'histoire, les **facteurs favorisants** (dont la procédure de décompression
non respectée), la **remontée rapide ou non conforme**, la **plongée dans les 24 heures précédentes** et une
évolution **aggravée** avant la recompression ; un résultat paraclinique qui n'est pas dit normal (un résultat saisi en texte
libre est tenu pour normal s'il commence par « normal », « sans anomalie », « absence de », « pas de »,
« négatif » ou « bilan sans particularité » ; sinon il est en gras) ; un Doppler transcrânien avec shunt ; une
échographie pleuro-pulmonaire qui n'est pas A partout ; un score ASIA dont l'AIS n'est pas E ; une complication
thérapeutique ; la conclusion « examen neurologique anormal » ou « à recontrôler ».

### L'examen est dit en syndromes

Sous « À l'examen neurologique, on retrouve » (et « à l'examen général »), **un syndrome par ligne**, en gras, avec
ce qui le fonde ; puis « En revanche, » ce qui a été examiné et trouvé normal. Un domaine non examiné n'est dit ni
normal ni anormal.

| Domaine | Examiné et normal | Anormal |
|---|---|---|
| Conscience, signes cérébraux | « absence de signe cérébral », « GCS 15 » | « des signes cérébraux : » conscience altérée, troubles du comportement, désorientation, parole, vue, paralysie faciale, pupilles ; un Glasgow inférieur à 15 |
| Vestibulo-cochléaire | « absence de syndrome vestibulaire », « absence de signe cochléaire » | « un syndrome vestibulaire : » vertiges, nystagmus (côté, regard, sens), VNS, NIV, Romberg, Fukuda, marche en étoile, marche funambule. Avec une atteinte de l'audition ou des acouphènes : « syndrome vestibulo-cochléaire » ; sans atteinte vestibulaire : « signes cochléaires » |
| Motricité | « absence de déficit moteur » | « un déficit moteur de type » paraparésie, tétraparésie, hémiparésie droite ou gauche, monoparésie d'un membre, « des deux membres supérieurs », ou « multifocal » ; **plégie** quand tous les myotomes atteints sont cotés 0 ; puis le détail myotome par myotome |
| Sensibilités | « absence de déficit sensitif aux trois modes (tact léger, piqûre et pallesthésie) » | « un déficit sensitif aux trois modes » ; **dissocié** quand un mode au moins est conservé (« modes épargnés : pallesthésie ») ; l'étendue en intervalles de métamères, avec le côté ; les signes subjectifs à part |
| Réflexes | « absence de syndrome pyramidal » | « un syndrome pyramidal droit, gauche ou bilatéral : » ROT vifs ou polycinétiques, signe de Hoffmann, trépidation épileptoïde, cutané plantaire en extension. L'abolition des ROT reste une « anomalie des réflexes » distincte |
| Coordination | « absence de syndrome cérébelleux », « équilibre et marche normaux » | « un syndrome cérébelleux cinétique » (talon-genou, doigt-nez), « et statique » si l'équilibre ou la marche sont atteints aussi ; sans signe cinétique : « des troubles de l'équilibre et de la marche » |
| Miction, sphincter anal | « absence de trouble vésico-sphinctérien » | « des troubles vésico-sphinctériens : » pas de miction, rétention, résidu post-mictionnel de plus de 100 mL, contraction anale volontaire absente, pression anale profonde non perçue |
| Score ASIA | | « une atteinte médullaire : niveau neurologique…, AIS… » quand l'AIS va de A à D |
| Examen général | « examen cardio-vasculaire, respiratoire… sans anomalie », « examen ORL normal », « pas de lésion cutanée », « pas de céphalée ni de douleur rachidienne » | « une anomalie respiratoire (…) », « des anomalies ORL », « des lésions cutanées de désaturation », « une symptomatologie douloureuse » |

Ces règles sont une **proposition à valider** : elles s'écrivent dans les fonctions `examFindings` (les constats)
et `syndromes` (leur traduction), en fin de script de `index.html`.

### Le reste du texte, allégé et sans signe spécial

- **Aucun exposant, indice, barre verticale, étoile ni flèche.** SpO2, cmH2O et FiO2 s'écrivent en
  lettres, un niveau de plongée sans ses étoiles (« N2 »), les listes de zones se séparent par des
  points-virgules, les durées s'écrivent en « min », la température en degrés. Un filtre final
  (`TXT.clean`) réécrit aussi ceux qui viendraient d'un texte libre : flèche en « puis », degré,
  signes de comparaison, tirets longs.
- **Scores** : MEDSUBHYP et score vestibulaire par leur **seule valeur** (« Score MEDSUBHYP : 9 », avec
  le moment de la cotation quand le dossier en compte plusieurs), sans maximum, sans seuil de gravité,
  sans le détail des items.
- **ASIA** : les totaux, puis les niveaux quand l'examen n'est pas normal. La **préservation sacrée
  n'est écrite que si elle est absente** ; sa présence est la règle et ne se dit pas.
- **Omis** : la voie veineuse, le numéro de dossier et le rang de l'examen, le club, la photo de
  l'ordonnance et la liste des pièces jointes.
- **Examen anal** : « contraction anale volontaire absente » et « pression anale profonde non perçue » ne
  s'écrivent que s'ils sont anormaux, dans les troubles vésico-sphinctériens. Normaux ou non testés, ils
  n'apparaissent pas.

Chacun de ces choix est une ligne de la fonction `narrativeBlocks`, en fin de script.

### Copier vers un traitement de texte ou le dossier patient

**Copier** (synthèse) et **Copier le CRH** posent le texte dans le presse-papiers sous plusieurs formes à la fois ; le logiciel qui reçoit
prend celle qu'il sait lire :

| Où l'on colle | Ce qui est collé |
|---|---|
| un champ de texte simple | le texte brut, sans gras ni souligné |
| Word, LibreOffice, un courriel | le HTML (ou le RTF) : titres en gras et soulignés, anomalies en gras, tableaux de biologie |
| l'éditeur de texte du dossier patient | le **RTF**, s'il le lit : gras, souligné, rouge et tableaux, **directement**, sans passer par Word |

Un navigateur n'écrit, dans le presse-papiers, que du texte brut et du HTML. Beaucoup d'éditeurs intégrés à un dossier patient ne lisent pas le
HTML : ils prennent le texte brut, et le gras disparaît. Word, lui, lit le HTML puis écrit du RTF quand on copie depuis lui : c'est très probablement
pourquoi le détour par Word fonctionnait (je n'ai pas pu examiner votre éditeur). Depuis la 8.2.0, ADP écrit lui-même le RTF, mais **seul Firefox le permet** :

- **sous Firefox**, un clic envoie les trois formats (texte brut, HTML, RTF). Le RTF est écrit en ASCII (accents et signes en `\uN`), avec les
  mêmes titres en gras et soulignés que le HTML, les anomalies en gras, les valeurs de biologie hors des VN en gras et en rouge, et les
  tableaux de biologie (bordures, ligne d'en-tête grisée) ;
- **sous Chrome et Edge**, rien ne change : aucun navigateur de cette famille ne laisse une page écrire du RTF. La copie reste en HTML et en
  texte brut, et le gras ne passe pas dans un éditeur qui ne lit que le RTF. Ouvrez ADP dans Firefox pour copier, ou gardez le détour par Word.

Dans **Exporter**, la case « Copie du texte : ajouter le format RTF… » (cochée par défaut) désactive cette option : décochez-la si le collage
affiche du code (« {\rtf1… ») ou des signes étranges dans votre éditeur ; la copie est alors celle de la 8.1.3. Le réglage est mémorisé avec les autres.

---

## Le paragraphe d'évolution pour le compte rendu

Sur une consultation de suivi ou de sortie, l'encart **Évolution** demande le nombre de séances,
la présence de complications thérapeutiques, le sens de l'évolution, les examens réalisés et les
examens demandés.

Sous l'encart, un cadre bleu assemble ces réponses en un **paragraphe rédigé**, prêt pour le
compte rendu de sortie. Il se recalcule à chaque frappe. Le bouton **Copier** le met dans le
presse-papiers.

---

## Le compte rendu d'hospitalisation (CRH)

Sur une **consultation de sortie**, l'encart **Compte rendu d'hospitalisation**, en fin d'onglet « Conclusion et
évolution », écrit un texte enrichi **sans en-tête** à partir de **toutes les fiches du dossier**, la fiche ouverte
comprise même si elle n'est pas enregistrée. Il se recalcule à la saisie. Le bouton **Copier le CRH** le place dans
le presse-papiers en texte enrichi (titres soulignés, anomalies en gras, tableaux ; sur Firefox aussi en RTF, voir *Copier vers un
traitement de texte ou le dossier patient*) et en texte brut. Il n'est pas ajouté au
PDF. C'est un **brouillon à relire** avant de le coller dans le dossier du patient.

Les fiches sont rangées par date et heure d'examen ; **J0** est la date de la première.

| Paragraphe | D'où vient le texte |
|---|---|
| Le plongeur, La plongée, Histoire des symptômes, Prise en charge initiale, Antécédents et terrain | la fiche initiale (la première fiche de type initial du dossier) |
| Constantes et examen à l'admission | la fiche initiale : « À l'admission, à l'examen général / neurologique, on retrouve », avec les syndromes de la synthèse |
| Prise en charge | la fiche initiale (table, oxygène, corticoïdes, remplissage, actes), puis chaque fiche qui porte une recompression ou un traitement, avec sa date ; en dernière ligne, le **décompte des recompressions par type de table** (voir ci-dessous) |
| Examens paracliniques | **tous** les examens du dossier, **par fiche et par date**, un examen par ligne ; les examens « demandés, en attente » en sont écartés ; les scores (MEDSUBHYP, vestibulaire, ASIA) en fin de paragraphe, sauf MEDSUBHYP et vestibulaire quand la case « ne pas les mentionner » est cochée |
| Résultats biologiques | **tous** les prélèvements du dossier (gaz du sang veineux, biologie), en **tableaux** : une colonne par prélèvement, le plus récent à gauche ; valeurs hors des valeurs normales en gras et en rouge |
| Évolution | tout ce qui **diffère d'une fiche à l'autre**, horodaté (voir ci-dessous) |
| Examen de sortie | la dernière fiche : « À la sortie, à l'examen général / neurologique, on retrouve » |
| Diagnostic retenu | le plus récent des diagnostics saisis |
| Orientation | l'orientation de la fiche de sortie (retour au domicile, hospitalisation, transfert) et ses précisions |
| Examens à réaliser secondairement | le champ de la consultation de sortie, puis les examens demandés de la dernière fiche |
| Aptitude à la plongée | « Inaptitude temporaire à la plongée de N mois » ou « Inaptitude définitive à la plongée » (en gras) ; rien si non précisée |

### L'évolution, fiche à fiche

Pour chaque fiche après la première, une ligne **datée** (« Le 03/10/2026 à 9 h 00 (J1) : »), puis une ligne par
catégorie :

- **Amélioration** : un constat disparu (« vertiges : disparition »), une force musculaire qui remonte
  (« L2 (flexion de hanche) droit : coté 4/5 (auparavant coté 3/5) »), une récupération complète, une
  normalisation de la sensibilité ou des réflexes, une étendue de déficit sensitif qui se réduit, un score ASIA
  qui s'améliore ;
- **Aggravation** (en gras) : un constat nouveau (« acouphènes : apparition (à gauche) »), une force qui baisse, un
  score ASIA qui s'aggrave ;
- **Autres modifications** : un changement sans sens clinique évident, ou un constat nouveau dont l'item **n'avait pas
  été examiné** à la fiche précédente (« non examiné auparavant ») ;
- **Examen clinique inchangé** quand rien ne diffère ;
- puis ce que dit l'encart **Évolution** de la fiche : séances de recompression depuis la consultation précédente,
  complication thérapeutique (en gras), évolution jugée, commentaire.

La comparaison se fait **constat par constat** (muscle, réflexe, épreuve vestibulaire, étendue sensitive…), pas sur
le texte. Une anomalie n'est dite **disparue** que si l'item a été **réexaminé** à la fiche suivante : un item laissé
vide n'est jamais tenu pour normal.

### Les recompressions, par type de table

La dernière ligne du paragraphe « Prise en charge » compte les séances du dossier **par type de table** :
« Recompressions : 5 séances au total (A15 : 3 ; B18 : 1 ; type non précisé : 1). » Règle :

- une fiche qui porte une **table** (champ « Table utilisée ») compte pour le **plus grand** de ses « Nombre de séances
  réalisées » et « Séances réalisées depuis la dernière consultation », et pour **une séance au moins** ;
- les séances déclarées dans l'encart d'évolution **sans table** sur la fiche sont comptées à part (« type non
  précisé ») : la fiche ne dit pas de quelle table il s'agit ;
- une table **hors liste** compte sous le nom saisi (« Table Comex 30 : 2 ») ; les noms identiques à la casse près se
  regroupent ;
- les types s'écrivent dans l'ordre de la liste des tables (A15, A15IOT, A18IOT, A18, B18, A18HeOx, B18HeOx,
  C18, autre).

La table **B18 proposée d'office** sur une fiche initiale compte comme une table : décochez-la, ou videz le champ,
quand aucune recompression n'a eu lieu (le texte de la synthèse écrit lui aussi « Table B18 »).

### La sortie

La consultation de sortie ajoute un encart **Sortie : examens à prévoir et aptitude à la plongée** :
**examens à réaliser secondairement** (texte libre, avec des phrases à cliquer) et **inaptitude à la plongée**,
*temporaire* avec sa **durée en mois**, ou *définitive*. Il figure sur le PDF de la fiche de sortie.

---

## Documents de sortie : le générateur de courriers du service

Le **générateur de courriers du SMHEP** (fichier autonome `Generateur-courriers-SMHEP.html` : courrier au médecin
traitant, courriers d'avis, ordonnances, certificats, recommandations, plans de soin) **s'ouvre depuis ADP**, utilisé tel
quel. Sur une **consultation de sortie**, le bouton **Documents de sortie : courriers, ordonnances, certificats…**
(encart « Sortie », onglet « Conclusion et évolution »), ou **documents de sortie** dans l'en-tête du compte rendu
d'hospitalisation, ouvre le générateur **en plein écran, avec les éléments connus déjà remplis**. Tout reste modifiable.

**Première utilisation : choisir le fichier du générateur.** ADP **ne contient pas le générateur** : il porte les
**signatures scannées** et les **numéros RPPS** des médecins du service, qui ne doivent pas se retrouver dans une page
publiée sur Internet (GitHub Pages est public). À la première ouverture, ADP demande de **choisir votre copie** de
`Generateur-courriers-SMHEP.html` ; il la **garde dans la base locale de ce navigateur**, sur cet ordinateur (elle n'est
envoyée nulle part et ne figure dans aucun export), et ne la redemande plus. Il faut la choisir de nouveau dans un autre
navigateur, sur un autre appareil, ou après avoir vidé les données de navigation. Le lien **Fichier du générateur…** (encart
« Sortie ») montre le fichier chargé et permet de le **remplacer** (nouvelle version) ou de l'**oublier**. Le fichier choisi
**s'exécute avec les mêmes droits qu'ADP** : ne chargez que votre propre copie.

| Champ du générateur | Repris de |
|---|---|
| Genre, civilité | le sexe de la fiche (M : Homme, Mr ; F : Femme, Mme ; « Autre » : le réglage du générateur reste) |
| NOM, Prénom, Date de naissance | la fiche |
| Date de l'accident | la fiche (initiale) |
| Motif, précision, précision complémentaire | le **dernier diagnostic retenu** du dossier (tableau ci-dessous) |
| Hospitalisation, début | la **date d'entrée** : le premier examen du dossier |
| Hospitalisation, fin | la date de la consultation de sortie |
| Signataire | le médecin ou l'examinateur reconnu parmi LESACA, BLATTEAU, DRUELLE, CASTAGNA, MORIN, RUBY, DAUBRESSE, LEHOT ; sinon le réglage du générateur reste |
| Certificat médical : inaptitude à la plongée | l'inaptitude de la sortie : *jusqu'à réévaluation* avec sa durée en mois, ou *définitive* |
| Certificat de premières constatations : « Présente cliniquement » | les signes fonctionnels à l'arrivée et les syndromes de la fiche initiale (« À l'examen, on retrouve : … ») |
| Certificat de premières constatations : « Examens complémentaires réalisés » | les examens paracliniques du dossier, par date, sans les scores |

Le motif suit le diagnostic, et **c'est le générateur lui-même qui coche ensuite les documents habituels** de la
situation (recommandations post-ADD, ordonnances, imagerie, certificats ; avec « vestibulaire » dans la précision :
courrier ORL et kinésithérapie vestibulaire ; pour un œdème pulmonaire d'immersion : recommandations post-OPI,
cardiologue, pneumologue) :

| Diagnostic retenu | Motif | Précision |
|---|---|---|
| Accident de désaturation | un accident de désaturation | un seul type : médullaire, cérébral, vestibulaire (« avec atteinte cochléaire » si des acouphènes ou une baisse de l'audition sont notés, sinon « sans »), cutané, ostéo-myo-articulaire, pulmonaire ; plusieurs types : *médullaire et vestibulaire*, *médullaire et cérébral*, *cérébral, médullaire et vestibulaire*, *cérébral et vestibulaire*, sinon *mixte* |
| Œdème pulmonaire d'immersion | un œdème pulmonaire d'immersion | — |
| Barotraumatisme | un barotraumatisme | de l'oreille moyenne, de l'oreille interne, sinusien, pulmonaire, dentaire, par plaquage de masque |
| Accident biochimique | un accident biochimique | par hyperoxie, par hypercapnie, par narcose, par intoxication au monoxyde de carbone |
| Noyade | une noyade | — |
| Diagnostic saisi seulement en texte libre | « motif rédigé librement » | — |

**Fonctionnement.** *Retour à la fiche* referme la fenêtre **sans rien perdre** : la rouvrir pour la même fiche reprend là
où vous en étiez. Une autre fiche recharge le générateur. *Reprendre les éléments de la fiche* remplit à nouveau
l'identité, le motif, les dates, le signataire, l'inaptitude et les deux textes du certificat de premières constatations
(après confirmation). *Ouvrir dans un onglet* ouvre le même générateur dans un onglet du navigateur, rempli de la même
façon. La production des PDF et l'impression se font avec les boutons du générateur, qui rappelle ses réglages
d'impression.

**Rien n'est enregistré** : ni le générateur ni ADP ne gardent les documents, et les éléments de la fiche passent d'un
bloc à l'autre en mémoire, sans réseau.

**Mettre à jour le générateur** : *Fichier du générateur…*, puis *Remplacer le fichier*, avec la nouvelle version.
Seul un fichier qui porte le titre « Générateur de courriers » et ses champs est accepté. L'intégration ne dépend que des
champs `genre`, `civilite`, `nom`, `prenom`, `ddn`, `dateAccident`, `motif1`, `motif2`, `motif3`, `motifLibre`,
`hospDebut`, `hospFin`, `signataire`, `inaptitude`, `delaiReeval`, `cmpcClinique`, `cmpcExamens` : si l'un d'eux disparaît
d'une version du générateur, ADP le dit au lieu de se taire (« Introuvable : … »). Hors ligne, tout continue de
fonctionner : le fichier est dans le navigateur.

**Variante locale, jamais publiable.** Un `index.html` qui porterait lui-même le générateur (bloc
`<script type="application/json" id="gensrc">`) l'utilise sans rien demander ; cette variante contient les signatures des
médecins et ne doit jamais être publiée. ADP n'est pas livré ainsi.

**Limites.** Le générateur est fait pour un écran de bureau (formulaire à gauche, aperçu A4 à droite) : il n'est pas
adapté à un téléphone. Si l'impression lancée depuis la fenêtre intégrée devait imprimer la page ADP au lieu des courriers
(à vérifier sous Firefox), utilisez *Ouvrir dans un onglet*.

---

## La ligne Excel ADP (fichier Excel maître)

Le fichier maître du service compte **89 colonnes (A à CK)** : identité, plongeur, plongée, alerte et prise en charge,
évolution, recompression, examens. Depuis une fiche du dossier, **Exporter**, puis **Ligne Excel ADP du dossier ouvert** (ou
**ligne Excel ADP** dans l'en-tête du compte rendu d'hospitalisation), compose **une ligne** à partir de **toutes les fiches
du dossier**, la fiche ouverte comprise. Rien n'est enregistré : la ligne est recalculée à chaque ouverture de la fenêtre.
Votre fichier maître n'est ni lu ni modifié.

La fenêtre affiche, pour chaque colonne, sa **valeur** et la **règle** suivie ; les colonnes vides sont grisées. Vérifiez,
puis :

1. **Copier la ligne** : le texte (une ligne, 89 cellules séparées par des tabulations) se colle dans la **première
   cellule** d'une ligne vide d'Excel (Ctrl+V). Les dates (JJ/MM/AAAA) et les heures (HH:MM) sont reconnues au
   format français ;
2. ou **Télécharger le classeur .xlsx** (`ligne_excel_ADP_AAAA-MM-JJ.xlsx`) : une feuille « Feuil1 », en-têtes identiques à
   votre fichier (légendes de codes comprises) en ligne 1, la ligne du dossier en ligne 2, dates et heures en vrais
   nombres au même format. Copiez la ligne 2 et collez-la dans le fichier maître, en « valeurs » si vous voulez garder
   sa mise en forme.

La case **inclure le nom et le prénom (colonne A)** est cochée par défaut, la colonne A du fichier maître étant
« NOM Prénom » ; décochez-la pour laisser la colonne vide. Le nom du fichier téléchargé ne porte aucune donnée du patient.

### D'où vient chaque colonne

La **fiche initiale** (la première de type initial) donne l'identité, le plongeur, la plongée, l'alerte, les soins sur
place, le premier examen et la table initiale ; la **fiche proche de H+24** (entre 12 h et 40 h après l'arrivée, la plus
proche de 24 h) et la **première fiche de suivi** donnent l'évolution ; la **dernière fiche** donne les séquelles et l'inaptitude ;
**toutes les fiches** donnent le diagnostic (le dernier), les recompressions, le doppler transcrânien, les échographies,
l'IRM et les traitements.

| Col. | Colonne du fichier maître | Source dans ADP et règle de codage |
|---|---|---|
| A | NOM Prénom | nom en majuscules, puis prénom (identité) |
| B | n° dossier (SMHEP) | numéro d’accident de plongée du service |
| C | Numero Dossier | numéro de dossier de la fiche |
| D | Sexe | M = 1, F = 0 |
| E | Date de naissance (JJ:MM:AA) | date de naissance |
| F | Age | âge à la date du premier examen |
| G | Diagnostic | dernier diagnostic retenu du dossier, codé 1 à 13 (voir la notice) |
| H | Année début plongée | année de début de la plongée |
| I | Nb total de plongée | nombre total de plongées réalisées |
| J | Nb moyen plongée par an (2 dernières années) | nombre moyen de plongées par an |
| K | Plongeur pro (militaire ou civil) | 1 si niveau professionnel, plongée professionnelle ou militaire |
| L | Organisme d'affiliation actuel | rien de choisi (« — ») : 0 ; FFESSM 1, FSGT 2, UCPA 3, ANMP 4, CMAS 6, PADI 7, autres 8 |
| M | Niveau plongeur loisir | N1 / Open Water 1 … N5 5 ; baptême, non breveté ou rien de choisi (« — ») : 0 |
| N | Niveau enseignement loisir | rien de choisi (« — ») : 0 ; E1 / BPJEPS 1, E2 2, E3 / MF1 3, E4 / MF2 / DEJEPS / DESJEPS 4 |
| O | Niveau plongeur pro (classe et mention) | rien de choisi (« — ») : 0 (la 8.1.3 écrivait « Aucun ») ; sinon le libellé du niveau ; la mention (A à D) n’est pas recueillie |
| P | Niveau plongeur militaire/ | libellé pour un plongeur d’armes ; sinon 0 (niveau civil ou rien de choisi) ; la catégorie n’est pas recueillie |
| Q | Date dernier certifical médical (JJ:MM:AA) | date du dernier certificat médical |
| R | Qualification médecin assurant suivi plongée | fédéral 1, du sport 2, DIU 3, rééducateur 4, autre 5 |
| S | ATCD | antécédents médico-chirurgicaux ; « ras » si aucun |
| T | ATCD plongée | 1 si un accident de plongée antérieur, 0 si aucun |
| U | Plongée en structure (associative/commerciale) | plongée en club : 1 ; hors club ou professionnelle : 0 |
| V | Plongée auto-encadrée | plongée auto-encadrée : 1 ou 0 |
| W | Date de l'accident (JJ:MM:AA) | date de l’accident |
| X | Plongée pro | plongée professionnelle ou militaire : 1 |
| Y | Lieu/site de l'accident | reconnu dans le texte du lieu (école, Var, parc national) ; sinon vide, le texte passe dans « Observations » |
| Z | Appareil utilisé | apnée 1 ; sinon circuit ouvert 2 par défaut (l’appareil n’est pas recueilli) |
| AA | Mélange uilisé | air 1, nitrox 2, trimix 3, autres 4 |
| AB | Procédure de décompression | tables 1, ordinateur 2, autre 3 |
| AC | Combinaison | non recueillie |
| AD | Heure immersion (hh:mm) | heure d’immersion (DS) |
| AE | Profondeur max (msw) | profondeur maximale (Pmax) ; en apnée, celle des apnées |
| AF | Durée de travail (hh:mm) | durée de travail (DT) |
| AG | Réalisation de paliers | 1 si un palier obligatoire est saisi, 0 sinon (plongée renseignée) |
| AH | Heure sortie de l'eau (hh:mm) | heure de sortie de l’eau (HS) |
| AI | Durée totale plongée (hh:mm) | durée totale de plongée (DTP) |
| AJ | Heure premiers symptômes (hh:mm) 00:00 si premiers symptômes en plongée | 00:00 si les symptômes sont apparus entre l’immersion et la sortie de l’eau |
| AK | Respect procédure décompression | respect de la procédure de décompression (facteur favorisant) : 1 ou 0 |
| AL | Plongée ludion | facteur « plongées ludion » ; profil à yoyo si non renseigné |
| AM | Plongée successive | plongée dans les 24 heures précédentes |
| AN | Plongée d'instruction | facteur favorisant « plongée d’instruction », sinon type de plongée « instruction » |
| AO | Travail musculaire intense en et/ou après plongée | travail musculaire intense (facteur favorisant) : 1 ou 0 |
| AP | Fatigue avant plongée | fatigue (facteur favorisant) : 1 ou 0 |
| AQ | Nb de plongées 15 derniers jours (< 20 m / > 20 m) | non recueilli |
| AR | Heure d'appel SMHEP (hh:mm) | heure d’appel |
| AS | Identité de l'appelant | SAMU 1 (SAMU 83, SCMM, autre SAMU), SAU HNIA SA 2, autre SAU 3, autre 5 |
| AT | Localisation accidenté moment de l'appel | non recueillie |
| AU | Moyen d'évacuation vers SMHEP | hélicoptère 1, SMUR 2, VSAV 3, autre 5 |
| AV | Heure début des soins (hh:mm) | heure des 1ers soins sur place |
| AW | Circonstances de survenue de l'accident | remontée, profil, commentaire des paliers, histoire de la maladie |
| AX | Signes initiaux | signes fonctionnels à l’arrivée |
| AY | Déséquipement + protection thermique | non recueilli |
| AZ | Oxygénothérapie normobare | oxygène sur place : 1 (masque à haute concentration) ou 0 |
| BA | Hydratation per os et IV (ml) | hydratation sur place (mL) |
| BB | Aspirine | aspirine sur place : 1 ou 0 |
| BC | Heure de prise en charge SMHEP (hh:mm) | heure de prise en charge au SMHEP |
| BD | Evolution avant arrivée SMHEP : | amélioré 2, stable 3, aggravé 4 |
| BE | Signes au SMHEP | syndromes anormaux du premier examen |
| BF | Signes au SMHEP : | déficit moteur 3, déficit sensitif objectif 2, paresthésies isolées 1, aucun 0 |
| BG | Douleur vertébrale | douleur rachidienne du premier examen : 1 ou 0 |
| BH | Troubles sphictériens | troubles vésico-sphinctériens du premier examen |
| BI | Score MEDSUBHYP | à l’arrivée si coté, sinon le premier disponible ; vide si la case « ne pas mentionner les scores » est cochée |
| BJ | Score sévérité OI | score vestibulaire du premier examen coté ; « ns » sinon |
| BK | Table Initiale | O2 2,5 ATA 1 (A15, A15IOT), A18 2, B18 3, C18 4, héliox 5, autre 6, aucune 0 |
| BL | Heure de mise en pression (hh:mm) | heure de mise en pression de la table initiale |
| BM | Délai de recompression après 1ers symptômes (hh:mm) | délai 1ers symptômes → mise en pression |
| BN | Traitements médicamenteux, y compris ceux avant arrivée au SMHEP: (le ou les chiffres) | chiffres séparés par des espaces : ONB 1 ou 2, hydratation > 500 mL 3, aspirine 4, corticoïdes 5, lidocaïne 6, fluoxétine 7, autres 8 ; 0 si aucun |
| BO | Evolution après la table initiale (par rapport arrivée SMHEP): | première fiche de suivi : régression totale 1, amélioration 2, stabilisation 3, aggravation 4 |
| BP | Signes après la table initiale | syndromes anormaux de la première fiche de suivi |
| BQ | Evolution à 24h (par rapport arrivée SMHEP): | fiche la plus proche de H+24 (entre 12 h et 40 h) |
| BR | Signes à 24h | syndromes anormaux de la fiche proche de H+24 |
| BS | Nb séances d'OHB complémentaires (table héliox, 2,8 ou 4 ATA) | séances du dossier à 2,8 ATA ou héliox (A18, B18, C18, héliox), la table initiale déduite |
| BT | Nb séances d'OHB complémentaires (table O2, 2,5 ATA) | séances du dossier à l’oxygène 2,5 ATA (A15, A15IOT), la table initiale déduite |
| BU | Séquelles sortie service | dernier examen : signes objectifs 2, signes subjectifs 1, aucun 0 |
| BV | Médecin ayant pris en charge le patient | médecin de la fiche initiale (sinon l’examinateur) |
| BW | Observations | lieu non codé, apnées, conditions environnementales, tables « autres » |
| BX | Score MJOAS | non recueilli |
| BY | nombre j AT | non recueilli |
| BZ | nombre j inaptitude plongée | inaptitude temporaire : mois × 30 jours ; « définitive » sinon |
| CA | GF ORDINATEUR | marque et modèle de l’ordinateur, suivis de ses réglages, dans la même case (« Suunto D5 - GF 35/75 ») ; l’un des deux seulement si l’autre est vide |
| CB | Echodoppler transcrânien | meilleur grade de shunt noté au doppler transcrânien (0, 1, 2) |
| CC | IRM délai/accident (jours) | jours entre l’accident et la première IRM médullaire |
| CD | IRM Image | IRM médullaire : image anormale 1, normale 0 |
| CE | IRM Facteur compressif | non recueilli |
| CF | IRM Facteur compressif Type | non recueilli |
| CG | IRM concordance radio clinique | non recueillie |
| CH | Echographie cardiaque anormale | résultat de l’échographie cardiaque : anormal 1, normal 0 |
| CI | Epreuve d'effort anormale | non recueillie |
| CJ | MAPA anormale | non recueillie |
| CK | G | colonne sans équivalent |

Les colonnes qu'ADP **ne recueille pas** (AC, AQ, AT, AY, BX, BY, CE, CF, CG, CI, CJ, CK) restent vides. La colonne Z
(appareil utilisé) est **« circuit ouvert » par défaut** hors apnée : ADP ne demande ni recycleur ni caisson. Les niveaux
professionnel et militaire (O, P) sont repris en toutes lettres, la mention (A à D) et la catégorie n'étant pas recueillies.

**Rien de choisi = 0** (depuis la 8.2.0). Quand la fiche initiale du dossier laisse « — » dans l'organisme d'affiliation (L), le niveau de
plongeur de loisir (M), le niveau d'enseignement (N) ou le niveau de plongeur professionnel (O), la case correspondante du fichier maître reçoit
**0** au lieu de rester vide ; la colonne P (militaire) reçoit 0 pour un niveau civil ou quand rien n'est choisi. La colonne O écrivait « Aucun »
dans ce cas : elle écrit 0. Un dossier **sans fiche initiale** laisse ces cinq cases vides (les menus se posent sur la fiche initiale : sans elle,
une case vide veut dire « inconnu »). La colonne R (qualification du médecin) reste vide quand rien n'est choisi : la légende de votre fichier
n'y prévoit pas de 0.

### Le diagnostic (colonne G)

Le **dernier diagnostic retenu** du dossier est codé ; quand plusieurs diagnostics sont retenus, c'est le diagnostic
principal s'il est désigné, sinon le premier dans l'ordre accident de désaturation, œdème pulmonaire d'immersion,
barotraumatisme, accident biochimique, noyade.

| Code | Libellé du fichier maître | Dans ADP |
|---|---|---|
| 1 | ADD neurologique | accident de désaturation, type médullaire et / ou cérébral seul |
| 2 | ADD OI | accident de désaturation, type vestibulaire seul |
| 3 | ADD cutané | accident de désaturation, type cutané seul |
| 4 | ADD OMA | accident de désaturation, type ostéo-articulaire seul |
| 5 | ADD mixte | accident de désaturation de plusieurs familles de types (par exemple médullaire et vestibulaire) |
| 6 | ADD ambigu | accident de désaturation dont le type n'est pas précisé |
| 7 | OPI | œdème pulmonaire d'immersion |
| 8 | BT OI | barotraumatisme dont l'oreille interne fait partie |
| 9 | BT pulmonaire | barotraumatisme dont la surpression pulmonaire fait partie (sans oreille interne) |
| 10 | BT sinusien | barotraumatisme dont les sinus font partie (sans oreille interne ni poumon) |
| 11 | autres barotrauma | oreille moyenne, dentaire, plaquage de masque, ou type non précisé |
| 12 | accident biochimique | accident biochimique |
| 13 | autre | noyade, accident de désaturation pulmonaire (chokes) seul, diagnostic saisi seulement en texte libre |

---

## La ligne Excel COHB (activité COHB)

Le service tient aussi une feuille **« Activité COHB »** : une ligne par dossier clos, **31 colonnes (A à AE)**. Même mécanique
que la ligne Excel ADP : **Exporter**, puis **Ligne Excel COHB du dossier ouvert** (ou **ligne Excel COHB** dans l'en-tête du compte
rendu d'hospitalisation). La fenêtre propose les deux lignes en haut, affiche la **valeur** et la **règle** de chaque colonne,
puis **Copier la ligne** (texte à tabulations, 31 cellules, à coller dans la première cellule d'une ligne vide) ou **Télécharger le
classeur .xlsx** (`ligne_excel_COHB_AAAA-MM-JJ.xlsx` : les en-têtes de votre feuille en ligne 1, la ligne du dossier en ligne 2, sur
le fond bleu des lignes « plongée »). La case « inclure le nom et le prénom » concerne la colonne B. Rien n'est enregistré, votre
feuille n'est ni lue ni modifiée.

| Col. | En-tête | Règle |
|---|---|---|
| A | Date cloture | date de la dernière fiche du dossier |
| B | Nom prénom | nom en majuscules, puis prénom |
| C | IPP | numéro de dossier de la fiche |
| D | Diagnostic | dernier diagnostic retenu, abrégé comme dans votre feuille (« ADD médullaire + cutané », « Barotraumatisme oreille moyenne », « Intoxication CO »), le diagnostic principal d'abord |
| E | Classement ARS | « accident de plongée » ; « intoxication CO » si le diagnostic comprend une intoxication au monoxyde de carbone |
| F | CS | nombre de fiches du dossier (une consultation par fiche) |
| G | 1ere en urgence | période de la mise en pression de la table initiale : **O** heures ouvrables (lundi au vendredi, de 7 h 45 à 16 h 00, hors jours fériés), **N** en semaine hors de ces heures, **W** week-end ou jour férié |
| H, I | nbre seance en repose pied, nbre seance Alité | non recueillis (la position du patient n'est pas saisie) |
| J à U | A15, A15HNO, B18Hx, B18HxHNO, IOT, IOTHNO, A18, A18HNO, B 18, B18HNO, C18, C18HNO | tables enregistrées, voir ci-dessous |
| V, W, X | Pansements, PRF, PTcO2 | non recueillis |
| Y | DTC | nombre de doppler transcrâniens réalisés (fiches du dossier) |
| Z | Audio / Tympan | non recueilli |
| AA | Complication | nombre de fiches du dossier avec une complication thérapeutique |
| AB, AC, AD | EE / plateau technique, Echo-doppler, CACI plongée | non recueillis (le doppler transcrânien est compté en Y) |
| AE | Résidence | voir ci-dessous |

**Tables enregistrées.** Depuis la 8.2.0, la ligne compte les **tables de recompression enregistrées** : une fiche qui porte une table
compte pour **une table**, rangée dans la colonne de son type, en heures ouvrables ou dans la colonne « HNO » qui la suit d'après l'heure de sa
mise en pression. Les séances « déclarées » (« séances réalisées », « séances depuis la dernière consultation ») ne sont plus lues : leur
total ne coïncidait pas avec le nombre de fiches. Une fiche sans table n'en compte aucune. Correspondance : A15 → A15 ; A15IOT et A18IOT → IOT ;
A18 → A18 ; B18 → B 18 ; A18HeOx et B18HeOx → B18Hx ; C18 → C18 ; une table « autre » n'est rangée nulle part. Une table dont l'heure de mise en
pression est inconnue est comptée en **heures ouvrables**, faute d'heure. La table B18 proposée d'office sur la fiche initiale compte comme une
table : videz le champ quand aucune recompression n'a eu lieu.

**Heures ouvrables.** Du lundi au vendredi, de **7 h 45** (comprise) à **16 h 00** (exclue), hors **jours fériés** français (1er janvier, lundi de
Pâques, 1er mai, 8 mai, Ascension, lundi de Pentecôte, 14 juillet, 15 août, 1er novembre, 11 novembre, 25 décembre, calculés pour
chaque année). Un jour férié compte comme un week-end (W). La colonne G s'appuie sur l'heure de mise en pression de la table
initiale, à défaut sur l'heure de prise en charge au SMHEP ; sans heure, elle reste vide un jour de semaine.

**Résidence.** Un pays cité dans l'adresse (« Belgique », « Suisse »…) ; sinon **VAR** (code postal 83, ou une commune du Var
reconnue) ; sinon « France (dép. xx) » d'après le code postal ; sinon le pays de la nationalité si elle est étrangère. La nationalité
ne dit pas la résidence : c'est la règle la moins sûre, à vérifier avant de coller.

---

## Dictée vocale

Un **bouton micro** accompagne chaque encart de texte (zone de texte, ligne de texte libre) : histoire de la maladie,
signes fonctionnels, commentaires, antécédents, précisions, résultats d'examens. Les champs d'identité (nom, prénom, date
de naissance, adresse, e-mail), les téléphones et le numéro de dossier n'en ont pas. Un clic lance la dictée ; **le micro
s'éteint tout seul après une seconde sans parole** (cinq secondes si l'on n'a pas encore commencé à parler) ; un second clic
l'arrête aussitôt, sans perdre le dernier texte reconnu. Le texte est posé **à la place du curseur** (à la suite du texte déjà
saisi si le curseur n'a pas été placé), avec la majuscule seulement en début de phrase. Le texte en cours de reconnaissance
s'affiche sous le champ avant d'être écrit.

- Commandes vocales : **« à la ligne »** (ou « nouvelle ligne »), **« virgule »**, **« point final »**,
  **« point-virgule »**, **« deux points »**, **« point d'interrogation »**. Dans une ligne de texte (et non une zone),
  « à la ligne » donne un espace.
- La dictée est celle du **navigateur** : elle fonctionne sur **Chrome, Edge et Safari**, en français. Elle ne repart pas
  seule : une pause de plus d'une seconde l'arrête, un nouveau clic la relance. Changer d'onglet, de champ ou de fiche éteint
  le micro. Si vous corrigez le texte déjà dicté pendant la dictée, elle s'arrête plutôt que de l'écraser ; ajouter du texte
  avant ou après ne la gêne pas.
- **Chrome rend parfois chaque résultat avec tout le texte déjà dit** (« antécédent », « antécédent numéro », « antécédent
  numéro 1 »). Avant la 8.1.1, ces morceaux étaient ajoutés les uns aux autres : « antécédent numéro un » s'écrivait
  « Antécédent antécédent numéro antécédent numéro 1 ». Le texte est maintenant recomposé à chaque résultat à partir de la liste
  complète : il ne s'écrit qu'une fois.
- **Firefox n'a pas cette fonction.** Le bouton le dit et place le curseur dans le champ ; dictez alors avec la dictée de
  Windows : **touche Windows + H** (sur Mac, menu Édition, « Démarrer la dictée » ; sur téléphone, le micro du clavier).
- **Confidentialité.** Chrome et Edge **envoient l'audio à un service distant** (Google, Microsoft) pour le transcrire :
  il quitte l'ordinateur, contrairement au reste d'ADP. Un avis le rappelle à la première utilisation (réglage mémorisé ;
  refuser n'active rien). **Ne dictez aucune donnée identifiante.** La dictée de Windows (Win + H) passe, elle aussi, par
  un service en ligne selon la configuration du poste.

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

La recherche porte sur les fiches de la base locale de ce poste, qui comprend celles **lues dans le
dossier de données à l'ouverture**. Sans dossier connecté, un sujet examiné ailleurs n'apparaît
qu'après un import (*Importer / Fusionner*).

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

### Coordination et examen vestibulaire

L'encart de l'onglet « Examen neurologique » réunit la coordination (verticalisation, équilibre statique, marche,
talon-genou, doigt-nez) et quatre **épreuves vestibulaires** :

| Épreuve | Réponses | Côté demandé si anormale |
|---|---|---|
| **Romberg** (debout, pieds joints, yeux fermés) | négatif, positif | côté de la chute, ou chute non latéralisée |
| **Fukuda** (piétinement sur place, yeux fermés, bras tendus) | normale, anormale | côté de la rotation ou de la déviation |
| **Marche en étoile** (marche avant puis arrière, yeux fermés) | normale, anormale | côté de la déviation |
| **Marche funambule** (sur une ligne, talon contre pointe) | normale, anormale | côté de la déviation |

Une épreuve non réalisée reste vide. *Tout renseigner comme NORMAL* les cote normales. Un Romberg
positif cote l'instabilité du score vestibulaire « présente debout yeux fermés ». Dans la synthèse, les
épreuves anormales sont écrites avec les signes vestibulo-cochléaires.

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

Le schéma des **signes subjectifs** suit la question « Signes subjectifs » de l'examen général : répondre **NON** retire tout de suite l'encart
« Signes subjectifs — localisation » (de la page, de la liste des encarts et de la saisie) et **efface les zones déjà dessinées** ; sans réponse,
l'encart est proposé (avec un rappel : répondre OUI pour que le schéma soit exporté), et avec OUI aussi. Cliquer une seconde fois sur NON retire
la réponse, et l'encart revient. *Tout renseigner comme NORMAL* répond NON. La page imprimée ne change pas.

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

Dans l'en-tête de l'encart *Sensibilités*, à côté de *tout effacer*, le bouton **✓ 3 sensibilités
normales** cote d'un clic le **tact léger** et la **piqûre** normaux sur les 28 métamères des deux
côtés, la **pallesthésie** normale sur tous les reliefs, et répond OUI à *Examen des sensibilités
réalisé*. Il remplace les cotations déjà saisies.

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
précis se joignent à la **fiche du sujet**, dans l'encart *Pièces jointes* en fin d'onglet « Conclusion et évolution » (jusqu'à
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
2. En fin de mission : **Exporter** → *Télécharger la sauvegarde JSON* (un seul fichier) ou *Exporter tout
   en JSON* (une archive ZIP). Au choix, cochez dès le début *Télécharger le JSON de la fiche à chaque
   enregistrement* (bouton **Dossier de données**) : chaque fiche part alors dans Téléchargements.
3. Sur le poste principal : **Importer / Fusionner**, déposez le fichier, l'archive ou le dossier.

La fusion se fait sur `fiche_id`. Une fiche déjà présente n'est remplacée que si la version
importée est plus récente. Un double import ne crée pas de doublon.

Les fichiers du sous-dossier `fiches` se déposent de la même façon, plusieurs à la fois. Avec un
dossier de données connecté, c'est inutile : il est relu à chaque ouverture. Une fiche importée
rejoint aussi le dossier connecté.

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
- `dictionnaire_variables.csv` donne le libellé et le codage des 929 colonnes.

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
| Adressé par | `adresse_par` : `1 = SAMU 83`, `2 = SCMM`, `3 = autre SAMU`, `5 = SAU HNIA SA`, `4 = autre` (établissement, avec son type et son nom) ; `adresse_etab_type` : `1 = SAU`, `2 = centre hyperbare`, `3 = non défini` |
| Moyen d'évacuation | `evac_moyen` : `1` moyens propres, `2` VSAV / pompiers, `3` SMUR routier, `7` hélicoptère médicalisé, `8` hélicoptère non médicalisé, `6` autre |
| Sonde vésicale | `ac_sonde` : `2 = sonde à demeure`, `3 = sondage évacuateur`, `0 = non` ; `ac_sonde_vol` : volume initial évacué (mL) |
| Table de recompression | `tb_table` : `1 = A15`, `2 = A15IOT`, `3 = A18IOT`, `4 = A18`, `5 = B18`, `6 = A18HeOx`, `7 = B18HeOx`, `8 = C18`, `9 = autre` (texte dans `tb_table_autre`) ; `tb_duree` : durée de la table en minutes, calculée (A15 : 95) |
| ECG | `im_ecg`, `ecg_fc` (bpm), `ecg_qtc` (ms), `ecg_txt` (compte rendu, texte) |
| (Méthyl)prednisolone | `rx_solu`, `rx_solu_dose` (mg par jour), `rx_solu_jours` (jours), `rx_solu_h` (heure de la 1re dose) |
| Type de profil de plongée | `pl_profil_type` : `1 = carré`, `2 = inversé`, `3 = yoyo`, `4 = remontée progressive` (proposée d'office), `5 = apnée` ; inversé : `pl_prof1`, `pl_h_inv` ; yoyo : `pl_yoyo_nb`, `pl_yoyo_amp`, `pl_yoyo_surf` (`1 = oui`, `0 = non`), `pl_yoyo_int`, et `pl_yoyo_crit` (`1` si les critères du yoyo sont remplis, `0` sinon, calculé) ; remontée progressive : `pl_dpmax` (durée à la profondeur maximale, min), `pl_prof_df` (profondeur au départ du fond) |
| Apnée | `ap_nb` (nombre d'apnées), `ap_interval` (intervalle de surface, min), `ap_decomp` : `0 = aucune`, `1 = par réimmersion`, `2 = en surface` ; réimmersion : `ap_rim_int`, `ap_rim_duree` (min), `ap_rim_prof` (m), `ap_rim_gaz` ; en surface : `ap_surf_int`, `ap_surf_duree` (min), `ap_surf_gaz` ; gaz : `1 = air`, `2 = nitrox`, `3 = trimix`, `4 = héliox`, `5 = oxygène`, `9 = autre` ; la profondeur maximale des apnées est `pl_prof` ; type de plongée `pl_type = 5` |
| Conditions environnementales | `ff_courant`, `ff_houle` : `1 = OUI`, `0 = NON` ; `ff_visib` : `1 = bonne`, `2 = mauvaise`, `3 = inférieure à 1 m` ; `ff_env` : précisions, texte libre |
| Scores dans la synthèse | `sc_masquer` : `1` = scores MEDSUBHYP et vestibulaire non mentionnés (synthèse, CRH, impression), vide sinon ; `msh_total` et `vest_total` restent calculés |
| Score vestibulaire | `vest_vertige`, `vest_nystagmus`, `vest_nv`, `vest_instab` : `0` à `3` ; `vest_cochl` : `0` ou `1` (8 points) ; `vest_total` : `0` à `19` |
| Échographie pleuro-pulmonaire | 24 colonnes de zones `ech_<a ou p>_<D ou G>_<s ou i>_<lat, mdn ou mdl>` : `1 = A`, `2 = B`, `3 = B++`, `4 = C`, `5 = PNO`, vide = zone non examinée ; `ech_nb` (zones cotées), `ech_nb_A`, `ech_nb_B`, `ech_nb_Bpp`, `ech_nb_C`, `ech_nb_PNO`, `ech_anom_D`, `ech_anom_G` (zones hors A par poumon), `ech_pno`, `ech_zones` (liste), `ech_txt` (commentaire) |
| Procédure de décompression | `pl_proc` : `1 = ordinateur`, `2 = tables MN23`, `5 = tables MT 92`, `3 = autres tables`, `4 = sans procédure` |
| Durées du profil | `pl_dt` (DT, calculée), `pl_dtr` (DTR) et `pl_duree_tot` (DTP), en minutes, calculées d'après les heures ou saisies ; `pl_dtr_src` : `1` d'après les heures, `2` saisie, `3` estimée, `4` déduite de DTP − DT ; `pl_dtr_att_min`, `pl_dtr_att_max` : DTR attendue (modèle de remontée) ; `pl_vit_remontee` : vitesse de remontée déduite (m/min) |
| Procédure de ré-immersion | `pl_reimm_type` : `1 = remontée rapide (RR)`, `2 = remontée non conforme` ; `pl_reimm_faite` : `1 = réalisée`, `0 = non réalisée` ; `pl_rr_emersion` (`1`/`0`), `pl_rr_delai`, `pl_rr_prof`, `pl_rr_duree`, `pl_rr_pal6`, `pl_rr_pal3` (minutes ou mètres) ; `pl_reimm_txt` : description |
| Alcool sevré | `tox_alcool_sevre` (case), `alcool_sevre_date`, `alcool_sevre_stade` : `1` à `4`, comme `alcool_stade` |
| Examens complémentaires | `im_rp`, `im_tdm_thor`, `im_tdm_cer`, `im_irm_cer`, `im_irm_med`, `im_eto`, `im_dtc`, `im_echopp` : `1 = OUI`, `0 = NON` ; résultat de chacun dans `<examen>_res` (texte) ; `im_eto_fop` : case *recherche de FOP* de l'échographie cardiaque (`1` = cochée, vide sinon) |
| Épreuves vestibulaires | `romberg` : `0 = négatif`, `1 = positif` ; `fukuda`, `etoile` (marche en étoile), `funambule` : `0 = normale`, `1 = anormale` ; côtés : `romberg_cote` (`1 = D`, `2 = G`, `3 = non latéralisée`), `fukuda_cote`, `etoile_cote`, `funambule_cote` (`1 = D`, `2 = G`) |
| Doppler transcrânien | `dtc_repos` (sans sensibilisation), `dtc_sensib` (après sensibilisation allongée), `dtc_flack` (pendant un test de Flack) : `0 = absence de shunt D-G`, `1 = shunt de bas grade`, `2 = shunt de haut grade` ; `dtc_txt` : commentaire |
| Oxygène prescrit | `rx_o2_mode` : `1 = masque à haute concentration`, `2 = VNI` ; `rx_o2_debit` (L/min) ; `rx_vni_pep`, `rx_vni_ai` (cmH₂O), `rx_vni_fr` (/min), `rx_vni_fio2` (%) |
| Diagnostic retenu | `dg_liste` (une colonne binaire par diagnostic : `dg_liste_add`, `dg_liste_opi`, `dg_liste_baro`, `dg_liste_bioch`, `dg_liste_noyade`) ; types : `dg_add_types_*`, `dg_baro_types_*`, `dg_bioch_types_*` ; `dg_add_grave` (`1` = sévère) ; `dg_principal` : `add`, `opi`, `baro`, `bioch` ou `noyade` ; `dg_txt` : précisions |
| Conclusion de l'examen clinique | `conclusion` : `1 = examen neurologique normal`, `2 = anormal`, `3 = à recontrôler` |
| Listes à cases | une colonne binaire par case (`atcd_med_hta`, `tox_tabac`, `atcdp_add`…) et une colonne texte (valeurs séparées par `\|`) |
| Menus déroulants | `niv_loisir`, `niv_pro`, `niv_ens`, `organisme` : codes numériques listés dans le dictionnaire ; `99 = autre (à préciser)` |
| Paliers | `pl_pal_nb`, `pl_pal_secu`, `pl_pal_duree`, `pl_pal_prof_max`, `pl_pal_txt`, puis le détail des six premiers (`pl_pal1_gaz`, `pl_pal1_prof`, `pl_pal1_duree`, `pl_pal1_secu`…) |
| Biologie | `gds_ph`, `gds_po2`, `gds_pco2`, `gds_hco3`, `gds_hb`, `gds_ht`, `gds_lac` et `lab_leuco`, `lab_hb`, `lab_ht`… : nombres à point décimal (`7.35`), ou texte `<5` / `>20` quand la valeur a été saisie avec « < » ou « > » ; `gds_date`, `lab_date` : `AAAA-MM-JJ` ; `gds_h`, `lab_h` : `HH:MM` (date et heure du prélèvement) ; valeurs normales (femme et homme quand elles diffèrent) et unités dans le dictionnaire |

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
| Identité complémentaire | nationalité, profession, adresse, téléphone, e-mail (les trois derniers seulement si l'export de l'identité est autorisé) |
| Plongeur | IMC, antécédents (une colonne par case), habitudes toxiques et paquets-années `tabac_pa`, antécédents en plongée, niveaux, organisme, certificat médical |
| Plongée accidentelle | procédure, heures DS / DF / HS, `pl_prof`, `pl_dt`, `pl_dtr`, `pl_duree_tot`, `pl_dpmax`, paliers, apnée (`ap_*`) |
| Facteurs favorisants | les dix facteurs, puis `ff_courant`, `ff_houle`, `ff_visib`, `ff_env` |
| Biologie | 27 colonnes (rangs 470 à 496), à la suite des champs de la fiche et avant les colonnes calculées (`pl_dtr_src`, échographie, paliers) : `gds_*` (gaz du sang veineux) et `lab_*` (biologie), avec leur date et leur heure de prélèvement |

Pour les analyses courantes, les colonnes de synthèse suffisent. Les colonnes de détail servent
aux analyses topographiques fines.

---

## Changements de la version 8.2.0

Aucune colonne ne s'ajoute au CSV (929), aucune fiche n'est modifiée et les fiches de la 8.1.3 s'ouvrent telles quelles. Le
dictionnaire des variables ne change que par deux libellés : la table **A15** (code 1 de `tb_table`, qui s'appelait OHB15) et les
**valeurs normales** des paramètres de biologie qui diffèrent selon le sexe. Le papier ne change que par ce nom de table et, pour un
homme, par la colonne « VN » et le rouge du tableau de biologie de la synthèse (vérifié par comparaison avec la 8.1.3 : une fiche sans
table A15 ni biologie s'imprime à l'identique). `index.html` passe de 710 Ko à 719 Ko.
Six demandes. Dans les anciennes sections « Changements de la version… » plus bas, la table s'appelle encore OHB15 : c'était son nom d'alors.

### Ligne Excel COHB

- **Le nombre de tables est le nombre de tables enregistrées.** Les colonnes J à U (A15, A15HNO, B18Hx, …) comptent maintenant **une table
  par fiche qui en porte une** : un dossier de trois fiches portant chacune une table donne trois tables, comme les trois consultations de
  la colonne F. La 8.1.3 comptait les **séances déclarées** (« séances réalisées », « séances depuis la dernière consultation »), si bien
  que le total des tables dépassait le nombre de fiches : une fiche de suivi qui annonçait trois séances en comptait trois. Ces deux champs
  ne sont plus lus par cette ligne. Une fiche **sans table** n'en compte aucune ; une table « autre » n'est toujours rangée nulle part ; une
  table dont l'heure de mise en pression manque compte en heures ouvrables. Le compte rendu d'hospitalisation, lui, garde son décompte des
  séances par type de table (voir *Les recompressions, par type de table*).

### Ligne Excel ADP

- **« — » = 0.** Quand la fiche initiale laisse « — » (rien de choisi) dans l'**organisme d'affiliation**, le **niveau de plongeur de
  loisir**, le **niveau d'enseignement**, le **niveau de plongeur professionnel** ou le **niveau militaire**, les cases correspondantes du
  fichier maître reçoivent **0** (colonnes L, M, N, O et P) au lieu de rester vides. La colonne O écrivait « Aucun » quand le dossier n'avait
  pas de plongée professionnelle : elle écrit 0, comme les autres. La colonne P reçoit aussi 0 pour un niveau professionnel **civil** (le
  libellé n'y est écrit que pour un plongeur d'armes). Un dossier **sans fiche initiale** laisse ces cases vides : c'est la fiche initiale qui
  pose ces questions, une case vide veut alors dire « inconnu ».

### Table « A15 »

- **La table « OHB15 » s'appelle « A15 »** partout : liste des tables de la recompression, synthèse (« Table A15 »), compte rendu
  (« A15 : 3 »), papier, dictionnaire (`1 = A15`), lignes Excel. Le code (1) et la durée (95 min) ne changent pas : les fiches déjà
  enregistrées, les fichiers JSON et le CSV (qui ne portent que le code) sont inchangés ; l'application les affiche avec le nouveau nom.

### Biologie

- **Valeurs normales de l'homme, selon le sexe de la fiche.** Les VN de votre feuille sont celles de la femme ; vos annotations donnent celles
  de l'homme pour **11 paramètres** (hémoglobine et hématocrite du gaz du sang et du bilan, leucocytes, plaquettes, neutrophiles, créatinine, CK,
  myoglobine, NT-pro-BNP). L'application choisit les valeurs d'après le **sexe renseigné** (onglet Administratif : M, F ou Autre ; à défaut, celui de la première fiche du
  dossier qui le porte) : sous le libellé (« VN homme 13,5 - 17,5 »), pour la mise en gras et en rouge, dans le tableau de la synthèse et du
  compte rendu, et dans le dictionnaire (les deux fourchettes). Changer le sexe réaffiche les VN et recolore les valeurs déjà saisies. Voir
  *Les valeurs normales s'adaptent au sexe*.
- **Plus de mention « au-dessus des VN » ou « en dessous des VN »** : seuls restent le **gras** et le **rouge**. L'en-tête de chaque encart ne
  dit plus que le nombre de valeurs saisies (« 3 valeurs »), sans décompte de celles qui sortent des VN.
- **Plus d'encart orange** en tête de l'encart « Gaz du sang veineux » (le rappel sur les VN, le gras et le rouge, les tableaux de la synthèse,
  la virgule et les signes « < » et « > »). Ces règles restent décrites ici ; le champ accepte toujours la virgule, le point, « < » et « > ».

### Signes subjectifs

- **Signes subjectifs = NON : l'encart « Signes subjectifs — localisation » disparaît.** Répondre NON à « Signes subjectifs » (examen général)
  retire tout de suite l'encart du schéma, et **efface les zones déjà dessinées** ; sans réponse, ou avec OUI, il reste proposé. « Tout renseigner
  comme NORMAL » répond NON. Voir *Les schémas corporels*.

### Copie du texte vers le dossier patient

- **Le gras et le souligné se collent maintenant directement dans l'éditeur de texte du dossier patient** (sous Firefox). Votre éditeur ne lisait pas
  le texte enrichi que le navigateur dépose (du HTML) et collait du texte brut ; Word lit ce HTML puis réécrit du RTF, que l'éditeur comprend très
  probablement : d'où le détour. **Copier** (synthèse) et **Copier le CRH** déposent désormais aussi le **RTF**, avec les titres en gras et soulignés, les anomalies en
  gras, les valeurs de biologie hors VN en gras et en rouge, et les tableaux. Le collage dans Word reste possible, directement. Sous **Chrome
  et Edge**, rien ne change : ces navigateurs n'écrivent pas de RTF. La case « Copie du texte » de la fenêtre **Exporter** coupe cette option. Voir
  *Copier vers un traitement de texte ou le dossier patient*.

### À valider de votre côté

- **NT-pro-BNP de l'homme : 10 - 63.** C'est la seule valeur de votre annotation qui me paraît suspecte : la limite haute de l'homme (63 ng/L)
  est plus de trois fois plus basse que celle de la femme (202 ng/L). Le sens de l'écart est plausible (les femmes ont des NT-pro-BNP plus
  élevés), son ampleur l'est moins : « 63 » est-il bien ce que vous vouliez écrire ? J'ai repris **63** tel qu'il est écrit ; la valeur est dans
  `BIO_LAB` (ligne `lab_ntbnp`, champ `m`), en tête de `index.html`. La **myoglobine de l'homme** est écrite d'une encre pâle sur le scan : j'ai lu
  « 28,0 - 72 ».
- **Les paramètres sans valeur d'homme** dans votre annotation (pH, pO₂, pCO₂, HCO₃⁻, lactates, fibrinogène, D-dimères, protéines totales,
  DFG, CRP, albumine, troponine) ont la **même fourchette pour les deux sexes** : j'ai lu une case vide comme « identique à la femme ».
- **Le sexe non renseigné** (ou « autre ») : l'application ne choisit pas. Elle affiche **les deux fourchettes** (« VN F 12 - 16 ; H 13,5 - 17,5 »)
  et ne met en rouge qu'une valeur **hors des deux** (une hémoglobine à 17 g/dL n'est alors pas en rouge). Dites-moi si vous préférez les valeurs
  de l'homme ou de la femme par défaut.
- **Les tables comptées une à une** : j'ai lu votre phrase comme « une fiche = une table = une séance ». Une fiche qui annonce plusieurs séances
  n'en compte donc qu'une ; si une même fiche couvre deux séances, il faut une fiche par séance. La table **B18 proposée d'office** sur la fiche
  initiale compte comme une table : videz le champ quand aucune recompression n'a eu lieu (comme pour le compte rendu).
- **« — » = 0** : j'ai appliqué cette règle aux colonnes **L, M, N, O et P**. La colonne R (qualification du médecin) reste **vide** quand rien
  n'est choisi : la légende de votre fichier n'y prévoit pas de 0 ; dites-moi si vous la voulez aussi. Je n'ai pas touché aux autres colonnes
  (« Plongeur pro » K, par exemple, écrit déjà 0 ou 1 dès que la plongée est renseignée).
- **Signes subjectifs = NON efface le schéma** (les zones dessinées sont supprimées de la fiche, pas seulement masquées) : si l'on répond NON par
  erreur puis OUI, le schéma est à refaire. La page imprimée n'est pas modifiée.
- **La copie en RTF n'a été essayée que dans les conditions suivantes** : **Firefox 137**, un vrai clic, et un contrôle de texte enrichi de
  Windows (RichEdit) qui ne lit que le RTF, comme l'éditeur que vous décrivez : titres, gras, souligné, rouge, tableaux et accents s'y collent.
  **Rien n'a été essayé avec l'éditeur réel de votre dossier patient, ni avec Word (qui lit le HTML ou le RTF), ni avec votre version exacte de
  Firefox.** Collez une première fois un texte de test dans une fiche de formation avant de vous en servir ; en cas de signes étranges,
  décochez la case « Copie du texte » dans **Exporter**. Sous Chrome et Edge, le gras ne passe pas dans un éditeur qui ne lit que le RTF.
- **Ce qui a été essayé.** Les suites de la 8.2.0 (valeurs normales de l'homme et de la femme aux bornes, tables comptées, zéros de la ligne
  Excel ADP, encart des signes subjectifs, RTF et écriture dans le presse-papiers) et toutes celles des versions précédentes passent
  (846 contrôles). Rien n'a été essayé avec Excel.

---

## Changements de la version 8.1.3

Aucune colonne ne s'ajoute au CSV (929) et aucune fiche n'est modifiée : le fichier de données, son dictionnaire et le papier sont
identiques à ceux de la 8.1.2 (vérifié par comparaison avec la 8.1.2), et les fiches de la 8.1.2 s'ouvrent telles quelles.
`index.html` reste à 710 Ko. Deux retouches, toutes deux sur les lignes Excel.

### Ligne Excel

- **La ligne du fichier maître s'appelle maintenant « ligne Excel ADP »** : bouton **Exporter** › **Ligne Excel ADP du dossier
  ouvert**, bouton « ligne Excel ADP » dans l'en-tête du compte rendu d'hospitalisation, titre et onglet de la fenêtre (« Ligne Excel
  ADP (89 colonnes) »), aide de l'application et notice. Le classeur téléchargé se nomme `ligne_excel_ADP_AAAA-MM-JJ.xlsx` (il se
  nommait `ligne_excel_AAAA-MM-JJ.xlsx`). Le contenu de la ligne ne change pas.
- **L'autre ligne s'appelle « ligne Excel COHB »** (elle se nommait « ligne COHB »), par symétrie ; son classeur se nomme
  `ligne_excel_COHB_AAAA-MM-JJ.xlsx` (il se nommait `ligne_excel_cohb_AAAA-MM-JJ.xlsx`).
- **Heures ouvrables de la ligne Excel COHB : du lundi au vendredi, de 7 h 45 à 16 h 00, hors jours fériés** (la 8.1.2 retenait 8 h à
  18 h). La borne de 7 h 45 est comprise, celle de 16 h 00 est exclue : une mise en pression à 7 h 44 ou à 16 h 00 pile compte **hors
  heures ouvrables** (période N, colonnes « HNO »), une mise en pression à 7 h 45 ou à 15 h 59 compte **en heures ouvrables** (période
  O). Le samedi, le dimanche et les jours fériés restent W. Cela change la période de la première séance (colonne G) et le rangement
  des séances dans les colonnes « HNO » (voir *La ligne Excel COHB (activité COHB)*).

### À valider de votre côté

- **Les bornes** : j'ai compté **16 h 00 pile** hors heures ouvrables et **7 h 45 pile** en heures ouvrables. Dites-moi si vous voulez
  l'inverse : c'est une constante (`COHB_HO`, dans la partie COHB de `index.html`).
- **Les séances déclarées sans heure** (une fiche de suivi qui annonce plusieurs séances, dont une seule porte son heure de mise en
  pression) restent comptées en **heures ouvrables**, faute d'heure.
- **Le nom de l'autre ligne** : « ligne Excel COHB » est un choix de ma part, par symétrie avec « ligne Excel ADP » ; dites-moi si
  vous préférez « ligne COHB ».
- **Ce qui a été essayé.** Les suites de la 8.1.3 (heures ouvrables aux bornes, séances, noms des deux lignes, menu, aide, noms des
  classeurs) et toutes celles des versions précédentes passent (747 contrôles). Rien n'a été essayé avec Excel ni avec votre
  navigateur (Firefox).

---

## Changements de la version 8.1.2

**27 colonnes s'ajoutent au CSV (902 → 929)**, toutes de biologie, à la suite des champs de la fiche (rangs 470 à 496). Les 902
autres colonnes, leur ordre, le dictionnaire de leurs libellés et le papier d'une fiche sans biologie sont identiques à ceux de la
8.1.1 (vérifié par comparaison avec la 8.1.1), et les fiches de la 8.1.1 s'ouvrent telles quelles. `index.html` passe de 670 Ko à
710 Ko. Trois demandes.

### Ligne Excel

- **Colonne « ordinateur » (CA) du fichier maître** : la case porte maintenant la **marque et le modèle** de l'ordinateur,
  **suivis de ses réglages** (« Suunto D5 - GF 35/75 »). Elle ne portait que le réglage.
- **Ligne pour l'activité COHB** : une seconde ligne Excel, de **31 colonnes (A à AE)**, pour la feuille « Activité COHB » (voir
  *La ligne Excel COHB (activité COHB)*). Même fenêtre que la ligne du fichier maître, qui propose les deux feuilles ; même copie (texte à
  tabulations) et même classeur .xlsx. Boutons : **Exporter** › **Ligne COHB du dossier ouvert**, et **ligne COHB** dans l'en-tête du
  compte rendu d'hospitalisation.

### Saisie et synthèse

- **Nouvel onglet « Examens complémentaires »** (le cinquième ; la conclusion devient le sixième). Il réunit le **gaz du sang
  veineux**, la **biologie**, puis l'ECG, l'imagerie, l'échographie cardiaque, le doppler transcrânien, l'échographie
  pleuro-pulmonaire, les autres examens et les examens demandés, qui se trouvaient dans l'onglet « Conclusion et évolution ». Celui-ci
  **persiste avec les éléments de décision et de suivi** : recompression, actes, traitements prescrits, évolution, diagnostic retenu,
  sortie, orientation et commentaires, compte rendu d'hospitalisation, pièces jointes. Le bouton **Suivant** du bandeau nomme le nouvel
  onglet « Examens compl. ».
- **Biologie horodatée** : 7 paramètres de gaz du sang veineux et 16 de biologie, **dans l'ordre de votre note, avec leurs valeurs
  normales (VN) et leurs unités** (voir *Examens complémentaires : la biologie*). Date et heure du prélèvement proposées d'après la
  fiche, modifiables. Une valeur **hors des VN** s'écrit en **gras et en rouge**, dans la fiche et dans la synthèse. L'hémoglobine et
  l'hématocrite du bilan sont reprises du gaz du sang du même jour tant qu'on ne les saisit pas.
- **Tableaux dans la synthèse** : un tableau pour le gaz du sang, un pour la biologie, **une colonne par prélèvement du dossier, le
  plus récent à gauche** ; ils s'enrichissent de jour en jour. Le compte rendu d'hospitalisation reprend ceux de tout le dossier. Sur
  le papier, ils s'impriment dans l'encart « Synthèse ».
- Seul l'affichage des examens change de place : les champs de l'ancien onglet 5 gardent leur nom, leur codage et leur place dans le
  CSV et sur le papier.

### À valider de votre côté

- **Les valeurs normales de votre note** sont celles d'un dosage **féminin** pour l'hémoglobine (12 - 16), l'hématocrite (37 - 46), la
  créatinine (45 - 84) et probablement les CK et la myoglobine : elles s'appliquent ici à **tous** les patients (un homme à 17 g/dL
  d'hémoglobine sortira en rouge). Dites-moi si vous voulez des VN selon le sexe : elles sont dans `BIO_GDS` et `BIO_LAB`, en tête de
  `index.html`, une ligne par paramètre.
- **L'unité des bicarbonates** : votre note écrit « mmHg » pour le HCO₃⁻ veineux ; j'ai mis **mmol/L**, l'unité du dosage. Le DFG est
  écrit « mL/min/1,73 m² ».
- **« Horodatés »** : j'ai donné une date et une heure de prélèvement aux deux encarts de biologie. Les autres examens (ECG,
  imagerie…) gardent l'horodatage de la fiche qui les porte ; si vous voulez une heure par examen, dites-le-moi.
- **Les Hb et Ht du bilan reprises du gaz du sang** ne font pas, à elles seules, un tableau « Biologie » dans la synthèse (elles
  figurent déjà dans celui du gaz du sang) ; dès qu'une autre valeur du bilan est saisie, elles y figurent.
- **Heures ouvrables** (colonnes COHB) : j'ai retenu du **lundi au vendredi, de 8 h à 18 h, hors jours fériés**. Une séance dont
  l'heure n'est pas connue est comptée en heures ouvrables. Une table « autre » n'est rangée dans aucune colonne ; A15IOT et A18IOT
  sont comptées ensemble (IOT), A18HeOx et B18HeOx ensemble (B18Hx) : c'est ma lecture de vos en-têtes, à confirmer.
- **Les colonnes COHB que l'application ne recueille pas** restent vides : séances « en repose pied » et « Alité », pansements, PRF,
  PTcO2, audio / tympan, EE / plateau technique, écho-doppler, CACI plongée. La **résidence** est déduite de l'adresse (ou, à défaut,
  de la nationalité) : c'est la colonne la moins sûre. La **date de clôture** est celle de la dernière fiche du dossier.
- **Ce qui a été essayé.** Les suites de la 8.1.2 (colonne ordinateur et ligne COHB, onglet biologie, synthèse, compte rendu et papier)
  et toutes celles des versions précédentes passent (713 contrôles) ; le classeur COHB a été relu avec un lecteur .xlsx indépendant et
  ses 31 en-têtes sont identiques à ceux de votre feuille. Rien n'a été essayé avec Excel, ni avec votre navigateur (Firefox), ni sur un
  téléphone réel : collez une première ligne dans une copie de votre feuille avant de l'utiliser.

---

## Changements de la version 8.1.1

Aucune colonne ne s'ajoute au CSV (902) et aucune fiche n'est modifiée : le fichier de données, son dictionnaire et le papier
sont identiques à ceux de la 8.1.0, et les fiches de la 8.1.0 s'ouvrent telles quelles. `index.html` passe de 660 Ko à 670 Ko.
Quatre retouches, toutes à l'écran.

### Saisie

- **Onglet Administratif** : l'encart « Identité complémentaire » s'affiche maintenant **après** « Mode d'entrée et prise en
  charge initiale » (il le précédait). L'ordre est : identification, mode d'entrée et prise en charge initiale, identité
  complémentaire, contacts. Seul l'affichage change : l'ordre des colonnes du fichier de données et celui du papier ne bougent pas.
- **Bandeau patient** : un bouton **Suivant**, à droite, nomme l'onglet suivant (Anamnèse, Examen, Neuro, Conclusion) et y mène
  d'un clic. Il disparaît sur le dernier onglet. Le bandeau se range désormais en deux zones : les champs à gauche, le type de
  consultation et le bouton à droite (sur téléphone, la disposition d'avant est conservée, le bouton clôt la dernière ligne).

### Dictée vocale

- **Chrome** : « antécédent numéro un » s'écrivait « Antécédent antécédent numéro antécédent numéro 1 ». Chrome rend parfois
  chaque résultat avec tout le texte déjà dit (« antécédent », « antécédent numéro », « antécédent numéro 1 ») ; ADP les ajoutait
  bout à bout. Le texte est maintenant recomposé à chaque résultat, à partir de la liste complète : « Antécédent numéro 1 », une
  seule fois, même si le même résultat arrive deux fois.
- **Le micro s'éteint tout seul** : une seconde après la dernière parole (cinq secondes si personne n'a encore parlé). Le
  dernier texte reconnu est posé avant l'arrêt. Le micro ne repart plus seul : un nouveau clic relance la dictée. Un second clic
  pendant la dictée l'arrête aussitôt ; le dernier texte reconnu est posé (il était perdu auparavant). Changer d'onglet, de
  champ ou de fiche éteint le micro.

### À valider de votre côté

- **Le délai d'une seconde.** Une pause de plus d'une seconde en pleine phrase arrête la dictée : il faut recliquer. Si c'est
  trop court, dites-le-moi : c'est un réglage (`DICT_T` dans `index.html`), qui se change en une ligne. Avant la première parole, j'ai
  laissé cinq secondes : à une seconde, le micro se serait éteint avant que l'on ait eu le temps de commencer à parler.
- **Ce qui a été essayé pour la dictée.** Un faux navigateur qui rend les résultats comme Chrome (provisoire, définitif,
  cumulatif, arrêt qui rend un dernier texte) : le défaut signalé est reproduit sur la 8.1.0 et corrigé sur la 8.1.1. Rien n'a été
  essayé avec un vrai micro ni avec votre Chrome. Si la duplication persistait, dites-moi sur quel appareil (ordinateur, Android,
  iPhone) et avec quelle version de Chrome.
- **Le bouton Suivant du bandeau** porte le nom court de l'onglet, sans bouton « Précédent » : dites-moi si vous le voulez aussi.
  Sur une consultation de suivi ou de sortie, l'onglet Anamnèse n'existant pas, il propose Examen.
- **Le papier** garde son ordre (l'identité complémentaire s'imprime avec « Le plongeur ») : seul l'ordre à l'écran a été inversé.

---

## Changements de la version 8.1.0

Aucune colonne ne s'ajoute au CSV (902) et aucune fiche n'est modifiée : les fiches de la 8.0.0 s'ouvrent telles quelles.
Le seul changement est **le nom des fichiers JSON des fiches**. `index.html` passe de 650 Ko à 660 Ko.

### Le nom des fichiers JSON

- Les fichiers JSON des fiches s'appellent désormais **`xxx-aaaa_bbbbbbbb-EXc.json`** : numéro d'accident (trois chiffres au
  moins, `001` pour le premier de l'année), année de la prise en charge, numéro de dossier, numéro d'examen. Exemple :
  `187-2026_50987654-EX1.json`. Auparavant : `fiche_<identifiant>.json`. Le nouveau nom s'applique au **dossier de données**
  (sous-dossier `fiches`), à **Exporter tout en JSON** (dossier choisi ou archive ZIP) et au **téléchargement du JSON à chaque
  enregistrement**. Règles complètes : *Le nom des fichiers JSON*.
- **Renommage dans le dossier de données** : quand le rang d'un examen, le numéro d'accident ou le numéro de dossier change, les
  fichiers concernés sont renommés à l'enregistrement, sans rien perdre. Deux fiches ne partagent jamais un fichier : si le
  nom est déjà pris, la fiche prend le même nom suivi de son identifiant.
- **Anciens fichiers** `fiche_<identifiant>.json` : toujours lus, renommés quand leur fiche est enregistrée, ou tous d'un
  coup par **Réécrire tout le dossier** ; la fenêtre *Dossier de données* indique combien en restent.
- **Corbeille** : `fiches/supprimees` reçoit le nom habituel suivi de `~` et de l'identifiant de la fiche.
- **Fenêtre « Exporter tout en JSON »** : elle explique le nom et signale les fiches dont le numéro d'accident manque (leur nom
  commence par `000`).
- **Lecture du dossier de données** : tous les `.json` du sous-dossier `fiches`, comme avant ; à la racine, les fichiers au
  nouveau nom (une exportation déposée là, par exemple) sont lus comme les `fiche_*.json`.
- **`.gitignore`** : il bloque aussi ces noms de fichiers (et `fiche_*.json`, les sauvegardes et les archives ZIP), pour qu'une
  fiche exportée ne parte pas par erreur sur GitHub.
- La mention « 887 colonnes » de cette notice, restée de la 7.4.0, est corrigée : le CSV compte **902** colonnes.

### À valider de votre côté

- **L'année.** Je l'ai prise sur le **premier examen du dossier** (la date d'« Entrée » du bandeau), pas sur l'accident ni sur
  chaque examen : un dossier ouvert le 31 décembre et suivi en janvier garde la même année sur tous ses fichiers. Dites-moi
  si « année de prise en charge » désigne autre chose (année de l'accident, de l'arrivée).
- **Le numéro d'accident.** Je le lis dans « Accident de plongée n° » de la **fiche initiale**, et tous les examens du dossier le
  reprennent. Seuls les chiffres sont retenus, sur trois au moins ; sans numéro, le nom commence par `000`.
- **Le numéro d'examen.** C'est « Examen n° » du bandeau, le rang dans le **dossier**. Si un même numéro de dossier servait à
  plusieurs accidents d'un même patient, ses examens se suivraient (`EX1`, `EX2`, `EX3`…) sous le numéro d'accident et l'année du
  premier : dites-le-moi, le rang devrait alors se compter par accident.
- **La confidentialité.** Avant, le nom d'un fichier ne portait aucune donnée du patient ; maintenant il porte le **numéro de
  dossier** et le numéro d'accident. Toujours ni nom, ni prénom, ni date de naissance. À peser si des fichiers circulent hors
  du service ; avec la pseudonymisation, c'est le pseudonyme `P-…` qui figure dans le nom.
- **Les anciens fichiers** ne sont pas renommés d'office à l'ouverture, pour ne pas réécrire d'un coup tout un dossier
  (surtout s'il est synchronisé en ligne) : dites-moi si vous préférez une migration automatique.
- **Ce qui n'a pas été essayé** : l'écriture dans un vrai dossier sous Chrome ou Edge (les essais ont utilisé le système de
  fichiers privé d'Edge, avec les mêmes appels) ; sous Firefox, qui n'écrit pas dans un dossier, ne sont concernés que le ZIP et
  le téléchargement à chaque enregistrement.

---

## Changements de la version 8.0.0

Quinze colonnes s'ajoutent au CSV (**887 → 902**) : `pl_dpmax`, `ap_nb`, `ap_interval`, `ap_decomp`, `ap_rim_int`,
`ap_rim_duree`, `ap_rim_prof`, `ap_rim_gaz`, `ap_surf_int`, `ap_surf_duree`, `ap_surf_gaz`, `ff_courant`, `ff_houle`,
`ff_visib`, `sc_masquer`. Aucune n'est retirée ni recodée : les fiches de la 7.4.0 s'ouvrent telles quelles. Deux codes
s'ajoutent à des listes existantes : `adresse_par = 5` (SAU HNIA SA) et `pl_profil_type = 5` (apnée). Dans le
dictionnaire, l'intitulé de section entre parenthèses change pour les six champs déplacés (« Identité complémentaire »
au lieu de « Le plongeur ») et `ff_env` s'appelle désormais « Conditions environnementales — précisions ».

`index.html` passe de 570 Ko à 650 Ko. Le générateur de courriers du service n'y est **pas** intégré (il porte les
signatures et les numéros RPPS des médecins, et ADP peut être publié) : ADP le fait choisir une fois et le garde dans la
base locale du navigateur.

### Saisie

- **Identité complémentaire** (nationalité, profession, adresse, téléphone, e-mail) : dans l'onglet **Administratif**.
  Le poids, la taille et l'IMC restent avec le plongeur.
- **Adressé par** : nouvelle réponse **SAU HNIA SA**, dans « Alerte et évacuation ».
- **Profil de plongée** : la **remontée progressive** est le type proposé d'office (et dessiné quand aucun type n'est
  choisi), avec la nouvelle donnée **durée à la profondeur maximale** ; nouveau type **Apnée**, avec ses paramètres
  (profondeur maximale des apnées, nombre d'apnées, intervalle de surface, décompression par réimmersion ou en
  surface : intervalle, durée, profondeur, gaz).
- **Conditions environnementales** cotées : courant, houle de surface (OUI / NON), visibilité (bonne, mauvaise,
  inférieure à 1 m), avec un texte libre en complément.
- **Table OHB15** : 95 minutes (90 auparavant).
- **Dictée vocale** dans les encarts de texte.
- **Case « ne pas mentionner les scores »** MEDSUBHYP et vestibulaire, pour les accidents autres que de décompression.

### Bandeau, synthèse et compte rendu

- Le **bandeau patient** porte aussi le **numéro de l'examen**, la **date d'entrée** (premier examen) et le **dernier
  diagnostic retenu**.
- Le compte rendu d'hospitalisation **compte les recompressions par type de table**.
- La synthèse écrit les conditions environnementales cotées et la plongée en apnée.

### Export et documents

- **Ligne pour le fichier Excel maître** : une ligne de 89 colonnes composée à partir de toutes les fiches du dossier,
  à copier-coller ou en classeur .xlsx.
- **Documents de sortie** : le générateur de courriers du service s'ouvre depuis la consultation de sortie, rempli
  avec ce que la fiche sait. Son fichier se choisit une fois et reste dans la base locale du navigateur.

### À valider de votre côté

- **« Identité et terrain ».** J'ai déplacé vers l'onglet Administratif ce que contenait l'intertitre « Identité et
  terrain » : nationalité, profession, adresse, téléphone, e-mail. Les antécédents, les habitudes toxiques, le traitement,
  les allergies, les antécédents en plongée et les niveaux de plongée restent dans « Le plongeur » (onglet Anamnèse et
  plongée), qui garde le poids, la taille et l'IMC. Dites-moi si « terrain » désignait aussi les antécédents : c'est un
  déplacement d'une seule ligne.
- **L'apnée** : deux boutons désignent la même chose (type de profil « Apnée » et type de plongée « Apnée »). La
  profondeur maximale des apnées est la Pmax habituelle ; « intervalle de surface » est celui qui sépare deux apnées ;
  l'intervalle de la décompression se compte depuis la dernière apnée. Une réponse « Aucune » existe pour la décompression.
- **Le profil par défaut.** Les fiches de la 7.4.0 dont le type de profil n'avait pas été choisi sont désormais dessinées
  en remontée progressive, et leur DTR attendue (colonnes `pl_dtr_att_min`, `pl_dtr_att_max`, `pl_vit_remontee`) se calcule
  sur ce profil : ces trois colonnes peuvent changer à la prochaine réécriture du CSV.
- **OHB15 à 95 minutes** : l'heure de fin déjà enregistrée sur une fiche n'est pas recalculée.
- **Le décompte des recompressions** : une fiche qui porte une table compte pour le plus grand de ses deux nombres de
  séances (au moins une) ; les séances d'évolution sans table sont « de type non précisé ». La table B18 proposée d'office
  compte, tant qu'on ne l'a pas retirée.
- **La ligne Excel** : toutes les règles de correspondance du tableau « D'où vient chaque colonne », en particulier les
  codes des colonnes G, L, M, N, R, AS, AU, BK, BN, BO, BQ, BS, BT, BU, le classement des tables entre les colonnes BS et
  BT, « circuit ouvert » par défaut (Z), le lieu reconnu dans le texte (Y), les mois convertis en jours (BZ). Essayez de
  coller la ligne dans une copie de votre fichier maître.
- **Les documents de sortie** : le motif tiré du diagnostic, les textes « présente cliniquement » et « examens
  complémentaires réalisés » proposés pour le certificat de premières constatations, le signataire reconnu. **Le choix du
  fichier du générateur à la première utilisation** (au lieu d'un générateur embarqué : voir plus haut pourquoi).
  L'impression depuis la fenêtre intégrée n'a pas été essayée sous Firefox.
- **La dictée** : elle a été essayée avec une reconnaissance simulée, pas avec un vrai micro ; sous Firefox, le bouton ne
  fait que renvoyer à la dictée de Windows.
- **La case « scores »** retire les scores de la synthèse, du compte rendu, de l'impression et de la ligne Excel : dites-moi
  si elle ne doit concerner que la synthèse.

---

## Changements de la version 7.4.0

Quatre colonnes s'ajoutent au CSV (**883 → 887**) : `nb_plongees_total`, `sortie_exam_second`, `inapt_type`,
`inapt_mois`. Aucune n'est retirée ni recodée : les fiches de la 7.3.3 s'ouvrent telles quelles. Les intitulés de
section qui figurent dans le dictionnaire (entre parenthèses) restent ceux de la 7.3.3 ; seul l'onglet qui les
contient change.

### Saisie

- **Cinq onglets** au lieu de quatre : *Administratif*, *Anamnèse et plongée*, *Examen clinique général*, *Examen
  neurologique*, *Conclusion et évolution*. L'ancienne page 1 se scinde en deux ; les trois autres gardent leur
  contenu. En suivi et en sortie, l'onglet « Anamnèse et plongée » disparaît.
- **Bandeau patient** permanent : nom, prénom, naissance, accident, dossier.
- **Nombre total de plongées réalisées** dans « Le plongeur ».
- **Sortie** : examens à réaliser secondairement, inaptitude à la plongée (mois ou définitive).

### Synthèse rédigée

- **Paragraphes distincts**, titres en gras et soulignés ; l'ancien paragraphe « Histoire de l'accident » devient
  quatre paragraphes (le plongeur, la plongée, les symptômes, la prise en charge initiale).
- **Anomalies en gras.**
- **L'examen dit en syndromes** : « absence de déficit moteur », « absence de syndrome pyramidal »… quand tout est
  normal ; « un syndrome pyramidal bilatéral », « un déficit moteur de type paraparésie »… quand il ne l'est pas.
- Copie en **texte enrichi** (titres soulignés, gras) ; sur un navigateur qui ne sait pas écrire du texte enrichi
  dans le presse-papiers (Firefox ancien), la copie passe par une sélection temporaire.

### Compte rendu d'hospitalisation

- Encart **CRH** sur la consultation de sortie : texte enrichi sans en-tête, écrit à partir de toutes les fiches du
  dossier ; examens paracliniques réunis ; évolution horodatée.

### À valider de votre côté

- **Le découpage des onglets.** L'alerte, l'évacuation et les soins sur place restent dans « Mode d'entrée et prise
  en charge initiale », donc dans l'onglet *Administratif* ; la nationalité, la profession, l'adresse et le
  téléphone restent dans « Le plongeur », onglet *Anamnèse et plongée*. Dites-moi si vous voulez les déplacer.
- **Le vocabulaire des syndromes** (tableau de la section *La synthèse rédigée*) : syndrome pyramidal dès un signe
  pyramidal, syndrome cérébelleux limité aux signes cinétiques, déficit sensitif « dissocié », atteinte médullaire
  d'après l'AIS. C'est une proposition de rédaction, pas une classification validée.
- **Le CRH** : sa structure, la place des scores, le fait que les examens demandés en attente n'y figurent pas, la
  forme « amélioration / aggravation / autres modifications ».
- **Données de santé** : le CRH copié contient des données de santé sans l'identité ; une fois collé, il est
  soumis aux mêmes règles que le dossier du patient.

---

## Changements de la version 7.3.3

Aucune colonne du CSV n'est ajoutée, retirée ni recodée : les fiches de la 7.3.2 s'ouvrent telles quelles.

### Exporter tout en JSON

- **Nouveau bouton** dans **Exporter** (et dans le menu du téléphone) : toutes les fiches, une par fichier, dans
  un **dossier choisi** (le sélecteur s'ouvre sur **Téléchargements**) ou dans une **archive ZIP** enregistrée
  dans Téléchargements par défaut. Voir *Exporter tout en JSON*.
- **Importer / Fusionner** lit désormais aussi une **archive ZIP** et un **dossier entier**.

### Choix du dossier : correction

- Un navigateur sans écriture directe affichait un écran sans issue (« Écriture directe non disponible »).
  **Dossier de données** explique désormais la cause (page ouverte en HTTP ou dans un cadre, Firefox, Safari,
  mobile, réglage ou stratégie du navigateur), donne un **diagnostic copiable** et propose ce qui fonctionne :
  archive ZIP, **téléchargement automatique du JSON à chaque enregistrement** (case à cocher), import d'un
  dossier. La barre d'état renvoie vers cette explication.
- Quand le sélecteur de dossier **échoue** (dossier refusé, accès bloqué), l'erreur est expliquée avec un
  bouton **Réessayer**, au lieu d'un simple message qui disparaît.
- Le sélecteur s'ouvre sur **Documents** pour le dossier de données, et sur **Téléchargements** pour l'export.
- L'écriture d'un fichier est **retentée deux fois** en cas de verrouillage passager (antivirus, indexation de
  Windows), et un fichier abandonné est libéré proprement.
- Les messages affichés à l'écran restent plus longtemps quand ils sont longs.

### À valider de votre côté

- **Le navigateur qui ouvre `index.html`** : le diagnostic le nomme. Sur ordinateur, Edge ou Chrome permet de
  choisir le dossier une seule fois ; si Windows ouvre le fichier dans un autre navigateur, faites un clic
  droit, **Ouvrir avec**.
- **Téléchargement automatique du JSON** (navigateurs sans dossier) : un fichier par enregistrement dans
  Téléchargements, les copies d'une même fiche étant numérotées par le navigateur.
- **Dossier d'export** : un sous-dossier de Téléchargements, car les navigateurs refusent Téléchargements
  lui-même.

---

## Changements de la version 7.3.2

Cette version change la façon dont les fiches vivent sur le disque. Aucune colonne du CSV n'est
ajoutée, retirée ni recodée : les fiches de la 7.3.1 s'ouvrent telles quelles.

### Dossier de données

- **L'enregistrement écrit un fichier JSON par fiche** dans un dossier choisi **une seule fois**
  (`fiches/fiche_<identifiant>.json`), puis le CSV et le dictionnaire. Au premier enregistrement, si
  aucun dossier n'est choisi, le sélecteur s'ouvre ; ensuite, plus rien à renseigner.
- **L'ouverture relit le dossier** : les fiches qu'il contient rejoignent la base locale, ce qui rend la
  recherche par nom, prénom, naissance ou numéro valable pour toutes. Le dossier de recherche est
  **le même que le dossier d'enregistrement par défaut** ; un autre peut être désigné (lecture seule).
- **Autorisation par session** : un bandeau et le premier clic suffisent ; le dossier n'est jamais
  rechoisi.
- **Suppression** : le fichier d'une fiche supprimée passe dans `fiches/supprimees`, il n'est pas
  effacé. La suppression est mémorisée.
- `sauvegarde_neuro.json` (une sauvegarde agrégée réécrite à chaque enregistrement) **disparaît** de
  l'écriture automatique : le dossier `fiches` en tient lieu, sans le risque qu'un poste écrase les
  fiches d'un autre. L'export manuel *Télécharger la sauvegarde JSON* et la lecture des anciennes
  sauvegardes restent.
- Le bouton **Fichier de données** devient **Dossier de données**.

### Synthèse rédigée

- L'**examen anal** (contraction anale volontaire, pression anale profonde) n'est écrit que s'il est
  anormal.

### Correctif

- Enregistrer les réglages d'export n'efface plus les réglages de douchette et de pseudonymisation :
  tous les réglages sont écrits dans un seul enregistrement.

### À valider de votre côté

- **Choix du dossier au premier enregistrement** : si vous annulez le sélecteur, il n'est pas reproposé
  à chaque enregistrement ; le bouton **Dossier de données** le rouvre.
- **Un fichier par fiche** plutôt qu'un fichier unique : c'est ce qui permet à plusieurs postes de
  partager un dossier sans s'écraser. Le prix : un dossier de plusieurs centaines de petits fichiers.
- **Fiches du dossier lues à l'ouverture** : elles rejoignent la base locale du poste, donc ses
  exports CSV. Données de santé identifiantes : voir *Données personnelles*.

---

## Changements de la version 7.3.1

Cette version applique les modifications du 3 octobre 2026. Aucune colonne n'est retirée ni recodée :
**neuf colonnes s'ajoutent** (874 → 883) et les fiches de la 7.3.0 s'ouvrent telles quelles.

### Saisie

- **Coordination et examen vestibulaire** : l'encart « Coordination » prend ce nom et reçoit quatre
  épreuves, Romberg, Fukuda, marche en étoile et marche funambule (voir *Remplir une fiche*). Un
  Romberg positif alimente l'item « instabilité » du score vestibulaire.
- **Sensibilités** : le bouton **✓ 3 sensibilités normales**, à côté de *tout effacer* dans l'en-tête de
  l'encart, cote tact léger, piqûre et pallesthésie normaux en un clic.
- **Échographie cardiaque** : l'examen perd la mention « recherche de FOP », la recherche de shunt
  droite-gauche se faisant au doppler transcrânien. Une case **Recherche de FOP** apparaît quand
  l'examen est coché OUI, pour les échographies faites dans cette indication.
- **Échographie pleuro-pulmonaire** : le bouton **Appliquer … aux 24 champs** applique la cotation
  choisie à tous les champs en une fois.
- **Profil de plongée** : DS, DF et HS se complètent seules quand les autres heures et durées
  suffisent (voir *Les heures qui manquent se complètent seules*). La saisie à la main n'est jamais
  remplacée.
- **Heure des 1ers symptômes** : déplacée dans l'encart d'accueil (page 1), juste avant l'heure des
  1ers soins sur place. Le délai entre la sortie de l'eau et les 1ers symptômes reste avec le profil.

### Synthèse rédigée

- Plus aucun exposant, indice, barre verticale, étoile ni flèche (voir *La synthèse rédigée*).
- Texte allégé : scores MEDSUBHYP et vestibulaire réduits à leur valeur, préservation sacrée de l'ASIA
  écrite seulement si elle est absente, voie veineuse, numéro de dossier, rang de l'examen, club,
  ordonnance et pièces jointes omis.
- Les heures s'écrivent « 10 h 30 », les durées « 25 min », la température en degrés.

### Fichier de données

- **874 → 883 colonnes** : 9 ajoutées, aucune retirée ni recodée.
- **Ajoutées** : `romberg`, `romberg_cote`, `fukuda`, `fukuda_cote`, `etoile`, `etoile_cote`,
  `funambule`, `funambule_cote`, `im_eto_fop`.
- Le **dictionnaire** précise les libellés ambigus : « Radiographie thoracique — résultat » au lieu de
  « Résultat », « Marche en étoile — côté de la déviation » au lieu de « Côté de la déviation ».
- `pl_h_symp` change de place dans le CSV, avec son encart (accueil, page 1) ; son nom et son codage ne
  changent pas.

### À valider de votre côté

Ces points viennent d'une interprétation de vos notes.

- **Les quatre épreuves** : formulation des réponses (Romberg négatif ou positif, les trois autres
  normales ou anormales), côté demandé, descriptions de la technique. Elles se cotent sans condition de
  verticalisation ni de marche : une épreuve non réalisée reste vide.
- **Romberg et instabilité** : un Romberg positif cote l'instabilité « présente debout yeux fermés »
  du score vestibulaire ; vous pouvez trancher à la main.
- **Éléments retirés de la synthèse** : chacun est une ligne de `narrativeBlocks`, à rétablir si vous les
  voulez.
- **Heures déduites** : relations du tableau ci-dessus ; la DTR estimée n'en fait pas partie.

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

- **8.2.0** : valeurs normales de l'homme (11 paramètres de biologie) selon le sexe, sans mention « au-dessus / en dessous des VN » ni
  encart orange ; table « OHB15 » renommée « A15 » ; ligne Excel COHB : une table enregistrée = une table comptée ; ligne Excel ADP : « — » = 0
  (colonnes L à P) ; encart « Signes subjectifs — localisation » masqué quand la réponse est NON ; copie de la synthèse et du CRH aussi en RTF
  (Firefox), pour que le gras et le souligné se collent dans l'éditeur du dossier patient.
- **8.1.3** : la ligne du fichier maître s'appelle « ligne Excel ADP » (l'autre, « ligne Excel COHB »), classeurs `ligne_excel_ADP_…` et
  `ligne_excel_COHB_…` ; heures ouvrables de la ligne COHB : lundi au vendredi, de 7 h 45 à 16 h 00, hors jours fériés.
- **8.1.2** : colonne « ordinateur » de la ligne Excel (marque, modèle, réglages), ligne pour l'activité COHB, onglet « Examens
  complémentaires » (le cinquième ; la conclusion devient le sixième) avec la biologie horodatée, ses valeurs normales, les valeurs
  hors normes en gras et en rouge, et des tableaux de jour en jour dans la synthèse et le compte rendu.
- **8.1.1** : identité complémentaire affichée après le mode d'entrée, bouton « onglet suivant » dans le bandeau patient,
  dictée vocale corrigée sous Chrome (texte écrit une seule fois), micro éteint seul après une seconde sans parole.
- **8.1.0** : fichiers JSON des fiches nommés `xxx-aaaa_bbbbbbbb-EXc.json` (numéro d'accident, année de prise en charge,
  numéro de dossier, numéro d'examen), renommés dans le dossier de données quand le rang d'un examen change ; corbeille et
  anciens fichiers `fiche_<identifiant>.json` pris en charge.
- **8.0.0** : identité complémentaire dans l'onglet Administratif, SAU HNIA SA, remontée progressive proposée d'office
  avec sa durée à Pmax, apnée, conditions environnementales cotées, OHB15 à 95 min, dictée vocale, case « ne pas
  mentionner les scores », bandeau enrichi (examen, entrée, dernier diagnostic), recompressions comptées par type dans
  le compte rendu, ligne pour le fichier Excel maître, générateur de courriers de sortie ouvert depuis ADP.
- **7.4.0** : cinq onglets, bandeau patient permanent, nombre total de plongées, synthèse en paragraphes (titres
  soulignés, anomalies en gras, examen dit en syndromes), compte rendu d'hospitalisation à partir de toutes les
  fiches du dossier (examens paracliniques réunis, évolution horodatée, examens à prévoir, inaptitude à la plongée).
- **7.3.3** : « Exporter tout en JSON » (une fiche par fichier, dans un dossier choisi ou une archive ZIP),
  import d'archives ZIP et de dossiers entiers, choix du dossier : explication, diagnostic et solutions de
  repli quand le navigateur n'offre pas l'écriture directe.
- **7.3.2** : un fichier JSON par fiche écrit à l'enregistrement dans un dossier choisi une fois, relu à
  l'ouverture pour la recherche ; examen anal écrit seulement s'il est anormal.
- **7.3.1** : coordination et examen vestibulaire, sensibilités normales en un clic, échographie
  cardiaque et FOP, échographie pleuro-pulmonaire en un clic, profil complété automatiquement,
  synthèse allégée et sans signe spécial.
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
de dossier que vous saisissez, le sexe et l'âge calculé. L'identité complète ne figure que sur le PDF
et dans les fichiers JSON des fiches.

La case *inclure nom, prénom et date de naissance* dans **Exporter** lève cette séparation. Si vous
la cochez, le fichier devient un traitement de données de santé identifiantes au sens du RGPD
(art. 9) : registre des traitements, base légale, information des personnes et chiffrement du
support relèvent alors de votre responsabilité.

**Les fichiers JSON du dossier de données, de l'export en JSON, des archives ZIP et des téléchargements
automatiques contiennent la fiche entière, identité, santé et photographies comprises** : c'est ce qui permet
de retrouver un sujet par son nom. Ils sont à traiter
comme des données de santé identifiantes, quels que soient les réglages de l'export CSV. Choisissez
un dossier protégé (disque chiffré, accès restreint). Si ce dossier est synchronisé avec un service
en ligne, les fiches quittent le poste : vérifiez que ce service est compatible avec l'hébergement de
données de santé qui vous est imposé. Le nom de chaque fichier ne porte ni nom, ni prénom, ni date de naissance, mais
le **numéro de dossier** et le numéro d'accident (`187-2026_50987654-EX1.json`) : il suffit à rattacher un fichier à un
dossier. Avec la pseudonymisation de l'identifiant scanné, c'est le pseudonyme `P-…` qui y figure.

**La ligne Excel ADP** reprend, par défaut, le **nom et le prénom** (colonne A de votre fichier) : c'est
un traitement de données de santé identifiantes, comme le fichier maître lui-même ; la **ligne Excel COHB** les reprend aussi (colonne B). Elle est copiée dans le presse-papiers ou
téléchargée : supprimez le classeur téléchargé une fois la ligne collée. **La dictée vocale** de Chrome et d'Edge envoie
l'audio à un service distant (voir *Dictée vocale*) : n'y dictez rien d'identifiant. **Les documents de sortie** reçoivent
l'identité du patient pour composer les courriers ; le générateur n'enregistre rien et n'utilise aucun réseau. Son fichier,
qui porte les signatures des médecins, reste dans la base locale du navigateur : ne le versez jamais dans le dépôt publié.

---

## Sauvegarde

Les fiches vivent dans la base locale du navigateur **et** dans le dossier de données (un fichier
JSON par fiche). Vider les données de navigation efface la base locale, mais le dossier la
reconstitue à l'ouverture suivante, une fois choisi de nouveau. Le dossier de données et les
sauvegardes JSON sont votre filet de sécurité : copiez-les ailleurs régulièrement. **Exporter tout en
JSON** en produit une copie complète à tout moment, dans le dossier de votre choix ou dans une archive ZIP.

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
