const guessedLettersElement= document.querySelector(".guessed-letters");
const guessButton= document.querySelector(".guess");
const letterInput= document.querySelector(".letter");
const wordInProgress= document.querySelector(".word-in-progress");
const remaining= document.querySelector(".remaining");
const span = document.querySelectorAll(".remaining span");
const message= document.querySelector(".message");
const playAgain= document.querySelectorAll(".play-again hide");


//function to add placeholders for each letter
const word= "magnolia";
const guessedLetters= [];

const placeholder= function(word){
    const placeholderLetters= [];
    for (const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
}
wordInProgress.innerText= placeholderLetters.join("");

};

placeholder(word);

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
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0){
        message.innerText="Please enter a letter from A-Z.";

    }else if (input.length >1){
        message.innerText="Only use one letter,please!";

    }else if (!input.match(acceptedLetter)){
        message.innerText="Please enter a letter from A-Z.";

    }else {
        return input;
    }

}

const makeGuess=function(guess){
    guess=guess.toUpperCase();
if(guessedLetters.includes(guess)) {
    message.innerText = "Already tried that one! Try again."
}else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
}

};



