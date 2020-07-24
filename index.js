/* Our plan.
    1. We need to get the selected word and put each letter into an array.
    2.
*/


// All the ELEMENTS's we need.
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = ["fock fock", "love", "eron", "shaher", "artoom", "fish", "banana", "apple", "khalaboda", "harden", "massuda", "fahadel", "kus sadia", "potato", "counter", "rush b", "suka", "kalb", "tomatoe", "assassin", "bary cool", "crie", "kus rasha", "tor madar", "go hill", "hacker", "nunu", "gg" ]

let randomWord;
let score = 0;
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'hard';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'hard';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDOM() {
    randomWord = getRandomWord().toUpperCase();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
    console.log(score);
}

function updateTime() {
    time--;
    timeEl.innerText = time + "s";

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }

}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = "flex";
}

addWordToDOM();


function matchWord(e) {
    const insertedText = e.target.value.toUpperCase();
    if(insertedText == randomWord) {
        addWordToDOM();
        updateScore();
        
        // clear.
        e.target.value = '';

        if(difficulty === 'very hard') {
            time += 2;
        } else if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium'){
            time += 4;
        } else {
            time += 5;
        }

        updateTime();
    }
}

// EVENT LISTENERES.
text.addEventListener("input", e => {
    matchWord(e);
});
text.addEventListener("keyup", e => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    matchWord(e);
    }
});

settingsBtn.addEventListener("click", () => {
    settings.classList.toggle('hide');
})

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    console.log(difficulty)
    localStorage.setItem('difficulty', difficulty);
})