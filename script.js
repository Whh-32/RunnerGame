let game = document.getElementById("game");
let charecter = document.getElementById("charecter");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let block = document.querySelectorAll(".block");
let hscore = document.getElementById("high-score");
let score = document.getElementById("score");





// jump function ++

document.addEventListener("keydown", jump);
function jump(e) {
    let keyName = e.code
    if (keyName == "Space" || keyName == "ArrowUp") {
        if (!charecter.classList.contains("jump")) {
            charecter.classList.add("jump")
            setTimeout(() => {
                charecter.classList.remove("jump")
            }, 600);
        }
    }
}



//function score ++

let scoreinterval = setInterval(scores, 100);
let storageScore = localStorage.getItem("score");
let hscoreNumber = storageScore;
let scoreNumber = 0;

if (storageScore == null) {
    setTimeout(() => {
        hscore.childNodes[1].textContent = 0;
    }, 0);  //cheraaaaa :/
}

hscore.childNodes[1].textContent = storageScore;
function scores() {
    score.childNodes[1].textContent = scoreNumber;
    scoreNumber++;

}



//create block fonction --

let newBlock; //bayad az kode javascript harekat dade shavad na css

function createBlock() {
    newBlock = document.createElement("div");
    game.appendChild(newBlock);
    newBlock.classList.add("block");
}
createBlock();
let blockinterval = setInterval(createBlock, 2200)



// morning and night function ++

setInterval(() => {
    if (sun.classList.contains("rise")) {
        sun.classList.remove("rise")
        game.classList.add("night")
        setTimeout(() => {
            moon.classList.add("rise")
        }, 1100);
    }
    else {
        moon.classList.remove("rise")
        setTimeout(() => {
            sun.classList.add("rise")
            game.classList.remove("night")
        }, 1100);
    }
}, 15000);



//game over function

let x = 1;
setInterval(checkGame);
function checkGame() {

    //variable

    let leftNewBlock = newBlock.offsetLeft;
    let widthNewBlock = newBlock.offsetWidth;
    let heightNewBlock = newBlock.offsetHeight
    let topCharecter = charecter.offsetTop;



    //removeblock

    if (leftNewBlock == -20) {
        newBlock.remove();

    }



    //check game over

    if (leftNewBlock >= 35 - widthNewBlock && leftNewBlock <= 80 && topCharecter >= 160 - heightNewBlock) {
        charecter.classList.add("game_over");

        //score game over

        if (scoreNumber > hscoreNumber) {
            hscore.childNodes[1].textContent = scoreNumber - 1;
            localStorage.setItem("score", scoreNumber - 1);

        }
        clearInterval(scoreinterval);

        //block game over
        clearInterval(blockinterval);



        if (x == 1) {
            setTimeout(() => {
                charecter.classList.add("jump")
                setTimeout(() => {
                    charecter.classList.remove("jump")
                }, 600);
                x++;
            }, 100);
        }
    }
}
