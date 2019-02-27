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


var a = makePossibleNumbers(initial);
//console.log(a);
a = checkRows(a);

a = checkCols(a);

a = checkBlocks(a);




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


function makePossibleNumbers (matrix) {
    let initPossibleNumbers = '1,2,3,4,5,6,7,8,9'; //не баг, а фича: с массивом не работает перебор и удаление элементов

    for (let row = 0; row < 9; row++) {

        for (let item = 0; item < 9; item++) {
            if (matrix[row][item] === 0) {
                matrix[row][item] = initPossibleNumbers;
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

        console.log('row ' + row + ' end ' + blockRow);
        console.log('item ' + item + ' end ' + blockCol);
        let i = item;
        let b = item;
        let r = row;
        let usedNumbers = makeUsedNumbers(matrix, row, blockRow, i, blockCol);
        console.log(usedNumbers);

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

    console.log(matr);

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
            // console.log('--------------------------------');
            // console.log('row ' + row + ' end ' + blockRow);
            // console.log('item ' + item + ' end ' + blockCol);
            // console.log('--------------------------------');
            for (item; item < colE; item++) {

                if (typeof(matrix[rowSt][item]) !== 'number') {



                    let tempArray = matrix[rowSt][item].split(',');

                    for (let i = 0; i < usedNumbers.length; i++) {
                        let index = tempArray.indexOf(usedNumbers[i] + "");
                        if (index == -1) {
                            continue;
                        }
                        tempArray.splice(index, 1);
                    }

                    if (tempArray.length == 1) {
                        matrix[row][item] = +tempArray[0];
                    } else {
                        matrix[row][item] = tempArray.join(',')
                    }

                }
            }
        }
        return matrix;
    }


}








