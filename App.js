let computerNumber;

function startGame() {
  const playerName = prompt("Enter your name:");
  if (playerName) {
    computerNumber = uniquenumber();
    displayGuessInput(playerName);
  } else {
    alert("Please enter your name to start the game.");
  }
}
function uniquenumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    result += digits[randomIndex].toString();
    digits.splice(randomIndex, 1);
  }

  return result;
}

function displayGuessInput(playerName) {
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = "";

  const inputValue = document.createElement("h2");
  inputValue.textContent = `Hello,  ${playerName}`;

  const label = document.createElement("label");
  label.textContent = "Enter your guess (4-digit number):";

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 4;

  var x = 0;
  let count = document.createElement("label");
  count.id = "count";

  const button = document.createElement("button");
  button.textContent = "Submit";
  button.onclick = () => {
    checkGuess(input.value);
    increase();
  };
  function increase() {
    document.getElementById("count").innerText = `Your Guess Count: ${++x}`;
  }

  const feedbackLabel = document.createElement("label");
  feedbackLabel.id = "result";

  gameDiv.appendChild(inputValue);
  gameDiv.appendChild(label);
  gameDiv.appendChild(input);
  gameDiv.appendChild(button);
  gameDiv.appendChild(feedbackLabel);
  gameDiv.appendChild(count);
}

function checkGuess(guess) {
  if (guess.length !== 4 || !/^\d{4}$/.test(guess) || hasDuplicates(guess)) {
    alert(
      "Invalid input. Please enter a 4-digit number without duplicate values."
    );
    return;
  }

  let feedback = "";

  for (let i = 0; i < guess.length; i++) {
    const digit = guess[i];

    if (computerNumber.includes(digit)) {
      if (computerNumber[i] === digit) {
        feedback += "+";
      } else {
        feedback += "-";
      }
    } else {
      feedback += "*";
    }
  }
  if (guess === computerNumber) {
    alert(`Your are Successfully Find the number, The Value is: ${guess}`);

    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    const startAgain = document.createElement("button");
    startAgain.id = "startAgain";
    startAgain.innerHTML = "Start Again";
    startAgain.onclick = startGame;

    gameDiv.appendChild(startAgain);
  }
  displayFeedback(feedback);
}

function hasDuplicates(str) {
  for (var i = 0; i < str.length; i++) {
    if (str.lastIndexOf(str[i]) !== i) {
      return true;
    }
  }
  return false;
}

function displayFeedback(feedback) {
  const gameDiv = document.getElementById("game");

  const finalResult = document.getElementById("result");
  finalResult.innerText = `Your Hint: ${feedback}`;

  gameDiv.appendChild(document.createElement("br"));
}
