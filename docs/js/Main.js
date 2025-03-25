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

export {isDesktopApp, initApp};

import {language} from "./Language.js";

/**
 * Example functions
 */
const demoFunctions=[
  {
    displayf: "x^2",
    displayF: "1/3*x<sup>3</sup>",
    calcf: x=>x**2,
    calcF: x=>1/3*x**3
  },
  {
    displayf: "sin(x/2)+2",
    displayF: "2&middot;x-2&middot;cos(x/2)",
    calcf: x=>Math.sin(x/2)+2,
    calcF: x=>2*x-2*Math.cos(x/2)
  },
  {
    displayf: "sin(10*x)+2",
    displayF: "2&middot;x-cos(10&middot;x)/10",
    calcf: x=>Math.sin(10*x)+2,
    calcF: x=>2*x-Math.cos(10*x)/10
  },
  {
    displayf: "(x/3)^4-8*(x/3)^2+20",
    displayF: "x<sup>5</sup>/405-(8&middot;x<sup>3</sup>)/27+20&middot;x",
    calcf: x=>(x/3)**4-8*(x/3)**2+20,
    calcF: x=>x**5/405-(8*x**3)/27+20*x
  }
];

/**
 * Is the system running as Neutralions desktop app (true) or as a web page (false)?
 */
const isDesktopApp=(typeof(NL_OS)!='undefined');
if (isDesktopApp) {
  Neutralino.init();
  Neutralino.events.on("windowClose",()=>Neutralino.app.exit());
}

/**
 * Fills in the language strings to the GUI elements.
 */
function initGUILanguage() {
  /* Header */
  appName1.innerHTML=language.GUI.appName;
  languageButton.title=language.GUI.switchLanguageHint;
  languageButton.querySelector('.menuButtonTitleShort').innerHTML=language.GUI.switchLanguageShort;
  languageButton.querySelector('.menuButtonTitleLong').innerHTML=language.GUI.switchLanguage;
  languageButton.onclick=()=>{
    localStorage.setItem('selectedLanguage',language.GUI.switchLanguageMode);
    document.location.href=language.GUI.switchLanguageFile;
  }

  menuColorMode.title=language.GUI.tabColorMode;
  menuColorModeLight.innerHTML=language.GUI.tabColorModeLight;
  menuColorModeDark.innerHTML=language.GUI.tabColorModeDark;
  menuColorModeSystemDefault.innerHTML=language.GUI.tabColorModeSystemDefault;

  let selectedColorMode=localStorage.getItem('selectedColorMode');
  if (selectedColorMode==null) {
    menuColorModeSystemDefault.classList.add("bi-check");
    const mode=(document.documentElement.dataset.bsTheme=='dark')?language.GUI.tabColorModeDark:language.GUI.tabColorModeLight;
    menuColorModeSystemDefault.innerHTML=menuColorModeSystemDefault.innerHTML+" ("+mode+")";
  } else {
    if (document.documentElement.dataset.bsTheme=='dark') menuColorModeDark.classList.add("bi-check"); else menuColorModeLight.classList.add("bi-check");
  }

  /* Content */
  topInfo.innerHTML=language.GUI.topInfo;
  diagramCopyButton.innerHTML=" "+language.GUI.copyDiagram;
  diagramCopyButton.onclick=()=>{
    if (typeof(ClipboardItem)!="undefined") {
      chartCanvas.toBlob(blob=>navigator.clipboard.write([new ClipboardItem({"image/png": blob})]));
    } else {
      alert(language.GUI.copyDiagramError);
    }
  };
  diagramSaveButton.innerHTML=" "+language.GUI.saveDiagram;
  diagramSaveButton.onclick=()=>{
    const element=document.createElement("a");
    element.href=chartCanvas.toDataURL("image/png");
    element.download="diagram.png";
    element.click();
  };
  selectFunctionLabel.innerHTML=language.GUI.function+":&nbsp";
  for (let i=0;i<demoFunctions.length;i++) {
    const option=document.createElement("option");
    option.innerHTML="f(x):="+demoFunctions[i].displayf;
    option.value=i;
    option.selected=(i==0);
    selectFunction.appendChild(option);
  }
  const freeOption=document.createElement("option");
  freeOption.innerHTML="f(x):=";
  freeOption.value=demoFunctions.length;
  selectFunction.appendChild(freeOption);
  selectMethodLabel.innerHTML=language.GUI.method+":&nbsp";
  for (let i=0;i<language.GUI.methodName.length;i++) {
    const option=document.createElement("option");
    option.innerHTML=language.GUI.methodName[i];
    option.value=i;
    option.selected=(i==0);
    selectMethod.appendChild(option);
  }

  /* Footer */
  appName2.innerHTML=language.GUI.appName;
  linkImprint.innerHTML=language.GUI.imprint;
  linkPrivacy.innerHTML=language.GUI.privacy;
  linkMainHome.innerHTML=language.GUI.homeURL;
  linkMainHome.href="https://"+language.GUI.homeURL;
  infoLocalDataOnly2.querySelector("h3").innerHTML=language.GUI.privacyInfo1;
  infoLocalDataOnly2.querySelector("div").innerHTML=language.GUI.privacyInfo2;
  infoSimulators.innerHTML=language.GUI.simulators;
}

