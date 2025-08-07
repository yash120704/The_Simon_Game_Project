var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

document.addEventListener("keydown", function () {
    if (!started) {
        document.getElementById("level-title").innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = []; 
    level++;
    document.getElementById("level-title").innerHTML = "Level " + level;

    var rand = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[rand];
    gamePattern.push(randomChosenColor);

    var chosenButton = document.querySelector("#" + randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function animatePress(color) {
    var button = document.querySelector("#" + color);
    button.classList.add("pressed");
    setTimeout(function () {
        button.classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
