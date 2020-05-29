// Initializers
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

// Unstarted game
$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;
    }

});

// Started game
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

// Actions when user click's
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

// Sound actions
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// Animations
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

// Answer verification
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {

        playSound("wrong");

        $("#level-title").text("Game Over, Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

// Restart game
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}