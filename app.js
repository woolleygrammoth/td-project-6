const qwerty = $('#qwerty');
const phrase = $('#phrase');
let missed = 0;

// game starts when button is clicked
$('.btn__reset').on('click', () => {
    $('#overlay').hide();
});

const phrases = [
    'the last airbender', 
    'kyoshi warriors', 
    'tui and la', 
    'the avatar state', 
    'white lotus', 
    'drink cactus juice', 
    'airbending slice', 
    'the blind bandit', 
    'tell me where appa is', 
    'the boy in the iceberg', 
    'no you miscalculated',
    'sparky sparky boom man'
];
