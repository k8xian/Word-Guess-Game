//yay variables
var wins = 0;          
var losses = 0;         
var guesses = 8;      
var selectedPlanet = "";    
var hiddenLetters = [];    
var currentWord = [];   
var incorrectLetters = [];  
var guessed = [];


//giant object
var spaceTheGame =  {
    //word bank
    planets: [ "mercury","venus","earth","mars","jupiter","saturn","neptune","uranus","pluto",],

    //guessing options
    keyStroke: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],


    //method for selecting a planet randomly
    randomizePlanet: function(){
        selectedPlanet = this.planets[Math.floor(Math.random() * this.planets.length)];
        console.log(selectedPlanet)
        return selectedPlanet;
    },


    //method for generating blank spaces
    creatingBlanks: function(){
        for (var i = 0; i < selectedPlanet.length; i++) {
            hiddenLetters.push(" _ ");
        }
        for (var i = 0; i < selectedPlanet.length; i++) {
            currentWord.push(selectedPlanet[i].charAt())
        }
    },


    //pulling in audio sounds
    audioCorrect:new Audio('assets/audio/correct.mp3'),
    audioIncorrect:new Audio('assets/audio/incorrect.mp3'),
    audioSpace:new Audio('assets/audio/space.mp3'),
    audioWin:new Audio('assets/audio/win.mp3'),
    audioLose:new Audio('assets/audio/lose.mp3'),


    //preloading audio 
    audioPreloader: function(){
        this.audioCorrect.preload = "auto";
        this.audioIncorrect.preload = "auto";
        this.audioSpace.preload = "auto";
        this.audioWin.preload = "auto";
        this.audioLose.preload = "auto";
    },


    // trying to get the winning screen to display the distance a planet is from the sun
    //this relates to a thing that isn't working yet
    planetFacts: {mercury: '.39', venus: '.723', earth: '1', mars:'1.524', jupiter: '5.203', saturn: '9.539', uranus: '19.18', neptune: '30.06', pluto: '39.53',},
    

    //method for writing text content to the actual page
    gameContent: function(){
        document.getElementById("guesses").textContent = "Guesses left: " + guesses;
        document.getElementById("lettersIncorrect").textContent = "Incorrect letters: " + incorrectLetters;
        document.getElementById("lettersGuessed").textContent = "Guessed letters: " + guessed;
        document.getElementById("numWord").textContent = "( " + selectedPlanet.length + " letter word" + " )";
        document.getElementById("spaces").textContent = "  " + hiddenLetters.join(" ") + "  ";
        document.getElementById("wins").textContent = "Wins: " + wins;
        document.getElementById("losses").textContent = "Losses: " + losses;
    },


    //method for beginning a new round
    startOver: function(){
        guesses = 8;
        hiddenLetters = [];
        currentWord = [];
        incorrectLetters = [];
        guessed = []
    

    //calling methods above to start a new round
       this.audioPreloader();
       this.randomizePlanet();
       this.creatingBlanks();
       this.gameContent();


    //changing visilbity of DOM elements on page to have game board visible
       document.getElementById('gameContainer').style.visibility = "visible";
       document.getElementById('cheekyComment').style.visibility = "hidden";
       document.getElementById('endContainer').style.visibility = "hidden";
       document.getElementById('plutoComment').style.visibility = "hidden";
    },


    //method for ending a round and displaying planet picture
    endCondition: function(){
        //making visible the winning/losing screen and hiding the game screen
        document.getElementById('endContainer').style.visibility = "visible";
        document.getElementById('gameContainer').style.visibility = "hidden";
        document.getElementById("planetName").textContent = selectedPlanet;


        //adding a comment for the pedants about how YES I KNOW PLUTO ISN'T A PLANET ANYMORE
        if (selectedPlanet == 'pluto'){
            document.getElementById('plutoComment').style.visibility = "visible";
            };


        //generating an img tag based on the word selected for the ending screen
        document.getElementById('planetPic').innerHTML='<img src="assets/images/' + selectedPlanet + '.png" alt="' + selectedPlanet  +  'image" height="200px"/>';


        //code for my random fact index lookup thing that isn't working yet
        //document.getElementById("planetFact").textContent = selectedPlanet + " is " + this.planetFacts.selectedPlanet + " AU from the sun";
        
    },

}

//press space to start or continue! 
document.addEventListener('keydown', function (e) {
    if(e.keyCode == 32) {
        spaceTheGame.audioSpace.play();
        spaceTheGame.startOver(); 
    
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
                spaceTheGame.audioCorrect.play();
                spaceTheGame.gameContent();
            }
        }

      //if it's a valid key guess, it removes a remaining guess
    } else if (spaceTheGame.keyStroke.includes(letterGuess)) {
        guesses--;
        spaceTheGame.audioIncorrect.play();
        spaceTheGame.gameContent();
        
    };

    //if guesses hit 0,you lose, 'losses' increases by 1
    if (guesses === 0) {
        losses++;
        spaceTheGame.audioLose.play();  
        spaceTheGame.endCondition();        
        document.getElementById("endMsg").textContent = "You Lose!";
        console.log(selectedPlanet);
    };

    //if you win,
    if (hiddenLetters.indexOf(" _ ") === -1) {
        wins++;
        spaceTheGame.audioWin.play();
        spaceTheGame.endCondition();     
        document.getElementById("endMsg").textContent = "You Win!";
        console.log(selectedPlanet); 5000
    };
});


///some pseudocode to describe functionality

//start with word bank array
//make a random selection from this word bank
//create an array full of blanks the length of the selected word
//create an array full of letters containing the selected word

//check the keystroke against the selected word
    //if there is a match, replace the blanks with the correct guessed letter
        //play a right sound
        //log the guess to the "guessed letters" field

    //if there is no match, add letter to incorrect letters
        //remove one point from guesses left
        //log to "guessed letters"
        //log to incorrect letters
        //play a "wrong" sound

//if there are no more blanks, add you win popup. 
    //wins++
    //adding the name of the gussed word
    //adding a picture of the planet
    //adding an audio blip
    //upon hitting space, start over

//if guesses = 0, stop allowing guesses
    //add you lose popup
    //losses++
    //adding the name of the gussed word
    //adding a picture of the planet
    //adding an audio blip
    //upon hitting space, start over

//link to portfolio
    //link from portfolio

//other stuff I haven't done yet but that I'd like to do
    //add a keyboard that appears only in mobile view
    //adding a fact for every planet that generates a value from a nested object- is this even the right way to do it?


