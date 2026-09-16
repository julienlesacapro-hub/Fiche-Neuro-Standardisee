import Foundation
import Capacitor
import UIKit

/// Impression native iOS.
///
/// window.print() ne fait rien dans un WKWebView. Ce plugin passe le document
/// au contrôleur d'impression du système, qui propose AirPrint ou
/// « Enregistrer au format PDF » via la feuille de partage.
@objc(NativePrintPlugin)
public class NativePrintPlugin: CAPPlugin, CAPBridgedPlugin {

    public let identifier = "NativePrintPlugin"
    public let jsName = "NativePrint"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "print", returnType: CAPPluginReturnPromise)
    ]

    @objc func print(_ call: CAPPluginCall) {
        let html = call.getString("html") ?? ""
        let name = call.getString("name") ?? "fiche-neuro"

        DispatchQueue.main.async {
            let info = UIPrintInfo(dictionary: nil)
            info.outputType = .general
            info.jobName = name
            info.orientation = .portrait

            let controller = UIPrintInteractionController.shared
            controller.printInfo = info
            controller.showsPageRange = true

            let formatter = UIMarkupTextPrintFormatter(markupText: html)
            // Marges A4 approchées : 9 mm ≈ 26 pt
            formatter.perPageContentInsets = UIEdgeInsets(top: 26, left: 28, bottom: 26, right: 28)
            controller.printFormatter = formatter

            controller.present(animated: true) { (_, completed, error) in
                if let error = error {
                    call.reject("Impression impossible : \(error.localizedDescription)")
                } else {
                    call.resolve(["started": completed])
                }
            }
        }
    }
}
