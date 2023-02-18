const gameBoard = (() => {
    let gameBoardObject = ['', '', '', '', '', '', '', '', '',]
    return {
        gameBoardObject,
    }
})();

const Players = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol

    return {
        getName, 
        getSymbol
    }
}

const playGame = () => {
    let playerOneName = document.getElementById('player1').value
    let playerOneSym = document.getElementById('symbol1').value
    let playerOne = Players(playerOneName, playerOneSym);

    let playerTwoName = document.getElementById('player1').value
    let playerTwoSym = document.getElementById('symbol1').value
    let playerTwo = Players(playerTwoName, playerTwoSym);

    const placeSpot = (player, spot, div) => {
        let symbol = player.getSymbol();
        div.textContent = symbol
        gameBoard.gameBoardObject[spot] = symbol
    }

    let playerOneTurn = 0
    let playerTwoTurn = 0

    let board = document.querySelectorAll('div.box')
    board.forEach(div => {
        div.addEventListener('click', () => {
            placeSpot(playerOne, div.dataset.boxNumber, div)
        })
    });
    return {}
};

const displayGame = (() => {
    let boardContainer = document.querySelector('.game-board')
    const displayGameBoard = () => {
        clearGameBoard();
        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.classList.add('box')
            boardContainer.appendChild(div)
        }
    }

    let displayBtn = document.querySelector('#display-btn')
    displayBtn.addEventListener('click', () => {
        displayGameBoard();
        playGame();
    })

    let clearGameBtn = document.querySelector('#restart-btn')
    clearGameBtn.addEventListener('click', () => {
        clearGameBoardObject();
        displayGameBoard(); 
        playGame();       
    })

    const clearGameBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild)
        }
    }

    const clearGameBoardObject = () => {
        gameBoard.gameBoardObject = ['', '', '', '', '','','','','',]
    }
})();