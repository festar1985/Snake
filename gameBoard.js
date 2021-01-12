;
const gameBoard = (function () {
    function generateGameBoardUI(size) {
        let gameBoard = "<table>";

        for (let i = 0; i<size; i++) {
            gameBoard += "<tr>";

            for(let j = 0; j< size; j++) {
                gameBoard += `<td id='${j}${i}'></td>`;
            }

            gameBoard += "</tr>";
        }

        gameBoard += "</table>";

        document.getElementById("game").innerHTML = gameBoard;

    }
    
    function createGameBoard(config) {
        generateGameBoardUI(config.boardSize);
        snake.createSnake(config);
    };

    return {
        createGameBoard: createGameBoard
    };

})();