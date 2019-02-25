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
    [5, 3, 4, 6, 7, 8, 9, 0, 0],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

var a = initial[0][8];



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

    console.log(getCoords(initial));
