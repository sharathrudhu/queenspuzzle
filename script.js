// Define the color grid
const gridColors = [
    ["green", "green", "purple", "purple", "pink", "pink", "pink", "pink"],
    ["green", "green", "purple", "purple", "pink", "pink", "pink", "pink"],
    ["purple", "purple", "red", "red", "yellow", "yellow", "orange", "orange"],
    ["blue", "blue", "red", "red", "yellow", "yellow", "orange", "orange"],
    ["blue", "blue", "red", "red", "yellow", "yellow", "orange", "orange"],
    ["gray", "gray", "red", "red", "yellow", "yellow", "pink", "pink"],
    ["gray", "gray", "gray", "gray", "pink", "pink", "pink", "pink"],
    ["gray", "gray", "gray", "gray", "pink", "pink", "pink", "pink"],
  ];
  
  // Generate the grid
  const grid = document.getElementById("grid");
  
  gridColors.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      const cell = document.createElement("div");
      cell.className = `cell ${color}`;
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      cell.textContent = ""; // Initially empty
      grid.appendChild(cell);
  
      // Handle cell click events
      cell.addEventListener("click", () => {
        if (cell.textContent === "") {
          cell.textContent = "👑"; // Place a crown
        } else if (cell.textContent === "👑") {
          cell.textContent = "X"; // Mark as not allowed
        } else {
          cell.textContent = ""; // Clear the cell
        }
      });
    });
  });  