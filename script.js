const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectOBtn = selectBox.querySelector(".playerO");
playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { //once window loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available span
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectXBtn.onclick = () => {
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
}

selectOBtn.onclick = () => {
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
    players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
}

let playerSign = "X"; //this is a global variable beacuse we've used this variable inside multiple functions

// user click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = "<span>O</span>"; //adding 0 icon tag inside user clicked element/box
        players.classList.add("active");
        playerSign = "O"; //if player choose (O) then change playerSign to O
        element.setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
    } else {
        playerSign = "X"
        element.innerHTML = "<span>X</span>"; //adding X icon tag inside user clicked element/box
        players.classList.add("active");
        element.setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
    }
    selectWinner(); //calling selectWinner function
    element.style.pointerEvents = "none"; //once user select any box then that box can'be clicked again
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //generating random number so bot will randomly delay to select unselected box
    setTimeout(() => {
        bot(); //calling bot function
    }, randomTimeDelay); //passing random delay value
}

let runBot = true;

//Bot click function
function bot() {
    if (runBot) { //if runBot is true
        selectWinner(); //calling selectWinner function
        let array = []; //creating empty array...we'll store unclicked boxes index
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //if the box/span has no children means <i> tag
                array.push(i); //inserting unclicked boxes number/index inside array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if (array.length > 0) { //if array length is greater than 0
            if (players.classList.contains("player")) {
                playerSign = "X"; //if player has chosen O then bot will X
                allBox[randomBox].innerHTML = "<span>X</span>"; //adding X icon tag inside bot selected element
                players.classList.remove("active"); //remove active class in players
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                playerSign = "O";
                allBox[randomBox].innerHTML = "<span>O</span>"; //adding O icon tag inside bot selected element
                players.classList.remove("active"); //remove active class in players
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //calling selectWinner function
            allBox[randomBox].style.pointerEvents = "none";
            playBoard.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
        }
    }
}

//winner:-

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id; //return id value
}
function checkIdSign(val1, val2, val3, sign) { //checking all id value is equal to sign (X or O) or not if yes then return true
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner(){ //if the one of following winning combination match then select the winner
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false; //passing the false boolen value to runBot so bot won't run again
        bot(); //calling bot function
        setTimeout(()=>{ //after match won by someone then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; //displaying winning text with passing playerSign (X or O)
    }else{ //if all boxes/element have id value and still no one win then draw the match
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false; //passing the false boolen value to runBot so bot won't run again
            bot(); //calling bot function
            setTimeout(()=>{ //after match drawn then hide the playboard and show the result box after 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1s = 1000ms
            wonText.innerHTML = "Match has been drawn!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page on replay button click
}
