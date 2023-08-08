// Get a reference to the grid-container element
var gridContainer = document.querySelector('.grid-container');
gridContainer.style.height = '500px';
gridContainer.style.width = '500px';

var nCells = 16; // Default number of cells
var nRows = 16; // Default number of rows

// Function to create a row of grid cells
function createRow(nCells) {
    var gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    gridContainer.appendChild(gridRow);
    for (var i = 0; i < nCells; i++) {
        var gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.style.width = (gridContainer.clientWidth / nCells) + 'px';
        gridCell.style.height = (gridContainer.clientHeight / nRows) + 'px';
        gridRow.appendChild(gridCell);

        gridCell.addEventListener('mouseover', function (e) {
            e.target.style.backgroundColor = 'red';
        });
    }
}

// Function to create the entire grid
function createGrid(nCells, nRows) {
    for (var i = 0; i < nRows; i++) {
        createRow(nCells);
    }
}

// Function to handle the button click and update grid dimensions
function getPxls(e) {
    var Pixels = prompt('Enter number of pixels per side (max:100)', '16');
    var nPixels = parseInt(Pixels);
    nCells = nPixels;
    nRows = nPixels;

    if (Pixels != null) {
        gridContainer.innerHTML = ''; // Clear the previous grid
        createGrid(nCells, nRows);    // Recreate the grid with new dimensions
    }
}

function clear() {
    var clrGrid = document.querySelectorAll('.grid-cell');
    for (var i = 0; i < nCells * nRows; i++) {
        clrGrid[i].style.backgroundColor = 'white';
    }
}

// Function to set up the initial state of the grid
function paint() {
    var pixels = document.querySelector('.pxl-btn');
    pixels.addEventListener('click', getPxls);

    var clrBoard = document.querySelector('.clr-btn');
    clrBoard.addEventListener('click', clear);

    createGrid(nCells, nRows);
}

paint();
