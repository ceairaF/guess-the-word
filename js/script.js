const guessedLettersElement= document.querySelector(".guessed-letters");
const guessButton= document.querySelector(".guess");
const letterInput= document.querySelector(".letter");
const wordInProgress= document.querySelector(".word-in-progress");
const remainingGuessesElement= document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgain= document.querySelector(".play-again");


//function to add placeholders for each letter
let word= "magnolia";
const guessedLetters= [];
let remainingGuesses= 8;

const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex= Math.floor(Math.random() *wordArray.length);
    word=wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder= function(word){
    const placeholderLetters= [];
    for (const letter of word){
    //console.log(letter);
    placeholderLetters.push("●");
}
wordInProgress.innerText= placeholderLetters.join("");

};

//Add an Event Listener for the button
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess= letterInput.value;
    //console.log(value);
    const goodGuess= validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value="";
});

//Function to check players input

const validateInput= function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText="Please enter a letter from A-Z.";

    }else if (input.length >1){
        message.innerText="Only use one letter,please!";

    }else if (!input.match(acceptedLetter)){
        message.innerText="Please enter a letter from A-Z.";

    }else {
        return input;
    }

};

const makeGuess=function(guess){
    guess=guess.toUpperCase();
if(guessedLetters.includes(guess)) {
    message.innerText = "Already tried that one! Try again."
}else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
}

};

//create and name a function to show the guessed letters

const showGuessedLetters= function(){
    guessedLettersElement.innerHTML="";
  for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText=letter;
      guessedLettersElement.append(li);
  }
};

//Create a function to update the word in progress

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    wordInProgress.innerText = revealWord.join("");
    correctGuess();
};

//guesses remaining
const updateGuessesRemaining= function(guess){
    const upperWord= word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText= `Sorry, no ${guess} in this word.`;
        remainingGuesses -= 1;
    } else{
        message.innerText= `Yes, the word has the letter ${guess}.`;
    }


    if(remainingGuesses === 0){
        message.innerHTML= `Game over! The word was <span class="highlight">${word}</span>.`;
    }else if (remainingGuesses === 1){
        remainingGuessesSpan.innerHTML = `${remainingGuesses} guess`;
    }else {
        remainingGuessesSpan.innerHTML = `${remainingGuesses} guesses`;
    }
};


//Did they win?
const correctGuess= function(){
if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class= "highlight"> You guessed the correct word! Congrats! </p>`;
}
};



