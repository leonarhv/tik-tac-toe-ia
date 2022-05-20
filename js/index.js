const X = "X";
const O = "O";
let turn = O;
let tiles = [
    [document.querySelector("#tile_1"), document.querySelector("#tile_2"), document.querySelector("#tile_3")],
    [document.querySelector("#tile_4"), document.querySelector("#tile_5"), document.querySelector("#tile_6")],
    [document.querySelector("#tile_7"), document.querySelector("#tile_8"), document.querySelector("#tile_9")],
]

let hasWinner = false;

const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (tiles[i][j].textContent == '') {
                tiles[i][j].textContent = O;
                let score = minimax(tiles, 0, false);
                tiles[i][j].textContent = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    tiles[move.i][move.j].textContent = O;
    turn = X;
    checkWinner();
}

let scores = {
    'X': 1,
    'O': -1,
    'tie': 0
}

const minimax = (board, depth, isMaximizing) => {
    let result = simpleCheckWinner();
    if(result != null) {
        return scores[result];
    }

    if(isMaximizing) {
        return 1;
        let bestScore = -Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (board[i][j].textContent == '') {
                    board[i][j].textContent = O;
                    let score = minimax(board, depth + 1, false);
                    board[i][j].textContent = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (board[i][j].textContent == '') {
                    board[i][j].textContent = X;
                    let score = minimax(board, depth + 1, true);
                    board[i][j].textContent = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

const setTileContent = (event) => {
    if(!hasWinner) {
        if (event.target.textContent !== "") return;
        if (turn === X) {
            event.target.textContent = X;
            turn = O
        } else {
            event.target.textContent = O;
            turn = X;
        }
        checkWinner();
        bestMove();
    }
}

const checkWinner = () => {
    let isXWinner = false;
    let isOWinner = false;

    isXWinner = horizontalCheck(tiles, X) || verticalCheck(tiles, X) || diagonalCheck(tiles, X);
    isOWinner = horizontalCheck(tiles, O) || verticalCheck(tiles, O) || diagonalCheck(tiles, O);

    if(isXWinner) {
        document.querySelector("#winner_text").textContent = "O X foi o vencedor dessa partida";
        hasWinner = true;
        return O;
    }
    if(isOWinner) {
        document.querySelector("#winner_text").textContent = "O 'O' foi o vencedor dessa partida";
        hasWinner = true;
        return X;
    }

    if(isTie()) {
        document.querySelector("#winner_text").textContent = "Deu velha";
        return 'tie';
    }

    return null;
}

const simpleCheckWinner = () => {
    let isXWinner = false;
    let isOWinner = false;

    isXWinner = horizontalCheck(tiles, X) || verticalCheck(tiles, X) || diagonalCheck(tiles, X);
    isOWinner = horizontalCheck(tiles, O) || verticalCheck(tiles, O) || diagonalCheck(tiles, O);

    if(isXWinner) {
        return O;
    }
    if(isOWinner) {
        return X;
    }

    if(isTie()) {
        return 'tie';
    }

    return null;
}

const isTie = () => {
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (tiles[i][j].textContent == '') {
                return false;
            }
        }
    }
    return true;
}

const horizontalCheck = (tiles, TILE) => {
    for(let i=0; i<3; i++) {
        let sequence = 0;
        for(let j=0; j<3; j++) {
            if(tiles[i][j].textContent === TILE) {
                sequence += 1;
                if (sequence === 3) {
                    console.log('ganhou horizontal');
                    return true
                };
            }
        }
    }

    return false;

}

const verticalCheck = (tiles, TILE) => {
    for(let i=0; i<3;i++) {
        if(
            tiles[0][i].textContent === TILE &&
            tiles[1][i].textContent === TILE &&
            tiles[2][i].textContent === TILE
        ) {
            console.log('ganhou vertical');
            return true;
        }
    }


    return false;
}

const diagonalCheck = (tiles, TILE) => {
    if(
        tiles[0][0].textContent === TILE &&
        tiles[1][1].textContent === TILE &&
        tiles[2][2].textContent === TILE
    ) {
        console.log('ganhou diagonal');
        return true;
    }

    return false;
}

for (let i = 1; i <= 9; i++) {
    document.querySelector("#tile_" + i).addEventListener("click", setTileContent);
}

bestMove()