# Modifications à appliquer à `ios/App/App/Info.plist`

## 1. Exclure les fiches des sauvegardes iCloud

Les données WebKit de l'application sont sauvegardées avec l'appareil.
Pour des données de santé, ajoutez la clé :

```xml
<key>NSURLIsExcludedFromBackupKey</key>
<true/>
```

et, dans Xcode, désactivez la capacité **iCloud** si elle est cochée.

## 2. Nom affiché et orientations

```xml
<key>CFBundleDisplayName</key>
<string>Fiche Neuro</string>
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
    <string>UIInterfaceOrientationLandscapeRight</string>
</array>
```

## 3. Enregistrement du plugin d'impression

Déposez `NativePrintPlugin.swift` dans le groupe `App` du projet Xcode
(glisser-déposer, cocher « Copy items if needed » et la cible `App`).
Capacitor 7 découvre le plugin par le protocole `CAPBridgedPlugin` :
aucun fichier `.m` ni aucune autre déclaration n'est nécessaire.
