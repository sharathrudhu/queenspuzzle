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

// Create a 2D array to keep track of cell states
const cellStates = Array.from({ length: gridColors.length }, () =>
  Array(gridColors[0].length).fill("")
);

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
      if (cell.textContent === "" && !cell.classList.contains("disabled")) {
        placeCrown(cell, rowIndex, colIndex);
      } else if (cell.textContent === "👑") {
        removeCrown(cell, rowIndex, colIndex);
      }
    });
  });
});

// Function to place a crown and disable affected cells
function placeCrown(cell, rowIndex, colIndex) {
  cell.textContent = "👑";
  cellStates[rowIndex][colIndex] = "👑";

  // Disable all cells in the same row, column, and diagonals
  updateDisabledCells(rowIndex, colIndex, true);
}

// Function to remove a crown and re-enable affected cells
function removeCrown(cell, rowIndex, colIndex) {
  cell.textContent = "";
  cellStates[rowIndex][colIndex] = "";

  // Re-enable all cells in the same row, column, and diagonals
  updateDisabledCells(rowIndex, colIndex, false);
}

// Update disabled state for cells
function updateDisabledCells(rowIndex, colIndex, disable) {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);

    if (
      r === rowIndex || // Same row
      c === colIndex || // Same column
      Math.abs(r - rowIndex) === Math.abs(c - colIndex) // Diagonal
    ) {
      if (disable) {
        if (cell.textContent !== "👑") {
          cell.classList.add("disabled");
        }
      } else {
        // Re-enable if no crown is in the same constraints
        const isCrownInRowOrColOrDiag = cells.some((otherCell) => {
          const or = parseInt(otherCell.dataset.row);
          const oc = parseInt(otherCell.dataset.col);
          return (
            otherCell.textContent === "👑" &&
            (or === r || oc === c || Math.abs(or - r) === Math.abs(oc - c))
          );
        });

        if (!isCrownInRowOrColOrDiag) {
          cell.classList.remove("disabled");
        }
      }
    }
  });
}
