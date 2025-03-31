const words = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Lemon", "Mango", "Orange", "Peach", "Pear", "Plum", "Pineapple", "Raspberry", "Strawberry", "Watermelon", "Kiwi", "Papaya", "Blueberry", "Melon", "Apricot", "Cantaloupe", "Coconut", "Pomegranate", "Dragonfruit", "Grapefruit"];

const gridSize = 5;
let markedCount = 0;

function generateBingoCard() {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";

  // Shuffle words and select 25 for the grid
  const selectedWords = shuffle(words).slice(0, gridSize * gridSize);
  
  // Add words to the grid
  selectedWords.forEach((word, index) => {
    const cell = document.createElement("div");
    cell.textContent = word;
    cell.onclick = () => markCell(cell);
    grid.appendChild(cell);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function markCell(cell) {
  if (cell.classList.contains("marked")) {
    cell.classList.remove("marked");
    markedCount--;
  } else {
    cell.classList.add("marked");
    markedCount++;
  }
}

function checkBlackout() {
  if (markedCount === gridSize * gridSize) {
    document.getElementById("status").textContent = "Blackout! You marked all the squares!";
  } else {
    document.getElementById("status").textContent = `You have ${markedCount} marked squares. Keep going!`;
  }
}

// Initialize the bingo card when the page loads
window.onload = generateBingoCard;
