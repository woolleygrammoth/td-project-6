// //Hide the win & Lose Divs
// $('.win').hide();
// $('.lose').hide();


const qwerty = document.querySelector('#qwerty');
const phraseDiv = document.querySelector('#phrase');
let missed = 0;

// game starts when button is clicked
$('.btn__reset').on('click', () => {
    $('#overlay').hide();
});

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
    'sparky sparky boom man'
];

const getRandomPhraseAsArray = (arr) => {
    const randomIndex = Math.floor( Math.random() * arr.length );
    const phrase = arr[randomIndex];
    const characterArray = [];
    for (let i = 0; i < phrase.length; i++) {
        characterArray.push(phrase[i]);
    }
    return characterArray;
};

const addPhraseToDisplay = (arr) => {
    const ul = phraseDiv.firstElementChild;
    for (let i = 0; i < arr['length']; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        if ( arr[i] !== ' ' ) { 
            li.className = 'letter'; 
        }
        ul.append(li);
    }
};

const phraseArray = getRandomPhraseAsArray( phrases );
addPhraseToDisplay( phraseArray );

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

const loseHeart = () => {
    const scoreboard = document.querySelector('#scoreboard').firstElementChild; //get the ol inside the div
    const hearts = scoreboard.children;
    for (i = hearts.length; i > 0; i--) {
        let heartImage = hearts[i - 1].firstElementChild;
        let liveOrLost = heartImage.getAttribute('src');
        if (liveOrLost.includes('live') ) {
            heartImage.setAttribute('src', 'images/lostHeart.png');
            break;
        }
    }

}

const checkWin = () => {
    const correctlyGuessed = document.querySelector('.show');
    const totalLetters = document.querySelector('.letter');
    if (totalLetters.length === correctlyGuessed.length) {
        $('.win').show();
    } else if (missed > 4) {
        $('.lose').show();
    }
};

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        if (e.target.tagName === 'BUTTON') {
            e.target.className = 'chosen';
        }
        const letterFound = checkLetter(e.target);
        if (!letterFound) {
            missed++;
            loseHeart();
        checkWin();
        }
    }
});





