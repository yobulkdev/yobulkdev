<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk.dev</a><br>
    </b>
    ⭐️ Datenaustauschplattform für alle Unternehmen, die auf CSV-Dateien laufen <br>
         Die Open-Source-Alternative zu https://flatfile.com/ ⭐️<br>
</h1>

<p align="center">
Schnellste und einfachste Methode zum Importieren von CSV-Daten in Ihre Anwendung über eine intelligente Tabellenkalkulation<br>
Erstellen Sie die YoBulk-CSV-Importschaltfläche und beschleunigen Sie den CSV-Import <b>10x</b>.
</p>

<p align="center">
    <a href="http://www.yobulk.dev"><b>Webseite</b></a> •
    <a href="https://twitter.com/yobulkdev"><b>Twitter</b></a>  •
    <a href="https://join.slack.com/t/yobulkdev/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg" target="_blank"><b>Slack</b></a>
</p>

<h4 align="center">
  <a href="https://github.com/uptrainai/uptrain/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-AGPL-blue" alt="YoBulk is released under the AGPL license." />
  </a>
  <a href="https://doc.yobulk.dev/">
    <img src="https://img.shields.io/badge/Read-Docs-blue" alt="Docs" />
  </a>
  <a href="https://join.slack.com/t/yobulkdev/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg">
    <img src="https://img.shields.io/badge/community%20-slack-yellow" alt="Community" />
  </a>
  <a href="https://yobulk.dev/">
    <img src="https://img.shields.io/badge/website-yobulk-brightgreen" alt="Website" />
  </a>
</h4>

<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214280161-3bf6dea8-955b-43fe-bbd5-f6ace09a6e1b.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214279676-d2904d57-5305-4491-9695-cbdcaab1bdf6.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214277179-4be09db9-b61b-494f-a003-9b9736ac3e36.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214282360-3ec13ab4-852b-4649-bc5c-b5a09d52b0d3.png"" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>

<div align="center">

[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263434-75fe793d-42af-49e4-b964-d70920e41655.png">](markdown/languages/chinese.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263770-38e3e79d-11d4-472e-ac27-ae0f17cf65c4.png">](markdown/languages/japanese.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263531-fae58600-6616-4b43-95a0-5891019dd35d.png">](markdown/languages/german.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263888-151d4ad1-7084-4943-97c9-56f28cd40b80.png">](markdown/languages/russian.md)

<p align="center"><a href="markdown/languages"><b>See other languages »</b></a></p>

</div>

## Benutzerinstallation

- [Docker](https://doc.yobulk.dev/GetStarted/Installation#yobulk-installation)

## Next.js-Anwendung

Wir bieten eine einfache Next JS-Anwendung für den Einstieg.

```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn build
yarn start
```

Das Dashboard ist bereit zum Experimentieren unter http://localhost:3000/.

## Docker

```bash
docker run -d --name yobulk \
-p 8000:3000 \
yobulk/yobulk:latest
```

Das YoBulk-Dashboard ist unter http://localhost:8000/ einsatzbereit.

## Gebaut mit

- [Next.js](https://nextjs.org/)

## Einen schnellen Start bekommen

Bitte sehen Sie sich die [Dokumentation] (https://doc.yobulk.dev/GetStarted/Quickstart) an, erstellen Sie Importschaltflächen und versuchen Sie den Datenimport.

## Fahrplan

- [YoBulk Roadmap ReadMe](https://doc.yobulk.dev/RoadMap/ProductVision)

# Merkmale

### Vorlage

- ⚡ &nbsp;Importer-Dashboard, um den Importstatus in Ihre lokale Datenbank zu überprüfen
- ⚡ &nbsp;Keine Erstellung von Codevorlagen und Schaltflächen importieren
- ⚡ &nbsp;Intelligenter automatischer Abgleich zwischen der CSV-Spalte und der Vorlagenspalte
- ⚡ &nbsp;Benutzerdefinierte Validierungsregeleinstellung für ein Feld
- ⚡ &nbsp;Herrliche Datenüberprüfungserfahrung
- ⚡ &nbsp;Skalierbar durch Streaming. Sie können eine CSV-Datei mit einer Größe von 1 GB importieren
- ⚡ &nbsp;und mehr ...

### Workflow-Automatisierungen importieren

- ⚡ &nbsp;Einen Arbeitsbereich und eine Organisation an eine Importschaltfläche anhängen: Erhalten Sie eine CSV-Datei von einer bestimmten Organisation
- ⚡ &nbsp;Webhook : In Kürze verfügbar..

## Warum bauen wir das?

Mehr als 70 % der gemeinsam genutzten Geschäftsdaten liegen in Form von CSV- und Excel-Dateien vor. Weniger als 10 % haben wirklich API-Integrationen für den Datenaustausch eingeführt.

Als Entwickler und Produktmanager haben wir uns die Mühe gemacht, einen skalierbaren CSV-Importer zu erstellen und ihn intern zu warten. Jeden Tag müssen Tausende von Entwicklern die gleichen Schmerzen durchmachen und Hunderte von Unternehmen müssen Tabellenkalkulations- und CSV-Daten in eine Datenbank bekommen.
YoBulk erstellt einen OSS-Standard für das Onboarding von CSV- und Flatfile-Daten, der Ihnen dabei helfen kann, eine interne Datenimportlösung zu erstellen.

Unternehmen wie Flatfile.com gehen das Problem an, aber es gibt Einschränkungen wie schwache Datensicherheit und hohe Preise. Während Entwickler einen integrierbaren/skalierbaren CSV-Importer für SaaS wünschen, ist es in Wahrheit nicht sehr möglich, in einem so fragmentierten Markt und Sektor eine Einheitslösung zu entwickeln.

All diese Einschränkungen erfordern unsere Mission - es jedem zu ermöglichen, eine Datenimportlösung zu erstellen, die seinen Anforderungen entspricht.

Entwicklern möchten wir eine „Bring your own“-Validierungsregel anbieten und bringen Ihre eigene Datenbankerfahrung mit. Mit YoBulk können Sie Validierungsregeln auf Ihre eigene Weise entwerfen und ändern.

Für Unternehmen widmet sich YoBulk der Bereitstellung von Datensicherheit. Darüber hinaus haben Sie die 100-prozentige Kontrolle über Ihre Daten, gepaart mit langfristiger Wartbarkeit.

Um ehrlich zu sein, haben wir zumindest vorerst nicht den Anspruch, flatfile.com in Sachen Funktionalität und Design zu übertreffen. Außerdem ist es unsere Priorität, im Moment weitere Funktionen hinzuzufügen. Wir möchten eine Community aufbauen, um das Wissen zu demokratisieren und alle CSV- und Flatfile-Open-Source-Projekte unter einen einzigen Rahmen zu bringen.

Weiterlesen[Open vs. Closed Data Onboarding](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# Unsere Aufgabe

Unsere Mission ist es, den leistungsstärksten Importer für Flatfiles (CSV, Tabellenkalkulation) bereitzustellen, der Open Source für jedes einzelne Internetunternehmen der Welt ist.
Ein erster KI-Datenaustausch für Unternehmen zum Teilen von Flatfiles, bei dem Sie für das Onboarding, die Validierung und die Transformation der Daten Ihrer Kunden verantwortlich sind.

## Unterstützung

Wenn Sie Fragen oder Probleme haben, besuchen Sie bitte unsere GitHub-Diskussionsseite, und wir werden versuchen, Ihnen so schnell wie möglich zu helfen.

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## Lizenz

YoBulk ist eine Open-Source-Software mit der [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
