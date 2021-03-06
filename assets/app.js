const shifumi = {

    presentationContainers : document.querySelectorAll('.intro--display'),

    gameContainer : document.querySelector(".game_container--hidden"),

    possibilities : [
        'pierre.png',
        'feuille.png',
        'ciseaux.png'
    ],

    turn : 0,
    pointsUser : 0,
    pointsComputer : 0,

    // Targeting html elements for display points
    pointsUserElement : document.querySelector('#user span'),
    pointsComputerElement : document.querySelector('#computer span'),

    // Targeting div element play-possibilities for display or hidden
    playPossibilities : document.getElementById('play-possibilities'),

    // Targeting span and p element for display number round and text for indicate the winner
    winnerText : document.querySelector('.game--winner p'),
    roundGameText : document.querySelector('.game--winner span'),

    // Targeting div element for display history elements playing
    userChoicesContainer : document.getElementById('game__user-validated'),
    computerChoicesContainer : document.getElementById('game__computer-validated'),

    // Targeting img element for display game in progress
    imgUserValidatedElement : document.querySelector('.game__user--img'),
    imgComputerValidatedElement : document.querySelector('.game__computer--img'),

    buttonPlayAgain : document.getElementById('play-again'),

    /**
     * Initialize function
     */
    init : function(){
        // Debug init
        //console.log('init function');

        let buttonElement = document.getElementById('arrow');

        buttonElement.addEventListener('click', shifumi.handleStartGame);

        // Retrieve play possibilities image for found event click
        let imgPlayPossibilities = document.querySelectorAll('.play-possibilities__img');

        // Listen event click on each images
        for(let image of imgPlayPossibilities){
            image.addEventListener('click', shifumi.handleWinnerGame);
        }

        shifumi.buttonPlayAgain.addEventListener('click', shifumi.handlePlayAgain);
    },

    /**
     * Start the game at click on "JOUER" button
     * @param {} event
     */
    handleStartGame : function(event){
        // Debug StartGame
        console.log('function handle stard game');

        if(shifumi.gameContainer.classList.contains("game_container--hidden")){
            shifumi.gameContainer.classList.remove("game_container--hidden");
            shifumi.gameContainer.classList.add("game_container--display");

            for(let container of shifumi.presentationContainers){

                container.classList.remove("intro--display");
                container.classList.add("intro--hidden");
            }

            let buttonHome = document.getElementById('buttonHome');
            buttonHome.classList.remove('buttonHome--hidden');
            buttonHome.classList.add('buttonHome--display');
        }
    },


    /**
     * Function for comparate pictures choice by user and computer
     * @param {string} userChoice : name picture
     * @param {string} computerChoice : name picture
     */
    handleWinnerGame : function(userChoice, computerChoice){
        // Debug WinnerGame
        //console.log('handle winner game function');

        let userChoiceValidated = shifumi.userChoice(userChoice);
        let computerChoiceValidated = shifumi.computerChoice(computerChoice);

        // Function define below
        shifumi.checkWinnerAtRound(userChoiceValidated, computerChoiceValidated);
        shifumi.endGame(shifumi.pointsUser, shifumi.pointsComputer);
    },

    /**
     * Function for play again when user click on the button
     * @param {click} event : click on button play again
     */
    handlePlayAgain : function(event){
        // Debug PlayAgain
        //console.log('play again function');

        // Remove all pictures choice validate at the previous party
        while (shifumi.userChoicesContainer.firstChild) {
            shifumi.userChoicesContainer.removeChild(shifumi.userChoicesContainer.firstChild);
        }

        while (shifumi.computerChoicesContainer.firstChild) {
            shifumi.computerChoicesContainer.removeChild(shifumi.computerChoicesContainer.firstChild);
        }

        // Define below
        shifumi.resetElementForNewGame();
        shifumi.resetImgValidateElement();
    },

    /**
     * Function for compare points user and computer and for stop the game
     * @param {int} pointsUser
     * @param {int} pointsComputer
     */
    endGame : function(pointsUser, pointsComputer){
        // Debug endGame
        //console.log("end game function");

        if(pointsUser == 5 || pointsComputer == 5){

            shifumi.playPossibilities.className = "play__possibilities--hidden";

            shifumi.buttonPlayAgain.className = "play-again--display";

            shifumi.resetImgValidateElement();

            // Add class endGame for update img display (in block)
            let imgValidatedElement = document.querySelectorAll('.choice__validated--img');

            // change class img validate for display in column at the end game
            for(let img of imgValidatedElement) {
                img.classList.add('endGame');
            }

            shifumi.roundGameText.textContent = "Partie termin??e !"

            if(pointsUser == 5){
                shifumi.winnerText.textContent = "Bravo tu as battu l'ordinateur en " + shifumi.turn + " round !";
            }
            else {
                shifumi.winnerText.textContent = "L'ordinateur t'a battu en " + shifumi.turn + " round, essaie encore !";
            }
        }
    },

    /**
     * Function to retrieve choice user validated
     * @param {click user} event
     * @return userChoice (just name of picture)
     */
    userChoice : function(event){
        // Debug userChoice
        //console.log('user choice function');

        let imgElementChoice = event.currentTarget;

        let imageSource = imgElementChoice.src;

        // When user click on one picture, insert this in html for display game validated
        shifumi.imgUserValidatedElement.src = imageSource;

        // Create img element and insert in src attribut the user choice (where he's click)
        let imgChoiceElement = document.createElement("img");
        imgChoiceElement.src = shifumi.imgUserValidatedElement.src;

        // Insert class name for css and insert in container
        imgChoiceElement.className = "choice__validated--img";
        shifumi.userChoicesContainer.appendChild(imgChoiceElement);

        // Retrieve just name of touch image for comparison with computer choice and return this
        // WARNING : in dev environment, slice(36)
        //let userChoice = imageSource.slice(36);

        // WARNING : in prod environment, slice(54)
        let userChoice = imageSource.slice(54);

        return userChoice;
    },

    /**
     * Function for define random choice computeur
     * @param {string} computerChoice
     * @return computerChoice
     */
    computerChoice : function(computerChoice){
        // Debug computerChoice
        //console.log('computer choice function');

        // Generate random number for use this like index of possibilities array
        // DOC https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/floor && https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        let randomIndex = Math.floor(Math.random()*shifumi.possibilities.length);
        computerChoice = shifumi.possibilities[randomIndex];

        // Define src of computer choice validated img (relative path)
        shifumi.imgComputerValidatedElement.src = "assets/img/" + computerChoice;

        // Create img element and insert in src attribut the computer choice (where he's click)
        let imgChoiceElement = document.createElement("img");
        imgChoiceElement.src = shifumi.imgComputerValidatedElement.src;

        // Insert class name for css and insert in container
        imgChoiceElement.className = "choice__validated--img";
        shifumi.computerChoicesContainer.appendChild(imgChoiceElement);

        // return name of picture choice by computer (for comparate with userChoice)
        return computerChoice;
    },

    /**
     * Method for check winner at each round
     * @param {string} userChoiceValidated
     * @param {string} computerChoiceValidated
     */
    checkWinnerAtRound: function(userChoiceValidated, computerChoiceValidated){
        if(userChoiceValidated ===  computerChoiceValidated){

            shifumi.turn += 1;

            shifumi.roundGameText.textContent = "Round " + shifumi.turn;

            shifumi.winnerText.textContent = "Egalit?? !";
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
                shifumi.pointsComputerElement.textContent = shifumi.pointsComputer;
            }
        else if(
            (userChoiceValidated === shifumi.possibilities[0] && computerChoiceValidated === shifumi.possibilities[2])
            || (userChoiceValidated === shifumi.possibilities[1] && computerChoiceValidated === shifumi.possibilities[0])
            || (userChoiceValidated === shifumi.possibilities[2] && computerChoiceValidated === shifumi.possibilities[1])
            ){
                shifumi.pointsUser += 1;
                shifumi.turn += 1;
                shifumi.roundGameText.textContent = "Round " + shifumi.turn;
                shifumi.winnerText.textContent = "Tu gagnes !";
                shifumi.pointsUserElement.textContent = shifumi.pointsUser;
            }
    },

    /**
    * Reset class button play and container playPossibilities, textContent of round and winner element
    */
    resetElementForNewGame: function(){
        shifumi.buttonPlayAgain.className = "play-again--hidden";

        shifumi.playPossibilities.className = "play__possibilities--display";

        shifumi.roundGameText.textContent = "";
        shifumi.winnerText.textContent = "";

        shifumi.pointsUserElement.textContent = "0";
        shifumi.pointsComputerElement.textContent = "0";

        shifumi.pointsComputer = 0;
        shifumi.pointsUser = 0;
        shifumi.turn = 0;
    },

    /**
     * Reset src img validte by user and computer
     */
    resetImgValidateElement: function(){
        shifumi.imgUserValidatedElement.src = "";
        shifumi.imgComputerValidatedElement.src = "";
    }
}

document.addEventListener('DOMContentLoaded', shifumi.init);