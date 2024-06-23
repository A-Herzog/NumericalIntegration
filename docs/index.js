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

/* Select language */
import {selectLanguage} from './js/LanguageTools.js';
selectLanguage([{name: "default", file: "index.html"}, {name: "de", file: "index_de.html"}]);

/* Select color mode */
let selectedColorMode=localStorage.getItem('selectedColorMode');
if (selectedColorMode==null) selectedColorMode=(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light";
document.documentElement.dataset.bsTheme=selectedColorMode;

/* Init app */
import {language} from "./js/Language.js";
import {initApp, isDesktopApp} from './js/Main.js';
initApp();

let downloadBlock="<h4>"+language.GUI.downloadTitle+"</h4>";
downloadBlock+="<p>"+language.GUI.downloadTableInfo+"</p>";
downloadBlock+="<a id=\"downloadXLSX\" target=\"_blank\" href=\"./files/NumericalInegration_"+document.documentElement.lang+".xlsx\" download=\"NumericalInegration.xlsx\" title=\""+language.GUI.downloadExcel+"\" style=\"display: none;\"></a>";
downloadBlock+="<a id=\"downloadODS\" target=\"_blank\" href=\"./files/NumericalInegration_"+document.documentElement.lang+".ods\" download=\"NumericalInegration.ods\" title=\""+language.GUI.downloadLibreOffice+"\" style=\"display: none;\"></a>";
downloadBlock+="<button onclick=\"document.getElementById('downloadXLSX').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.downloadExcel+"</button>\n";
downloadBlock+="<button onclick=\"document.getElementById('downloadODS').click();\" class=\"btn btn-primary my-1 bi-table\"> "+language.GUI.downloadLibreOffice+"</button>\n";

if (isDesktopApp) {
  const footer=document.querySelector('footer');
  for (let link of footer.querySelectorAll("a")) if (link.href!='') {
    const href=link.href;
    link.onclick=()=>Neutralino.os.open(href);
    link.removeAttribute("href");
    link.style.cursor="pointer";
    link.classList.add("link-primary");
  }
} else {
  const downloadA='<a id="downloadApp" target="_blank" href="https://github.com/A-Herzog/NumericalIntegration/releases/latest/download/NumericalIntegration.exe" style="display: none;"></a>';
  const downloadButton='<button class="btn btn-primary my-1 bi-windows" onclick="document.getElementById(\'downloadApp\').click();"> '+language.GUI.downloadButton+'</button>';
  //downloadBlock+="<p class='mt-3'>"+language.GUI.downloadLabel+"</p><p>"+downloadA+downloadButton+"</p>";
}
downloadInfoArea.innerHTML=downloadBlock;
