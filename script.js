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
    
    // Ensure we have enough words (at least 25 for a 5x5 grid)
    if (words.length < gridSize * gridSize) {
      alert("The file doesn't contain enough words. Please ensure there are at least 25 words.");
      return;
    }
    
    // After uploading, regenerate the bingo card with new words
    generateBingoCard();
  };
  
  reader.readAsText(file);  // Read the file as text
}

// Function to generate bingo card from words
function generateBingoCard() {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";  // Clear any existing grid content

  // Shuffle and select 25 words for the bingo grid
  const selectedWords = shuffle(words).slice(0, gridSize * gridSize);
  
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
    markedCount++;
  }
}

// Function to check for Blackout mode
function checkBlackout() {
  if (markedCount === gridSize * gridSize) {
    document.getElementById("status").textContent = "Blackout! You marked all the squares!";
  } else {
    document.getElementById("status").textContent = `You have ${markedCount} marked squares. Keep going!`;
  }
}

// Event listener for file input
document.getElementById("fileInput").addEventListener("change", handleFileUpload);

// Initialize the bingo card when the page loads with default words
window.onload = generateBingoCard;
