const DEFAULT_COLUMN_SIZE = 16;
document.addEventListener("DOMContentLoaded", initializeGrid(DEFAULT_COLUMN_SIZE));

function initializeGrid(columnSize)
{
    const gridContainer = document.querySelector('#grid-container');

    for (let i = 0; i < columnSize; i++)
    {
        const column = document.createElement('div');
        column.classList.add('grid-column');

        for (let j = 0; j < columnSize; j++)
        {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            column.appendChild(cell);

            cell.addEventListener("mouseover", function ()
            { hoveredCell(cell) });
        }
        gridContainer.appendChild(column);
    }
}

function hoveredCell(cell)
{
    cell.style.backgroundColor = "red";
}