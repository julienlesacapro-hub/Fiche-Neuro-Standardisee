# Publier et mettre à jour sur GitHub

Ce dépôt sert deux choses à la fois : il **stocke** le code et il **sert** l'application
aux téléphones, tablettes et ordinateurs via GitHub Pages. Publier une mise à jour,
c'est donc remplacer des fichiers ici, et rien d'autre.

Adresse du dépôt :

```
https://github.com/julienlesacapro-hub/Fiche-Neuro-Standardisee
```

Adresse publique de l'application une fois Pages activé :

```
https://julienlesacapro-hub.github.io/Fiche-Neuro-Standardisee/
```

---

# Partie 1 — La première fois

## 1.1 Choisir votre voie

| | Interface web | Git en ligne de commande |
|---|---|---|
| Rien à installer | oui | non |
| Convient à une mise à jour complète | oui, avec une précaution (voir 2.3) | oui |
| Historique propre | correct | meilleur |
| Temps la première fois | 5 minutes | 20 minutes |

Si vous publiez trois fois par an, restez sur l'interface web. Si vous prévoyez d'itérer
souvent, installez git une bonne fois.

## 1.2 Voie A — interface web

1. Ouvrez `https://github.com/julienlesacapro-hub/Fiche-Neuro-Standardisee`.
2. Si le dépôt est vide, GitHub affiche un encadré avec un lien **uploading an existing file**.
   Sinon : bouton **Add file** en haut à droite, puis **Upload files**.
3. **Dézippez d'abord** `Fiche-Neuro-Standardisee-v6.zip` sur votre bureau. Vous obtenez un
   dossier contenant `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, `docs/`, `native/`,
   `README.md`, `.gitignore`, `.nojekyll`.
4. Ouvrez ce dossier, **sélectionnez tout son contenu** (Ctrl+A) et glissez-le dans la zone
   de dépôt de GitHub. Ne glissez pas le dossier parent : ses fichiers se retrouveraient
   dans un sous-dossier et l'adresse publique ne fonctionnerait pas.
5. En bas, dans **Commit changes**, écrivez un message : `Fiche neuro v6.1.0`.
6. Laissez **Commit directly to the main branch** coché. Cliquez **Commit changes**.

> Le fichier `.nojekyll` commence par un point. Certains systèmes le cachent.
> Sur Windows : Explorateur → Affichage → cocher **Éléments masqués**.
> Sur macOS : Cmd+Maj+. dans le Finder.
> S'il manque, l'application fonctionne quand même ; le fichier sert uniquement à accélérer
> la publication et à éviter que GitHub n'ignore certains noms de fichiers.

## 1.3 Voie B — git en ligne de commande

Installez git : [git-scm.com/downloads](https://git-scm.com/downloads).

Une seule fois, pour signer vos commits :

```bash
git config --global user.name "Julien Lesaca"
git config --global user.email "julien.lesaca.pro@gmail.com"
```

Puis :

```bash
cd ~/Documents
git clone https://github.com/julienlesacapro-hub/Fiche-Neuro-Standardisee.git
cd Fiche-Neuro-Standardisee

# copiez ici le contenu dézippé de Fiche-Neuro-Standardisee-v6.zip

git add -A
git commit -m "Fiche neuro v6.1.0"
git push origin main
```

### L'authentification, le point qui bloque tout le monde

GitHub **n'accepte plus votre mot de passe de compte** depuis août 2021. Au premier `push`,
quand git demande un mot de passe, il attend un **jeton d'accès personnel**. Trois solutions :

**Jeton d'accès personnel (le plus simple).**
Sur GitHub : votre photo en haut à droite → **Settings** → tout en bas **Developer settings**
→ **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**.
Nommez-le « poste hyperbare », choisissez une expiration, cochez la case **repo** (elle coche
ses sous-cases toute seule). Générez, **copiez le jeton immédiatement** : il ne s'affichera
plus jamais. Au `push`, collez-le à la place du mot de passe.

Pour ne pas le retaper à chaque fois :

```bash
git config --global credential.helper store     # Linux, enregistre en clair dans ~/.git-credentials
git config --global credential.helper manager   # Windows, coffre-fort du système
git config --global credential.helper osxkeychain  # macOS, trousseau
```

**GitHub Desktop.** Application graphique, gère l'authentification seule :
[desktop.github.com](https://desktop.github.com). Vous glissez vos fichiers dans le dossier
local, l'application liste les changements, vous cliquez **Commit** puis **Push origin**.

**Clé SSH.** Plus propre sur le long terme, mais une configuration de plus.

## 1.4 Activer GitHub Pages

À faire une seule fois.

1. Dans le dépôt, onglet **Settings** (barre du haut, pas celui de votre profil).
2. Colonne de gauche, **Pages**.
3. **Source** : choisissez **Deploy from a branch**.
4. **Branch** : `main`, dossier `/ (root)`. Cliquez **Save**.
5. Rechargez la page après une minute : un bandeau vert affiche l'adresse publique.

La première publication demande une à deux minutes. Les suivantes, moins.

## 1.5 Vérifier que c'est en ligne

Ouvrez `https://julienlesacapro-hub.github.io/Fiche-Neuro-Standardisee/`.

