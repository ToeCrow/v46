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
let fromStart = [];
console.log("innan try/catch", fromStart)
try {
  fromStart = JSON.parse(localStorage.getItem("noteArray")) || [];
} catch (error) {
  console.error("Ogiltig JSON i localStorage:", error);
  fromStart = [];
}
console.log("efter try/catch", fromStart)

// Hämtar id från den sista i arrayen för att inte få dubletter och laddar noteArray, börja med 0 om det är tomt
let id = fromStart && fromStart.length > 0  ? fromStart[fromStart.length - 1].id : 0
let noteArray = fromStart;

// Kollar om det finns nåt i arrayen och väljer "startsida"
if (!fromStart || fromStart.length === 0) {
  createForm();
} else {
  showAllTasks();
}

function createForm(note = null) {
  taskContainer.innerHTML = ""; // Rensa taskContainer först
  helP.innerText = "Skriv in titel och anteckning, sen klickar du på spara för att komma igång";

  // Skapa formuläret
  const form = document.createElement("form");
  form.id = "newNoteForm";
  form.autocomplete = "on";

  // Förifyll endast om vi redigerar en befintlig anteckning
  const titleValue = note && note.title ? note.title : "";
  const textValue = note && note.text ? note.text : "";
  const isWorkChecked = note && note.isWork ? "checked" : "";
  const isPrivateChecked = note && note.isPrivate ? "checked" : "";

  form.innerHTML = `
    <label class="label" for="inputTitle">Titel</label><br>
    <input name="inputTitle" id="inputTitle" placeholder="Titel" type="text" required value="${titleValue}"><br>
    <label class="label" for="inputText">Här kan du skriva dina tankar</label><br>
    <textarea name="inputText" id="inputText" placeholder="Skriv dina anteckningar" cols="30" rows="10" required>${textValue}</textarea><br>
    <span class="radio">
      <input id="radioWork" name="radio" type="radio" ${isWorkChecked}>
      <label for="radioWork">Jobb</label><br>
      <input id="radioPrivate" name="radio" type="radio" ${isPrivateChecked}>
      <label for="radioPrivate">Privat</label>
    </span><br>
    <input id="submitForm" type="button" value="Spara">
  `;

  taskContainer.appendChild(form);

  // Lägg till eventlistener för att spara anteckning
  const submitButton = document.getElementById("submitForm");
  submitButton.addEventListener("click", () => saveLocalstorage(note ? note.id : null));

  // Sätt fokus på inputTitle
  const inputTitle = document.getElementById("inputTitle");
  inputTitle.focus();
}

function saveLocalstorage(existingId = null) {
  const inputTitle = document.getElementById("inputTitle");
  const inputText = document.getElementById("inputText");
  const radioWork = document.getElementById("radioWork");
  const radioPrivate = document.getElementById("radioPrivate");

  // Kolla om båda fälten är ifyllda
  if (!inputTitle.value || !inputText.value) {
    helP.innerText = "Fyll i alla fält";
    helP.style.color = "red";
    helP.style.fontWeight = "bold";

    setTimeout(() => {
      helP.innerText = "Skriv in titel och anteckning, sen klickar du på spara för att komma igång";
      helP.style.color = "black";
      helP.style.fontWeight = "normal";
    }, 3000);

    return;
  }

  const title = inputTitle.value;
  const text = inputText.value;
  const isWork = radioWork.checked;
  const isPrivate = radioPrivate.checked;
  const timestamp = existingId ? noteArray.find(note => note.id === existingId).timestamp : Date.now();

  if (existingId) {
    // Uppdatera befintlig anteckning
    const noteIndex = noteArray.findIndex(note => note.id === existingId);
    noteArray[noteIndex] = { id: existingId, title, text, isWork, isPrivate, timestamp };
  } else {
    // Skapa ny anteckning
    id = id + 1;
    noteArray.push({ id, title, text, isWork, isPrivate, timestamp });
  }

  localStorage.setItem("noteArray", JSON.stringify(noteArray));

  // Rensa formuläret efter sparning
  inputTitle.value = "";
  inputText.value = "";

  showAllTasks();
  console.log("efter sparing", noteArray);
}


