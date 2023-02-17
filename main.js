const gameBoard = (() => {
    let gameBoardObject = [
        '', 
        'x', 
        'x', 
        'o', 
        'o',
        'o',
        'x',
        'x',
        'x'
    ]

    let displayBtn = document.querySelector('#display-btn')
    displayBtn.addEventListener('click', () => {
        displayGameBoard();
    })

    const displayGameBoard = () => {
        for (i = 0; i <= gameBoardObject.length; i++) {
            let container = document.querySelector('.game-board')
            let div = document.createElement('div')
            div.classList.add('box')
            container.appendChild(div)
            div.textContent = [gameBoardObject[i]]
            div.addEventListener('click', () => {
                // console.log('test')
            })
        }
    }
    return {
        gameBoardObject,
        displayGameBoard
    }
})();

const Player = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol
    return {
        getName, 
        getSymbol
    }
}

const playGame = (() => {
    gameBoard.displayGameBoard();
    let board = document.querySelectorAll('div.box')
    console.log(board)
    board.forEach(div => {
        div.addEventListener('click', () => {
            div.textContent = 'TEST'
        })
    })
})();