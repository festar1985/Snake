;
const gameBoard = (function () {
    let configData;
    const food = {
        x: null,
        y: null
    };
    let score = 0;

    let loop;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

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
        
        configData = config;

        generateGameBoardUI(config.boardSize);
        snake.createSnake(config);

    };

    function checkSnakeHeadPosition () {
        const snakeData = snake.getSnake();

        if(snakeData.headPositionX < 0 || snakeData.headPositionX >= configData.boardSize) {
            gameOver();
        }
        else if(snakeData.headPositionY < 0 || snakeData.headPositionY >= configData.boardSize) {
            gameOver();
        }

        if (snakeData.body.includes(`${snakeData.headPositionX}${snakeData.headPositionY}`)) {
            gameOver();
        }

    }


    function setupUserInput() {

        document.addEventListener("keydown", (e) => {
            if(e.keyCode === 37) {
                snake.setMoveDirection("left");
            }else if (e.keyCode === 38) {
                snake.setMoveDirection("up");
            }else if (e.keyCode === 39) {
                snake.setMoveDirection("right");
            }else if (e.keyCode === 40) {
                snake.setMoveDirection("down");
            }
        });
    };

    function gainPoint() {
        score += 1;

        document.getElementById("score").innerText = `SCORE: ${score}`;
    }

    function checkSnakeEating() {
        const snakeData = snake.getSnake();

        if (snakeData.headPositionX === food.x && snakeData.headPositionY === food.y) {
            gainPoint();
            snake.grow();
            generateFood();
        };
    };

    function setupSnake () {
        snake.setMoveDirection("right");
        
       loop =  setInterval(() => {
            snake.moveHead();
            checkSnakeHeadPosition();
            checkSnakeEating();
            snake.updateSnakePossition();
        }, configData.speed);

    }

    function gameOver() {
        clearInterval(loop);
        alert("Game Over You loose");
    };

    function generateFood() {
        const x = getRandomInt(configData.boardSize);
        const y = getRandomInt(configData.boardSize);
        const snakeData = snake.getSnake();

        if(snakeData.body.includes(`${x}${y}`)) {
            return generateFood();
        }

        food.x = x;
        food.y = y;

        document.getElementById(`${x}${y}`).className = "food";


    }

    function start() {
        setupSnake();
        setupUserInput();
        generateFood();
    };

    return {
        createGameBoard: createGameBoard,
        start: start
    };

})();