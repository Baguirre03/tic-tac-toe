const gameBoard = (() => {
    let gameBoardObject = [
        '', 
        '', 
        '', 
        '', 
        '',
        '',
        '',
        '',
        '',
    ]
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

const playGame = (() => {


    let boardContainer = document.querySelector('.game-board')

    const displayGameBoard = () => {
        clearGameBoardObject();
        clearGameBoard();

        let playerOneName = document.getElementById('player1').value
        let playerOneSym = document.getElementById('symbol1').value
        let playerOne = Players(playerOneName, playerOneSym);
        
        let playerTwoName = document.getElementById('player1').value
        let playerTwoSym = document.getElementById('symbol1').value
        let playerTwo = Players(playerTwoName, playerTwoSym);

        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.classList.add('box')
            boardContainer.appendChild(div)

            div.addEventListener('click', () => {
                div.textContent = playerOne.getSymbol();
                placeSpot(playerOne, div.dataset.boxNumber)
            })
        }
    }

    let displayBtn = document.querySelector('#display-btn')
    displayBtn.addEventListener('click', () => {
        displayGameBoard();
    })

    let clearGameBtn = document.querySelector('#restart-btn')
    clearGameBtn.addEventListener('click', () => {
        displayGameBoard();        
    })

    const clearGameBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild)
        }
    }

    const clearGameBoardObject = () => {
        gameBoard.gameBoardObject = ['', '', '', '', '','','','','',]
    }
    
    const placeSpot = (player, spot) => {
        let symbol = player.getSymbol();
        gameBoard.gameBoardObject[spot] = symbol
    }
    return {  }
})();
