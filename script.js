const gridSize = 5;
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("room");
let marked = [];
let isHost = false;
const fileInput = document.getElementById("fileInput");
const status = document.getElementById("status");
const grid = document.getElementById("bingoGrid");
let userId = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = user.uid;
    checkIfHost();
  }
});

function checkIfHost() {
  const roomRef = firebase.database().ref(`rooms/${roomCode}`);
  roomRef.once("value", snap => {
    const roomData = snap.val();
    if (roomData && roomData.host === userId) {
      isHost = true;
      document.getElementById("uploadBtn").style.display = "inline-block";
      document.getElementById("resetBtn").style.display = "inline-block";
    }
  });
}

function renderGrid(words) {
  grid.innerHTML = "";
  words.forEach((word, index) => {
    const cell = document.createElement("div");
    cell.textContent = word;
    cell.classList.toggle("marked", marked.includes(index));
    cell.addEventListener("click", () => toggleMark(index));
    grid.appendChild(cell);
  });
}

function toggleMark(index) {
  if (!roomCode) return;
  const ref = firebase.database().ref(`rooms/${roomCode}/marks`);
  if (marked.includes(index)) {
    marked = marked.filter(i => i !== index);
  } else {
    marked.push(index);
  }
  ref.set(marked);
}

function listenForUpdates() {
  const wordsRef = firebase.database().ref(`rooms/${roomCode}/words`);
  const marksRef = firebase.database().ref(`rooms/${roomCode}/marks`);

  wordsRef.once("value", snap => {
    const words = snap.val();
    if (!words) {
      status.textContent = "No word list uploaded yet.";
    } else {
      renderGrid(words);
    }
  });

  marksRef.on("value", snap => {
    marked = snap.val() || [];
    const wordsRef = firebase.database().ref(`rooms/${roomCode}/words`);
    wordsRef.once("value", snap => {
      const words = snap.val();
      if (words) renderGrid(words);
      if (marked.length === gridSize * gridSize) {
        status.textContent = "Blackout! All squares are marked.";
      } else {
        status.textContent = `Marked: ${marked.length} / ${gridSize * gridSize}`;
      }
    });
  });
}

function uploadWords() {
  if (!isHost) {
    alert("Only the host can upload words.");
    return;
  }

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const lines = event.target.result.split("
").map(l => l.trim()).filter(Boolean);
    if (lines.length < gridSize * gridSize) {
      alert("Not enough entries (need at least 25).");
      return;
    }
    const selected = lines.slice(0, gridSize * gridSize);
    firebase.database().ref(`rooms/${roomCode}`).set({ words: selected, marks: [] });
  };
  reader.readAsText(file);
}

function resetGame() {
  if (!isHost) {
    alert("Only the host can reset the game.");
    return;
  }
  const roomRef = firebase.database().ref(`rooms/${roomCode}/marks`);
  roomRef.set([]);
}

listenForUpdates();