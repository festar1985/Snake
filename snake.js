;
const snake = (function () {
    const snakeData = {
        headPositionX : null,
        headPositionY : null,
        body: [],
        move: null
    };

    function generateSnakeUI(boardSize,snakeSize){
        snakeData.headPositionX = parseInt(boardSize/2);
        snakeData.headPositionY = parseInt(boardSize/2);

        for(let i = 0; i < snakeSize; i++) {
            snakeData.body.push(`${snakeData.headPositionX-i}${snakeData.headPositionY}`);
        };

        snakeData.body.forEach((item) => {
            document.getElementById(item).className = "snake";
        });
    };
    
    function createSnake(config) {
        generateSnakeUI(config.boardSize, config.snakeSize)
    };

    return {
        createSnake: createSnake

    };

})();