- La fiche doit s'afficher, avec le blason dans l'onglet du navigateur.
- Sur Chrome ou Edge pour ordinateur, une icône d'installation apparaît à droite de la barre
  d'adresse au bout de quelques secondes.
- Dans le menu **Installation hors ligne** de la fiche, la section « Mises à jour » doit dire
  qu'aucune mise à jour n'est en attente : le service worker s'est enregistré.

---

# Partie 2 — Chaque mise à jour

## 2.1 D'abord : incrémenter la version du service worker

**C'est l'étape qu'on oublie, et elle explique la totalité des « ça n'a pas changé sur mon
téléphone ».**

Le fichier `sw.js` garde une copie de l'application sur chaque appareil pour qu'elle démarre
sans réseau. Cette copie porte un numéro. Tant que le numéro ne bouge pas, l'appareil sert sa
copie et ne va pas voir si vous avez publié autre chose.

Ouvrez `sw.js`, ligne 10 :

```js
const VERSION = 'v6.1.0';
```

Changez-la à chaque publication : `v6.1.1`, `v6.2.0`, peu importe la convention, du moment
que la chaîne change.

En ligne de commande :

```bash
sed -i "s/const VERSION = 'v6.1.0'/const VERSION = 'v6.1.1'/" sw.js
```

Dans l'interface web : ouvrez `sw.js` dans le dépôt, cliquez le **crayon** en haut à droite,
modifiez la ligne, **Commit changes**.

## 2.2 Remplacer les fichiers — voie git

```bash
cd ~/Documents/Fiche-Neuro-Standardisee
git pull                       # récupère ce qui aurait été modifié en ligne

# copiez les nouveaux fichiers par-dessus

git status                     # LISEZ CETTE LISTE (voir partie 3)
git add -A
git commit -m "v6.1.1 : correction de l'encart ORL"
git push origin main
```

`git add -A` prend en compte les ajouts, les modifications **et les suppressions**.
C'est ce qui manque à la voie web.

## 2.3 Remplacer les fichiers — voie web, avec sa précaution

**Add file → Upload files**, glissez les nouveaux fichiers, commit. GitHub écrase les fichiers
de même nom.

**Mais GitHub ne supprime pas les fichiers que vous n'avez pas re-déposés.** Si une version
retire un fichier — c'est le cas de `icons/icon-1024.png`, sorti du dossier web en v6.1 —
il restera en ligne indéfiniment.

Pour supprimer un fichier : ouvrez-le dans le dépôt, bouton **⋯** en haut à droite du cadre,
**Delete file**, puis **Commit changes**.

Tant que vous ne supprimez rien, un fichier orphelin est sans gravité : il occupe de la place
et n'est jamais chargé. Mais si vous renommez quelque chose auquel `index.html` fait référence,
vérifiez que l'ancien nom disparaît.

## 2.4 Vérifier que la mise à jour est passée

**Sur le serveur.** Onglet **Actions** du dépôt : une coche verte « pages build and deployment »
signifie que c'est publié. Une croix rouge, cliquez dessus pour lire l'erreur.

**Sur votre ordinateur.** Ouvrez l'adresse publique et forcez le rechargement :
Ctrl+Maj+R (Windows, Linux) ou Cmd+Maj+R (macOS).
Pour en avoir le cœur net : F12 → onglet **Application** → **Service Workers**. La version
active doit être la nouvelle. Le bouton **Update** force la vérification.

