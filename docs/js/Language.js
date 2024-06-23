/*
Copyright 2024 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {language};

let lang;

/* German */

const languageDE={};
lang=languageDE;

lang.GUI={};
lang.GUI.appName="Numersiche Integration";
lang.GUI.homeURL="warteschlangensimulation.de";
lang.GUI.imprint="Impressum";
lang.GUI.privacy="Datenschutz";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="Alle Berechnungen laufen vollständig im Browser ab.<br>Diese Webapp führt nach dem Laden des HTML- und Skriptcodes keine weitere Kommunikation mit dem Server durch.";
lang.GUI.simulators="Simulatoren";
lang.GUI.switchLanguage="Switch to <b>English</b>";
lang.GUI.switchLanguageHint="Switch to English";
lang.GUI.switchLanguageShort="English";
lang.GUI.switchLanguageMode='default';
lang.GUI.switchLanguageFile="index.html";
lang.GUI.tabColorMode="Farbmodus";
lang.GUI.tabColorModeLight="Hell";
lang.GUI.tabColorModeDark="Dunkel";
lang.GUI.tabColorModeSystemDefault="Systemvorgabe";
lang.GUI.downloadTitle="Downloads";
lang.GUI.downloadTableInfo="Die folgenden Tabellen enthalten Beispiele zur numerischen Integration mit einer Tabellenkalkulation:";
lang.GUI.downloadExcel="Excel Arbeitsmappe";
lang.GUI.downloadLibreOffice="OpenOffice/LibreOffice Arbeitsmappe";
lang.GUI.downloadLabel="Diese Webapp steht auch als offline-nutzbare Windows-Anwendung zur Verfügung:";
lang.GUI.downloadButton="Windows-Anwendung (exe)";
lang.GUI.topInfo="Obwohl man den Eindruck hat, es handelt sich bei der Integration um das Gegenstück zur Differentiation, ist Integration ungemein schwieriger.  Um Ableitungen von konkreten Funktionen zu bestimmen, genügt es, wenige definierte Regeln anzuwenden. Zur Integration selbst elementarer Funktionen hingegen existiert kein einfacher und kein alle Fälle abdeckender Algorithmus. Hier ist man viel eher auf numerische Approximationen angewiesen. Numerische Integration wird auch <b>Quadratur</b> genannt.";
lang.GUI.function="Funktion";
lang.GUI.steps="Teilschritte";
lang.GUI.method="Interpolationsmethode";
lang.GUI.methodName=[];
lang.GUI.methodName.push("Rechteckregel (Stützstellen links)");
lang.GUI.methodName.push("Rechteckregel (Stützstellen rechts)");
lang.GUI.methodName.push("Rechteckregel (Stützstellen in der Mitte)");
lang.GUI.methodName.push("Trapezregel");
lang.GUI.methodName.push("Simpsonsche Regel");
lang.GUI.methodInfo=[];
lang.GUI.methodInfo.push("<strong>Rechteckregel</strong><br>Hierbei handelt es sich um die einfachste Form der Approximation. Der Funktionsgraph wird mit einem Stützpunkt (n=1) angenähert und der Flächeninhalt als Rechteck approximiert. Bei der zusammengesetzten Rechteckregel (n>1) wird das Integrationsgebiet unterteilt und die obige Regel auf jedes Teilintervall angewendet.");
lang.GUI.methodInfo.push("<strong>Rechteckregel</strong><br>Hierbei handelt es sich um die einfachste Form der Approximation. Der Funktionsgraph wird mit einem Stützpunkt (n=1) angenähert und der Flächeninhalt als Rechteck approximiert. Bei der zusammengesetzten Rechteckregel (n>1) wird das Integrationsgebiet unterteilt und die obige Regel auf jedes Teilintervall angewendet.");
lang.GUI.methodInfo.push("<strong>Rechteckregel</strong><br>Hierbei handelt es sich um die einfachste Form der Approximation. Der Funktionsgraph wird mit einem Stützpunkt (n=1) angenähert und der Flächeninhalt als Rechteck approximiert. Bei der zusammengesetzten Rechteckregel (n>1) wird das Integrationsgebiet unterteilt und die obige Regel auf jedes Teilintervall angewendet.");
lang.GUI.methodInfo.push("<strong>Trapezregel</strong><br>Hier ist die Grundidee, mithilfe von zwei Stützstellen den Funktionsgraphen durch eine Gerade und somit das den Flächeninhalt durch ein Trapez zu approximieren. Bei der zusammengesetzten Trapezregel (n>1) wird das Integrationsgebiet unterteilt und die obige Regel auf jedes Teilintervall angewendet. Dabei können Funktionsauswertungen wiederverwendet werden, da jede innere Stützstelle zu zwei Trapezen gehört.");
lang.GUI.methodInfo.push("<strong>Simpsonsche Regel / Kepplersche Fassregel</strong><br>Hier wird die Funktion durch ein quadratisches Polynom approximiert. Dazu werden als Stützstellen beide Ränder sowie der Mittelpunkt verwendet. Bei der zusammengesetzten Simpsonschen Regel (n>1) wird das Integrationsgebiet unterteilt und die obige Regel auf jedes Teilintervall angewendet. Auch hier können Funktionsauswertungen wiederverwendet werden, da die Randstützstellen in der Regel zu zwei Intervallen gehören.");
lang.GUI.resultExact="Symbolisch berechneter exakter Wert";
lang.GUI.resultApprox="Näherung";
lang.GUI.resultAbsoluteError="Absoluter Fehler";
lang.GUI.resultRelativeError="Relativer Fehler";

