package fr.lesaca.ficheneuro;

import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Impression native Android.
 *
 * window.print() ne fait rien dans un WebView Android : l'appel n'est pas
 * implémenté. Ce plugin charge le document d'impression dans un WebView
 * hors écran puis le remet au service d'impression du système, qui propose
 * l'imprimante réseau ou « Enregistrer au format PDF ».
 *
 * Le document reste local : aucun réseau, aucun fichier temporaire partagé.
 */
@CapacitorPlugin(name = "NativePrint")
public class NativePrintPlugin extends Plugin {

    /** Référence gardée le temps du rendu, sinon le WebView est collecté. */
    private WebView pending;

    @PluginMethod
    public void print(final PluginCall call) {
        final String html = call.getString("html", "");
        final String name = call.getString("name", "fiche-neuro");

        getActivity().runOnUiThread(() -> {
            try {
                final WebView wv = new WebView(getContext());
                wv.getSettings().setJavaScriptEnabled(false);
                wv.getSettings().setAllowFileAccess(false);
                wv.setWebViewClient(new WebViewClient() {
                    @Override
                    public void onPageFinished(WebView view, String url) {
                        try {
                            PrintManager pm =
                                (PrintManager) getContext().getSystemService(Context.PRINT_SERVICE);
                            PrintDocumentAdapter adapter = view.createPrintDocumentAdapter(name);
                            PrintAttributes attrs = new PrintAttributes.Builder()
                                .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                                .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                                .build();
                            pm.print(name, adapter, attrs);
                            call.resolve(new JSObject().put("started", true));
                        } catch (Exception e) {
                            call.reject("Service d'impression indisponible : " + e.getMessage(), e);
                        } finally {
                            pending = null;
                        }
                    }
                });
                wv.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null);
                pending = wv;
            } catch (Exception e) {
                call.reject("Impression impossible : " + e.getMessage(), e);
            }
        });
    }
}
