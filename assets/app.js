console.log('%c' + "app.js chargé", 'color: #0bf; font-size: 1rem; background-color:#fff');

const shifumi = {
    possibilities : [
        'pierre.png',
        'feuille.png',
        'ciseaux.png'
    ],

    turn : 0,
    pointsUser : 0,
    pointsComputer : 0,

    playPossibilities : document.getElementById('play-possibilities'),

    winnerText : document.querySelector('.game--winner p'),
    endGameText : document.querySelector('.game--winner span'),

    imgUserValidatedElement : document.querySelector('.game__user--img'),
    imgComputerValidatedElement : document.querySelector('.game__computer--img'),

    buttonPlayAgain : document.getElementById('play-again'),

}
console.log(typeof shifumi);
console.log(shifumi.playPossibilities);
console.log(shifumi.winnerText);
console.log(shifumi.endGameText);
console.log(shifumi.imgUserValidatedElement);
console.log(shifumi.imgComputerValidatedElement);
console.log(shifumi.buttonPlayAgain);