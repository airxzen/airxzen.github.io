const gridSize = 5;
let markedCount = 0;
let words = []; // Initialize words array

// Function to read the file and update the words list
function handleFileUpload(event) {
  const file = event.target.files[0];
  
  // Check if file exists
  if (!file) return;

  // Read file as text
  const reader = new FileReader();
  reader.onload = function(e) {
    const fileContent = e.target.result;

    // Split the file content by newlines to create the words list
    words = fileContent.split("\n").map(word => word.trim()).filter(word => word !== "");
    
    // After uploading, regenerate the bingo card with new words
    generateBingoCard();
  };
  
  reader.readAsText(file);  // Read the file as text
}

// Function to generate bingo card from words
function generateBingoCard() {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";

  // If words list is empty, use a default set
  if (words.length === 0) {
    words = shuffle([
      "Apple", "Banana", "Cherry", "Date", "Grapes", "Lemon", "Mango", "Orange", "Peach", "Pear", 
      "Plum", "Pineapple", "Raspberry", "Strawberry", "Watermelon", "Kiwi", "Papaya", "Blueberry", 
      "Melon", "Apricot", "Cantaloupe", "Coconut", "Pomegranate", "Dragonfruit", "Grapefruit"
    ]);
  }

  // Shuffle and select 25 words for the bingo grid
  const selectedWords = words.slice(0, gridSize * gridSize);
  
  // Create grid cells with words
  selectedWords.forEach((word, index) => {
    const cell = document.createElement("div");
    cell.textContent = word;
    cell.onclick = () => markCell(cell);
    grid.appendChild(cell);
  });
}

// Shuffle function to randomize the list
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Function to mark a bingo cell
function markCell(cell) {
  if (cell.classList.contains("marked")) {
    cell.classList.remove("marked");
    markedCount--;
  } else {
    cell.classList.add("marked");
