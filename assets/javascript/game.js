var wins = 0;          
var losses = 0;         
var guesses = 6;      
var selectedPlanet = "";    
var hiddenLetters = [];    
var currentWord = [];   
var incorrectLetters = [];  
var guessed = [];

/// giant object
var spaceTheGame =  {
    planets: [ "mercury","venus","earth","mars","jupiter","saturn","neptune","uranus","pluto",],

    keyStroke: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    randomizePlanet: function(){
        selectedPlanet = this.planets[Math.floor(Math.random() * this.planets.length)];
        return selectedPlanet;
    },

    creatingBlanks: function(){
        for (var i = 0; i < selectedPlanet.length; i++) {
            hiddenLetters.push(" _ ");
        }
        for (var i = 0; i < selectedPlanet.length; i++) {
            currentWord.push(selectedPlanet[i].charAt())
        }
    },


    gameContent: function(){
        document.getElementById("guesses").textContent = "Guesses left: " + guesses;
        document.getElementById("lettersIncorrect").textContent = "Incorrect letters: " + incorrectLetters;
        document.getElementById("lettersGuessed").textContent = "Guessed letters: " + guessed;
        document.getElementById("numWord").textContent = "( " + selectedPlanet.length + " letter word" + " )";
        document.getElementById("spaces").textContent = "|  " + hiddenLetters.join(" ") + "  |";
        document.getElementById("wins").textContent = "Wins: " + wins;
        document.getElementById("losses").textContent = "losses: " + losses;
    },

    startOver: function(){
        guesses = 6;
        hiddenLetters = [];
        currentWord = [];
        incorrectLetters = [];
        guessed = []
    
       this.randomizePlanet();
       this.creatingBlanks();
       this.gameContent();
    },

}

//calling functions
document.addEventListener('keydown', function (e) {
    if(e.keyCode == 32) {
        spaceTheGame.startOver(); 
    }
});

//detecting keys
document.addEventListener('keydown', function (e) {
    var letterGuess = e.key;

    if (guessed.indexOf(letterGuess) === -1 && spaceTheGame.keyStroke.includes(letterGuess)){
        guessed.push(letterGuess);
        spaceTheGame.gameContent();
    };

    //checking if correct
    if (currentWord.includes(letterGuess) === true) {
        spaceTheGame.gameContent();

        //changing the array full of blanks to have letters
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letterGuess) {
                hiddenLetters[i] = letterGuess;
                console.table(hiddenLetters);
                console.table(currentWord);
                spaceTheGame.gameContent();
            }
        }

    } else if (keyStroke.includes(letterGuess)) {
        guesses--;
        spaceTheGame.gameContent();

    } else {
        
    };

    //winloss
    if (guesses === 0) {
        losses++;          
        spaceTheGame.startOver();
        console.log(selectedPlanet);
    };

    if (hiddenLetters.indexOf(" _ ") === -1) {
        wins++;
        spaceTheGame.startOver();
        console.log(selectedPlanet);
    };
});




//start with word bank array
//make a random selection from this word bank
//create an array full of blanks the length of the selected word
//create an array full of letters containing the selected word

//check the keystroke against the selected word
    //if there is a match, replace the blanks with the correct guessed letter
    //log the guess to the "guessed letters" field

    //if there is no match, add letter to incorrect letters
    //remove one point from guesses left

//if there are no more blanks, add you win popup. 
    //wins++
    //upon closing, start over

//if guesses = 0, stop allowing guesses
    //add you lose popup
    //losses++
    //upon closing, start over


// global variables