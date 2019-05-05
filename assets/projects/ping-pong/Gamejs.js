var canvas;
var canvasContext;
var ballX = 50; //X is added to find it easier to program it and know that it refers to X axis
var ballSpeedX = 5; //Same thing as above but for managing the speed
var ballY = 250;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100; //Player 1 paddle //Constant instead of var means the value doesnt change
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;
var showWinScreen = false;

function handleMouseClick(evt) {
    if (showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false; //If someone won we need to reset the score and when the mouse button is pressed to get back to playing
    }
}
window.onload = function () { //The window.onload command makes the script to wait for the page to load and afterwards run the script
    // canvasContext.fillStyle = 'red';
    //canvasContext.fillRect(350,250,100,100) //Just for testing purposes I am adding another rectangle above the black one 
    function calculateMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        }

    }
    canvas = document.getElementById('gameCanvas');//This links the script with the html page (specifically the gameCanvas element defined above)
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 60;
    setInterval(function () { //This is called "writing a function using inline form"
        moveEverything(); //Instead of creating a function adding that function here, we are creating a function without the name that can be called only from here
        drawEverything();
    }, 1000 / framesPerSecond); //This is a javascript function that will let us run the function inside every x ms, where x is the number

    canvas / addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function (evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2); //We are controling the paddle from the middle of it, if the -(paddle_....) would not be there the mouse would move the top of the paddle
        })
}

function ballReset() {
    if (player1Score >= WINNING_SCORE ||  // the 2 bars "||" means "or else"
        player2Score >= WINNING_SCORE) {
        showWinScreen = true; //when 1 player wins the var will change from false to true
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 5; // This is the same as this: paddle2Y = paddle2Y +5;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 5;
    }
}

function moveEverything() {
    if (showWinScreen) {  //it automatically puts true 
        return;
    }
    computerMovement();
    ballX = ballX + ballSpeedX; //we are moving the ball with a certain speed
    if (ballX >= canvas.width - 12) { //if the ball reaches the boundary to the right it will go back
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;  //This is making the ball turn with the same speed as it started

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2); //With this code we change the speed and angle of the ball depending from where the paddle hits it
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score += 1; //You can also write player1Score++ it means it is incremeted by one
            ballReset();
        };
    }
    if (ballX < 9) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.25;
        }
        else {
            player2Score += 1; //The reason why player2Score is above the "ballreset()" function is because we need to update the score first and then run the logic of reseting the ball
            ballReset();
        }

    }
    //next blocks of code will make the ball move vertically
    ballY = ballY + ballSpeedY;
    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }


}

function drawNet() {
    for (i = 0; i < canvas.height; i += 40) { //This will count up from 0 and add 40 each time
        colorRect(canvas.width/2 - 1, i, 2, 20, 'white');
    }
}
function drawEverything() {

    console.log('drawEverything() called ' + ballX);
    //The first two zeros indicate the start points of X and Y so 0,0 means top left corner and then it gets the parameters from the canvas element defind above
    //That means it will go 800x600 filled with black
    colorRect(0, 0, canvas.width, canvas.height, 'black')  //Here we instruct the program with the coordonates and to add the color black

    if (showWinScreen) {  //this stops the game when one player wins 
        canvasContext.fillStyle = 'white'; //we are addin this fillStyle in order for the text color to be white and not black as the previous fillStyle
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Player 1 won!", 100, 200)
        }
        else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Player 2 won!", 500, 200)
        }
        canvasContext.fillText("Click to continue", 350, 300)
        return;
    }
    //Next line draws the net
    drawNet();

    //Next line draws the ball
    drawCircle(ballX, ballY, 10, 'white')

    //Next line defines the left paddle 
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    //Next line defines the right paddle 
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, 700, 100)
}
function drawCircle(CenterX, CenterY, radius, drawColor) {
    //Next sequence of lines define the ball
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(CenterX, CenterY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}
function colorRect(leftX, topY, width, height, drawColor) { //We are using this function in order to make the code cleaner and easier to see what is happening 
    canvasContext.fillStyle = drawColor; //This line fills the canvas with the color 
    canvasContext.fillRect(leftX, topY, width, height);
}

