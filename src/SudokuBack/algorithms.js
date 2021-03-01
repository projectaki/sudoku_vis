
var finished = false;
var board = [];
var n = 9;
var result = [];

export const solve = (grid) => {
    let row = [];
    for(let i = 0; i < n*n; i++) {
        if(i%n === 8) {
            row.push(grid[i]);
            board.push(row);
            row = [];
        }
        else {
            row.push(grid[i]);
        }
    }
    recurse(0);
    const res = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            res.push(result[i][j]);
        }
    }
    return res;
}


export const recurse = (count) => {
    // start at 0, convert number to i,j mapping
    let i = Math.floor(count/n);
    let j = count % n;
    // if i = n then that means we have solved the board ( it only happens if we successfully fill out the last cell)
    // Print solution
    if (i === n) {
        finished = true;
        for (var c = 0; c < board.length; c++) {
            result[c] = board[c].slice();
        }
    }
    
    // If we have found a solution then any more calls to the solve function will do nothing
    if(!finished) {
        // Skip the already filled out cells
        if (board[i][j] === 0) {
            for (let k = 1; k <= n; k++) {
                if (isValid(i,j,k)) {
                    // optimization
                    board[i][j] = k;
                    recurse(count + 1);
                }
            }
            board[i][j] = 0;
        }
        else {
            recurse(count + 1);
        }
    }
    

    
}

export const isValid = (i, j, numb) => {
    return boxSafe(i,j,numb) && rowSafe(i,numb) && colSafe(j,numb);
}


export const boxSafe = (i, j, numb) => {
    let smallN = Math.sqrt(n);
    let startI;
    let startJ;
    if (i % smallN === 0) startI = (floor(i/smallN))*smallN;
    else startI = floor(i/smallN) * smallN;
    if (j % smallN === 0) startJ = (floor(j/smallN))*smallN;
    else startJ = floor(j/smallN) * smallN;

    for (let k = startI; k < startI + smallN; k++) {
        for (let l = startJ; l < startJ + smallN; l++) {
            if (board[k][l] === numb) return false;
        }
    }
    return true;
}


export const rowSafe = (i, numb) => {

    for (let j = 0; j < n; j++) {
        if (board[i][j] === numb) return false;
    }
    return true;

}


export const colSafe = (j, numb) => {
    for (let i = 0; i < n; i++) {
        if (board[i][j] === numb) return false;
    }
    return true;
}

function floor(num) {
    return Math.floor(num);
}