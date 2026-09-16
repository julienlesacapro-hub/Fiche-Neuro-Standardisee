# Modifications à appliquer à `android/app/src/main/AndroidManifest.xml`

Le fichier est généré par `npx cap add android`. Trois changements comptent.

## 1. Interdire la sauvegarde automatique Google

Sans cela, Android recopie les données de l'application (donc la base locale
contenant les fiches) vers le compte Google du porteur du téléphone. Pour des
données de santé, c'est un transfert vers un tiers que vous n'avez ni prévu ni
déclaré.

Dans la balise `<application>`, remplacez :

```xml
android:allowBackup="true"
```

par :

```xml
android:allowBackup="false"
android:fullBackupContent="false"
android:dataExtractionRules="@xml/data_extraction_rules"
```

Puis créez `android/app/src/main/res/xml/data_extraction_rules.xml` :

```xml
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup><exclude domain="root" /></cloud-backup>
    <device-transfer><exclude domain="root" /></device-transfer>
</data-extraction-rules>
```

## 2. Retirer la permission réseau

L'application n'émet aucune requête. Supprimez la ligne si elle est présente :

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Capacitor l'ajoute par défaut. Sans elle, l'application ne peut techniquement
rien envoyer, ce qui est le meilleur argument dans un dossier RGPD.

Si vous la supprimez, ajoutez dans `capacitor.config.json` :

```json
"server": { "androidScheme": "https", "cleartext": false }
```

## 3. Empêcher les captures d'écran (facultatif)

Dans `MainActivity.onCreate`, avant `super.onCreate` :

```java
getWindow().setFlags(
    android.view.WindowManager.LayoutParams.FLAG_SECURE,
    android.view.WindowManager.LayoutParams.FLAG_SECURE);
```

Bloque les captures et l'aperçu dans la liste des applications récentes.
