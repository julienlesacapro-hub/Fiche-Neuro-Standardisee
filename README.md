# Fiche d'examen neurologique standardisé

Outil de saisie pour l'examen neurologique en médecine hyperbare et lors des
accidents de désaturation. Auteur : Dr Julien Lesaca.

Deux sorties, depuis la même saisie :

1. une fiche A4 imprimable et enregistrable en PDF (3 pages) ;
2. un fichier `donnees_neuro.csv` unique qui s'incrémente, une ligne par fiche,
   481 colonnes, prêt pour R, Python, SPSS, Jamovi ou Excel.

Aucune donnée ne quitte l'appareil. Pas de serveur, pas de compte, pas de
requête réseau. Le code entier tient dans `index.html`.

---

## Utiliser l'outil

### Sans rien installer

Ouvrez `index.html` par double-clic. Tout fonctionne : saisie, impression,
export. C'est la méthode à retenir pour un poste isolé.

### Comme application installée (recommandé sur téléphone et tablette)

Publiez ce dépôt sur GitHub Pages (voir plus bas), puis ouvrez l'adresse
obtenue sur l'appareil :

| Appareil | Geste |
|---|---|
| Android (Chrome, Edge, Samsung Internet) | menu ⋮ › **Installer l'application** |
| iPhone, iPad (Safari) | bouton **Partager** › **Sur l'écran d'accueil** |
| Windows, macOS (Chrome, Edge) | icône d'installation dans la barre d'adresse |

L'application obtient une icône, s'ouvre en plein écran et démarre sans réseau.
Le menu **Installation hors ligne** de l'outil reprend ces étapes et affiche
l'état du cache.

---

## Publier sur GitHub Pages

```bash
git clone https://github.com/julienlesacapro-hub/Fiche-Neuro-Standardisee.git
cd Fiche-Neuro-Standardisee

# copiez ici le contenu de ce dossier (index.html, icons/, manifest, sw.js, docs/, native/)

git add .
git commit -m "Fiche neuro standardisée v5.0.0"
git push origin main
```

Puis dans le dépôt : **Settings › Pages › Source = Deploy from a branch**,
branche `main`, dossier `/ (root)`. Sauvegardez.

L'adresse publique devient :

```
https://julienlesacapro-hub.github.io/Fiche-Neuro-Standardisee/
```

Comptez une à deux minutes avant la première mise en ligne. GitHub Pages sert
en HTTPS, condition nécessaire pour l'installation et le service worker.

### Publier une mise à jour

Modifiez `index.html`, incrémentez `VERSION` en tête de `sw.js`
(`v5.0.0` → `v5.0.1`), poussez. Sans ce changement de version, les appareils
déjà installés gardent l'ancienne copie en cache.

```bash
sed -i "s/const VERSION = 'v5.0.0'/const VERSION = 'v5.0.1'/" sw.js
git commit -am "v5.0.1" && git push
```

Au lancement suivant avec réseau, l'application signale la mise à jour et
propose de l'appliquer.

### Ce que vous publiez

GitHub Pages rend ce dépôt **public**. Ne versionnez jamais de fiche remplie,
de `donnees_neuro.csv`, de sauvegarde JSON ni le sel de pseudonymisation.
Le `.gitignore` fourni bloque déjà ces noms de fichiers. Vérifiez quand même
avec `git status` avant chaque `commit`.

Pour un usage strictement interne, un dépôt privé avec GitHub Pages exige un
abonnement payant. L'alternative gratuite : servez le dossier depuis un
serveur interne à l'établissement, ou distribuez `index.html` par clé USB.

---

## Contenu du dépôt

```
index.html                 application complète, fichier unique, 190 ko
manifest.webmanifest       déclaration d'installation (nom, icônes, plein écran)
sw.js                      service worker : démarrage hors ligne, mises à jour
icons/                     icônes 32 à 1024 px, dont deux masquables Android
docs/
  dictionnaire_variables.csv   481 variables, libellé et codage de chacune
  NOTICE.md                    mode d'emploi clinique et technique
native/                    projet Capacitor pour Android et iOS
.nojekyll                  désactive le moteur Jekyll de GitHub Pages
```

---

## Sauvegarde des données

Les fiches vivent à trois endroits, du plus fragile au plus solide :

1. **la base locale du navigateur** (IndexedDB) : effacée si vous videz les
   données de navigation, perdue si l'appareil l'est ;
2. **le dossier connecté** via *Fichier de données*, sur Chrome et Edge pour
   ordinateur : l'outil y réécrit `donnees_neuro.csv` à chaque enregistrement ;
3. **l'export manuel** (CSV ou JSON) : disponible partout, y compris sur
   iPhone et Firefox.

Vider le cache de l'application ne touche pas aux fiches. Effacer les données
de site, si.

Sur iPhone, iPad et Firefox, l'écriture directe dans un dossier n'existe pas.
Exportez à la main en fin de vacation, puis fusionnez sur le poste principal
avec *Importer / Fusionner*. La fusion se fait sur l'identifiant de fiche,
sans doublon ni écrasement.

---

## Score ASIA : lisez ceci

L'outil calcule les totaux ISNCSCI, les niveaux sensitifs et moteurs, le NLI
et le grade AIS. Ce calcul reste **indicatif**.

Les totaux, le niveau sensitif et le niveau moteur des segments pourvus d'un
myotome clé suivent la norme. Dans les segments qui en sont dépourvus (C1 à C4,
T2 à L1, S2 à S5), la norme présume le niveau moteur égal au niveau sensitif
« si la fonction motrice sus-jacente est normale ». L'outil applique cette
condition de façon mécanique, là où un examinateur juge.

Vérifiez sur la grille officielle avant toute décision thérapeutique ou avant
publication.

---

## Statut réglementaire

Cet outil calcule un score de Glasgow, un nombre d'anomalies, un indicateur de
cohérence, une synthèse rédigée et un grade AIS. Le MDCG 2019-11 classe ce
type d'aide à la décision en dispositif médical de classe IIa au minimum
(règle 11 du règlement UE 2017/745).

Deux conséquences :

- **Usage interne.** L'article 5(5) du règlement 2017/745 exempte de marquage
  CE les dispositifs fabriqués et utilisés au sein d'un même établissement de
  santé, sous conditions : justification du besoin, système qualité,
  documentation, déclaration publique. C'est la voie réaliste ici.
- **Distribution externe ou magasin d'applications.** Le marquage CE devient
  obligatoire, avec organisme notifié. Comptez plusieurs dizaines de milliers
  d'euros et douze à dix-huit mois.

Les données saisies relèvent de l'article 9 du RGPD (données de santé).
Le mode pseudonymisation de l'outil remplace l'identifiant scanné par une
empreinte SHA-256 salée. Le sel ne figure dans aucun export. Conservez-le
séparément : sans lui, personne ne peut remonter à l'identité, vous non plus.

---

## Licence

Tous droits réservés, Dr Julien Lesaca. Diffusion et réutilisation soumises à
son accord.
