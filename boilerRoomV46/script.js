const inputTitle = document.getElementById("inputTitle");
const inputText = document.getElementById("inputText");
const radioWork = document.getElementById("radioWork");
const radioPrivate = document.getElementById("radioPrivate");
const submitForm = document.getElementById("submitForm");
let showAllBtn = document.getElementById("showAllBtn");
let clearAllTasks = document.getElementById("clearAllTasks");
const taskContainer = document.getElementById("taskContainer");
const newNoteFormBtn = document.getElementById("newNoteFormBtn");
let helP = document.getElementById("helP");

newNoteFormBtn.addEventListener("click", createForm);
// submitForm.addEventListener("click", saveLocalstorage);
clearAllTasks.addEventListener("click", deleteAllTasks);
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

if (!fromStart || fromStart.length === 0) {
  createForm();
} else {
  showAllTasks();
}

function createForm() {

  taskContainer.innerHTML = ""; // Rensa taskContainer först
  helP.innerText = "Skriv in titel och anteckning, sen klickar du på spara för att komma igång"

  // Skapa formuläret
  const form = document.createElement("form");
  form.id = "newNoteForm";
  form.autocomplete = "on";

  // Skapa och lägg till formulärelement
  form.innerHTML = `
    <label class="label" for="inputTitle">Titel</label><br>
    <input name="inputTitle" id="inputTitle" placeholder="Titel" type="text" required autofocus><br>
    <label class="label" for="inputText">Här kan du skriva dina tankar</label><br>
    <textarea name="inputText" id="inputText" placeholder="Skriv dina anteckningar" cols="30" rows="10" required></textarea><br>
    <span class="radio">
      <input id="radioWork" name="radio" type="radio">
      <label for="radioWork">Jobb</label><br>
      <input id="radioPrivate" name="radio" type="radio">
      <label for="radioPrivate">Privat</label>
    </span><br>
    <input id="submitForm" type="button" value="Spara">
  `;

  // Lägg till formuläret i taskContainer
  taskContainer.appendChild(form);

  // Lägg till eventlistener för att spara anteckning
  document.getElementById("submitForm").addEventListener("click", saveLocalstorage);
}
function saveLocalstorage() {
  const inputTitle = document.getElementById("inputTitle");
  const inputText = document.getElementById("inputText");
  const radioWork = document.getElementById("radioWork");
  const radioPrivate = document.getElementById("radioPrivate");

  if (!inputTitle.value || !inputText.value) {
    helP.innerText = "Fyll i alla fält";
    helP.style.color = "red";
    helP.style.fontWeight = "bold";

    setTimeout(() => {
      helP.innerText = "Skriv in titel och anteckning, sen klickar du på spara för att komma igång";
      helP.style.color = "black";
      helP.style.fontWeight = "normal";
    }, 3000);

    return; // Se till att vi inte sparar om fälten är tomma
  }

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

  // Rensa formuläret efter sparning
  inputTitle.value = "";
  inputText.value = "";

  // Litet flash när man sparar
  const flash = document.createElement('div');
  flash.classList.add('flash');
  document.body.appendChild(flash);
  setTimeout(() => document.body.removeChild(flash), 300); // Ta bort efter animation

  showAllTasks()
}

function clearTasks() {
  taskContainer.innerHTML = "";
  localStorage.clear();
  passwordInput.value = "";
  noteArray = []; // Rensa minnet också
}

function checkTasksBeforeAction() {
  if (noteArray.length === 0) {
    // helP.innerText = "Det finns inga uppgifter att visa eller ta bort.";
    helP.style.color = "red";
    helP.style.fontWeight = "bold";

    // Timer för att återställa färgen och meddelandet efter 5 sekunder
    setTimeout(() => {
      // helP.innerText = "Skriv in titel och anteckning, sen klickar du på spara för att komma igång";
      helP.style.color = "black";
      helP.style.fontWeight = "normal";
    }, 5000);

    return false; // Stoppa vidare funktionalitet
  }

  return true; // Fortsätt om det finns uppgifter
}

