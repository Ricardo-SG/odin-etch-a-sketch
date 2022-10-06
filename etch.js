// Let's try to do this 16x16 div canvas...

// Constants:
const MAX_COL = 16;
const MAX_ROW = 16;


// first, we will create the object related to the div canvas
const canvas = document.querySelector('.canvas');
//console.log(canvas); /* so we see it assigned properly */

// Second we're gonna append 256 div (16x16)
createGrid(16);

function createGrid(size) {

    const canvas = document.querySelector('.canvas');
    canvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
    canvas.style.gridTemplateRows    = `repeat(${size},1fr)`;
    let k = 0; // conts the number of the current element
    if (size > 100) { size = 100; }

    for (let i = 0; i<size; i++) {
        for (let j = 0; j<size; j++) {
            k++;
    
            const divAux = document.createElement('div');
            addMarkStyle(divAux, k);
            canvas.appendChild(divAux);
        }
    }

}


function addMarkStyle(htmlObject, mark) {
    const newItemClass = 'num'+mark.toString();
    htmlObject.classList.add(newItemClass);
    htmlObject.classList.add('grid-item');

    // htmlObject.addEventListener('mouseover', darken(htmlObject, newItemClass) );
    htmlObject.addEventListener('mouseover', darken);

}


function darken(e) {
    
    const actualColor =  window.getComputedStyle(this).getPropertyValue('background-color'); 
    const colorRGB    = actualColor.split(',');
    let colorR      = colorRGB[0].substring(4);
    let colorG      = colorRGB[1].substring(1);
    let colorB      = colorRGB[2].substring(1,4);

    // si no hay parámetro opacity definido (porque automáticamente al llegar a 1 lo quita)
    if (colorRGB[3] === undefined) {
        colorRGB[3] = '0';
    }
    // aquí siempre obtenemos x.x), con el split nos quedamos con el numero x.x
    // lo pasamos a float
    let opacity     = parseFloat(colorRGB[3].split(')')[0]);
    

    /* Con match y esta expresión regular extraemos la parte numérica */
    colorR  = parseInt(colorR.match(/\d+/g));
    colorG  = parseInt(colorG.match(/\d+/g));
    colorB  = parseInt(colorB.match(/\d+/g));
    

    
    if (opacity < 1) {
        opacity += 0.10;
        opacity = opacity.toFixed(1);
        this.style.backgroundColor= `rgb(${colorR},${colorG},${colorB},${opacity})`;
    }
}
    

function resizeGrid() {
    const size = window.prompt('Choose the size with a number between 0 and 100');
    console.log('size: ' +size);

    if (isNaN(size) || size < 0 || size > 100) {
        window.alert('You introduced ' +size +' but it\'s not a valid value. Please use a number between 0 and 100');
    }
    {
        deleteGrid(); // we delete the actual grid
        createGrid(size);
    }
}

function deleteGrid() {

    const items = document.getElementsByClassName('grid-item');
    const total = items.length;

    for (let i = 0; i<total;i++)
    {
        items[0].parentNode.removeChild(items[0]);
    }

}


