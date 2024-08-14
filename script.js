const cellsElements = document.querySelectorAll(".cell");
const currentPlayerTextEle = document.getElementById("currentPlayer");
const resetBtnEle = document.getElementById("reset");
const headingTextEle = document.getElementById("heading");

const winConditions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];

let positions = ["", "", "", "", "", "", "", "",""];
let currentPlayer = "X";
let gameEnd = false;

startGame();

function startGame (){
    cellsElements.forEach(ele => {
        ele.addEventListener("click", setUpCellClick);
    })
    resetBtnEle.addEventListener("click", resetGame);
}

function setUpCellClick(e){
    if (e.target.textContent != "" || gameEnd == true){
        return;
    }
    e.target.textContent = currentPlayer;
    let cellIndex = e.target.getAttribute("cellIndex");
    positions[Number(cellIndex)] = currentPlayer;
    checkDraw();
    checkWin();
    changeCurrentPlayer();
}

function changeCurrentPlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    currentPlayerTextEle.textContent = currentPlayer;
}

function checkWin (){
    winConditions.forEach(([x, y, z]) => {
        if (positions[x] != "" && positions[y] != "" && positions[z] != ""){
            if (positions[x] == positions[y] && positions[y] == positions[z]){
                console.log("Won");
                won();
            }
        }
    })
}

function checkDraw (){
    let emptyPos = positions.filter(position => position == "");
    if (emptyPos.length == 0){
        gameEnd = true;
        headingTextEle.textContent = `Match Draw`;
    }
}


function won (){
    gameEnd = true;
    headingTextEle.textContent = `${currentPlayer} won the match`;
}


function resetGame (){
    positions = ["", "", "", "", "", "", "", "",""];
    currentPlayer = "X";
    gameEnd = false;
    currentPlayerTextEle.textContent = currentPlayer;
    headingTextEle.textContent = "Tie-Tac-Toe Game"
    cellsElements.forEach(cell => {
        cell.textContent = "";
    })
}

