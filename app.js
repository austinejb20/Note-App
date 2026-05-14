// DOM Elements
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

const descInput = document.getElementById("descInput");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");
const container = document.getElementById("notesContainer");

//  DISPLAY NOTES
function displayNotes(filter = "") {
  container.innerHTML = "";

  notes
    .filter(note =>
      note.desc.toLowerCase().includes(filter.toLowerCase())
    )
    
    .forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      noteDiv.innerHTML = `
        <p class="note-number">Note ${index + 1}:</p>
        <p class="note-text">${note.desc}</p>
        <div class="btns">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;
      // Select buttons
      const editBtn = noteDiv.querySelector(".edit");
      const deleteBtn = noteDiv.querySelector(".delete");

      // Add event listeners
      editBtn.addEventListener("click", () => editNote(index));
      deleteBtn.addEventListener("click", () => deleteNote(index));

      container.appendChild(noteDiv);
    });
}

// ADD BTN / UPDATE NOTE
addBtn.addEventListener("click", () => {
  const desc = descInput.value.trim();

  if (desc === "") return alert("Please enter a note");


  if (editIndex === null) {
    notes.push({ desc });
  } else {
    notes[editIndex] = { desc };
    editIndex = null;
  }

  saveNotes();
  clearInput();
  displayNotes();
});

// SEARCH
searchInput.addEventListener("input", (e) => {
  displayNotes(e.target.value);
});

// CANCEL BTN
cancelBtn.addEventListener("click", clearInput);

function clearInput() {
  descInput.value = "";
  editIndex = null;
}

// DELETE NOTE
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

// EDIT NOTE
function editNote(index) {
  descInput.value = notes[index].desc;
  editIndex = index;
}

// SAVE TO LOCALSTORAGE
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// LOAD WHEN PAGE REFRESH OR START
displayNotes();

