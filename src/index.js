// module.exports = function solveSudoku(matrix) {
//   // your solution

// };

// https://habr.com/ru/post/134071/

var initial = [
    [6, 5, 0, 7, 3, 0, 0, 8, 0],
    [0, 0, 0, 4, 8, 0, 5, 3, 0],
    [8, 4, 0, 9, 2, 5, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 0],
    [5, 3, 0, 2, 0, 9, 6, 0, 0],
    [0, 0, 6, 0, 0, 0, 8, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 6],
    [0, 0, 7, 0, 0, 0, 0, 5, 0],
    [1, 6, 5, 3, 9, 0, 4, 7, 0]
];



var numberOfZeros = 0;

var a = makePossibleNumbers(initial);

while (numberOfZeros > 0) {
    a = checkRows(a);

    a = checkCols(a);

    a = checkBlocks(a);

    a = findDoublesPerRow(a);
    console.log(a);
    console.log('--------------------------------');

}



// a = checkRows(a);
//
// a = checkCols(a);
//
// a = checkBlocks(a);



function getCoords (matrix) {

    let coords = [];
    let allCoords = [];

    for (let row = 0; row < 9; row++) {

        for (let item = 0; item < 9; item++) {
            if (matrix[row][item] === 0) {
                coords = [row, item];
                allCoords.push(coords);

            }
        }
    }
    return allCoords;
}

function findDoublesPerRow (matrix) {
    for (let row = 0; row < 9; row++ ) {
        let count = 1;
        for (let item = 0; item < 9 ; item++) {

            if (typeof(matrix[row][item]) !== 'number') {

                let tempItem = matrix[row][item];

                for (let i = item + 1 ; i < 9; i++) {
                    if (tempItem == matrix[row][i]) {
                        count++;
                        //console.log(tempItem + ' row: ' + row + ' item:' + item + ' | ' + matrix[row][i] + ' row: ' + row + ' item:' + i);

                        if (count > 1 && tempItem.split(',').length == count) {
                            let usedNumbers = tempItem.split(',');

                            //-----------------------------------------------------------------------------------------------

                            for (let item = 0; item < 9 ; item++) {

                                if (typeof(matrix[row][item]) !== 'number') {

                                    let tempArray = matrix[row][item].split(',');

                                    for (let i = 0; i < usedNumbers.length; i++) {
                                        let index = tempArray.indexOf(usedNumbers[i] + "");

                                        if (tempArray + '' == usedNumbers + '') {
                                            continue;
                                        }
                                        if (index == -1) {
                                            continue;
                                        }
                                        tempArray.splice(index, 1);
                                    }

                                    if (tempArray.length == 1) {
                                        matrix[row][item] = +tempArray[0];
                                        numberOfZeros--;
                                    } else {
                                        matrix[row][item] = tempArray.join(',')

                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return matrix;
}


function makePossibleNumbers (matrix) {
    let initPossibleNumbers = '1,2,3,4,5,6,7,8,9'; //не баг, а фича: с массивом не работает перебор и удаление элементов

    for (let row = 0; row < 9; row++) {

        for (let item = 0; item < 9; item++) {
            if (matrix[row][item] === 0) {
                matrix[row][item] = initPossibleNumbers;
                numberOfZeros++;
            }
        }
    }
    return matrix;
};

function checkRows (matrix) {

    for (let row = 0; row < 9; row++ ) {

        let usedNumbers = [];
        for (let item = 0; item < 9; item++) {

            if (typeof(matrix[row][item]) == 'number') {
                usedNumbers.push(matrix[row][item]);
            }
        }
        //console.log (usedNumbers);

        for (let item = 0; item < 9 ; item++) {

            if (typeof(matrix[row][item]) !== 'number') {

                let tempArray = matrix[row][item].split(',');

                for (let i = 0; i < usedNumbers.length; i++) {
                    let index = tempArray.indexOf(usedNumbers[i] + "");
                    if (index == -1) {
                        continue;
                    }
                    tempArray.splice(index, 1);
                }

                if (tempArray.length == 1) {
                    matrix[row][item] = +tempArray[0];
                    numberOfZeros--;
                } else {
                    matrix[row][item] = tempArray.join(',')
                }

            }
         }
         //console.log (matrix);
    }
    return matrix;
}

function checkCols (matrix) {

    for (let item = 0; item < 9; item++ ) {

        let usedNumbers = [];
        for (let row = 0; row < 9; row++) {

            if (typeof(matrix[row][item]) == 'number') {
                usedNumbers.push(matrix[row][item]);
            }
        }
        // console.log ('-------------------------');
        // console.log (usedNumbers);
        // console.log ('-------------------------');

        for (let row = 0; row < 9 ; row++) {

            if (typeof(matrix[row][item]) !== 'number') {

                let tempArray = matrix[row][item].split(',');

                for (let i = 0; i < usedNumbers.length; i++) {
                    let index = tempArray.indexOf(usedNumbers[i] + "");
                    if (index == -1) {
                        continue;
                    }
                    tempArray.splice(index, 1);
                }

                if (tempArray.length == 1) {
                    matrix[row][item] = +tempArray[0];
                    numberOfZeros--;
                } else {
                    matrix[row][item] = tempArray.join(',')
                }

            }

        }
        //console.log (matrix);
    }
    return matrix;
}

function checkBlocks (matrix) {

    let blockRow = 3;
    let blockCol = 3;
    let row = 0;
    let item = 0;
    let matr = [];

    while (1) {

        let i = item;
        let b = item;
        let r = row;
        let usedNumbers = makeUsedNumbers(matrix, row, blockRow, i, blockCol);

        matr = blocks(matrix, r, blockRow, b, blockCol, usedNumbers);

        if (blockRow >= 9 && blockCol >= 9) {
            break;
        }

        blockCol += 3;
        if (blockCol > 9) {
            blockCol = 3;
            blockRow += 3;
            row += 3;
            item = 0;
        }

    }
    return matr;


    function makeUsedNumbers (matrix, rowStart, rowEnd, colStart, colEnd) {
        let usedNumbers = [];
        let rowSt = rowStart;
        let rowE = rowEnd;
        let colE = colEnd;
        for (rowSt; rowSt < rowE; rowSt++) {
            item = colStart;
            for (item; item < colE; item++) {
                if (typeof(matrix[rowSt][item]) == 'number') {
                    usedNumbers.push(matrix[rowSt][item]);
                }
            }
        }

        return usedNumbers;
    }

    function blocks (matrix, rowStart, rowEnd, colStart, colEnd, usedNumbers) {

        let rowSt = rowStart;
        let rowE = rowEnd;
        let colE = colEnd;
        for (rowSt; rowSt < rowE; rowSt++) {
            item = colStart;
            for (item; item < colE; item++) {
                if (typeof(matrix[rowSt][item]) !== 'number') {
                    let tempArray = matrix[rowSt][item].split(',');

                    for (let i = 0; i < usedNumbers.length; i++) {
                        let index = tempArray.indexOf(usedNumbers[i] + "");
                        if (index == -1) {
                            continue;
                        }
                        tempArray.splice(index, 1);
                        if (tempArray.length == 1) {
                            matrix[rowSt][item] = +tempArray[0];
                            numberOfZeros--;
                        } else {
                            matrix[rowSt][item] = tempArray.join(',')

                        }
                    }
                }
            }
        }

        return matrix;
    }


}








