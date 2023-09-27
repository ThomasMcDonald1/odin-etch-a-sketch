const DEFAULT_COLUMN_SIZE = 16;
document.addEventListener("DOMContentLoaded", setGrid(DEFAULT_COLUMN_SIZE));

let cellRangeSlider = document.querySelector('.cell-slider');

cellRangeSlider.addEventListener('input', function()
{
    setGrid(cellRangeSlider.value);
});

function setGrid(columnSize)
{
    let cellSliderText = document.querySelector('.slider-text');
    cellSliderText.textContent = columnSize.toString() + " x " + columnSize.toString();    

    const gridContainer = document.querySelector('#grid-container');

    // Need to clear the grid items (children of the container) before adding new cells, if they exist
            // #grid-container has at least a child: .grid-column if entering the loop:
    while (gridContainer.firstChild)
    {
        // .grid-column, a child of #grid-container, contains at least a child: .cell if entering the loop:
        while(gridContainer.firstChild.firstChild)
        {
            // remove the cell child from the column
            gridContainer.firstChild.removeChild(gridContainer.firstChild.firstChild);
        }
        // remove the column child from the container
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = 0; i < columnSize; i++)
    {
        const column = document.createElement('div');
        column.classList.add('grid-column');

        for (let j = 0; j < columnSize; j++)
        {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            column.appendChild(cell);
            cell.style.backgroundColor = "rgb(200, 200, 200)";
            cell.addEventListener("mouseover", function ()
            { hoveredCell(cell) });
            cell.addEventListener("mouseout", function ()
            { stoppedHoveredCell(cell) });
        }
        gridContainer.appendChild(column);
    }
}

function resetCells()
{

}

function hoveredCell(cell)
{
    cell.style.backgroundColor = "red";
}

function stoppedHoveredCell(cell)
{
    cell.style.backgroundColor = "rgb(200, 200, 200)";
}