**Sur un appareil où l'application est installée.** Ouvrez-la avec du réseau. Au bout de
quelques secondes, un message signale la mise à jour et le bouton **Installer** de la barre
d'outils devient **Mise à jour**. Menu **Installation hors ligne** → **Appliquer maintenant**.

Si rien ne vient : menu **Installation hors ligne** → **Vider le cache et recharger**.
**Cette action n'efface aucune fiche** : les fiches vivent dans la base locale, pas dans le cache.

---

# Partie 3 — Les pièges

## 3.1 Ce qui ne doit jamais partir sur GitHub

GitHub Pages rend ce dépôt **public**. N'y versionnez jamais :

- une fiche remplie, en PDF ou en JSON ;
- `donnees_neuro.csv` ou tout export de données ;
- le sel de pseudonymisation ;
- une photo ou une vidéo de patient.

Le `.gitignore` fourni bloque déjà ces noms de fichiers. Il ne bloque pas ce que vous déposez
à la main dans l'interface web. **Lisez la liste de `git status`, ou la liste des fichiers
glissés, avant chaque commit.**

Si vous poussez un fichier sensible par erreur, le supprimer ne suffit pas : il reste dans
l'historique et reste consultable. Il faut réécrire l'historique (`git filter-repo`) ou, plus
sûr et plus rapide, **supprimer le dépôt et le recréer**.

## 3.2 Dépôt public ou privé

GitHub Pages sur un dépôt **privé** exige un abonnement payant. En gratuit, publier
l'application implique un dépôt public. Le code de la fiche n'a rien de secret ; ce sont les
données qui le sont, et elles ne quittent jamais l'appareil.

Si vous ne voulez rien exposer : servez le dossier depuis un serveur interne à l'établissement,
ou distribuez `fiche_neuro.html` par clé USB. Le fichier unique fonctionne seul, hors ligne,
sans rien installer. Vous perdez seulement l'icône sur l'écran d'accueil.

## 3.3 Branche `main` ou `master`

Les dépôts créés avant 2020 utilisent `master`. Si `git push origin main` répond
`src refspec main does not match any`, essayez `master`, ou regardez le nom affiché en haut
à gauche de la page du dépôt.

## 3.4 Le dossier servi

Pages sert la **racine** du dépôt dans cette configuration. `index.html` doit donc être à la
racine, pas dans un sous-dossier. Si vous voyez une page « 404 » ou la liste des fichiers,
vérifiez ce point en premier.

## 3.5 Deux caches, pas un

- Le **cache du navigateur** se vide avec Ctrl+Maj+R.
- Le **cache du service worker** ne se vide que par un changement de `VERSION` dans `sw.js`,
  ou par le bouton **Vider le cache et recharger** du menu Installation.

Quand quelque chose « ne change pas », c'est presque toujours le second.

## 3.6 Les icônes

Le blason est présent en cinq tailles dans `icons/`, plus un exemplaire intégré directement
dans `index.html` pour que l'onglet du navigateur l'affiche même quand le fichier est ouvert
en double-clic, sans serveur.

Pour changer le logo : remplacez `brand_logo_source.png` à la racine, régénérez les tailles
(n'importe quel éditeur d'image fait l'affaire : 192, 512, 180 et 32 pixels, plus deux versions
masquables Android où le motif tient dans les 76 % centraux), puis incrémentez `VERSION`.
Sans ce dernier point, les appareils déjà installés garderont l'ancienne icône.

---

# Partie 4 — Aide-mémoire

```bash
# publier une mise à jour, voie git
cd ~/Documents/Fiche-Neuro-Standardisee
git pull
# ... copier les nouveaux fichiers ...
sed -i "s/const VERSION = 'v6.1.0'/const VERSION = 'v6.1.1'/" sw.js
git status
git add -A
git commit -m "v6.1.1"
git push origin main
```

| Symptôme | Cause la plus fréquente |
|---|---|
| L'appareil affiche l'ancienne version | `VERSION` non incrémenté dans `sw.js` |
| Page 404 sur l'adresse publique | `index.html` dans un sous-dossier, ou Pages non activé |
| `Authentication failed` au push | mot de passe utilisé au lieu d'un jeton d'accès personnel |
| `src refspec main does not match any` | la branche s'appelle `master` |
| Un fichier supprimé reste en ligne | dépôt par l'interface web : supprimez-le à la main |
| L'installation n'est pas proposée | adresse en `http://` ou en `file://`, ou application déjà installée |
