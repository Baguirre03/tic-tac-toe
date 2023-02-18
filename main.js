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
    let player1 = Players('player1', 'x')
    let player2 = Players('player2', 'y')
    let boardContainer = document.querySelector('.game-board')

    const displayGameBoard = () => {
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
        clearGameBoard();
        displayGameBoard();
        displayBtn.textContent = 'Restart Game'
    })

    const clearGameBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild)
        }
    }
    
    const placeSpot = (player, spot) => {
        let symbol = player.getSymbol();
        gameBoard.gameBoardObject[spot] = symbol
        console.log(gameBoard.gameBoardObject)
    }
    return {    }
})();
