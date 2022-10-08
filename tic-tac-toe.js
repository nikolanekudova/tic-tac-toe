let board = [];
let playerOne = {};
let playerTwo = {};
let game = {
    "numberOfMove": 0,
    "numberOfCell": 0,
    "symbol": 0
};

const startGame = document.getElementById("btn-play");

startGame.addEventListener("click", function (event) {
    getPlayersName();
    showPlayersTurn(playerOne.name);
})

renderGameboard();

function renderGameboard() {
    const gameboard = document.getElementById("gameboard-div");

    const squares = document.createElement("div");
    squares.className = "squares";
    gameboard.appendChild(squares);

    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.className = "square";
        square.setAttribute("id", i);
        square.setAttribute("value", board[i]);

        if (board[i] === undefined) {
            square.innerHTML = "";
        } else if (board[i] == "x") {
            const icon = document.createElement("img");
            icon.setAttribute("src", "./icons/heart.png");
            square.appendChild(icon);
        } else if (board[i] == "o") {
            const icon = document.createElement("img");
            icon.setAttribute("src", "./icons/happy.png");
            square.appendChild(icon);
        }

        square.addEventListener("click", playersTurn);

        squares.appendChild(square);
    }
}

function getPlayersName() {
    const playerOneName = document.getElementById("playerone").value;
    const playerTwoName = document.getElementById("playertwo").value;

    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
}

function showPlayersTurn(player) {
    document.getElementById("player-turn").innerHTML = player + ", it's your turn!";
}

function playersTurn(event) {

    if (playerOne.name === undefined || playerTwo.name === undefined) {
        alert("You have to fill the names of players!")
    } else {

        if (event.target.getAttribute("value") === "undefined") {

            if (game.symbol == 0 || game.symbol == "o") {
                board[event.target.id] = "x";
                showPlayersTurn(playerTwo.name);

                game.numberOfMove = game.numberOfMove + 1;
                game.numberOfCell = event.target.id;
                game.symbol = board[event.target.id];

            } else if (game.symbol == "x") {
                board[event.target.id] = "o";
                showPlayersTurn(playerOne.name);

                game.numberOfMove = game.numberOfMove + 1;
                game.numberOfCell = event.target.id;
                game.symbol = board[event.target.id];
            }
        }

        deleteDOMGameboard();
        renderGameboard();
        checkWinner();
    }
}

function deleteDOMGameboard() {
    const squaresToDelete = document.querySelectorAll('.square');
    const squareDivToDelete = document.querySelectorAll('.squares');

    squaresToDelete.forEach(squares => {
        squares.remove();
    });

    squareDivToDelete.forEach(div => {
        div.remove();
    })
}

function checkWinner() {
    if (board[0] == "x" && board[1] == "x" && board[2] == "x" ||
        board[3] == "x" && board[4] == "x" && board[5] == "x" ||
        board[6] == "x" && board[7] == "x" && board[8] == "x" ||

        board[0] == "x" && board[3] == "x" && board[6] == "x" ||
        board[1] == "x" && board[4] == "x" && board[7] == "x" ||
        board[2] == "x" && board[5] == "x" && board[8] == "x" ||

        board[0] == "x" && board[4] == "x" && board[8] == "x" ||
        board[2] == "x" && board[4] == "x" && board[6] == "x"
    ) {
        alert(playerOne.name + " is winner!");
        playAgain();

    } else if (
        board[0] == "o" && board[1] == "o" && board[2] == "o" ||
        board[3] == "o" && board[4] == "o" && board[5] == "o" ||
        board[6] == "o" && board[7] == "o" && board[8] == "o" ||

        board[0] == "o" && board[3] == "o" && board[6] == "o" ||
        board[1] == "o" && board[4] == "o" && board[7] == "o" ||
        board[2] == "o" && board[5] == "o" && board[8] == "o" ||

        board[0] == "o" && board[4] == "o" && board[8] == "o" ||
        board[2] == "o" && board[4] == "o" && board[6] == "o"
    ) {
        alert(playerTwo.name + " is winner!");
        playAgain();

    } else if (board[0] !== undefined && board[1] !== undefined && board[2] !== undefined &&
        board[3] !== undefined && board[4] !== undefined && board[5] !== undefined && board[6] !== undefined &&
        board[7] !== undefined && board[8] !== undefined
    ) {
        alert("It's a draw!");
        playAgain();
    }

}

function playAgain() {
    if (window.confirm("Do you want to play again?")) {
        board = [];
        game = {
            "numberOfMove": 0,
            "numberOfCell": 0,
            "symbol": 0
        };

        deleteDOMGameboard();
        renderGameboard();

        document.getElementById("player-turn").innerHTML = "Let's play again!";
    }
}