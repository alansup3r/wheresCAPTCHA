//legacy code ahead

class WheresCAPTCHA {
    constructor(imageSource, rowAnswer, columnAnswer) {
        this.squareAnswer = new SquareLocation(rowAnswer, columnAnswer);
        this.imageSource = imageSource;
        this.squareSelected = null;
    }

    isMatched() {
        return JSON.stringify(this.squareSelected) === JSON.stringify(this.squareAnswer);
    }

    selectSquare(row, column) {
        this.squareSelected = new SquareLocation(row, column);
    }

}

class SquareLocation {

    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

}

window.onload = function () {
    document.getElementById("wheres-captcha").innerHTML = templateHtml;
};
let numberOfRows = 16;
let numberOfColumns = 16;

var captchas = [];
var currentCaptchaIndex = 0;

function createNewCaptcha() {

    document.getElementById("captcha-popup").style.display = "inherit";

    captchas[0] = new WheresCAPTCHA("wally1.png", 4, 5);
    captchas[1] = new WheresCAPTCHA("wally2.png", 1, 3);
    captchas[2] = new WheresCAPTCHA("wally3.png", 5, 15);
    captchas[3] = new WheresCAPTCHA("wally4.png", 14, 1);
    captchas[4] = new WheresCAPTCHA("wally5.png", 15, 1);

    currentCaptchaIndex = Math.floor(Math.random() * captchas.length);

    generateGrid(captchas[currentCaptchaIndex]);
    console.log("click");
}

function generateGrid(captcha) {
    let table = "<table style=\"width:100%\">";
    for (let j = 0; j < numberOfRows; j++) {
        table += "<tr>\n";
        for (let k = 0; k < numberOfColumns; k++) {
            table += "<td onclick='gridClick(" + j + "," + k + ")' id='grid-" + j + "-" + k + "'></td>\n";
        }
        table += "</tr>\n";

    }
    table += " </table>\n<img id=\"image-captcha\" alt=\"Image captcha\" src=\"assets/" + captcha.imageSource + "\">";

    document.getElementById("clickable-zone").innerHTML = table;
}

function gridClick(rowClicked, columnClicked) {
    resetTableGrid();
    let squareSelected = JSON.stringify(new SquareLocation(rowClicked, columnClicked));
    let lastSquaredSelected = JSON.stringify(captchas[currentCaptchaIndex].squareSelected);

    if (squareSelected === lastSquaredSelected) {
        unselectSquare();

    } else {
        selectSquare(rowClicked, columnClicked);
    }

    //alert(rowClicked+","+columnClicked);  //debug clicked square number
}

function unselectSquare() {
    captchas[currentCaptchaIndex].squareSelected = null;
    document.getElementById("captcha-button").innerHTML = "skip";
}

function selectSquare(rowClicked, columnClicked) {
    document.getElementById("grid-" + rowClicked + "-" + columnClicked).style.boxShadow = "inset 0 0 0 5px rgba(66, 135, 245, 1)";
    document.getElementById("captcha-button").innerHTML = "VERIFY";
    captchas[currentCaptchaIndex].selectSquare(rowClicked, columnClicked);
}

function resetTableGrid() {
    for (let j = 0; j < numberOfRows; j++) {
        for (let k = 0; k < numberOfColumns; k++) {
            document.getElementById("grid-" + j + "-" + k).style.boxShadow = "inset 0 0 0 2px rgba(255, 255, 255, 1)";
        }

    }
}

function verifyCaptcha() {
    let currentCaptcha = captchas[currentCaptchaIndex];

    if (currentCaptcha.squareSelected == null) {
        updateCaptchaNotCompletedUI();
    } else {
        if (currentCaptcha.isMatched()) {
            updateCaptchaCompletedUI();
        } else {
            showErrorMessageWrongSquare();
            createNewCaptcha();
        }
    }

}

function updateCaptchaCompletedUI() {
    document.getElementById("captcha-popup").style.display = "none";
    document.getElementById("captcha-checked").style.display = "block";
    document.getElementById("captchaCheckbox").style.display = "none";
}

function updateCaptchaNotCompletedUI() {
    document.getElementById("captcha-not-checked").style.display = "block";
    document.getElementById("captcha-popup").style.display = "none";
    document.getElementById("captchaCheckbox").style.display = "none";
    document.getElementById("captcha-text").innerText = "You are not elegible to use this site.";
    document.getElementById("captcha-text").style.fontSize = "15px";
    document.getElementById("captcha-text").style.marginLeft = "30px";
}

function showErrorMessageWrongSquare() {
    document.getElementById("error-message").style.display = "block";

}


let templateHtml = "\n" +
    "<div id=\"captcha-wrapper\">\n" +
    "    <div id=\"captcha-popup\">\n" +
    "        <div id=\"popup-top\">\n" +
    "            <div id=\"top-text\">\n" +
    "                Select the square with<br><span style=\"font-size: 30px;font-weight: bold\">Wally</span><br>if you see\n" +
    "                a\n" +
    "                Waldo click SKIP\n" +
    "            </div>\n" +
    "            <img id=\"wallysface\" src=\"assets/wallysface.png\" height=\"101\" width=\"117\"/></div>\n" +
    "        <div id=\"clickable-zone\">\n" +
    "        </div>\n" +
    "        <div style=\"color:red;text-align:center;display: none\" id=\"error-message\"> Please select the square with\n" +
    "            WALLY\n" +
    "        </div>\n" +
    "        <div id=\"footer\">\n" +
    "            <svg onclick=\"createNewCaptcha()\" class=\"icons-captcha\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\">\n" +
    "                <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
    "                <path d=\"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z\"/>\n" +
    "            </svg>\n" +
    "\n" +
    "            <svg class=\"icons-captcha\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\">\n" +
    "                <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n" +
    "                <path\n" +
    "                        d=\"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n" +
    "            </svg>\n" +
    "\n" +
    "            <svg class=\"icons-captcha\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\">\n" +
    "                <path d=\"M0 0h24v24H0z\" fill=\"none\" opacity=\".1\"/>\n" +
    "                <path\n" +
    "                        d=\"M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z\"/>\n" +
    "            </svg>\n" +
    "            <div style=\"width: 100%\">\n" +
    "                <button onclick=\"verifyCaptcha()\" id=\"captcha-button\">SKIP</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"captcha\">\n" +
    "        <div id=\"captchaCheckbox\" onclick=\"createNewCaptcha()\">\n" +
    "        </div>\n" +
    "        <svg id=\"captcha-checked\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n" +
    "             width=\"40px\" height=\"40px\">\n" +
    "            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
    "            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n" +
    "        </svg>\n" +
    "\n" +
    "        <svg id=\"captcha-not-checked\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\"\n" +
    "             width=\"40px\"\n" +
    "             height=\"40px\">\n" +
    "            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
    "            <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n" +
    "        </svg>\n" +
    "\n" +
    "        <span id=\"captcha-text\">I'm not a robot</span>\n" +
    "\n" +
    "        <div id=\"captcha-logo\">\n" +
    "            <img alt=\"Logo wheresCaptcha\" src=\"assets/logo.png\" id=\"logo\">\n" +
    "            <span>where'sCAPTCHA</span><div id=\"privacy-terms\">\n" +
    "            <a id=\"privacy\">Privacy<span class=\"privacyTermsToolTip\">By reading this you give us permission to capture your keyboard strokes (until next reboot or else),\n" +
    "                collect your clipboard's content, and to forward some other unimportant stuff to our servers.</span></a> -\n" +
    "            <a id=\"terms\">Terms<span class=\"termsToolTip\">u/alansuper</span></a></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>";