let chartOptions;
let chartData={};
let chart;

const plotSteps=500;

/**
 * Initializes the GUI elements
 */
function initGUI() {
  chartOptions={
    scales: {
      x: {
        type: "linear",
        title: {display: true, text: "x"},
        //ticks: {callback: (index,value)=>value.toLocaleString()}
        min: 0,
        max: 10
      },
      y: {
        title: {display: true, text: "f(x)"},
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: "ctrl",
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true,
            modifierKey: "ctrl",
          },
          mode: 'xy',
        }
      },
    },
    animation: {duration: 0}
  };
  const setup={type: 'line', data: chartData, options: chartOptions};
  chart=new Chart(chartCanvas,setup);

  selectFunction.onchange=updateIntegral;
  inputFunction.oninput=updateIntegral;
  inputXMin.oninput=updateIntegral;
  inputXMax.oninput=updateIntegral;
  rangeSteps.oninput=updateIntegral;
  selectMethod.onchange=updateIntegral;
  updateIntegral();
}

/**
 * Update output after user input change
 */
function updateIntegral() {
  /* Mode */
  const mode=parseInt(selectFunction.value);
  inputFunction.style.display=(mode==4)?"inline-block":"none";

  /* Function */
  let compiledFunction=null;
  if (mode==demoFunctions.length) {
    inputFunction.classList.remove("is-invalid");
    try {
      const func=inputFunction.value.replace(new RegExp('\\,|\\;','g'),match=>match===','?'.':',');
      const parsed=math.parse(func);
      compiledFunction=parsed.compile();
    } catch (err) {
      compiledFunction=null;
      inputFunction.classList.add("is-invalid");
    }
  }

  /* Min */
  const minX=parseFloat(inputXMin.value.replaceAll(",","."));
  if (isNaN(minX)) {
    inputXMin.classList.add("is-invalid");
  } else {
    inputXMin.classList.remove("is-invalid");
  }

  /* Max */
  let maxX=parseFloat(inputXMax.value.replaceAll(",","."));
  if (isNaN(maxX) || (!isNaN(minX) && minX>=maxX)) {
    inputXMax.classList.add("is-invalid");
    maxX=NaN;
  } else {
    inputXMax.classList.remove("is-invalid");
  }

  /* Steps */
  const steps=parseInt(rangeSteps.value);
  let filler="";
  if (steps<10) filler+="&nbsp;";
  if (steps<100) filler+="&nbsp;";
  rangeStepsLabel.innerHTML=language.GUI.steps+" n=<span style='font-family: monospace;'>"+filler+steps+"</span>";

  /* Method */
  const method=parseInt(selectMethod.value);

  /* Function info */
  let exactResult=null;
  if (mode==demoFunctions.length) {
    infoFunction.innerHTML="&nbsp";
  } else {
    const name=demoFunctions[mode].displayF;
    let integralValue="";
    if (!isNaN(minX) && !isNaN(maxX)) {
      exactResult=demoFunctions[mode].calcF(maxX)-demoFunctions[mode].calcF(minX);
      integralValue=",&nbsp;&nbsp;F("+maxX.toLocaleString()+")-F("+minX.toLocaleString()+")="+exactResult.toLocaleString();
    }
    infoFunction.innerHTML="&nbsp;F(x)="+name+integralValue;
  }

  const ok=!isNaN(minX) && !isNaN(maxX) && (mode<demoFunctions.length || compiledFunction!=null);

  /* Chart */

  const calcf=x=>(mode==demoFunctions.length)?compiledFunction.evaluate({x: x}):demoFunctions[mode].calcf(x);

  if (ok) {
    chartOptions.scales.x.min=minX;
    chartOptions.scales.x.max=maxX;

    const xValues=Array.from({length: plotSteps},(_,i)=>i).map(i=>minX+i/plotSteps*(maxX-minX));
    const xyValues=xValues.map(x=>({x: x, y: calcf(x)}));
    const minY=Math.min(0,xyValues.map(point=>point.y).reduce((x,y)=>Math.min(x,y)));
    const maxY=xyValues.map(point=>point.y).reduce((x,y)=>Math.max(x,y));
    const f={
      type: 'line',
      label: "f(x):="+((mode<demoFunctions.length)?demoFunctions[mode].displayf:inputFunction.value),
      data: xyValues,
      fill: false,
      borderColor: 'green',
      borderWidth: 3,
      pointStyle: false,
    };

    chartData.datasets=[f,...generateBars(calcf,method,minX,maxX,minY,maxY,steps,calcf)];
  } else {
    chartData.datasets=[];
  }
  chart.update();

  /* Results info */
  const result=[];
  if (ok) {
    if (exactResult!=null) result.push(language.GUI.resultExact+"="+exactResult.toLocaleString());
    const approxResult=calcApproxResult(calcf,method,minX,maxX,steps);
    result.push(language.GUI.resultApprox+"="+approxResult.toLocaleString());
    if (exactResult!=null) {
      result.push(language.GUI.resultAbsoluteError+"="+(approxResult-exactResult).toLocaleString());
      result.push(language.GUI.resultRelativeError+"="+((approxResult-exactResult)/exactResult*100).toLocaleString()+"%");
    }
  }
  resultsArea.innerHTML=result.join("<br>");
  methodInfoArea.innerHTML=language.GUI.methodInfo[method];
}

