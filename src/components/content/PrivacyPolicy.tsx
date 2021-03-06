import { Box, Link, Paper } from "@mui/material";
import { setAnalyticsCollectionEnabled } from "firebase/analytics";
import { analytics } from "../../logic/firebase";

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Paper sx={{ padding: "25px", maxWidth: "850px" }}>
        <h2>Datenschutzerklärung</h2>
        <p>
          Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
          EU-Datenschutzgrundverordnung (DSGVO), ist:
        </p>
        <p>
          Wolkeneis
          <br />
          admin@wolkeneis.dev
        </p>
        <h3>Ihre Betroffenenrechte</h3>
        <p>
          Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten
          können Sie jederzeit folgende Rechte ausüben:
        </p>
        <ul>
          <li>
            Auskunft über Ihre bei uns gespeicherten Daten und deren
            Verarbeitung (Art. 15 DSGVO),
          </li>
          <li>
            Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),
          </li>
          <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
          <li>
            Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
            gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
          </li>
          <li>
            Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21
            DSGVO) und
          </li>
          <li>
            Datenübertragbarkeit, sofern Sie in die Datenverarbeitung
            eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben
            (Art. 20 DSGVO).
          </li>
        </ul>
        <p>
          Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese
          jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Sie können sich jederzeit mit einer Beschwerde an eine
          Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des
          Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche
          Stelle zuständige Behörde.
        </p>
        <p>
          Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich)
          mit Anschrift finden Sie unter:{" "}
          <Link
            href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
            rel="noopener nofollow noreferrer"
            sx={{ wordBreak: "break-all" }}
            target="_blank"
          >
            https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html
          </Link>
          .
        </p>
        <p></p>
        <h3>Erfassung allgemeiner Informationen beim Besuch unserer Website</h3>
        <h4>Art und Zweck der Verarbeitung:</h4>
        <p>
          Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht
          registrieren oder anderweitig Informationen übermitteln, werden
          automatisch Informationen allgemeiner Natur erfasst. Diese
          Informationen (Server-Logfiles) beinhalten etwa die Art des
          Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
          Internet-Service-Providers, Ihre IP-Adresse und ähnliches.{" "}
        </p>
        <p>Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
        <ul>
          <li>
            Sicherstellung eines problemlosen Verbindungsaufbaus der Website,
          </li>
          <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
          <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
          <li>zur Optimierung unserer Website.</li>
        </ul>
        <p>
          Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu
          ziehen. Informationen dieser Art werden von uns ggfs. anonymisiert
          statistisch ausgewertet, um unseren Internetauftritt und die
          dahinterstehende Technik zu optimieren.{" "}
        </p>
        <h4>Rechtsgrundlage und berechtigtes Interesse:</h4>
        <p>
          Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis
          unseres berechtigten Interesses an der Verbesserung der Stabilität und
          Funktionalität unserer Website.
        </p>
        <h4>Empfänger:</h4>
        <p>
          Empfänger der Daten sind ggf. technische Dienstleister, die für den
          Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig
          werden.
        </p>
        <p></p>
        <h4>Speicherdauer:</h4>
        <p>
          Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung
          nicht mehr erforderlich sind. Dies ist für die Daten, die der
          Bereitstellung der Website dienen, grundsätzlich der Fall, wenn die
          jeweilige Sitzung beendet ist.{" "}
        </p>
        <p>
          {" "}
          Im Falle der Speicherung der Daten in Logfiles ist dies nach
          spätestens 14 Tagen der Fall. Eine darüberhinausgehende Speicherung
          ist möglich. In diesem Fall werden die IP-Adressen der Nutzer
          anonymisiert, sodass eine Zuordnung des aufrufenden Clients nicht mehr
          möglich ist.
        </p>
        <p></p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder
          gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist
          jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht
          gewährleistet. Zudem können einzelne Dienste und Services nicht
          verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein
          Widerspruch ausgeschlossen.{" "}
        </p>
        <p></p>
        <h3>Cookies</h3>
        <p>
          Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“.
          Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem
          Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn
          Sie unsere Webseite besuchen.{" "}
        </p>
        <p>
          Sie können Sie einzelne Cookies oder den gesamten Cookie-Bestand
          löschen. Darüber hinaus erhalten Sie Informationen und Anleitungen,
          wie diese Cookies gelöscht oder deren Speicherung vorab blockiert
          werden können. Je nach Anbieter Ihres Browsers finden Sie die
          notwendigen Informationen unter den nachfolgenden Links:
        </p>
        <ul>
          <li>
            Mozilla Firefox:{" "}
            <Link
              href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen"
              rel="nofollow noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen
            </Link>
          </li>
          <li>
            Internet Explorer:{" "}
            <Link
              href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies"
              rel="nofollow noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies
            </Link>
          </li>
          <li>
            Google Chrome:{" "}
            <Link
              href="https://support.google.com/accounts/answer/61416?hl=de"
              rel="nofollow noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              https://support.google.com/accounts/answer/61416?hl=de
            </Link>
          </li>
          <li>
            Opera:{" "}
            <Link
              href="http://www.opera.com/de/help"
              rel="nofollow noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              http://www.opera.com/de/help
            </Link>
          </li>
          <li>
            Safari:{" "}
            <Link
              href="https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE"
              rel="nofollow noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE
            </Link>
          </li>
        </ul>
        <h4>Speicherdauer und eingesetzte Cookies:</h4>
        <p>
          Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die
          Verwendung von Cookies erlauben, können folgende Cookies auf unseren
          Webseiten zum Einsatz kommen:
        </p>
        <p>
          Session Cookie 2 Wochen
          <br />
          CSRF Schutz Token Cookie 20 Jahre
        </p>
        <h3>Technisch notwendige Cookies </h3>
        <h4>Art und Zweck der Verarbeitung: </h4>
        <p>
          Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu
          gestalten. Einige Elemente unserer Internetseite erfordern es, dass
          der aufrufende Browser auch nach einem Seitenwechsel identifiziert
          werden kann.
        </p>
        <p>
          Der Zweck der Verwendung technisch notwendiger Cookies ist, die
          Nutzung von Websites für die Nutzer zu vereinfachen. Einige Funktionen
          unserer Internetseite können ohne den Einsatz von Cookies nicht
          angeboten werden. Für diese ist es erforderlich, dass der Browser auch
          nach einem Seitenwechsel wiedererkannt wird.
        </p>
        <p>Für folgende Anwendungen benötigen wir Cookies:</p>
        <p>
          Warenkorb
          <br />
          Übernahme von Spracheinstellungen
        </p>
        <h4>Rechtsgrundlage und berechtigtes Interesse: </h4>
        <p>
          Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis
          unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung
          unserer Website.
        </p>
        <h4>Empfänger: </h4>
        <p>
          Empfänger der Daten sind ggf. technische Dienstleister, die für den
          Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig
          werden.
        </p>
        <p></p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder
          gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten ist
          jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht
          gewährleistet. Zudem können einzelne Dienste und Services nicht
          verfügbar oder eingeschränkt sein.
        </p>
        <h4>Widerspruch</h4>
        <p>
          Lesen Sie dazu die Informationen über Ihr Widerspruchsrecht nach Art.
          21 DSGVO weiter unten.
        </p>
        <p></p>
        <h3>Registrierung auf unserer Website</h3>
        <h4>Art und Zweck der Verarbeitung:</h4>
        <p>
          Für die Registrierung auf unserer Website benötigen wir einige
          personenbezogene Daten, die über eine Eingabemaske an uns übermittelt
          werden.{" "}
        </p>
        <p>
          Zum Zeitpunkt der Registrierung werden zusätzlich folgende Daten
          erhoben:
        </p>
        <p>Account Erstellzeitstempel</p>
        <p>
          Ihre Registrierung ist für das Bereithalten bestimmter Inhalte und
          Leistungen auf unserer Website erforderlich.
        </p>
        <h4>Rechtsgrundlage:</h4>
        <p>
          Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt
          auf Grundlage einer Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a
          DSGVO).
        </p>
        <h4>Empfänger:</h4>
        <p>
          Empfänger der Daten sind ggf. technische Dienstleister, die für den
          Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig
          werden.
        </p>
        <p></p>
        <h4>Speicherdauer:</h4>
        <p>
          Daten werden in diesem Zusammenhang nur verarbeitet, solange die
          entsprechende Einwilligung vorliegt.{" "}
        </p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig,
          allein auf Basis Ihrer Einwilligung. Ohne die Bereitstellung Ihrer
          personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere
          angebotenen Inhalte gewähren.{" "}
        </p>
        <p></p>
        <h3>Erbringung kostenpflichtiger Leistungen</h3>
        <h4>Art und Zweck der Verarbeitung:</h4>
        <p>
          Zur Erbringung kostenpflichtiger Leistungen werden von uns zusätzliche
          Daten erfragt, wie z.B. Zahlungsangaben, um Ihre Bestellung ausführen
          zu können.
        </p>
        <h4>Rechtsgrundlage:</h4>
        <p>
          Die Verarbeitung der Daten, die für den Abschluss des Vertrages
          erforderlich ist, basiert auf Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <h4>Empfänger:</h4>
        <p>Empfänger der Daten sind ggf. Auftragsverarbeiter.</p>
        <p></p>
        <h4>Speicherdauer:</h4>
        <p>
          Wir speichern diese Daten in unseren Systemen bis die gesetzlichen
          Aufbewahrungsfristen abgelaufen sind. Diese betragen grundsätzlich 6
          oder 10 Jahre aus Gründen der ordnungsmäßigen Buchführung und
          steuerrechtlichen Anforderungen.
        </p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig.
          Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen
          keinen Zugang auf unsere angebotenen Inhalte und Leistungen gewähren.
        </p>
        <p></p>
        <h3>Newsletter</h3>
        <h4>Art und Zweck der Verarbeitung:</h4>
        <p>
          Für die Zustellung unseres Newsletters erheben wir personenbezogene
          Daten, die über eine Eingabemaske an uns übermittelt werden.
        </p>
        <p>
          Für eine wirksame Registrierung benötigen wir eine valide
          E-Mail-Adresse. Um zu überprüfen, dass eine Anmeldung tatsächlich
          durch den Inhaber einer E-Mail-Adresse erfolgt, setzen wir das
          „Double-Opt-in“-Verfahren ein. Hierzu protokollieren wir die Anmeldung
          zum Newsletter, den Versand einer Bestätigungsmail und den Eingang der
          hiermit angeforderten Antwort. Weitere Daten werden nicht erhoben.{" "}
        </p>
        <h4>Rechtsgrundlage:</h4>
        <p>
          Auf Grundlage Ihrer ausdrücklich erteilten Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO), übersenden wir Ihnen regelmäßig unseren Newsletter bzw.
          vergleichbare Informationen per E-Mail an Ihre angegebene
          E-Mail-Adresse.{" "}
        </p>
        <p>
          Die Einwilligung zur Speicherung Ihrer persönlichen Daten und ihrer
          Nutzung für den Newsletterversand können Sie jederzeit mit Wirkung für
          die Zukunft widerrufen. In jedem Newsletter findet sich dazu ein
          entsprechender Link. Außerdem können Sie sich jederzeit auch direkt
          auf dieser Website abmelden oder uns Ihren Widerruf über die am Ende
          dieser Datenschutzhinweise angegebene Kontaktmöglichkeit mitteilen.
        </p>
        <h4>Empfänger:</h4>
        <p>Empfänger der Daten sind ggf. Auftragsverarbeiter.</p>
        <p></p>
        <h4>Speicherdauer:</h4>
        <p>
          Die Daten werden in diesem Zusammenhang nur verarbeitet, solange die
          entsprechende Einwilligung vorliegt. Danach werden sie gelöscht.
        </p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig,
          allein auf Basis Ihrer Einwilligung. Ohne bestehende Einwilligung
          können wir Ihnen unseren Newsletter leider nicht zusenden.
        </p>
        <h4>Widerruf der Einwilligung:</h4>
        <p>
          Die Einwilligung zur Speicherung Ihrer persönlichen Daten und ihrer
          Nutzung für den Newsletterversand können Sie jederzeit mit Wirkung für
          die Zukunft widerrufen. Die Abmeldung kann über den in jeder E-Mail
          enthaltenen Link oder beim unten aufgeführten Datenschutzbeauftragten
          bzw. der für den Datenschutz zuständigen Person beantragt werden.{" "}
        </p>
        <p></p>
        <h3>Kontaktformular</h3>
        <h4>Art und Zweck der Verarbeitung:</h4>
        <p>
          Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen
          Kommunikation mit Ihnen gespeichert. Hierfür ist die Angabe einer
          validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient
          der Zuordnung der Anfrage und der anschließenden Beantwortung
          derselben. Die Angabe weiterer Daten ist optional.
        </p>
        <h4>Rechtsgrundlage:</h4>
        <p>
          Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt
          auf der Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
        <p>
          Durch Bereitstellung des Kontaktformulars möchten wir Ihnen eine
          unkomplizierte Kontaktaufnahme ermöglichen. Ihre gemachten Angaben
          werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche
          Anschlussfragen gespeichert.
        </p>
        <p>
          Sofern Sie mit uns Kontakt aufnehmen, um ein Angebot zu erfragen,
          erfolgt die Verarbeitung der in das Kontaktformular eingegebenen Daten
          zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b
          DSGVO).
        </p>
        <h4>Empfänger:</h4>
        <p>Empfänger der Daten sind ggf. Auftragsverarbeiter.</p>
        <p></p>
        <h4>Speicherdauer:</h4>
        <p>
          Daten werden spätestens 6 Monate nach Bearbeitung der Anfrage
          gelöscht.
        </p>
        <p>
          Sofern es zu einem Vertragsverhältnis kommt, unterliegen wir den
          gesetzlichen Aufbewahrungsfristen nach HGB und löschen Ihre Daten nach
          Ablauf dieser Fristen.{" "}
        </p>
        <h4>Bereitstellung vorgeschrieben oder erforderlich:</h4>
        <p>
          Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig.
          Wir können Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren
          Namen, Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.
        </p>
        <p></p>
        <h3>Verwendung von Google Analytics</h3>
        <p>
          Soweit Sie ihre Einwilligung gegeben haben, wird auf dieser Website
          Google Analytics eingesetzt, ein Webanalysedienst der Google LLC, 1600
          Amphitheatre Parkway, Mountain View, CA 94043 USA (nachfolgend:
          „Google“). Google Analytics verwendet sog. „Cookies“, also
          Textdateien, die auf Ihrem Computer gespeichert werden und die eine
          Analyse der Benutzung der Webseite durch Sie ermöglichen. Die durch
          das Cookie erzeugten Informationen über Ihre Benutzung dieser Webseite
          werden in der Regel an einen Server von Google in den USA übertragen
          und dort gespeichert. Aufgrund der Aktivierung der IP-Anonymisierung
          auf diesen Webseiten, wird Ihre IP-Adresse von Google jedoch innerhalb
          von Mitgliedstaaten der Europäischen Union oder in anderen
          Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum
          zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an
          einen Server von Google in den USA übertragen und dort gekürzt. Die im
          Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse
          wird nicht mit anderen Daten von Google zusammengeführt.{" "}
        </p>
        <p>
          Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie
          unter{" "}
          <Link
            href="https://www.google.com/analytics/terms/de.html und unter https://policies.google.com/?hl=de"
            rel="noopener noreferrer"
            sx={{ wordBreak: "break-all" }}
            target="_blank"
          >
            https://www.google.com/analytics/terms/de.html und unter
            https://policies.google.com/?hl=de
          </Link>
          .{" "}
        </p>
        <p>
          Im Auftrag des Betreibers dieser Website wird Google diese
          Informationen benutzen, um Ihre Nutzung der Webseite auszuwerten, um
          Reports über die Webseitenaktivitäten zusammenzustellen und um weitere
          mit der Websitenutzung und der Internetnutzung verbundene
          Dienstleistungen gegenüber dem Webseitenbetreiber zu erbringen.{" "}
        </p>
        <p>
          Die von uns gesendeten und mit Cookies, Nutzerkennungen (z. B.
          User-ID) oder Werbe-IDs verknüpften Daten werden nach 14 Monaten
          automatisch gelöscht. Die Löschung von Daten, deren Aufbewahrungsdauer
          erreicht ist, erfolgt automatisch einmal im Monat.
        </p>
        <h4>Widerruf der Einwilligung:</h4>
        <p>
          Sie können das Tracking durch Google Analytics auf unserer Website
          unterbinden, indem Sie{" "}
          <Link
            href="#"
            onClick={() => setAnalyticsCollectionEnabled(analytics, false)}
            sx={{ wordBreak: "break-all" }}
            title="Google Analytics Opt-Out-Cookie setzen"
          >
            diesen Link anklicken
          </Link>
          . Dabei wird ein Opt-out-Cookie auf Ihrem Gerät installiert. Damit
          wird die Erfassung durch Google Analytics für diese Website und für
          diesen Browser zukünftig verhindert, solange das Cookie in Ihrem
          Browser installiert bleibt.
        </p>
        <p>
          Sie können darüber hinaus die Speicherung der Cookies durch eine
          entsprechende Einstellung Ihrer Browser-Software verhindern; wir
          weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls
          nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen
          können.{" "}
        </p>
        <p>
          Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten
          und auf Ihre Nutzung der Webseite bezogenen Daten (inkl. Ihrer
          IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google
          verhindern, indem sie das unter dem folgenden Link verfügbare
          Browser-Plugin herunterladen und installieren:{" "}
          <Link
            href="http://tools.google.com/dlpage/gaoptout?hl=de"
            rel="noopener noreferrer"
            sx={{ wordBreak: "break-all" }}
            target="_blank"
          >
            Browser Add On zur Deaktivierung von Google Analytics
          </Link>
          .
        </p>
        <p></p>
        <h3>SSL-Verschlüsselung</h3>
        <p>
          Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen,
          verwenden wir dem aktuellen Stand der Technik entsprechende
          Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
        </p>
        <p></p>
        <hr />
        <h3>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h3>
        <h4>Einzelfallbezogenes Widerspruchsrecht</h4>
        <p>
          Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
          Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender
          personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
          (Datenverarbeitung auf der Grundlage einer Interessenabwägung)
          erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese
          Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.
        </p>
        <p>
          Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten
          nicht mehr verarbeiten, es sei denn, wir können zwingende
          schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre
          Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung
          dient der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen.
        </p>
        <h4>Empfänger eines Widerspruchs</h4>
        <p>admin@wolkeneis.dev</p>
        <hr />
        <h3>Änderung unserer Datenschutzbestimmungen</h3>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht oder um
          Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
          z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt
          dann die neue Datenschutzerklärung.
        </p>
        <h3>Fragen an den Datenschutzbeauftragten</h3>
        <p>
          Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine
          E-Mail oder wenden Sie sich direkt an die für den Datenschutz
          verantwortliche Person in unserer Organisation:
        </p>
        <p>privacy@wolkeneis.dev</p>
        <p>
          <em>
            Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt,
            den Experten für{" "}
            <Link
              href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/"
              rel="noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
              target="_blank"
            >
              externe Datenschutzbeauftragte
            </Link>{" "}
            (Version #2020-09-30).
          </em>
        </p>
      </Paper>
    </Box>
  );
};

export default PrivacyPolicy;
