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
let noteArray = fromStart

// if (fromStart === null) {
//   noteArray = [];
//   localStorage.setItem("noteArray", JSON.stringify(noteArray));
//  } else {
//   noteArray = fromStart  
//  }

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

// const showType = document.createElement("input")
function showAllTasks() {
 taskContainer.innerHTML = "";

 noteArray.forEach((note) => {

  const showTitle = document.createElement("h3")
  const showText = document.createElement("p")

  showTitle.innerText = note.title
  showText.innerText = note.text

  taskContainer.appendChild(showTitle)
  taskContainer.appendChild(showText)
});
}


console.log("fromStart", fromStart)
console.log("noteArray", noteArray)