/**
 * Calculates the numerical approximation for the integral
 * @param {Function} f Callback for calculating f(x)
 * @param {Number} method Approximation method to be used
 * @param {Number} min Minimum x value of the integration range
 * @param {Number} max Maximum x value of the integration range
 * @param {Number} steps Number of approximation steps
 * @returns Approximation of the integral value
 */
function calcApproxResult(f, method, min, max, steps) {
  const step=(max-min)/steps;
  let sum=0;
  switch (method) {
    case 0: /* Rectangle rule (reference points on the left) */
      for (let i=0;i<steps;i++) {
        const x=min+i*step;
        sum+=f(x);
      }
      break;
    case 1: /* Rectangle rule (reference points on the right) */
      for (let i=0;i<steps;i++) {
        const x=min+(i+1)*step;
        sum+=f(x);
      }
      break;
    case 2: /* Rectangle rule (reference points in the middle) */
      for (let i=0;i<steps;i++) {
        const x=min+(i+0.5)*step;
        sum+=f(x);
      }
      break;
    case 3: /* Trapeze rule */
      for (let i=0;i<steps;i++) {
        const x1=min+i*step;
        const x2=min+(i+1)*step;
        sum+=(f(x1)+f(x2))/2;
      }
      break;
    case 4: /* Simpsons rule */
      for (let i=0;i<steps;i++) {
        const x1=min+i*step;
        const x2=min+(i+0.5)*step;
        const x3=min+(i+1)*step;
        sum+=(f(x1)+4*f(x2)+f(x3))/6;
      }
      break;
    case 5: /* Monte-Carlo */
      return monteCarloValue;
  }
  return sum*step;
}

/**
 * Monte-Carlo value calculated in generateBars
 * and used in calcApproxResult.
 */
let monteCarloValue=0;

/**
 * Generates the optical representation for the numerical approximation for the integral
 * @param {Function} f Callback for calculating f(x)
 * @param {Number} method Approximation method to be used
 * @param {Number} minX Minimum x value of the integration range
 * @param {Number} maxX Maximum x value of the integration range
 * @param {Number} minY Minimum y value of the integration range
 * @param {Number} maxY Maximum y value of the integration range
 * @param {Number} steps Number of approximation steps
 * @returns Data sets for the approximation
 */
