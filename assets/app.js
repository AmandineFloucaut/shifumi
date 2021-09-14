const shifumi = {

    possibilities : [
        'pierre.png',
        'feuille.png',
        'ciseaux.png'
    ],

    turn : 0,
    pointsUser : 0,
    pointsComputer : 0,

    // Targeting div element play-possibilities for display or hidden
    playPossibilities : document.getElementById('play-possibilities'),

    // Targeting span and p element for display number round and text for indicate the winner
    winnerText : document.querySelector('.game--winner p'),
    roundGameText : document.querySelector('.game--winner span'),

    // Targeting div element for display history elements playing
    imgUserValidatedElement : document.querySelector('.game__user--img'),
    imgComputerValidatedElement : document.querySelector('.game__computer--img'),

    buttonPlayAgain : document.getElementById('play-again'),

    /**
     * Initialize function
     */
    init : function(){
        // Debug
        console.log('init function');

        // Retrieve play possibilities image for found event click
        let imgPlayPossibilities = document.querySelectorAll('.play-possibilities__img');

        // Listen event click on each images
        for(let image of imgPlayPossibilities){
            image.addEventListener('click', shifumi.handleWinnerGame);
        }

        shifumi.buttonPlayAgain.addEventListener('click', shifumi.handlePlayAgain);
    },


    /**
     * Function for comparate pictures choice by user and computer
     * @param {string} userChoice : name picture
     * @param {string} computerChoice : name picture
     */
    handleWinnerGame : function(userChoice, computerChoice){
        // Debug
        console.log('handle winner game function');

        let userChoiceValidated = shifumi.userChoice(userChoice);

        let computerChoiceValidated = shifumi.computerChoice(computerChoice);

        if(userChoiceValidated ===  computerChoiceValidated){
            shifumi.turn += 1;
            shifumi.roundGameText.textContent = "Round " + shifumi.turn;
            shifumi.winnerText.textContent = "Egalité !";
        }
        else if(
            (userChoiceValidated === shifumi.possibilities[0] && computerChoiceValidated === shifumi.possibilities[1])
            || (userChoiceValidated === shifumi.possibilities[1] && computerChoiceValidated === shifumi.possibilities[2])
            || (userChoiceValidated === shifumi.possibilities[2] && computerChoiceValidated === shifumi.possibilities[0])
            ){
                shifumi.pointsComputer += 1;
                shifumi.turn += 1;
                shifumi.roundGameText.textContent = "Round " + shifumi.turn;
                shifumi.winnerText.textContent = "L'ordinateur gagne !";
            }
        else if(
            (userChoiceValidated === shifumi.possibilities[0] && computerChoiceValidated === shifumi.possibilities[2])
            || (userChoiceValidated === shifumi.possibilities[1] && computerChoiceValidated === shifumi.possibilities[0])
            || (userChoiceValidated === shifumi.possibilities[2] && computerChoiceValidated === shifumi.possibilities[1])
            ){
                shifumi.pointsUser += 1;
                shifumi.turn += 1;
                shifumi.roundGameText.textContent = "Round " + shifumi.turn;
                shifumi.winnerText.textContent = "Vous gagnez !";
            }

        // Function define line 83
        shifumi.endGame(shifumi.pointsUser, shifumi.pointsComputer);

    },

    /**
     * Function for play again when user click on the button
     * @param {click} event : click on button play again
     */
    handlePlayAgain : function(event){

        shifumi.buttonPlayAgain.className = "play-again--hidden";

        shifumi.playPossibilities.className = "play__possibilities--display";

        shifumi.roundGameText.textContent = "";
        shifumi.winnerText.textContent = "";

        shifumi.imgUserValidatedElement.src = "";
        shifumi.imgComputerValidatedElement.src = "";

        document.getElementById("game__computer-validated").className = "game__computer-validated--hidden";

        document.getElementById("game__user-validated").className = "game__user-validated--hidden";
    },

    /**
     * Function for compare points user and computer and for stop the game
     * @param {int} pointsUser
     * @param {int} pointsComputer
     */
    endGame : function(pointsUser, pointsComputer){

        if(pointsUser == 5 || pointsComputer == 5){

            shifumi.playPossibilities.className = "play__possibilities--hidden";

            shifumi.buttonPlayAgain.className = "play-again--display";

            shifumi.imgUserValidatedElement.src = "";
            shifumi.imgComputerValidatedElement.src = "";

            if(pointsUser == 5){
                shifumi.roundGameText.textContent = "Partie terminée !"
                shifumi.winnerText.textContent = "Bravo vous avez battu l'ordinateur en " + shifumi.turn + " round !";
            }
            else {
                shifumi.roundGameText.textContent = "Partie terminée !"
                shifumi.winnerText.textContent = "L'ordinateur vous a battu en " + shifumi.turn + " , essayez encore !";
            }
        }
    },

    /**
     * Function to retrieve choice user validated
     * @param {click user} event
     * @returns userChoice (just name of picture)
     */
    userChoice : function(event){
        // Debug
        console.log('user choice function');

        let imgElementChoice = event.currentTarget;

        let imageSource = imgElementChoice.src;

        // When user click on one picture, insert this in html for display game validated
        shifumi.imgUserValidatedElement.src = imageSource;

        // Select div container for display game user validated on each turn
        let userChoicesContainer = document.getElementById('game__user-validated');
        // Create img element and insert in src attribut the user choice (where he's click)
        let imgChoiceElement = document.createElement("img");
        imgChoiceElement.src = shifumi.imgUserValidatedElement.src;
        console.log(imgChoiceElement.src);
        // Insert class name for css and insert in container
        imgChoiceElement.className = "choice__validated--img";
        userChoicesContainer.appendChild(imgChoiceElement);

        // Retrieve just name of touch image for comparison with computer choice and return this
        let userChoice = imageSource.slice(36);
        console.log(userChoice);
        return userChoice;
    },

    /**
     * Function for define random choice computeur
     * @param {string} computerChoice
     * @returns
     */
    computerChoice : function(computerChoice){
        // Debug
        console.log('computer choice function');

        // Generate random number for use this like index of possibilities array
        // DOC https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor && https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        let randomIndex = Math.floor(Math.random()*shifumi.possibilities.length);
        computerChoice = shifumi.possibilities[randomIndex];

        // Define src of computer choice validated img (relative path)
        shifumi.imgComputerValidatedElement.src = "assets/img/" + computerChoice;

        // Select div container for display game computer validated on each turn
        let computerChoicesContainer = document.getElementById('game__computer-validated');
        // Create img element and insert in src attribut the computer choice (where he's click)
        let imgChoiceElement = document.createElement("img");
        imgChoiceElement.src = shifumi.imgComputerValidatedElement.src;
        // Insert class name for css and insert in container
        imgChoiceElement.className = "choice__validated--img";
        computerChoicesContainer.appendChild(imgChoiceElement);

        // return name of picture chocie by copmputer (for comparate with userChoice)
        return computerChoice;
    }
}

document.addEventListener('DOMContentLoaded', shifumi.init);

// Debug
// console.log(shifumi.playPossibilities);
// console.log(shifumi.winnerText);
// console.log(shifumi.roundGameText);
// console.log(shifumi.imgUserValidatedElement);
// console.log(shifumi.imgComputerValidatedElement);
// console.log(shifumi.buttonPlayAgain);