/* English */

const languageEN={};
lang=languageEN;

lang.GUI={};
lang.GUI.appName="Numerical integration";
lang.GUI.homeURL="queueingsimulation.de";
lang.GUI.imprint="Imprint";
lang.GUI.privacy="Privacy";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="All calculations are performed entirely in the browser.<br>This Webapp does not perform any further communication with the server after loading the HTML and script code.";
lang.GUI.simulators="Simulators";
lang.GUI.switchLanguage="Auf <b>Deutsch</b> umschalten";
lang.GUI.switchLanguageHint="Auf Deutsch umschalten";
lang.GUI.switchLanguageShort="Deutsch";
lang.GUI.switchLanguageMode='de';
lang.GUI.switchLanguageFile="index_de.html";
lang.GUI.tabColorMode="Color mode";
lang.GUI.tabColorModeLight="Light";
lang.GUI.tabColorModeDark="Dark";
lang.GUI.tabColorModeSystemDefault="System default";
lang.GUI.downloadTitle="Downloads";
lang.GUI.downloadTableInfo="The following tables contain examples of numerical integration using a spreadsheet program:";
lang.GUI.downloadExcel="Excel Workbook";
lang.GUI.downloadLibreOffice="OpenOffice/LibreOffice Workbook";
lang.GUI.downloadLabel="This webapp is also available as an offline usable Windows application:";
lang.GUI.downloadButton="Windows application (exe)";
lang.GUI.topInfo="Although one has the impression that the integration is the counterpart of differentiation, integration is much more difficult. To determine derivatives of specific functions, it is sufficient to apply a few defined rules. To integrate elementary functions, however there is no easy and not all cases a concealing algorithm. Here you are much more likely to rely on numerical approximations. Numerical integration is also called <b>quadrature</b>.";
lang.GUI.function="Function";
lang.GUI.steps="Steps";
lang.GUI.method="Interpolation method";
lang.GUI.methodName=[];
lang.GUI.methodName.push("Rectangle rule (reference points on the left)");
lang.GUI.methodName.push("Rectangle rule (reference points on the right)");
lang.GUI.methodName.push("Rectangle rule (reference points in the middle)");
lang.GUI.methodName.push("Trapeze rule");
lang.GUI.methodName.push("Simpsons rule");
lang.GUI.methodInfo=[];
lang.GUI.methodInfo.push("<strong>Rectangle rule</strong><br>This is the simplest form of an approximation. The function graph is approximated using one reference point (n=1) and the area is approximates by a rectangle. At the composite rectangle rule (n>1) the integration region is divided and the above rule is applied to each sub-interval.");
lang.GUI.methodInfo.push("<strong>Rectangle rule</strong><br>This is the simplest form of an approximation. The function graph is approximated using one reference point (n=1) and the area is approximates by a rectangle. At the composite rectangle rule (n>1) the integration region is divided and the above rule is applied to each sub-interval.");
lang.GUI.methodInfo.push("<strong>Rectangle rule</strong><br>This is the simplest form of an approximation. The function graph is approximated using one reference point (n=1) and the area is approximates by a rectangle. At the composite rectangle rule (n>1) the integration region is divided and the above rule is applied to each sub-interval.");
lang.GUI.methodInfo.push("<strong>Trapeze rule</strong><br>Here the basic idea is to approximate the function graph by a straight line by means of two reference points and thus to approximate the area by a trapezoid. At the composite trapezoidal rule (n>1) the integration region is divided and the above rule is applied to each sub-interval. In this function evaluations can be reused, since each inner reference point belongs to two trapezoids.");
lang.GUI.methodInfo.push("<strong>Simpsons rule</strong><br>Here the function is approximated by a quadratic polynomial. Both edges and the center are used as reference points. At the composite Simpson's rule (n>1) the integration region is divided and the above rule is applied to each sub-interval. Again function evaluations can be reused, as the edge nodes usually belong to two intervals.");
lang.GUI.resultExact="Exact value by symbolic integration";
lang.GUI.resultApprox="Approximation";
lang.GUI.resultAbsoluteError="Absolute error";
lang.GUI.resultRelativeError="Relative error";

/* Activate language */

const language=(document.documentElement.lang=='de')?languageDE:languageEN;