function generateBars(f, method, minX, maxX, minY, maxY, steps) {
  const step=(maxX-minX)/steps;
  const data=[];
  const pointsLow=[];
  const pointsHigh=[];
  let pointsLowMinus=0;
  let pointsHighMinus=0;

  switch (method) {
    case 0: /* Rectangle rule (reference points on the left) */
      for (let i=0;i<steps;i++) {
        const x=minX+i*step;
        const y=f(x);
        data.push({x: x, y: 0});
        data.push({x: x, y: y});
        data.push({x: x+step, y: y});
        data.push({x: x+step, y: 0});
      }
      break;
    case 1: /* Rectangle rule (reference points on the right) */
      for (let i=0;i<steps;i++) {
        const x=minX+i*step;
        const y=f(x+step);
        data.push({x: x, y: 0});
        data.push({x: x, y: y});
        data.push({x: x+step, y: y});
        data.push({x: x+step, y: 0});
      }
      break;
    case 2: /* Rectangle rule (reference points in the middle) */
      for (let i=0;i<steps;i++) {
        const x=minX+i*step;
        const y=f(x+step/2);
        data.push({x: x, y: 0});
        data.push({x: x, y: y});
        data.push({x: x+step, y: y});
        data.push({x: x+step, y: 0});
      }
      break;
    case 3: /* Trapeze rule */
      for (let i=0;i<steps;i++) {
        const x=minX+i*step;
        const y1=f(x);
        const y2=f(x+step);
        data.push({x: x, y: 0});
        data.push({x: x, y: y1});
        data.push({x: x+step, y: y2});
        data.push({x: x+step, y: 0});
      }
      break;
    case 4: /* Simpsons rule */
      const innerSteps=Math.round(plotSteps/steps);
      for (let i=0;i<steps;i++) {
        const x=minX+i*step;
        const y1=f(x);
        const y2=f(x+step/2);
        const y3=f(x+step);
        data.push({x: x, y: 0});
        data.push({x: x, y: y1});
        const p1=(y2-y1)/(step/2);
        const p2=((y3-y2)/(step/2)-p1)/step;
        for (let j=1;j<innerSteps;j++) {
          const xinner=x+j*step/innerSteps;
          data.push({x: xinner, y: y1+(xinner-x)*(p1+(xinner-(x+step/2))*p2)});
        }
        data.push({x: x+step, y: y3});
        data.push({x: x+step, y: 0});
      }
      break;
    case 5: /* Monte-Carlo */
      for (let i=0;i<steps;i++) {
        const x=minX+(maxX-minX)*Math.random();
        const y=minY+(maxY-minY)*Math.random();
        if (y<0) {
          if (y<=f(x)) pointsLowMinus++; else pointsHighMinus++;
        } else {
          if (y<=f(x)) pointsLow.push({x: x, y: y}); else pointsHigh.push({x: x, y: y});

        }
      }
      monteCarloValue=(pointsLow.length-pointsHighMinus)/steps*(maxX-minX)*(maxY-minY);
      console.log(monteCarloValue);
      break;
  }

  if (data.length>0) {
    /* Classical */
    return [{
      type: 'line',
      label: language.GUI.methodName[method],
      data: data,
      fill: true,
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.15)',
      borderWidth: 1,
      pointStyle: false,
    }];
  } else {
    /* Monte-Carlo */
    return [
      {
        type: 'scatter',
        label: '(x,y)<=(x,f(x))',
        data: pointsLow,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'rgba(255,0,0,0.15)'
      },
      {
        type: 'scatter',
        label: '(x,y)>(x,f(x))',
        data: pointsHigh,
        borderColor: 'grey',
        borderWidth: 1,
      },
    ];
  }
}

/**
 * Prepares the layout switcher which will remove the "loading..." text
 * and replace it with the app content.
 */
function startApp() {
  document.addEventListener('readystatechange',event=>{if (event.target.readyState=="complete") {
    if (isDesktopApp) {
      infoLocalDataOnly1.style.display="none";
      infoLocalDataOnly2.style.display="none";
    }
    mainContent.style.display="";
    infoLoading.style.display="none";
  }});
}

/**
 * Initializes the complete web app.
 */
function initApp() {
  initGUILanguage();
  initGUI();
  startApp();
}
