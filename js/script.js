const guessedLetters= document.querySelector(".guessed-letters");
const guessButton= document.querySelector(".guess");
const letterInput= document.querySelector(".letter");
const wordInProgress= document.querySelector(".word-in-progress");
const remaining= document.querySelector(".remaining");
const span = document.querySelectorAll(".remaining span");
const message= document.querySelector(".message");
const playAgain= document.querySelectorAll(".play-again hide");


//function to add placeholders for each letter
const word= "magnolia";


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
    const value= letterInput.value;
    console.log(value);
    letterInput.value = "";
});



