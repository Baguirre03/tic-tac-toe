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
    let clearGameBtn = document.querySelector('.restart-btn')
    let playerOneName = document.querySelector('#player1').value
    let playerTwoName = document.querySelector('#player2').value
    let playerOneSym = document.querySelector('#symbol1').value
    let playerTwoSym = document.querySelector('#symbol1').value

    const displayGameBoard = () => {
        let player1 = Players(playerOneName, playerOneSym)
        let player2 = Players(playerTwoName, playerTwoSym)

        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.classList.add('box')
            boardContainer.appendChild(div)
        //adds player1 
            div.addEventListener('click', () => {
                div.textContent = player1.getSymbol();
                placeSpot(player1, div.dataset.boxNumber)
            })
        }
    }

    let displayBtn = document.querySelector('#display-btn')
    displayBtn.addEventListener('click', () => {
        clearGameBoardObject();
        clearGameBoard();
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
        console.log(gameBoard.gameBoardObject)
    }
    return {    }
})();
