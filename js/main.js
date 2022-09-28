
function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; 
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}

if(!localStorage.firstForm){
localStorage.setItem("firstForm", "false");
}
let colorArray = ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];
function formBlock(){
    if(!localStorage.firstForm){
        localStorage.setItem("firstForm", true);
        const recent = document.getElementById('recent');
        for(let i=0; i < colorArray.length; i += 1){
            let chord = document.createElement('div');
            chord.style.backgroundColor = colorArray[i];
            chord.id = "result";
            recent.appendChild(chord);
        }
    }else{
        let element = document.querySelectorAll('#result')
        element.forEach( e => e.remove() );
        const recent = document.getElementById('recent');
        for(let i=0; i < colorArray.length; i += 1){
            let chord = document.createElement('div');
            chord.style.backgroundColor = colorArray[i];
            chord.id = "result";
            recent.appendChild(chord);
          }
    }
}

formBlock();


function insertColor(code, page_url){
    colorArray.pop();
    colorArray.unshift(String(code));
    formBlock();
    const req = new XMLHttpRequest();
    const baseUrl = "http://localhost/ColorPickerChromeExtension/php/insertcolor.php";
    const color_code = code;
    const page = page_url;
    const urlParams = `color_code=${color_code}&page=${page}`;

    req.open("POST", baseUrl, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(urlParams);

    req.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //console.log(colorArray);
        }
    }
}

$(".clear").click(function(e){
    e.preventDefault();
    colorArray = ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];
    formBlock();
        const req = new XMLHttpRequest();
        const baseUrl = "http://localhost/ColorPickerChromeExtension/php/clearcolor.php";
        const clear_status = '1';
        const urlParams = `clear_status=${clear_status}`;
        req.open("POST", baseUrl, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(urlParams);

        req.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Got response cleared!");
            }
        }
    });


/*     const handle = (element) => alert(element.tagName) */


  document.getElementById('start-button').addEventListener('click', (event) => {
    event.stopPropagation();
    const resultElement = document.getElementById('result');
    if (!window.EyeDropper) {
        resultElement.textContent = 'Your browser does not support the EyeDropper API';
        return;
    }
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((result) => {
        event.stopPropagation();
        resultElement.style.backgroundColor = result.sRGBHex;        
        document.getElementById('hex_l').value = result.sRGBHex;
        document.getElementById('color_code').value = result.sRGBHex;
        document.getElementById('hex_u').value = String(result.sRGBHex).toUpperCase();
        document.getElementById('css').value = resultElement.style.backgroundColor.valueOf();
        document.getElementById('hsl').value = "hsl(" + HexToHSL(result.sRGBHex).h + ", " + HexToHSL(result.sRGBHex).s + "%, " + HexToHSL(result.sRGBHex).l + "%)";
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            function(tabs){
                var page_url = tabs[0].url;
                callgetTagName(event);
                insertColor(result.sRGBHex, page_url);
            }
        );
    }).catch((e) => {
        resultElement.textContent = e;
    });
    });



/*     function handle(element) {
        alert(element.tagName)
    }
    
    document.onclick = function (event) {
        if (event === undefined) event = window.event
        if (event.target instanceof Element)
            handle(event.target)
    }; */



/* Вариант2
    document.querySelector('#btn').addEventListener("click", e=>{
        e.stopPropagation()
        if(e) {
           console.log("кнопка");
           click()
        }
     } )
     
     function click(){
        document.addEventListener("click",()=>{
           alert("click")
        })
     } */




/*     
Вариант 1

const endHandleClick = () => alert('Я хочу получить шнобелевкую премию срочно!')
    document.querySelector('#btn').onclick = (e) => {
        e.stopPropagation();
        window.onclick = () => endHandleClick() // описываем логику в функции endHandleClick
    }
     */



/* 
Мусор
                 let selectTagName = {tag: null};
                document.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectTagName.tag = e.target.tagName
                    console.log(selectTagName.tag);  
                });  
               async function callgetTagName(){
                    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: getTagName,
                    });    
                }

                function getTagName(e) {
                    let selectTagName = {tag: null};
                    selectTagName.tag = e.target.tagName
                    alert(selectTagName.tag);  
                }    */







/*     function handle(element) {
        alert(element.tagName)
    
    }

    document.onclick = function (event) {
        if (event === undefined) event = window.event
        if (event.target instanceof Element)
            handle(event.target)
    }; */
    