module.exports = function solveSudoku(matrix) {
    // your solution
    var copyMatrix = [];
    var copyNumberOfZeros = [];
    var copySelectedNumber = [];
    var copyRow = [];
    var copyItem = [];

    var numberOfZeros = countZeros(matrix);
    var a = makePossibleNumbers(matrix);
    while (numberOfZeros > 0) {

        var changes = 0;

        a = checkRows(a);
        a = checkCols(a);
        a = checkBlocks(a);
        a = findDoublesPerRow(a);
        a = findDoublesPerCol(a);
        a = findDoublesPerBlock(a);
        findSameNumbersInRow();
        findSameNumbersInCol();

        if (changes == 0) {
            a = findUniquesPerRow(a);
            if (changes == 0) {
                a = findUniquesPerCol(a);
                if (changes == 0) {
                    a = backtracking(a);
                }
            }
        }
    }
     return a;

    function copySudoku(matrix) {
        let copy = [];
        for (let row = 0; row < 9; row++) {
            let temp = matrix[row].slice();
            copy.push(temp);
        }
        return copy;
    }

    function backtracking(matrix) {
        copyMatrix.push(copySudoku(matrix));
        for (let row = 0; row < 9; row++) {
            for (let item = 0; item < 9; item++) {
                if (typeof (matrix[row][item]) !== 'number') {
                    let tempItem = matrix[row][item].split(',');
                    if (tempItem.length == 2) {
                        matrix[row][item] = +tempItem[0];
                        copySelectedNumber.push(+tempItem[0]);
                        copyRow.push(row);
                        copyItem.push(item);
                        numberOfZeros = countZeros(matrix);
                        copyNumberOfZeros.push(numberOfZeros);
                        return matrix;
                    }
                }
            }
        }
    }

    function findSameNumbersInRow() {
        for (let row = 0; row < 9; row++) {
            for (let item = 0; item < 9; item++) {
                if (typeof (a[row][item]) == 'number') {
                    let tempItem = a[row][item];

                    for (let i = item + 1; i < 9; i++) {
                        if (tempItem == a[row][i] || tempItem == 0) {
                            a = toThePreviousStep(a);
                            return a;
                        }
                    }
                }
            }
        }
    };

    function findSameNumbersInCol() {
    for (let item = 0; item < 9; item++) {
        for (let row = 0; row < 9; row++) {
            if (typeof (a[row][item]) == 'number') {
                let tempItem = a[row][item];

                for (let i = row + 1; i < 9; i++) {
                    if (tempItem == a[i][item] || tempItem == 0) {
                        a = toThePreviousStep(a);
                        return a;
                    }
                }
            }
        }
    }
};

    function toThePreviousStep(matrix) {
        matrix = copyMatrix.pop();
        numberOfZeros = copyNumberOfZeros.pop();

        let c = copyRow.pop();
        let b = copyItem.pop();
        let d = copySelectedNumber.pop();
        let tempItem = matrix[c][b].split(',');
        let index = tempItem.indexOf(d + '');
        if (index == tempItem.length - 1) {
            a = toThePreviousStep(a);
        } else {
            matrix[c][b] = +tempItem[index + 1];
        }
        return matrix;
    }

    function findUniquesPerCol(matrix) {
        for (let item = 0; item < 9; item++) {

            for (let row = 0; row < 9; row++) {
                if (typeof (matrix[row][item]) !== 'number') {
                    let tempItem = matrix[row][item].split(',');

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
                            numberOfZeros = countZeros(matrix);;
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
                            numberOfZeros = countZeros(matrix);;
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
                count = 1;
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
                                    numberOfZeros = countZeros(matrix);;
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
                        if (tempItem == nextItem) {
                            count++;
                            if (count > 1 && tempItem.split(',').length == count) {
                                let usedNumbers = tempItem.split(',');

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
                                            numberOfZeros = countZeros(matrix);
                                            changes++;
                                        } else {
                                            matrix[row][item] = tempArray.join(',');
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

            for (let item = 0; item < 9; item++) {
                let count = 1;
                if (typeof (matrix[row][item]) !== 'number') {
                    let tempItem = matrix[row][item];

                    for (let i = item + 1; i < 9; i++) {
                        if (tempItem == matrix[row][i]) {
                            count++;
                            if (count > 1 && tempItem.split(',').length == count) {
                                let usedNumbers = tempItem.split(',');

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
                                            numberOfZeros = countZeros(matrix);
                                            changes++;
                                        } else {
                                            matrix[row][item] = tempArray.join(',');
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
                }
            }
        }
        return matrix;
    };

    function countZeros(matrix) {
        let zeros = 0;
        for (let row = 0; row < 9; row++) {
            for (let item = 0; item < 9; item++) {
                if (typeof (matrix[row][item]) !== 'number' || matrix[row][item] == 0) {
                    zeros++;
                }
            }
        }
        return zeros;
    };

    function checkRows(matrix) {

        for (let row = 0; row < 9; row++) {
            let usedNumbers = [];

            for (let item = 0; item < 9; item++) {
                if (typeof (matrix[row][item]) == 'number') {
                    usedNumbers.push(matrix[row][item]);
                }
            }

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
                        numberOfZeros = countZeros(matrix);;
                        changes++;
                    } else {
                        matrix[row][item] = tempArray.join(',')
                    }
                }
            }
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
                        numberOfZeros = countZeros(matrix);;
                        changes++;
                    } else {
                        matrix[row][item] = tempArray.join(',')
                    }
                }
            }
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
                                numberOfZeros = countZeros(matrix);;
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