//! Uppgift 1: Räkna Vokaler
// Beskrivning: Skapa en funktion som räknar antalet vokaler i en given text. Användaren skriver in text i ett fält och klickar på en knapp för att se resultatet.

const textInput = document.getElementById("textInput")
const countButton = document.getElementById("countButton")
const result = document.getElementById("result")

countButton.addEventListener("click", function() {
 countVowels();
 textInput.value = "";
})
function countVowels(text){
const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'å', 'ä','ö']
 text = textInput.value.toLowerCase()
let vowelCount = 0

for (let char of text) {
 if (vowels.includes(char)) {
  vowelCount ++;
 }
}
// result.innerText = "Antal vokaler: " + vowelCount;
result.innerText = `Antal vokaler i "${textInput.value}" är ${vowelCount}`
}

//! Uppgift 2: Dynamisk Färgändring
// Beskrivning: Skapa en funktion som ändrar bakgrundsfärgen på sidan baserat på användarens val från en dropdown-lista. Användaren väljer en färg och klickar på en knapp för att ändra bakgrundsfärgen.
const changeColorButton = document.getElementById("changeColorButton")
const colorSelect = document.getElementById("colorSelect")

colorSelect.addEventListener("change", function(){
 changeColorButton.style.backgroundColor = colorSelect.value;  // Ändrar bakgrundsfärg på knappen
});

// Uppgift 3: Räkna Antal Ord
// Beskrivning: Skapa en funktion som räknar antalet ord i en given text. Användaren skriver en mening i en textruta och klickar på en knapp för att få antalet ord i texten.

// Uppgift 4: Byt ut Ord i Text
// Beskrivning: Skapa en funktion som byter ut ett specifikt ord i en mening. Användaren skriver en mening, ordet som ska bytas ut, och det nya ordet i tre olika fält och klickar sedan på en knapp för att se den uppdaterade meningen.

//! Uppgift 5: Räkna Ned med Timer
// Beskrivning: Skapa en timerfunktion som räknar ned från ett angivet antal sekunder. Användaren anger antal sekunder i ett fält och klickar på en knapp för att starta nedräkningen. Timer visar tiden som återstår tills nedräkningen är klar.


const timerInput = document.getElementById("timerInput");
const startTimerButton = document.getElementById("startTimerButton");
const timerDisplay = document.getElementById("timerDisplay");

startTimerButton.addEventListener("click", function(){
 startCountdown();
 timerDisplay.value = "";
})

function startCountdown(){
  let remainingTime = parseInt(timerInput.value);
  timerDisplay.innerText = remainingTime;

  const intervalId = setInterval(() => {
   const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
   remainingTime--;
   timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Uppdatera visningen varje sekund

   if (remainingTime <= 0) {
     clearInterval(intervalId); // Stoppa timern när den når noll
     timerDisplay.innerText = "Time's up!";
   }
 }, 1000);
}


// ! Studieguiden

let users = [
 {"id": 1, "name": "Anna"},
 {"id": 2, "name": "Björn"},
 {"id": 3, "name": "Cecilia"}
]



users.forEach(user => {
 console.log(user.name)
});

let today = Date();
console.log(today)

