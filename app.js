const qwerty = document.querySelector('#qwerty'); //keyboard div
const phraseDiv = document.querySelector('#phrase');
const title = document.querySelector('.title'); 
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phraseUl = document.querySelector('#phrase').firstElementChild;
const hearts = document.querySelector('#scoreboard').firstElementChild.children; //all of the heart list items
let missed = 0;

// randomly select from an array of strings and return an array of the characters of that string
const getRandomPhraseAsArray = (arr) => {
    const randomIndex = Math.floor( Math.random() * arr.length );
    const phrase = arr[randomIndex];
    const characterArray = [];
    for (let i = 0; i < phrase.length; i++) {
        characterArray.push(phrase[i]);
    }
    return characterArray;
};

// add the 'letter' class to all letters in the phrase, not the spaces
const addPhraseToDisplay = (arr) => {
    const ul = phraseDiv.firstElementChild;
    for (let i = 0; i < arr['length']; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        if ( arr[i] !== ' ' ) { 
            li.className = 'letter'; 
            if (arr[i + 1] === ' ') {
                li.style.marginRight = '50px';
            }
        }
        ul.append(li);
    }
};

// expose any letters in the phrase that match the guessed letter and return that letter
const checkLetter = (button) => {
    const letters = document.querySelectorAll('.letter');
    const letterGuessed = button.textContent;
    let matched = null;
    for (let i = 0; i < letters.length; i++) {
        if (letterGuessed === letters[i].textContent) {
            matched = letterGuessed;
            letters[i].classList.add('show');
        } 
    }
    return matched;
};

// change the rightmost liveHeart icon to a lostHeart icon
const loseHeart = () => {
    for (i = hearts.length; i > 0; i--) {
        let heartImage = hearts[i - 1].firstElementChild;
        let liveOrLost = heartImage.getAttribute('src');
        if (liveOrLost.includes('live') ) {
            heartImage.setAttribute('src', 'images/lostHeart.png');
            break;
        }
    }
}

// restore all hearts to liveHeart icons
const restoreHearts = () => {
    for (i = hearts.length; i > 0; i--) {
        let heartImage = hearts[i - 1].firstElementChild;
        let liveOrLost = heartImage.getAttribute('src');
        if (liveOrLost.includes('lost') ) {
            heartImage.setAttribute('src', 'images/liveHeart.png');
        }
    }
}

//check if the phrase has been guessed or if there have been 5 incorrect guesses. 
//if so, add cute win/lose text and display the appropriate overlay
const winningText = `Flameo! You managed to guess the phrase before running out of hearts. You have mastered all four elements!`
const losingText = `Monkeyfeathers! It seems you haven't yet mastered all the elements. Keep practicing!`
const checkWin = () => {
    const correctlyGuessed = document.querySelectorAll('.show');
    const totalLetters = document.querySelectorAll('.letter');
    let text = '';
    if (totalLetters.length === correctlyGuessed.length) {
        overlay.className = 'win';
        setTimeout(() => {overlay.style.display = 'flex'}, 1000);
        text = winningText;
    } else if (missed > 4) {
        overlay.className = 'lose';
        setTimeout(() => {overlay.style.display = 'flex'}, 400);
        text = losingText;
    }
    if (text) {
        const p = document.createElement('p'); 
        p.textContent = text;
        title.parentNode.insertBefore(p, title.nextElementSibling);
    }
};

// remove all children of an element, if there are any
const removeChildNodes = (node) => {
    while (node.firstElementChild) {
        node.removeChild(node.firstElementChild)
    }
}

const phrases = [
    'the last airbender', 
    'kyoshi warriors', 
    'tui and la', 
    'master of all four elements', 
    'order of the white lotus', 
    'drink cactus juice', 
    'airbending slice', 
    'the blind bandit', 
    'tell me where appa is', 
    'there is no war in ba sing se', 
    'the jasmine dragon',
    'sparky sparky boom man',
    'mushy giant friend', 
    'who lit toph on fire',
    'platypus bear', 
    'lake laogai', 
    'the earth king', 
    'one hundred years', 
    'dai li agents', 
    'the day of black sun', 
    'zhao the invincible', 
    'uncle iroh', 
    'hot leaf juice', 
    'those guys are firebenders', 
    'thats rough buddy', 
    'the painted lady', 
    'and no potty breaks', 
    'appa and momo', 
    'the winter solstice', 
    'hey great bridge guy', 
    'the avatar state', 
    'more tea please', 
    'i killed chin the conqueror', 
    'bring balance to the world', 
    'zuko here', 
    'the phoenix king', 
    'a giant lion turtle told me', 
    'pai sho', 
    'who knocks at the garden gate', 
    'three on three plus sokka',
    'bitter work'
];


// Start/reset button event listener
startButton.addEventListener('click', () => { 
    // if game has been played
    if (phraseUl.firstElementChild) {
        // Remove phrase list items
        removeChildNodes(phraseUl);
        //remove 'chosen' class from keyboard elements
        const chosenLetters = document.querySelectorAll('.chosen');
        for (let i = 0; i < chosenLetters.length; i++) {
            chosenLetters[i].classList.remove('chosen');
        }
    }
    // add phrase to the game
    const phraseArray = getRandomPhraseAsArray( phrases );
    addPhraseToDisplay( phraseArray );  
    // hide overlay and change the button text
    overlay.style.display = 'none'
    overlay.className = '';
    startButton.textContent = 'Play again?';
    // reset the missed counter and restore hearts
    missed = 0;
    restoreHearts();
    // remove win/lose text if it exists
    if (title.nextElementSibling.tagName === 'P') {
        const p = title.nextElementSibling;
        title.parentNode.removeChild(p)
    }
});

// Keyboard event listener
qwerty.addEventListener('click', (e) => {
    // if a button was clicked and it hasn't been chosen already
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        // give the button a class name 'chosen'
        e.target.className = 'chosen';
        // if there is no match, lose a heart & increment our counter
        const letterFound = checkLetter(e.target);
        if (!letterFound) {
            missed++;
            loseHeart();
        }
        checkWin();
    }
});
