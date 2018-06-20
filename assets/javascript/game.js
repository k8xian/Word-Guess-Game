//some variables
var wins = 0;          
var losses = 0;         
var guesses = 12;      
var selectedPlanet = "";    
var hiddenLetters = [];    
var currentWord = [];   
var incorrectLetters = [];  
var guessed = [];

//giant object
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

   // planetFacts: ['.39', '.723', '1', '1.524', '5.203', '9.539', '19.18', '30.06', '39.53',],
   // trying to get this fact to work


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
        guesses = 12;
        hiddenLetters = [];
        currentWord = [];
        incorrectLetters = [];
        guessed = []
    
       this.randomizePlanet();
       this.creatingBlanks();
       this.gameContent();
    },

    endCondition: function(){
        document.getElementById('endContainer').style.visibility = "visible";
        document.getElementById('gameContainer').style.visibility = "hidden";
        document.getElementById("planetName").textContent = selectedPlanet;
      //  document.getElementById("planetFact").textContent = selectedPlanet + " is " + this.planetFacts[this.planetDist] + " AU from the sun";
      //  document.getElementById('planetPic').style.backgroundImage="URL('../images/" + selectedPlanet + ".png');";
    },

}

//press space to start or continue! 
document.addEventListener('keydown', function (e) {
    if(e.keyCode == 32) {
        document.getElementById('gameContainer').style.visibility = "visible";
        document.getElementById('cheekyComment').style.visibility = "hidden";
        document.getElementById('endContainer').style.visibility = "hidden";
        spaceTheGame.startOver(); 
// change visibility of box upon click
    
    }
});

//detecting key guesses
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

      //if it's a valid key guess, it removes a remaining guess
    } else if (spaceTheGame.keyStroke.includes(letterGuess)) {
        guesses--;
        spaceTheGame.gameContent();
        
    };

    //if guesses hit 0,you lose, 'losses' increases by 1
    if (guesses === 0) {
        losses++;  
        spaceTheGame.endCondition();        
        document.getElementById("endMsg").textContent = "You Lose!";
        console.log(selectedPlanet);
    };

    //if you win, if guesses hit 
    if (hiddenLetters.indexOf(" _ ") === -1) {
        wins++;
        spaceTheGame.endCondition();     
        document.getElementById("endMsg").textContent = "You Win!";
        console.log(selectedPlanet); 5000
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


//other stuff
    //add a keyboard that appears only in mobile view


//link to portfolio
    //link from portfolio
