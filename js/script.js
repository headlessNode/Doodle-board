// GRID CONTAINER
    var gridContainer = document.querySelector('.grid-container');

//  CREATE 16x16 GRID
    var nCells = 16;
    var nRows = 16;

    function createGrid(nRows){
        for (var rows = 0; rows<nRows; rows++){
            var row = document.createElement('div');
            row.classList.add('row-'+rows);
            row.id = 'rows';

            for(var i = 0; i<nCells; i++){
                var cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }

            gridContainer.appendChild(row);
        }
    }


    createGrid(nRows);
