const X = "X";
const O = "O";
let turn = X;
let tiles = [
    [document.querySelector("#tile_1"), document.querySelector("#tile_2"), document.querySelector("#tile_3")],
    [document.querySelector("#tile_4"), document.querySelector("#tile_5"), document.querySelector("#tile_6")],
    [document.querySelector("#tile_7"), document.querySelector("#tile_8"), document.querySelector("#tile_9")],
]

let hasWinner = false;

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
    }
}

const checkWinner = () => {
    let isXWinner = false;
    let isOWinner = false;

    isXWinner = horizontalCheck(tiles, X) || verticalCheck(tiles, X) || diagonalCheck(tiles, X);
    console.log(diagonalCheck(tiles, X));
    isOWinner = horizontalCheck(tiles, O) || verticalCheck(tiles, O) || diagonalCheck(tiles, O);

    if(isXWinner) {
        document.querySelector("#winner_text").textContent = "O X foi o vencedor dessa partida";
        hasWinner = true;
    }
    if(isOWinner) {
        document.querySelector("#winner_text").textContent = "O 'O' foi o vencedor dessa partida";
        hasWinner = true;
    }
}

const horizontalCheck = (tiles, TILE) => {
    for(let i=0; i<3; i++) {
        let sequence = 0;
        for(let j=0; j<3; j++) {
            if(tiles[i][j].textContent === TILE) {
                sequence += 1;
                if (sequence === 3) return true;
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
        return true;
    }

    return false;
}

for (let i = 1; i <= 9; i++) {
    document.querySelector("#tile_" + i).addEventListener("click", setTileContent);
}