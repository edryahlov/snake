/* jshint browser: true */

window.onload = function() {
    "use strict";
    
    var version = 0.1;
    document.getElementById("ver").innerHTML = '(ver. '+ version+')';

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    var blockSize = 15;
    var blockSpacer = 2;
    var fieldSize = 40;
    var snakeLength = 5;
    
    canvas.height = (blockSize+blockSpacer)*fieldSize;
    canvas.width = (blockSize+blockSpacer)*fieldSize;

    document.onkeydown = function (event) {
        snake.shift(event.keyCode);
    };

    //console.log(snakeCoordsX.join(', '));
    //console.log(snakeCoordsY.join(', '));
    //context.fillStyle = "red";
    //context.clearRect(100, 100, blockSize, blockSize);

    var snake = new Snake();
    snake.start();
    snake.draw();

    
    function Snake() {
        var snakeCoordsX = [];
        var snakeCoordsY = [];

        //place snake on start position
        this.start = function() {
            for (var i=snakeLength-1; i>=0; i--) {
                snakeCoordsX[i] = (blockSize+blockSpacer)*i;
                snakeCoordsY[i] = fieldSize/2*(blockSize+blockSpacer);
            }
        };
        this.shift = function(direction) {
            switch (direction) {
                case 39: //right
                    if (snakeCoordsX[3] != snakeCoordsX[4] + (blockSize + blockSpacer)) {
                        eraseTail(snakeCoordsX[0], snakeCoordsY[0]);
                        shiftSnakeCoords();
                        snakeCoordsX[snakeCoordsX.length-1] += blockSize + blockSpacer;
                        snake.draw();
                    } else {
                        //can't move inside yourself lol))
                    }
                    break;
                case 37: //left
                    if (snakeCoordsX[3] != snakeCoordsX[4] - (blockSize + blockSpacer)) {
                        eraseTail(snakeCoordsX[0], snakeCoordsY[0]);
                        shiftSnakeCoords();
                        snakeCoordsX[4] -= blockSize + blockSpacer;
                        snake.draw();
                    } else {
                        //can't move inside yourself lol))
                    }
                    break;
                case 40: //down
                    if (snakeCoordsY[3] != snakeCoordsY[4] + (blockSize + blockSpacer)) {
                        eraseTail(snakeCoordsX[0], snakeCoordsY[0]);
                        shiftSnakeCoords();
                        snakeCoordsY[4] += blockSize + blockSpacer;
                        snake.draw();
                    } else {
                        //can't move inside yourself lol))
                    }
                    break;
                case 38: //up
                    if (snakeCoordsY[3] != snakeCoordsY[4] - (blockSize + blockSpacer)) {
                        eraseTail(snakeCoordsX[0], snakeCoordsY[0]);
                        shiftSnakeCoords();
                        snakeCoordsY[4] -= blockSize + blockSpacer;
                        snake.draw();
                    } else {
                        //can't move inside yourself lol))
                    }
                    break;
            }
            function eraseTail(x, y) {
                context.clearRect(x, y, blockSize, blockSize);
            }
            function shiftSnakeCoords() {
                for (var i=0; i<snakeCoordsX.length-1; i++) {
                    snakeCoordsX[i] = snakeCoordsX[i+1];
                    snakeCoordsY[i] = snakeCoordsY[i+1];
                }
            }
        };
        //draw snake
        this.draw = function() {
            for (var i=0; i<snakeCoordsX.length; i++) {
                context.fillRect(snakeCoordsX[i], snakeCoordsY[i], blockSize, blockSize);
            }
        };
    }
    
};

