module.exports = function solveSudoku(matrix) {
    // your solution

    // var matrix = [
    //     [0, 5, 0, 0, 7, 0, 0, 0, 1],
    //     [8, 7, 6, 0, 2, 1, 9, 0, 3],
    //     [0, 0, 0, 0, 3, 5, 0, 0, 0],
    //     [0, 0, 0, 0, 4, 3, 6, 1, 0],
    //     [0, 4, 0, 0, 0, 9, 0, 0, 2],
    //     [0, 1, 2, 0, 5, 0, 0, 0, 4],
    //     [0, 8, 9, 0, 6, 4, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 7, 0, 0, 0],
    //     [1, 6, 7, 0, 0, 2, 5, 4, 0]
    // ];
    var numberOfZeros = 0;

    var a = makePossibleNumbers(matrix);

    while (numberOfZeros > 0) {
        var changes = 0;

        a = checkRows(a);
        a = checkCols(a);
        a = checkBlocks(a);
        a = findDoublesPerRow(a);
        a = findDoublesPerCol(a);
        a = findDoublesPerBlock(a);


        if (changes == 0) {
            a = findUniquesPerRow(a);
            if (changes == 0) {
                a = findUniquesPerCol(a);
            }
        }
        // console.log(a);
    }


    return a;

    function findUniquesPerCol(matrix) {
        for (let item = 0; item < 9; item++) {

            for (let row = 0; row < 9; row++) {

                if (typeof (matrix[row][item]) !== 'number') {

                    let tempItem = matrix[row][item].split(',');
                    //console.log(tempItem);
                    for (let j = 0; j < tempItem.length; j++) {
                        let count = 0;
                        for (let r = 0; r < 9; r++) {

                            if (r == row) {
                                continue;
                            }

                            if (typeof (matrix[r][item]) !== 'number') {

                                let tempArray = matrix[r][item].split(',');

                                let index = tempArray.indexOf(tempItem[j] + "");
                                if (index !== -1) {
                                    continue;
                                }
                                count++;
                            } else {
                                count++;
                            }

                        }

                        if (count == 8) {
                            matrix [row][item] = +tempItem[j];
                            numberOfZeros--;
                            break;
                        }
                    }
                }
            }
        }

        return matrix;
    }

    function findUniquesPerRow(matrix) {
        for (let row = 0; row < 9; row++) {

            for (let item = 0; item < 9; item++) {

                if (typeof (matrix[row][item]) !== 'number') {

                    let tempItem = matrix[row][item].split(',');
                    //console.log(tempItem);
                    for (let j = 0; j < tempItem.length; j++) {
                        let count = 0;
                        for (let i = 0; i < 9; i++) {

                            if (i == item) {
                                continue;
                            }

                            if (typeof (matrix[row][i]) !== 'number') {

                                let tempArray = matrix[row][i].split(',');

                                let index = tempArray.indexOf(tempItem[j] + "");
                                if (index !== -1) {
                                    continue;
                                }
                                count++;
                            } else {
                                count++;
                            }

                        }

                        if (count == 8) {
                            matrix [row][item] = +tempItem[j];
                            changes++;
                            numberOfZeros--;
                            break;
                        }
                    }
                }
            }
        }

        return matrix;
    }


    function findDoublesPerBlock(matrix) {
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
            //console.log(usedNumbers);
            matr = blocks(matrix, r, blockRow, b, blockCol, usedNumbers);

            if (blockRow >= 9 && blockCol >= 9) {
                break;
            }

            blockCol += 3;
            item += 3;
            if (blockCol > 9) {
                blockCol = 3;
                blockRow += 3;
                row += 3;
                item = 0;
            }

        }
        return matr;

        function makeUsedNumbers(matrix, rowStart, rowEnd, colStart, colEnd) {
            let usedDoubles = [];
            let usedNumbers = [];
            let rowSt = rowStart;
            let rowE = rowEnd;
            let colE = colEnd;
            let count = 1;

            for (rowSt; rowSt < rowE; rowSt++) {

                let item = colStart;
                for (item; item < colE; item++) {


                    let tempItem = matrix[rowSt][item];
                    if (typeof (matrix[rowSt][item]) !== 'number') {
                        usedDoubles.push(tempItem);
                    }
                }
            }

            for (let i = 0; i < usedDoubles.length; i++) {
                for (let j = i + 1; j < usedDoubles.length; j++) {
                    if (usedDoubles[i] == usedDoubles[j]) {
                        count++;
                        let temp = usedDoubles[i];
                        temp = temp.split(',');
                        //console.log(usedDoubles[i].split(','));
                        usedNumbers.push(temp);
                        if (usedNumbers[usedNumbers.length - 1].length !== count) {
                            usedNumbers.splice(usedNumbers.length - 1, 1);
                            count = 1;
                        }
                        //console.log(usedNumbers);
                    }
                }
            }
            //console.log(usedNumbers);
            return usedNumbers;
        }

        function blocks(matrix, rowStart, rowEnd, colStart, colEnd, usedNumbers) {
            let rowSt = rowStart;
            let rowE = rowEnd;
            let colE = colEnd;
            for (rowSt; rowSt < rowE; rowSt++) {
                item = colStart;
                for (item; item < colE; item++) {
                    if (typeof (matrix[rowSt][item]) !== 'number') {
                        let tempArray = matrix[rowSt][item].split(',');

                        for (let i = 0; i < usedNumbers.length; i++) {
                            // console.log(tempArray + '');
                            // console.log(usedNumbers[i]+'');
                            // console.log('-----------------------');
                            if (tempArray + '' == usedNumbers[i] + '') {
                                continue;
                            }
                            for (let j = 0; j < usedNumbers[i].length; j++) {
                                let index = tempArray.indexOf(usedNumbers[i][j]);
                                if (index == -1) {
                                    continue;
                                }
                                tempArray.splice(index, 1);
                                if (tempArray.length == 1) {
                                    matrix[rowSt][item] = +tempArray[0];
                                    numberOfZeros--;
                                    changes++;
                                } else {
                                    matrix[rowSt][item] = tempArray.join(',')

                                }
                            }

                        }
                    }
                }
            }
            item = colStart;
            return matrix;
        }

    }


    function findDoublesPerCol(matrix) {
        for (let item = 0; item < 9; item++) {

            for (let row = 0; row < 9; row++) {
                let count = 1;
                if (typeof (matrix[row][item]) !== 'number') {

                    let tempItem = matrix[row][item];
                    let nextItem = 0;
                    for (let i = row + 1; i < 9; i++) {
                        nextItem = matrix[i][item];
                        if (tempItem == nextItem) { //есть сомнения
                            count++;
                            //console.log(tempItem + ' row: ' + row + ' item:' + item + ' | ' + matrix[row][i] + ' row: ' + row + ' item:' + i);

                            if (count > 1 && tempItem.split(',').length == count) {
                                let usedNumbers = tempItem.split(',');

                                //-----------------------------------------------------------------------------------------------

                                for (let row = 0; row < 9; row++) {

                                    if (typeof (matrix[row][item]) !== 'number') {

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
                                            changes++;
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

    function findDoublesPerRow(matrix) {
        for (let row = 0; row < 9; row++) {
            let count = 1;
            for (let item = 0; item < 9; item++) {

                if (typeof (matrix[row][item]) !== 'number') {

                    let tempItem = matrix[row][item];

                    for (let i = item + 1; i < 9; i++) {
                        if (tempItem == matrix[row][i]) {
                            count++;
                            //console.log(tempItem + ' row: ' + row + ' item:' + item + ' | ' + matrix[row][i] + ' row: ' + row + ' item:' + i);

                            if (count > 1 && tempItem.split(',').length == count) {
                                let usedNumbers = tempItem.split(',');

                                //-----------------------------------------------------------------------------------------------

                                for (let item = 0; item < 9; item++) {

                                    if (typeof (matrix[row][item]) !== 'number') {

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
                                            changes++;
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


    function makePossibleNumbers(matrix) {
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

    function checkRows(matrix) {

        for (let row = 0; row < 9; row++) {

            let usedNumbers = [];
            for (let item = 0; item < 9; item++) {

                if (typeof (matrix[row][item]) == 'number') {
                    usedNumbers.push(matrix[row][item]);
                }
            }
            //console.log (usedNumbers);

            for (let item = 0; item < 9; item++) {

                if (typeof (matrix[row][item]) !== 'number') {

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
                        changes++;
                    } else {
                        matrix[row][item] = tempArray.join(',')
                    }

                }
            }
            //console.log (matrix);
        }
        return matrix;
    }

    function checkCols(matrix) {

        for (let item = 0; item < 9; item++) {

            let usedNumbers = [];
            for (let row = 0; row < 9; row++) {

                if (typeof (matrix[row][item]) == 'number') {
                    usedNumbers.push(matrix[row][item]);
                }
            }
            // console.log ('-------------------------');
            // console.log (usedNumbers);
            // console.log ('-------------------------');

            for (let row = 0; row < 9; row++) {

                if (typeof (matrix[row][item]) !== 'number') {

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
                        changes++;
                    } else {
                        matrix[row][item] = tempArray.join(',')
                    }

                }

            }
            //console.log (matrix);
        }
        return matrix;
    }

    function checkBlocks(matrix) {

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


        function makeUsedNumbers(matrix, rowStart, rowEnd, colStart, colEnd) {
            let usedNumbers = [];
            let rowSt = rowStart;
            let rowE = rowEnd;
            let colE = colEnd;
            for (rowSt; rowSt < rowE; rowSt++) {
                item = colStart;
                for (item; item < colE; item++) {
                    if (typeof (matrix[rowSt][item]) == 'number') {
                        usedNumbers.push(matrix[rowSt][item]);
                    }
                }
            }
            return usedNumbers;
        }

        function blocks(matrix, rowStart, rowEnd, colStart, colEnd, usedNumbers) {

            let rowSt = rowStart;
            let rowE = rowEnd;
            let colE = colEnd;
            for (rowSt; rowSt < rowE; rowSt++) {
                item = colStart;
                for (item; item < colE; item++) {
                    if (typeof (matrix[rowSt][item]) !== 'number') {
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
                                changes++;
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
}
// https://habr.com/ru/post/134071/