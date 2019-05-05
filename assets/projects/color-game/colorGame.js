//Creating an array for the colors, this was hardcoded at the begining
// var colors = ["rgb(255, 0, 0)",  //Spaces are very important, if there is no space after "," it will not read it correctly
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)",
// ]; //We have an array of 6 colors

var numSquares = 6
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square") //We are selecting the elements with the class square
var colorDisplay = document.getElementById("colorDisplay"); //Using getElementById just for variety
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode"); //Selecting all buttons with the .mode class

init(); //We are going to load this function when the page loads

function init() { //This is added to clean things out
    setUpModeButtons(); //We are running the set up buttons function
    setUpSquares(); //we are running the set up squares function to give them colors
    reset(); //We are running the reset function so colors reset before we see the page
}

function setUpSquares() {
    //selecting the squares
    for (var i = 0; i < squares.length; i++) {
        // we dont need this now because we added the reset function below: squares[i].style.backgroundColor = colors[i]; //This will loop through all the values inside color and add the style from it and put it in the square
        //Adding click listeners to squares
        squares[i].addEventListener("click", function () {
            //grab the color of picked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if (clickedColor === pickedColor) {
                changeColor(clickedColor);
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play again";
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323"; //We are giving the background color to the square that is not correct
                messageDisplay.textContent = "Try again"; //This will display on the home page only after you got one wrong
            }
        });
    };
}

function setUpModeButtons() {
    //mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected"); //We are removing the class from both buttons and below we are adding it to the one that we selected
            this.classList.add("selected"); //Adding the css class to the selected buttons
            //how many squares to show
            //This is called the ternary operator, the first part is the condition, so if textContent is equal to "Easy" then numsquares is = 3 if not nmsquares its = 6
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6; //This line does what the commented part does below
            // if (this.textContent === "Easy") {
            //     numSquares = 3;
            // } else {
            //     numSquares = 6;
            // }
            reset();
        });
    };
}

function reset() {
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick new color from array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor
    //change colors for array
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block"; //The block property makes them visible
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}


resetButton.addEventListener("click", function () {
    reset();
});

colorDisplay.textContent = pickedColor; //Changing the HTML element into the picked color, which is now hard coded


//creating the function to change colors to be the same if correct
function changeColor(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
};

//creating a function for picking a random number in the array
function pickColor() {
    //generating a random number between 1 and 6
    var random = Math.floor(Math.random() * colors.length); //Using math.random will give us a number between 0 and 1 but doesnt include 1(its 0.9999999etc) and we are multiplying it to get a random number between 0 and the length of the array
    // We are using math.floor to remove all decimals after the dot that was added by math.random
    return colors[random]; //we need to put it in [] because its an array
};


//Creating a function for generating 6 random colors
function generateRandomColors(num) {
    //make array
    var arr = [];
    //repeat num times
    for (var i = 0; i < num; i++) {
        //Get random color and push in array
        arr.push(randomColor());
    }
    //return array
    return arr;
};

//Generating an rgb color
function randomColor() {
    //Pick a red from 0 to 255
    var red = Math.floor(Math.random() * 256);
    //Pick a green from 0 to 255
    var green = Math.floor(Math.random() * 256);
    //Pick a blue from 0 to 255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