function clearTasks() {
  taskContainer.innerHTML = "";
  localStorage.clear();
  passwordInput.value = "";
  noteArray = []; // Det fanns kvar data i noteArray till man refreshade sidan annars
}

function checkTasksBeforeAction() {
  if (noteArray.length === 0) {
    helP.style.color = "red";
    helP.style.fontWeight = "bold";

    // Timer för att återställa färgen och meddelandet efter 5 sekunder
    setTimeout(() => {
      helP.style.color = "black";
      helP.style.fontWeight = "normal";
    }, 5000);

    return false; // Stoppa vidare funktionalitet
  }

  return true; // Fortsätt om det finns uppgifter
}

function showAllTasks() {
  // Avbryt om det inte finns nåt i arrayen
  if (!checkTasksBeforeAction()) {
    return; 
  }

  taskContainer.innerHTML = ""; // Rensa taskContainer först
  helP.innerText = "Tryck på en uppgift för att visa den, eller klicka på 'Skapa nytt' för att skapa en ny uppgift.";

  const taskList = document.createElement("ul"); 
  taskList.id = "taskList";

  noteArray.forEach((note) => {
    const taskItem = document.createElement("li"); 
    taskItem.id = `task-${note.id}`;
    taskItem.style.border = "1px solid #ddd"; 
    taskItem.style.margin = "10px";
    taskItem.style.padding = "10px";
    taskItem.style.cursor = "zoom-in";
   

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
        taskList.removeChild(taskItem); // Ta bort från DOM

        // Kontrollera om det var den sista uppgiften
        if (noteArray.length === 0) {
          createForm(); 
          return; 
        }

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

  // Lägg till en "Redigera"-knapp
  const editButton = document.createElement("button");
  editButton.innerText = "Redigera";
  editButton.style.marginTop = "20px";
  editButton.style.marginLeft = "10px";
  editButton.addEventListener("click", () => createForm(note));
  editButton.id = "editButton";

  // Lägg till alla element i oneTask
  oneTask.appendChild(showTitle);
  oneTask.appendChild(showText);
  oneTask.appendChild(showTimestamp);
  oneTask.appendChild(backButton);
  oneTask.appendChild(editButton);

  // Lägg oneTask i taskContainer
  taskContainer.appendChild(oneTask);
}


// Funktion för att ta bort uppgiften från noteArray och localStorage
function removeTask(noteId) {
  // Tar bort alla uppgifter utan det angivna id och lägger dem tillbaka i noteArray
  noteArray = noteArray.filter(note => note.id !== noteId); 
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
  // Avbryt om det inte finns nåt i arrayen
  if (!checkTasksBeforeAction()) {
    return; 
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
  resetModal();
  });

// Stäng modalen om användaren klickar utanför modalen
  window.addEventListener("click", (event) => {
  if (event.target === passwordModal) {
    passwordModal.style.display = "none";
    resetModal();
  }
  });

  // Kontrollera lösenordet och radera alla uppgifter
  submitPassword.addEventListener("click", handlePasswordSubmit);
  
  // Lägg till en event listener för Enter-tangenten
  passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePasswordSubmit();
    }
  });

  //! Milliondollarfunction :)
  function resetModal() {
    h2.innerText = "Ange lösenord för att radera alla uppgifter";
    h2.style.color = "black";
    h2.style.fontWeight = "normal";
    passwordInput.value = "";
  }

  function handlePasswordSubmit() {
    const enteredPassword = passwordInput.value;
    const correctPassword = "ja";
    if (enteredPassword === correctPassword) {
      clearTasks();
      passwordModal.style.display = "none";
      createForm();
      resetModal()
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