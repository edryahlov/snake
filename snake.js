/* jshint browser: true */

window.onload = function() {
    "use strict";
    
    var version = 0.3;
    document.getElementById("ver").innerHTML = '(ver. '+ version+')';

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    var blockSize = 15;
    var blockSpacer = 2;
    var fieldSize = 40;
    var snakeLength = 5;
    var rabbitsNumber = 20;
    
    var snakeCoordsX = [], snakeCoordsY = [];
    var rabbitsPosX = [], rabbitsPosY = [];
    
    canvas.height = (blockSize+blockSpacer)*fieldSize;
    canvas.width = (blockSize+blockSpacer)*fieldSize;

    document.onkeydown = function (event) {
        snake.shift(event.keyCode);
        snake.eat();
        rabbits.check();
        //console.log(snakeLength);
    };

    //console.log(snakeCoordsX.join(', '));
    //console.log(snakeCoordsY.join(', '));
    //context.fillStyle = "red";
    //context.clearRect(100, 100, blockSize, blockSize);

    var snake = new Snake();
    snake.start();
    snake.draw();
    
    var rabbits = new Rabbits();
    rabbits.generate();
    rabbits.draw();

    function Snake() {

        this.start = function() {
            for (var i=0; i<snakeLength; i++) {
                snakeCoordsX[i] = (blockSize+blockSpacer)*(snakeLength-1)-((blockSize+blockSpacer)*i);
                snakeCoordsY[i] = fieldSize/2*(blockSize+blockSpacer);
            }
            //console.log(snakeCoordsX.join(', '));
        };
        this.draw = function() {
            for (var i=snakeCoordsX.length-1; i>=0; i--) {
                if (i===0) {context.fillStyle="red";} else {context.fillStyle="black";}
                context.fillRect(snakeCoordsX[i], snakeCoordsY[i], blockSize, blockSize);
            }
        };
        this.shift = function(direction) {
            
            var moveToX, moveToY, collide = false;
            switch (direction) {
                case 39: //right
                    moveToX = snakeCoordsX[0] + (blockSize + blockSpacer);
                    moveToY = snakeCoordsY[0];
                    checkCollide();
                    if (!collide) {
                        eraseTail();
                        shiftSnakeCoords();
                        snakeCoordsX[0] += blockSize + blockSpacer;
                        snake.draw();
                    }
                    break;
                case 37: //left
                    moveToX = snakeCoordsX[0] - (blockSize + blockSpacer);
                    moveToY = snakeCoordsY[0];
                    checkCollide();
                    if (!collide) {
                        eraseTail();
                        shiftSnakeCoords();
                        snakeCoordsX[0] -= blockSize + blockSpacer;
                        snake.draw();
                    }
                    break;
                case 40: //down
                    moveToX = snakeCoordsX[0];
                    moveToY = snakeCoordsY[0] + (blockSize + blockSpacer);
                    checkCollide();
                    if (!collide) {
                        eraseTail();
                        shiftSnakeCoords();
                        snakeCoordsY[0] += blockSize + blockSpacer;
                        snake.draw();
                    }
                    break;
                case 38: //up
                    moveToX = snakeCoordsX[0];
                    moveToY = snakeCoordsY[0] - (blockSize + blockSpacer);
                    checkCollide();
                    if (!collide) {
                        eraseTail();
                        shiftSnakeCoords();
                        snakeCoordsY[0] -= blockSize + blockSpacer;
                        snake.draw();
                    }
                    break;
            }
            function checkCollide() {
                for (var i=0; i<rabbitsPosX.length-1; i++) {
                    if (moveToX === snakeCoordsX[i] && moveToY === snakeCoordsY[i]) {
                        collide = true;
                        break;
                    }
                }
            }
            function eraseTail() {
                var x = snakeCoordsX[snakeCoordsX.length-1];
                var y = snakeCoordsY[snakeCoordsY.length-1];
                context.clearRect(x, y, blockSize, blockSize);
            }
            function shiftSnakeCoords() {
                for (var i=snakeCoordsX.length-1; i>0; i--) {
                    snakeCoordsX[i] = snakeCoordsX[i-1];
                    snakeCoordsY[i] = snakeCoordsY[i-1];
                }
                //console.log(snakeCoordsX.join(', '));
            }
        };
        this.eat = function() {
            for (var i=0; i<rabbitsPosX.length-1; i++) {
                if (snakeCoordsX[0] === rabbitsPosX[i] && snakeCoordsY[0] === rabbitsPosY[i]) {
                    //console.log('collide');
                    snakeCoordsX.push(snakeCoordsX[snakeCoordsX.length-1]);
                    snakeCoordsY.push(snakeCoordsY[snakeCoordsY.length-1]);
                    rabbitsPosX.splice(i,1);
                    rabbitsPosY.splice(i,1);
                    rabbitsNumber--;
                    break;
                }
            }
        };
    }
    function Rabbits() {
        this.generate = function() {
            for (var i=0; i<rabbitsNumber; i++) {
                while (true) {
                    rabbitsPosX[i] = Math.floor(Math.random() * fieldSize) * (blockSize + blockSpacer);
                    rabbitsPosY[i] = Math.floor(Math.random() * fieldSize) * (blockSize + blockSpacer);
                    if (snakeCoordsX.indexOf(rabbitsPosX[i]) === -1 && snakeCoordsY.indexOf(rabbitsPosY[i]) === -1) {break;}
                }
            }
            document.getElementById("rabbits_left").innerHTML = rabbitsNumber-1;
        };
        this.draw = function() {
            for (var i=0; i<rabbitsPosX.length; i++) {
                context.fillStyle="green";
                context.fillRect(rabbitsPosX[i], rabbitsPosY[i], blockSize, blockSize);
            }
        };
        this.check = function() {
            if (rabbitsNumber-1 === 0) {
                alert("You eat all rabbits! :)");
                location.reload();
            } else {
                document.getElementById("rabbits_left").innerHTML = rabbitsNumber-1;
            }
        };
    }
    
};

