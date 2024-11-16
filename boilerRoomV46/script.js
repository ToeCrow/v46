const inputTitle = document.getElementById("inputTitle");
const inputText = document.getElementById("inputText");
const radioWork = document.getElementById("radioWork");
const radioPrivate = document.getElementById("radioPrivate");
const submitForm = document.getElementById("submitForm");
let showAllBtn = document.getElementById("showAllBtn");
let clearAllTasks = document.getElementById("clearAllTasks");

submitForm.addEventListener("click", saveLocalstorage);
clearAllTasks.addEventListener("click", clearTasks);
showAllBtn.addEventListener("click", showAllTasks);

// Collects data from localstorage
let fromStart;
try {
  fromStart = JSON.parse(localStorage.getItem("noteArray")) || [];
} catch (error) {
  console.error("Ogiltig JSON i localStorage:", error);
  fromStart = [];
}
console.log("efter try/catch", fromStart)

//? Got more than one id= #1 when the page is refreshed, maybe from before fromStart was declared??
let id = fromStart && fromStart.length > 0  ? fromStart[fromStart.length - 1].id : 0
let noteArray = fromStart;

function saveLocalstorage() {
 id = id + 1;
 const title = inputTitle.value;
 const text = inputText.value;
 const isWork = radioWork.checked;
 const isPrivate = radioPrivate.checked;
 const timestamp = Date.now();
 
 const note = {
  id,
  title,
  text,
  isWork,
  isPrivate,
  timestamp
 };

 noteArray.push(note);
 localStorage.setItem("noteArray", JSON.stringify(noteArray));

 inputTitle.value = "";
 inputText.value = "";

 console.log("noteArray i saveLocalstorage", noteArray)
}

function clearTasks() {
 localStorage.clear();
}

const taskContainer = document.getElementById("taskContainer");

// Funktion för att visa alla uppgifter
function showAllTasks() {
  taskContainer.innerHTML = "";  // Rensa taskContainer först
// TODO Skapa med ul och li så jag kan ha id på li för att visa endast den uppgiften som klickats på
  noteArray.forEach((note) => {
    const showTitle = document.createElement("h3");
    const showText = document.createElement("p");
    const showTimestamp = document.createElement("small");
    const removeButton = document.createElement("button");

    // Sätt innehåll för varje element
    showTitle.innerText = note.title;
    showText.innerText = note.text;
    const formattedDate = formatDate(note.timestamp);
    showTimestamp.innerText = `Skapad: ${formattedDate}`;

    removeButton.innerText = "Delete";
    removeButton.id = `removeButton-${note.id}`;
    removeButton.style.color = "white";
    removeButton.style.backgroundColor = "red";

    // Klickhändelse för att hantera radering med bekräftelse
    removeButton.addEventListener("click", function firstClick() {
      // Ändra text och stil på knappen för bekräftelse
      removeButton.innerText = "Sure?";
      removeButton.style.color = "white";
      removeButton.style.fontWeight = "bold";
      removeButton.style.backgroundColor = "red";
      removeButton.style.cursor = "pointer";

      // Starta en timer för att återställa texten efter 3 sekunder
      const timer = setTimeout(() => {
        removeButton.innerText = "Delete";
        removeButton.style.fontWeight = ""; // Återställ stil
        removeButton.addEventListener("click", firstClick); // Återaktivera `firstClick`
        removeButton.removeEventListener("click", secondClick); // Ta bort `secondClick`
      }, 3000);

      // Definiera andra klickhändelsen för att ta bort uppgiften
      function secondClick() {
        clearTimeout(timer); // Avbryt timern om användaren klickar igen innan den löper ut
        removeTask(note.id); // Ta bort uppgiften från arrayen och localStorage
        taskContainer.removeChild(showTitle); // Ta bort från DOM
        taskContainer.removeChild(showText);
        taskContainer.removeChild(showTimestamp);
        taskContainer.removeChild(removeButton);
      }

      // Lägg till `secondClick` för att ta bort uppgiften om användaren klickar igen
      removeButton.addEventListener("click", secondClick, { once: true });
      removeButton.removeEventListener("click", firstClick); // Temporärt ta bort `firstClick`
    }, { once: true });

    // Lägg till element i taskContainer
    taskContainer.appendChild(showTitle);
    taskContainer.appendChild(showText);
    taskContainer.appendChild(showTimestamp);
    taskContainer.appendChild(removeButton);
  });
}

// Funktion för att ta bort uppgiften från noteArray och localStorage
function removeTask(noteId) {
  noteArray = noteArray.filter(note => note.id !== noteId);  // Ta bort noten från arrayen
  localStorage.setItem("noteArray", JSON.stringify(noteArray)); // Uppdatera localStorage
}

function formatDate(timestamp) {
 const date = new Date(timestamp);
 const options = {
   weekday: 'short',  // t.ex. "Mån"
   year: 'numeric', // t.ex. "2024"
   month: 'short', // t.ex. "Nov"
   day: 'numeric', // t.ex. "16"
   hour: 'numeric', // t.ex. "3"
   minute: 'numeric', // t.ex. "30"
   // second: 'numeric', // t.ex. "05"
   hour12: false // 24-timmarsformat (kan sättas till true för 12-timmars)
 };
 return date.toLocaleString('sv-SE', options); // t.ex. "Mon Nov 16, 2024, 3:30:05 PM"
}

console.log("fromStart", fromStart)
console.log("noteArray", noteArray)