function showAllTasks() {
  if (!checkTasksBeforeAction()) {
    return; // Stoppa körningen om inga uppgifter finns
  }

  taskContainer.innerHTML = ""; // Rensa taskContainer först
  helP.innerText = "Tryck på en uppgift för att visa den, eller klicka på 'Skapa nytt' för att skapa en ny uppgift.";

  const taskList = document.createElement("ul"); // Skapa ul för uppgifterna
  taskList.id = "taskList";

  noteArray.forEach((note) => {
    const taskItem = document.createElement("li"); // Skapa li för varje uppgift
    taskItem.id = `task-${note.id}`;
    taskItem.style.border = "1px solid #ddd"; // Enkel styling
    taskItem.style.margin = "10px";
    taskItem.style.padding = "10px";
    taskItem.style.cursor = "zoom-in";
    taskItem.style.listStyle = "none";

    const showTitle = document.createElement("h3");
    const showTimestamp = document.createElement("small");

    // Sätt innehåll för varje element
    showTitle.innerText = note.title;
    const formattedDate = formatDate(note.timestamp);
    showTimestamp.innerText = `Skapad: ${formattedDate}`;

    // Lägg till event listener för att visa endast denna uppgift
    taskItem.addEventListener("click", () => showOneTask(note));

    // Lägg till title och timestamp i taskItem
    taskItem.appendChild(showTitle);
    taskItem.appendChild(showTimestamp);

    // Skapa borttagningsknappen
    const removeButton = document.createElement("button");
    removeButton.innerText = "Ta bort";
    removeButton.style.color = "white";
    removeButton.style.backgroundColor = "red";
    removeButton.style.marginTop = "10px";
    removeButton.id = "removeButton";

    // Hantera borttagningsknappen
    removeButton.addEventListener("click", function firstClick(event) {
      event.stopPropagation(); // Förhindra att det bubblar vidare
      removeButton.innerText = "Säker?";
      removeButton.style.fontWeight = "bold";

      const timer = setTimeout(() => {
        removeButton.innerText = "Ta bort";
        removeButton.style.fontWeight = ""; 
        removeButton.addEventListener("click", firstClick); // Återaktivera `firstClick`
        removeButton.removeEventListener("click", secondClick); // Ta bort `secondClick`
      }, 3000);

      function secondClick(event) {
        event.stopPropagation(); // Förhindra att det bubblar vidare
        clearTimeout(timer);
        removeTask(note.id);

        // Kontrollera om det var den sista uppgiften
        if (noteArray.length === 0) {
          createForm(); 
          return; 
        }

        taskList.removeChild(taskItem); // Ta bort från DOM
        showAllTasks(); // Uppdatera taskList från localStorage
      }

      removeButton.addEventListener("click", secondClick, { once: true });
      removeButton.removeEventListener("click", firstClick);
    });

    // Lägg till borttagningsknappen till taskItem
    taskItem.appendChild(removeButton);

    // Lägg till taskItem till taskList
    taskList.appendChild(taskItem);
  });

  // Lägg till taskList till taskContainer
  taskContainer.appendChild(taskList);
}

// Funktion för att visa endast en uppgift
function showOneTask(note) {
  taskContainer.innerHTML = ""; 
  helP.innerText = "Tryck 'Visa alla' eller 'Tillbaka' för att se listan. Eller 'Skapa nytt' för att skapa en ny uppgift.";

  const oneTask = document.createElement("div");
  oneTask.style.border = "1px solid #ddd";
  oneTask.style.margin = "10px";
  oneTask.style.padding = "20px";

  const showTitle = document.createElement("h3");
  const showText = document.createElement("p");
  const showTimestamp = document.createElement("small");

  showTitle.innerText = note.title;
  showText.innerText = note.text;
  const formattedDate = formatDate(note.timestamp);
  showTimestamp.innerText = `Skapad: ${formattedDate}`;

  // Lägg till en "Tillbaka"-knapp
  const backButton = document.createElement("button");
  backButton.innerText = "Tillbaka";
  backButton.style.marginTop = "20px";
  backButton.addEventListener("click", showAllTasks);
  backButton.id = "backButton";

  // Lägg till alla element i oneTask
  oneTask.appendChild(showTitle);
  oneTask.appendChild(showText);
  oneTask.appendChild(showTimestamp);
  oneTask.appendChild(backButton);

  // Lägg oneTask i taskContainer
  taskContainer.appendChild(oneTask);
}

// Funktion för att ta bort uppgiften från noteArray och localStorage
function removeTask(noteId) {
  noteArray = noteArray.filter(note => note.id !== noteId); // Ta bort från arrayen
  localStorage.setItem("noteArray", JSON.stringify(noteArray)); // Uppdatera localStorage
}

// Funktion för att formatera timestamp (svenskt datumformat utan sekunder)
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  return date.toLocaleString('sv-SE', options);
}

function deleteAllTasks() {

  if (!checkTasksBeforeAction()) {
    return; // Stoppa körningen om inga uppgifter finns
  }
  
  const confirmDelete = document.createElement("div");
  confirmDelete.id = "passwordModal";
  confirmDelete.classList.add("modal");  

  confirmDelete.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Ange lösenord för att radera alla uppgifter</h2>
    <input type="password" id="passwordInput" placeholder="Ange lösenord">
    <button id="submitPassword">Bekräfta</button>
  </div>
  `;

  document.body.appendChild(confirmDelete); 

  const passwordModal = document.getElementById("passwordModal");
  const closeBtn = document.querySelector(".close");
  const submitPassword = document.getElementById("submitPassword");
  const passwordInput = document.getElementById("passwordInput");
  const h2 = confirmDelete.querySelector("h2");

  // Stäng modalen när användaren klickar på 'x'
  closeBtn.addEventListener("click", () => {
  passwordModal.style.display = "none";
  });

// Stäng modalen om användaren klickar utanför modalen
  window.addEventListener("click", (event) => {
  if (event.target === passwordModal) {
    passwordModal.style.display = "none";
  }
  });

  // Kontrollera lösenordet och radera alla uppgifter
  submitPassword.addEventListener("click", handlePasswordSubmit);
  
  // Lägg till en event listener för Enter-tangenten
  passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      handlePasswordSubmit();
    }
  });

  function handlePasswordSubmit() {
    const enteredPassword = passwordInput.value;
    const correctPassword = "ja";
    if (enteredPassword === correctPassword) {
      clearTasks();
      passwordModal.style.display = "none";
      createForm();
    } else {
      h2.innerText = "Skriv in 'ja' för att radera alla uppgifter.";
      h2.style.color = "red";
      h2.style.fontWeight = "bold";
      passwordInput.value = "";
      passwordInput.focus();
    }
  }

   // Visa modalen och fokus på passwordInput
   passwordModal.style.display = "block";
   passwordInput.focus();
}