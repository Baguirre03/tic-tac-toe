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
        console.log(player.getName())
        console.log(player.getSymbol())
        let symbol = player.getSymbol();
        gameBoard.gameBoardObject[spot] = symbol
    }
    return {  }
})();
