var currentPlayer; 
var playerSquares;
const winningRows = {
    topHRow: [0, 1, 2],
    middleHRow: [3, 4, 5],
    bottomHRow: [6, 7, 8],
    leftVRow: [0, 3, 6],
    middleVRow: [1, 4, 7],
    rightVRow: [2, 5, 8],
    leftDiagRow: [0, 4, 8],
    rightDiagRow: [2, 4, 6],
}
var enableModal = new bootstrap.Modal($('div.modal').get(0));

const startGame = () => {
    currentPlayer = 'X';
    playerSquares = ['', '', '', '', '', '', '', '', ''];
    disableBoard();
    setBanner();
    $('#restart').html("Restart");
    $('div.cell').each( function ( index ) {            
        $( this ).html('');
        $( this ).click(() => {
            updateBoard(index);
        })
    })

}
const disableBoard = () => {
    $('div.cell').each( function ( index ) {            
        $( this ).off('click');
    })
}
const setBanner = () => {
    $('#playerBanner').html(currentPlayer + " Player's Turn");
}

$('#restart').click(() => {
    startGame();
});

$('#playAgain').click(() => {
    startGame();
    enableModal.hide();
});

const updateBoard = (index) => {
    let thisCell = $('#cell' + index);
    thisCell.html(currentPlayer);
    
    playerSquares[index] = currentPlayer;
    thisCell.off('click');
    if(checkForWinner()){
        endGame(currentPlayer);
    }
    if(!checkForDraw()) {
        endGame('Draw');
    }
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    setBanner();
}

const checkForWinner = () => {
    let playerWon = false;
    for(winningRow in winningRows) {
        let winRow = checkRow(winningRows[winningRow]);

        if(winRow.toString() === [currentPlayer, currentPlayer, currentPlayer].toString()) {
            playerWon = true;
            console.log(winRow);
            return playerWon;
        }
        
        
    }
    return playerWon;
}

const checkRow = (rowArray) => {
    let curRow = rowArray.map(i => playerSquares[i]);
    return curRow;
} 

const checkForDraw = () => {
    let availableSquare = false;
    playerSquares.forEach((e) => {
        if(e == '') {
            availableSquare = true;
        }
    })
    return availableSquare;
}

const endGame = (winner) => {
    let banner;
    if (winner == currentPlayer) {
        banner = `${currentPlayer} wins!`;
    }
    if (winner == 'Draw') {
        banner = `It's a Draw!`;
        $('#winHeader').html('Game Over!');
    }
    $('#playerBanner').html(banner);
    $('#winnerModal').html(banner);
    disableBoard();

    enableModal.show();
}