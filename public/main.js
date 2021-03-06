"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function onLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Hello from onLoad");
        let canvas = document.getElementById('imagecanvas');
        let ctx = canvas.getContext('2d');
        // ctx.drawImage(img, 0, 0);
        // img.style.display = 'none';
        let filePromise = requestFile("lit_sphere.ppm");
        filePromise.then(function (result) {
            canvas_from_ppm(result, canvas);
            let img = new Image();
            img.onload = function () {
                ctx.drawImage(this, 200, 200);
            };
        }).catch(function (error) {
            console.error(error);
        });
        var img = new Image();
        img.src = 'rhino.png';
        img.onload = function () {
            draw(this);
        };
        function draw(img) {
            var canvas = document.getElementById('canvas2');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            img.style.display = 'none';
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            console.log(imageData[0]);
            //var data = imageData.data;
        }
        console.log("onLoad done!");
    });
}
function ppm_read_header(filecontents) {
    let lines = filecontents.split("\n");
    let w = parseInt(lines[1].trim().split(" ")[0]);
    let h = parseInt(lines[1].trim().split(" ")[1]);
    let maxColor = parseInt(lines[2].trim());
    if (maxColor != 255) {
        console.log("Max color is not set to 255, " + "¯\\_(ツ)_/¯");
    }
    lines = lines.slice(3, lines.length - 1);
    let newLines = lines.join(" ").replace('"', "");
    return { newLines: newLines, w: w, h: h };
}
function canvas_from_ppm(filecontents, canvas) {
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.height, canvas.width);
    let data = imageData.data;
    let retVal = ppm_read_header(filecontents);
    let imageContents = retVal.newLines.trim().replace(" ", "").split(" ");
    for (let i = 0; i < data.length; i += 4) {
        data[i] = parseInt(imageContents[i]);
        data[i + 1] = parseInt(imageContents[i + 1]);
        data[i + 2] = parseInt(imageContents[i + 2]);
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}
function requestFile(path) {
    return new Promise(function (resolve, reject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    resolve(xmlhttp.responseText);
                }
                else {
                    reject(xmlhttp);
                }
            }
        };
        xmlhttp.open("GET", path, false);
        xmlhttp.send();
    });
}
//# sourceMappingURL=main.js.map