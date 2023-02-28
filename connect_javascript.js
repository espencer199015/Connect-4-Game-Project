//This is the number of "blue" board tiles in rows and columns
const width = 7; //this shows how many columns
const height = 6; //this shows how many rows

let currPlayer = 1; //this establishes the players
let board = []; //this establishes the board is an empty array

//this function makes the board
function makeBoard() {
    for(let y = 0; y < height; y++) { //this is a for loop that goes through the columns, 
                                     //starting at the first column (with the index of 0)
        board.push(Array.from({ length: width})); //this makes each cell of the board an array
    }
} //board = [[1, 2, null], [null, null, null], [null, null, null]]


//this function makes the top row (orange, dotted row) of the board where the player clicks to place their game token on the board
function makeMainBoard() {
    const board = document.getElementById('board'); //this declares the variable ('board') and connects it to the html tag id 'board'
    const top = document.createElement('tr'); //this declares the variable ('top') and creates the html tag ('tr') for the top row. It aso connects the html tag and variable. 
    top.setAttribute('id', 'topRow'); //this assigns the html tags (the tags that are connected to the 
                                        //declared variables in this function) to the top row (orange, dotted row)
    top.addEventListener('click', handleClick); //this signals that each cell on the top row (orange, dotted row) can be clicked on

//this for loop sets where the tokens go on the board in accordance to the cell clicked on the top row
    for(let x=0; x < width; x++) {//this goes through the board starting with the first column
        const headCell = document.createElement('td'); //this declares the variable ('headCell') and creates the html tag ('td'). It aso connects the html tag and variable. 
        headCell.setAttribute('id', x); //this assigns the html tags (the tags that are connected to the declared variables in this for loop)
                                       //to the columns
        top.append(headCell);     //this connects the the declared variable ('headCell') to the html tag, 'tr' and to the top row.
    }
//this connects the main board's rows and columns to the top row
    board.append(top);

//this for loop sets where the tokens go in accordance to the row
    for (let y = 0; y < height; y++) { //this is a for loop that goes through the rows
        const row = document.createElement('tr'); //this declares the variable ('row') and creates the html tag ('tr'). It aso connects the html tag and variable. 

//this for loop sets the placement of the token to where it is to 
//display according to the row and column clicked.
        for(let x = 0; x < width; x++) { //this is a for loop that goes through the columns
            const cell = document.createElement('td'); //this declares the variable ('cell') and creates the html tag ('td'). It aso connects the html tag and variable. 
            cell.setAttribute('id', `${y}-${x}`); //this connects the 'cell' variable to the html tag and to the row and column location
            row.append(cell); //this connects the variable, 'cell' to the variable 'row'
        }

//this connects the variable row to the variable board       
        board.append(row);
    }
}

//this function makes sure the token is displayed on the board
function spotForCol(x) { //this is declaring the function (spotForCol) and the parameter x (columns)
    for(let y = height - 1; y >= 0; y--) { //this for loop goes through the rows
        if(!board[y][x]) { //this if statement has the condition that each row is an array and the first column is an array of arrays
            return y; //the row needs to be returned
        }
    }
    return null; //if the elements do not fit the function void the elements
}

//this function tells where the token is to placed 
//and that it is the current player's token that needs to be placed
function tablePlacement(y,x) { //this declares the function ('tablePlacement') and the parameters x and y (columns and rows)
    const piece = document.createElement('div'); //this declares the variable ('piece') and creates the html tag ('div'). It aso connects the html tag and variable. 
    piece.classList.add('piece'); //this adds the piece to the game
    piece.classList.add(`p${currPlayer}`); //this connects the piece to the current player
    piece.style.top = -50 * (y + 2); //this styles 2 pieces that will be played by 2 players

//this connects the player's piece to that placement on the board
    const spot = document.getElementById(`${y}-${x}`); //this declares the variable ('spot') and connects it to the element (`${y}-${x}`)
    spot.append(piece); //connects the variable ('spot') to the variable ('piece')
}

//this signals when the game ends to send a message to the players
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