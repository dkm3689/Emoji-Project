const emojiDetails = [
  { description: "Smiling face with sunglasses", emoji: "😎" },
  { description: "Thumbs up", emoji: "👍" },
  { description: "Heart eyes", emoji: "😍" },
  { description: "Crying face", emoji: "😢" },
  { description: "Party popper", emoji: "🎉" },
  // Add more emoji descriptions here
];

let currentEmojiIndex = 0;
let score = 0;
let seconds = 30; //setting the time
let timer;

const timerElement = document.getElementById("Timer");
const guessInput = document.getElementById("guess-Input");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function displayEmoji() {
  const descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = emojiDetails[currentEmojiIndex].emoji;
  timerElement.textContent = `Time: ${seconds}`;
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  const correctEmoji =
    emojiDetails[currentEmojiIndex].description.trim().toLowerCase;
  if (guess === correctEmoji) {
    resultElement.textContent = "Correct!";
    score++;
  } else {
    resultElement.textContent = "Wrong!";
  }

  console.log(score);
  scoreElement.textContent = `Score: ${score}`;
  guessInput.value = "";
  guessInput.focus(); //pointer stays in input
  nextEmoji();
}

function nextEmoji() {
  currentEmojiIndex++;
  setTimeout(() => {
    resultElement.textContent = "";
  }, 1000); //remove wrong after nextEmoji comes

  if (currentEmojiIndex === emojiDetails.length) {
    currentEmojiIndex = 0;
    score = 0;
  }

  displayEmoji(); //for first emoji you need to specifically call the function
}

// guessInput.addEventListener("keydown", (event) => {
//   if (event.key == "Enter") {
//     checkGuess();
//   }
// });

document.getElementById("guess-Input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

//directly document pe bhi event Handler dal skte hain
//when content is completely loaded then display emoji
document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
  startTimer(); //page load hone k baad timer show karna hai
});

function startTimer() {
  timer = setInterval(() => {
    seconds--;

    timerElement.textContent = `Time: ${seconds}`;

    if (seconds <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer); //stops a timer previously created by setInterval function
  guessInput.disabled = true;
  timerElement.textContent = "";
}
