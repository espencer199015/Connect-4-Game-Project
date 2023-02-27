//This is the number of of "blue" board tiles in rows and columns
const width = 7; //this shows how many columns
const height = 6; //this shows how many rows

let currPlayer = 1; //this establishes the player tokens
let board = []; //this establishes an empty array

//this function makes the board
function makeBoard() {
    for(let y = 0; y < height; y++) {
        board.push(Array.from({ length: width}));
    }
}
//board = [[1, 2, null], [null, null, null], [null, null, null]]
//this function starts the game played on the 
//board with clicks made on the top row (orange row)
function makeMainBoard() {
    const board = document.getElementById('board');
    const top = document.createElement('tr');
    top.setAttribute('id', 'topColumn');
    top.addEventListener('click', handleClick);

//this loop sets where the tokens go in accordance to the row
    for(let x=0; x < width; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
    }
//this connects the main board to the top row
    board.append(top);

//this loop sets where the tokens go in accordance to the column
    for (let y = 0; y < height; y++) {
        const row = document.createElement('tr');

//this loop sets the placement of the token to where it is to 
//display according to the row and column clicked.
        for(let x = 0; x < width; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell); //this connects the token to the row
        }

//this connects the row to the board       
        board.append(row);
    }
}

//this function makes sure the token is displayed on the board
function spotForCol(x) {
    for(let y = height - 1; y >= 0; y--) {
        if(!board[y][x]) {
            return y;
        }
    }
    return null;
}

//this function tells where the token is to placed 
//and that it is the current player's token that needs to be placed
function tablePlacement(y,x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

//this connects the player's token to that placement on the board
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

//this sends the message declaring 
//who the winner is with a drop down message
function endGame(msg) {
    alert(msg);
}

//this function identifies a click in a column as place to put 
//the token in that column
function handleClick(e) {
    const x = +e.target.id;
    const y = spotForCol(x);
    if (y === null) {
        return;
    }
    
//this connects the board and token placement to the current player
    board[y][x] = currPlayer;
    tablePlacement(y, x);

//This if statement  is for who won the game and the message sent 
//(current player wins) when a players hits 4 tokens in a row
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} WON!`);
    }

    //this if statement is for a tied game and the message sent
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }

    //this sets who goes first and second as well as to switch
    //between the two players
    currPlayer = currPlayer === 1 ? 2 : 1;
}

//this function checks the tokens displayed on the 
//board for wins or ties
function checkForWin() {
    function _win(cells) {
        return cells.every(  
            ([y, x]) => y >= 0 && y < height &&
            x >= 0 && x < width && board[y][x] === currPlayer
        );
    }

    //This for loop identifies tokens in a row on the board
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const horizontal = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vertical = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagonal1 = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagonal2 = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        
            //this if statement identifies the structure of a player's row
            //for the win (it be horizontal, vertical or diagnal in both 
            //directions on the board)
            if(_win(horizontal) || _win(vertical) || _win(diagonal1) || _win(diagonal2)) {
                return true;
            }
        }
    }
}

//these make the game a working function
makeBoard();
makeMainBoard();