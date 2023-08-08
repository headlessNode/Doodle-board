// Get a reference to the grid-container element
var gridContainer = document.querySelector('.grid-container');
gridContainer.style.height = '500px';
gridContainer.style.width = '500px';

var rndColorCondition = false;
var blackColorCondition = false;
var eraserCondition = false;
var shaderBtnCondition = false;

var shaderMouseOverCount = 1;

var nCells = 16; // Default number of cells
var nRows = 16; // Default number of rows

//Generate random rgb
function randomColorCond(){
    rndColorCondition = true;
    blackColorCond = false;
    eraserCondition = false;
    // var color = [];
    // for(var i = 0; i<3; i++){
    //     color.push(Math.floor(Math.random() * 256));
    // }
    // console.log('rgb(' + color.join(', ') + ')');
    
    // return 'rgb(' + color.join(', ') + ')';

}

function blackColorCond(){
    blackColorCond = true;
    rndColorCondition = false;
    eraserCondition = false;
}

function eraserBtnCond(){
    blackColorCond = false;
    rndColorCondition = false;
    eraserCondition = true;
}

function shaderBtnCond(){
    blackColorCond = false;
    rndColorCondition = false;
    eraserCondition = false;
    shaderBtnCondition = true;
}

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
            
            if(rndColorCondition == true){
                var color = [];
                for(var i = 0; i<3; i++){
                    color.push(Math.floor(Math.random() * 256));
                }
                console.log('rgb(' + color.join(', ') + ')');
                
                e.target.style.backgroundColor = 'rgb(' + color.join(', ') + ')';
            }
            else if(eraserCondition == true){
                e.target.style.backgroundColor = 'white';
                shaderMouseOverCount = 1;
            }

            else if(blackColorCond == true){
                e.target.style.backgroundColor = 'black';
            }

            else if (shaderBtnCondition == true) {
                shaderMouseOverCount = (shaderMouseOverCount % 10) + 1;
                var hslLightness = 100 - (shaderMouseOverCount - 1) * 10;
                if (hslLightness < 10) {
                    hslLightness = 10;
                }
            
                var hsl = ['0', '0%', hslLightness + '%'];
                // console.log('hsl(' + hsl.join(', ') + ')');
                e.target.style.backgroundColor = 'hsl(' + hsl.join(', ') + ')';
            }
            
            

            else{
                e.target.style.backgroundColor = 'black';
            }
            
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
    var Pixels = prompt('Enter number of pixels per side (max:64)', ' ');
    if(Pixels > 64){
        alert('Invalid entry: Please enter a number lower than 64' );
        getPxls();
    }
    else if(Pixels <= 0){
        alert('Invalid entry: Please enter a number greater than 0');
        getPxls();
    }
    else{
        var nPixels = parseInt(Pixels);
        nCells = nPixels;
        nRows = nPixels;
    
        if (Pixels != null) {
            gridContainer.innerHTML = ''; // Clear the previous grid
            createGrid(nCells, nRows);    // Recreate the grid with new dimensions
        }
    }

}

function clear() {
    var clrGrid = document.querySelectorAll('.grid-cell');
    for (var i = 0; i < nCells * nRows; i++) {
        clrGrid[i].style.backgroundColor = 'white';
    }
    rndColorCondition = false;
    blackColorCondition = false;
    eraserCondition = false;
    shaderBtnCondition = false;
    shaderMouseOverCount = 1;    
}

// Function to set up the initial state of the grid
function paint() {
    var pixels = document.querySelector('.pxl-btn');
    pixels.addEventListener('click', getPxls);

    var clrBoard = document.querySelector('.clr-btn');
    clrBoard.addEventListener('click', clear);

    var colorRandom = document.querySelector('.rnd-color-btn');
    colorRandom.addEventListener('click', randomColorCond);

    var blackColor = document.querySelector('.black-clr-btn');
    blackColor.addEventListener('click', blackColorCond);

    var eraserBtn = document.querySelector('.eraser-btn');
    eraserBtn.addEventListener('click', eraserBtnCond);

    var shaderBtn = document.querySelector('.shader-btn');
    shaderBtn.addEventListener('click', shaderBtnCond);

    createGrid(nCells, nRows);
}

paint();
