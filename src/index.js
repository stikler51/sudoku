// module.exports = function solveSudoku(matrix) {
//   // your solution
//
//     let copyMatrix = matrix;
//     let allCcords = [];
//     let coords = [];
//
//     for (let row = 0; row < 10; row++) {
//         for (let item = 0; item < 10; item++) {
//             if (copyMatrix[row][item] === 0) {
//                 coords = [row, item];
//                 allCoords.push(coords)
//             }
//         }
//     }
//
//     console.log(coords);
//
// };

var initial = [
    [0, 8, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 4, 3, 0, 0, 9, 8, 0],
    [3, 0, 1, 0, 0, 8, 7, 0, 0],
    [0, 1, 0, 5, 4, 0, 0, 6, 0],
    [0, 0, 0, 2, 9, 0, 4, 1, 0],
    [0, 4, 3, 0, 0, 6, 0, 9, 0],
    [0, 0, 8, 0, 0, 5, 0, 3, 0],
    [0, 6, 7, 0, 3, 9, 5, 0, 8],
    [1, 0, 5, 0, 8, 0, 0, 0, 0]
];

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
    let initPossibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let row = 0; row < 9; row++) {

        for (let item = 0; item < 9; item++) {
            if (matrix[row][item] === 0) {
                matrix[row][item] = initPossibleNumbers;
            }
        }
    }
    return matrix;
}

function checkRows (matrix) {
    //выбираем строку
    for (let row = 0; row < 9; row++) {
        let usedNumbers = [];


            // перебираем строку в поиске использованных чисел
        for (let item = 0; item < 9; item++) {
            if (typeof(matrix[row][item]) == 'number') {
                usedNumbers.push(matrix[row][item]);
            }
        }

        // снова перебираем строку
        for (let item = 0; item < 9; item++) {
            if (Array.isArray(matrix[row][item])) {
                // если нашли массив, сохраняем его в переменную
                let arrayItem = matrix[row][item];
                // ищем совпадения в arrayItem
                for (let i = 0; i < usedNumbers.length; i++) {
                    if (arrayItem.indexOf(usedNumbers[i]) !== -1) {
                        let index = arrayItem.indexOf(usedNumbers[i]);
                        arrayItem.splice(index, 1);

                        if (arrayItem.length > 1) {
                            matrix[row][item] = arrayItem;
                        } else {
                            matrix[row][item] = arrayItem[0];
                        }
                    }
                }

            }
        }
    }
    return matrix;
}



var matr = makePossibleNumbers(initial);
checkRows(matr);




