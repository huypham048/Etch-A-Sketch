/* Creates a grid of square divs, default size is 16 unless specified by 
the user */
function createGrid(size = 16) {
    for (let i = 0; i < size; ++i) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < size; ++j) {
            let cell = document.createElement('div');
            cell.className = 'square';
            cell.setAttribute('id','9');
            cell.style.width = `${700 / size}px`;
            cell.style.height = `${700 / size}px`;
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    const grid = Array.from(document.querySelectorAll('.square'));
    grid.forEach(square => square.addEventListener('mouseenter', changeGrid));
}

//This function generates and returns a random color
function generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; ++i) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/* This function will dim the hovered-grid, the grid will be completely dark
after 10 passes */
function dimGrid(square) {
    let currentBrightness = +square.getAttribute('id');
    square.style.filter = `brightness(${currentBrightness * 10}%)`;
    if (currentBrightness > 0) currentBrightness -= 1;
    square.setAttribute('id', `${currentBrightness}`);
}

/* This function will fill a grid with an empty color */
function changeGrid(e) { 
    const square = e.target;
    if(!square.classList.contains('filled')) {
        square.style.backgroundColor = generateRandomColor();
        square.classList.add('filled');
    } else {
        dimGrid(square);
    }
}

/* This functions will reset the board when the 'reset' button is pressed */
function resetGrid(e) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    askUser();
}

/*Prompts user for grid size, ensuring that user enter a valid size */
function askUser() {
    let size;
    do {
        size = prompt("Please enter a valid grid size", "16");
    } while (size === null || size === '' || isNaN(size));
    console.log(size);
    if (size != null) createGrid(size);
}

const container = document.querySelector('.container');
const reset = document.getElementById('reset-btn')

createGrid();

reset.addEventListener('click', resetGrid);

