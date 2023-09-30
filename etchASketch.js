const DEFAULT_COLUMN_SIZE = 16;
document.addEventListener("DOMContentLoaded", setGrid(DEFAULT_COLUMN_SIZE));

let mouseChecker = document.createElement('div');
mouseChecker.classList.add('mouse-checker');
mouseChecker.value = "mouse-release";

document.addEventListener("mousedown", function()
{  
    onMouseDown(mouseChecker); 
});

document.addEventListener("mouseup", function()
{  
    onMouseRelease(mouseChecker); 
});

/*********** document selectors for adding events ***********/
let cellRangeSlider = document.querySelector('.cell-slider');
let gridColorPicker = document.querySelector('#grid-color-picker');
let backgroundColorPicker = document.querySelector('#background-color-picker');

let gridToggle = document.querySelector('#toggle-grid');
let gridToggleText = document.querySelector('#toggle-grid-text');

let eraser = document.querySelector('#eraser');

let clearSketchButton = document.querySelector('#clear-sketch');

let toggleRainbow = document.querySelector('#toggle-rainbow');
let rainbowModeText = document.querySelector('#toggle-rainbow-text');

cellRangeSlider.addEventListener('change', function()
{
    setGrid(cellRangeSlider.value);
});

cellRangeSlider.addEventListener('input', function()
{
    setGridAreaText(cellRangeSlider.value);
});

gridColorPicker.addEventListener('change', function()
{
    setGridColor(gridColorPicker.value);
});

backgroundColorPicker.addEventListener('input', function()
{
    setBackgroundColor(backgroundColorPicker.value);
});

gridToggle.addEventListener('click', function()
{
    toggleGrid(gridToggleText);
});

eraser.addEventListener('click', function()
{ 
    eraseMode();
});

clearSketchButton.addEventListener('click', function()
{
    clearSketch();
});

toggleRainbow.addEventListener('click', function()
{
    toggleRainbowMode(rainbowModeText);
});

/*********** Functions ***********/

function setGrid(columnSize)
{   
    let cellSliderText = document.querySelector('.slider-text');
    cellSliderText.textContent = columnSize.toString() + " x " + columnSize.toString(); 
    let penColorPicker = document.querySelector('#pen-color-picker');

    const gridContainer = document.querySelector('#grid-container');
    const gridColor = document.querySelector('#grid-color-picker');

    const gridToggleText = document.querySelector('#toggle-grid-text');

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
            const cell = document.createElement('button');
            cell.classList.add('grid-cell');
            column.appendChild(cell);
            cell.style.backgroundColor = "rgb(200, 200, 200)";
            cell.style.borderColor = gridColor.value;

            if (gridToggleText.innerText === "Hide Grid") { cell.style.border = "1px solid" + gridColor.value; }
            else { cell.style.border = "0px solid"; }

            let cellColor = document.createElement('p');
            cellColor.classList.add('cell-color');
            cellColor.value = "rgb(200, 200, 200)";

            cell.appendChild(cellColor);

            cell.addEventListener("mouseover", function ()
            { hoveredCell(cell, mouseChecker, penColorPicker); });

            cell.addEventListener("mousedown", function ()
            {
                cellMouseDownStart(cell, penColorPicker);
            });

            cell.addEventListener("mouseout", function ()
            { stoppedHoveredCell(cell, mouseChecker); });
        }
        gridContainer.appendChild(column);
    }
}

function resetCells()
{

}

function hoveredCell(cell, mouseChecker, penColorPicker)
{
    let rainbowToggleText = document.querySelector('#toggle-rainbow-text');
    if (rainbowToggleText.innerText === "Rainbow Mode") { randomizePenColor(); }
    cell.style.backgroundColor = penColorPicker.value;

    if (mouseChecker.value === "mouse-down")
    {
        cell.firstChild.value = penColorPicker.value;
    }
}

function onMouseDown(mouseChecker) { mouseChecker.value = "mouse-down"; }

function onMouseRelease(mouseChecker) { mouseChecker.value = "mouse-release"; }

function cellMouseDownStart(cell, penColorPicker) 
{
    cell.firstChild.value = penColorPicker.value;
    //alert("this should not be previous color... right?");
}

function stoppedHoveredCell(cell, mouseChecker)
{
    cell.style.backgroundColor = cell.firstChild.value;
}

function setGridColor(color)
{
    let gridBorders = document.querySelectorAll('.grid-cell');
    //gridBorder.style.borderColor = color;
    for (let i = 0; i < gridBorders.length; i++)
    {
        gridBorders[i].style.borderColor = color;
    }
}

function setBackgroundColor(color)
{
    let backgroundColor = document.querySelector('#main-container');
    backgroundColor.style.backgroundColor = color;
}

function toggleGrid(gridToggleText)
{
    if (gridToggleText.innerText === "Hide Grid")
    {
        let gridBorders = document.querySelectorAll('.grid-cell');
        //gridBorder.style.borderColor = color;
        for (let i = 0; i < gridBorders.length; i++)
        {
            gridBorders[i].style.border = "0px";
        }
        gridToggleText.innerText = "Show Grid";
    }
    else
    {
        let gridBorders = document.querySelectorAll('.grid-cell');
        let gridColor = document.querySelector('#grid-color-picker');
        //gridBorder.style.borderColor = color;
        for (let i = 0; i < gridBorders.length; i++)
        {
            gridBorders[i].style.border = "1px solid";
            gridBorders[i].style.borderColor = gridColor.value;
        }
        gridToggleText.innerText = "Hide Grid";
    }
}

function setGridAreaText(columnSize)
{
    let cellSliderText = document.querySelector('.slider-text');
    cellSliderText.textContent = columnSize.toString() + " x " + columnSize.toString(); 
}

function eraseMode()
{
    let penColorPicker = document.querySelector('#pen-color-picker');
    penColorPicker.value = "#c8c8c8";
}

function clearSketch()
{
    let cells = document.querySelectorAll('.grid-cell');
    for (let i = 0; i < cells.length; i++)
    {
        cells[i].style.backgroundColor = "#c8c8c8";
        cells[i].firstChild.value = "#c8c8c8";
    }
}

function toggleRainbowMode(rainbowModeText)
{
    if (rainbowModeText.innerText === "Rainbow Mode") { rainbowModeText.innerText = "Normal Mode"; }
    else 
    { 
        randomizePenColor();
        rainbowModeText.innerText = "Rainbow Mode"; 
    }
}

function randomizePenColor()
{
    const hexLength = 6;
    const hexValues = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let penColor = document.querySelector('#pen-color-picker');
    let hexValue = "";

    for (let i = 0; i < 6; i++)
    {
        let randomHexIndex = Math.floor(Math.random() * hexValues.length);
        hexValue += hexValues[randomHexIndex];
    }
    penColor.value = "#"+hexValue;
}
