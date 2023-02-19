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

    let playerTwoName = document.getElementById('player2').value
    let playerTwoSym = document.getElementById('symbol2').value
    let playerTwo = Players(playerTwoName, playerTwoSym);

    const placeSpot = (player, spot, div) => {
        let symbol = player.getSymbol();
        div.textContent = symbol
        gameBoard.gameBoardObject[spot] = symbol
    }

    let inPlay = playerOne.getName();
    console.log(inPlay)

    let board = document.querySelectorAll('div.box')
    board.forEach(div => {
        div.addEventListener('click', () => {
            console.log(inPlay)
            if (inPlay === playerOne.getName()) {
                placeSpot(playerOne, div.dataset.boxNumber, div)
                inPlay = playerTwo.getName();
            } else {
                placeSpot(playerTwo, div.dataset.boxNumber, div)
                inPlay = playerOne.getName();
            }
        })
    });
    let checkWinner = () => {
        let winnerCombs = [               
            [0, 1, 2],
            [3,4,5],
            [6,7,8]
        ]
        let newArray = gameBoard.gameBoardObject.map(x => x)
        console.log(newArray)
    }
    return {}
};

const displayGame = (() => {
    let boardContainer = document.querySelector('.game-board')
    const displayGameBoard = () => {
        clearGameBoard();
        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            // div.textContent = i;
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