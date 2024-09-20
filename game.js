var buttonColours = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; // Boolean to track if the game has started
var level = 0;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 });

 function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

 }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        
       
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
    
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





// function playSound(buttonColor) {
//     // Create an Audio object and set the source to the corresponding sound file
//     var sound = new Audio("sounds/" + buttonColor + ".mp3");

//     // Play the sound
//     sound.play();
// }








 
    
   