# Projet natif Android et iOS

Enveloppe Capacitor autour de `index.html`. Le code web reste identique :
l'application native embarque le même fichier unique, sans service worker et
sans cache navigateur.

## Avant de commencer : est-ce la bonne voie ?

Non, dans la plupart des cas. L'application web installée (PWA) fait tout ce
que fait cette enveloppe, sans compte développeur, sans revue de magasin et
sans délai de publication. Elle conserve deux fonctions que le natif perd :

| | PWA installée | Enveloppe Capacitor |
|---|---|---|
| Icône, plein écran, hors ligne | oui | oui |
| Impression A4 | native au navigateur | exige le plugin fourni ici |
| Écriture directe du CSV dans un dossier | oui sur Chrome et Edge ordinateur | non, l'API n'existe pas en WebView |
| Mise en ligne d'un correctif | immédiate | 1 à 7 jours de revue |
| Coût annuel | 0 € | 25 € Google une fois, 99 €/an Apple |
| Exposition réglementaire | usage interne possible | publication = dispositif médical marqué CE |

Construisez le natif si vous avez besoin de la distribution par MDM
d'établissement, d'un catalogue d'entreprise, ou d'un accès matériel que le
navigateur refuse. Sinon, restez sur la PWA.

## Prérequis

- Node.js 20 ou plus, npm
- Android : Android Studio, JDK 21, SDK Android 35
- iOS : macOS, Xcode 16 ou plus, CocoaPods

## Construire

```bash
cd native
npm run www          # recopie ../index.html dans www/
npm install
npx cap add android  # crée native/android/
npx cap add ios      # crée native/ios/   (macOS seulement)
```

Puis appliquez les ressources préparées :

```bash
# icônes, splash, couleurs, nom de l'application
cp -r resources/android/app/src/main/res/* android/app/src/main/res/

# plugin d'impression et activité principale
cp resources/android/app/src/main/java/fr/lesaca/ficheneuro/*.java \
   android/app/src/main/java/fr/lesaca/ficheneuro/

# icône iOS
cp -r resources/ios/App/App/Assets.xcassets/AppIcon.appiconset \
      ios/App/App/Assets.xcassets/
```

Pour iOS, glissez `resources/ios/App/App/NativePrintPlugin.swift` dans le
groupe `App` du projet Xcode, cible `App` cochée.

Lisez ensuite `resources/android/AndroidManifest.patch.md` et
`resources/ios/Info.plist.patch.md`. Ces deux fichiers décrivent trois
réglages de confidentialité qui comptent pour des données de santé :
désactiver la sauvegarde automatique vers le compte Google ou iCloud,
retirer la permission réseau, bloquer les captures d'écran.

Ouvrir dans l'IDE :

```bash
npx cap open android
npx cap open ios
```

## Après chaque modification de la fiche

```bash
npm run www && npx cap sync
```

## Signer et publier

```bash
# Android : bundle pour Google Play
cd android && ./gradlew bundleRelease
# sortie : android/app/build/outputs/bundle/release/app-release.aab

# Android : APK à installer directement, hors magasin
./gradlew assembleRelease
```

Créez la clé de signature une fois, gardez-la hors du dépôt :

```bash
keytool -genkey -v -keystore fiche-neuro.keystore \
  -alias ficheneuro -keyalg RSA -keysize 2048 -validity 10000
```

Perdre cette clé interdit toute mise à jour de l'application sur Google Play.

## Impression

`window.print()` ne fait rien dans un WebView Android ni dans un WKWebView
iOS : l'appel n'est pas implémenté. Le plugin `NativePrint` fourni ici charge
le document dans un WebView hors écran et le remet au service d'impression du
système, qui propose l'imprimante réseau ou l'export PDF.

Le code web détecte le plugin seul. Si vous oubliez de le déposer, le bouton
PDF reste sans effet dans l'application native.

## Export CSV

`<a download>` et les URL blob ne déclenchent aucun téléchargement en WebView.
Le code web bascule sur `@capacitor/filesystem` et `@capacitor/share` quand il
tourne dans Capacitor : il écrit le fichier dans les documents de
l'application puis ouvre la feuille de partage.

## Versions

`package.json` demande Capacitor 7 en `^7.0.0`. Je n'ai pas pu résoudre les
numéros de correctif exacts depuis l'environnement de fabrication : le registre
npm y est bloqué. `npm install` les fixera. Si une version majeure 8 sort et
casse la compilation, remplacez par `npm install @capacitor/core@7 @capacitor/cli@7 @capacitor/android@7`.
