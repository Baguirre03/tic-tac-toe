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

    const displayGameBoard = () => {
        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.classList.add('box')
            boardContainer.appendChild(div)

            div.addEventListener('click', () => {
                div.textContent = player1.getSymbol();
            })
        }
    }
})();