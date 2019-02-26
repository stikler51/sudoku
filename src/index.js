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
makeUsedNumbers(a);
//makeUsedNumbers(a);



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

function makeUsedNumbers (matrix) {

    for (let row = 0; row < 9; row++ ) {

        let usedNumbers = [];
        for (let item = 0; item < 9; item++) {
            if (typeof(matrix[row][item]) == 'number') {
                usedNumbers.push(matrix[row][item])
            }
        }
        //console.log ('used' + ' ' + usedNumbers);

        for (let item = 0; item < 9 ; item++) {

             if (Array.isArray(matrix[row][item])) {
                 matrix[row][item].push('yo');
                 console.log(matrix[row]);

                 //console.log('item' + ' ' + item);
                 //let currentItem = matrix[row][item];
                 //console.log(currentItem);
                 //matrix[row][item].push('yo'+ item);


                 //console.log(matrix[row])
             }
        }
        break;
        // console.log (matrix);

    }
}

// function checkRows (matrix) {
//     //выбираем строку
//     for (let row = 0; row < 9; row++) {
//         let usedNumbers = [];
//
//
//             // перебираем строку в поиске использованных чисел
//         for (let item = 0; item < 9; item++) {
//             if (typeof(matrix[row][item]) == 'number') {
//                 usedNumbers.push(matrix[row][item]);
//             }
//         }
//         console.log ('used ' + usedNumbers);
//
//         // снова перебираем строку
//         for (let item = 0; item < 9; item++) {
//             if (Array.isArray(matrix[row][item])) {
//                 // если нашли массив, сохраняем его в переменную
//                 let arrayItem = matrix[row][item];
//                 // ищем совпадения в arrayItem и usedNumbers
//                 for (let i = 0; i < usedNumbers.length; i++) {
//                     if (arrayItem.indexOf(usedNumbers[i]) !== -1) {
//                         let index = arrayItem.indexOf(usedNumbers[i]); // находим индекс совпадения
//                         arrayItem.splice(index, 1); // удаляем число
//                         console.log(arrayItem)
//
//                         // если в массиве остались числа
//                         if (arrayItem.length > 1) {
//                             // записываем массив в ячейку
//                             matrix[row][item] = arrayItem[0];
//
//                         } else {
//                             // если осталось только одно число в массиве - записываем его в ячейку
//                             matrix[row][item] = arrayItem;
//                         }
//                     }
//                     console.log('--------------');
//                     console.log(matrix);
//                 }
//
//             }
//         }
//     }
//     return matrix;
// }

// function checkCols (matrix) {
//     //выбираем столбец
//     for (let item = 0; item < 9; item++) {
//         let usedNumbers = [];
//
//
//         // перебираем столбец в поиске использованных чисел
//         for (let row = 0; row < 9; row++) {
//             if (typeof(matrix[row][item]) == 'number') {
//                 usedNumbers.push(matrix[row][item]);
//             }
//         }
//
//         // снова перебираем столбец
//         for (let row = 0; row < 9; row++) {
//             if (Array.isArray(matrix[row][item])) {
//                 // если нашли массив, сохраняем его в переменную
//                 let arrayItem = matrix[row][item];
//                 // ищем совпадения в arrayItem и usedNumbers
//                 for (let i = 0; i < usedNumbers.length; i++) {
//                     if (arrayItem.indexOf(usedNumbers[i]) !== -1) {
//                         let index = arrayItem.indexOf(usedNumbers[i]); // находим индекс совпадения
//                         arrayItem.splice(index, 1); // удаляем число
//
//                         // если в массиве остались числа
//                         if (arrayItem.length > 1) {
//                             // записываем массив в ячейку
//                             matrix[row][item] = arrayItem;
//
//                         } else {
//                             // если осталось только одно число в массиве - записываем его в ячейку
//                             matrix[row][item] = arrayItem[0];
//
//                         }
//                     }
//                 }
//
//             }
//         }
//     }
//     return matrix;
// }





