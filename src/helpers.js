
const randCells = (ncols, nrows, lightCellChance) => {
    let cellsList = [];

    for(let i=0 ; i<nrows ; i++) {
        let row = [];

        for(let x=0 ; x<ncols ; x++) {
            let cell = Math.random() < lightCellChance;
            row.push(cell);
        }
        cellsList.push(row);
    }
    // console.log(cellsList);

    return cellsList;
}

export {randCells};