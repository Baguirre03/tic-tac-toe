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

    const clearGameBoardObject = () => {
        gameBoard.gameBoardObject = ['', '', '', '', '','','','','',]
    }

    const clearGameBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild)
        }
    }
})();

const playGame = () => {
    let playerOneName = document.getElementById('player1').value
    let playerOneSym = 'X'
    let playerOne = Players(playerOneName, playerOneSym);

    let playerTwoName = document.getElementById('player2').value
    let playerTwoSym = 'O'
    let playerTwo = Players(playerTwoName, playerTwoSym);

    let inPlay = playerOne.getName();

    const placeSpot = (player, spot, div) => {
        let symbol = player.getSymbol();
        div.textContent = symbol
        gameBoard.gameBoardObject[spot] = symbol
    }
    
    const getLocation = (location) => gameBoard.gameBoardObject[location];
    const board = document.querySelectorAll('div.box')
    let playerWin = false;

    board.forEach(div => {
        div.addEventListener('click', () => {
            if (playerWin) {
                return
            }
            if (inPlay === playerOne.getName() && getLocation(div.dataset.boxNumber) === '') {
                placeSpot(playerOne, div.dataset.boxNumber, div)
                    inPlay = playerTwo.getName();
                    checkWinner();
                } else if (inPlay === playerTwo.getName() && getLocation(div.dataset.boxNumber) === '') {
                    placeSpot(playerTwo, div.dataset.boxNumber, div)
                    inPlay = playerOne.getName();
                    checkWinner();
                }
            })
        });
    
    const checkWinner = () => {
        let winnerCombs = [
            [getLocation(0), getLocation(1), getLocation(2)],
            [getLocation(3), getLocation(4), getLocation(5)],
            [getLocation(6), getLocation(7), getLocation(8)],
            [getLocation(0), getLocation(3), getLocation(6)],
            [getLocation(1), getLocation(4), getLocation(7)],
            [getLocation(2), getLocation(5), getLocation(8)],
            [getLocation(0), getLocation(4), getLocation(8)],
            [getLocation(2), getLocation(4), getLocation(6)],
        ]
        
        let checkX = (['X', 'X', 'X']).toString();
        let checkO = (['O', 'O', 'O']).toString();

        for (const property in winnerCombs) {
            if (winnerCombs[property].toString() === checkX) {
                playerWin = true;
                playerWon(playerOne.getName(), playerTwo.getName());
            } else if (winnerCombs[property].toString() === checkO) {
                playerWin = true;
                playerWon(playerTwo.getName(), playerOne.getName());
            }
        }
    }   

    const playerWon = (winner, loser) => {
        const winnerDisplay = document.querySelector('.winner-display')
        winnerDisplay.classList.add('active')
        const winnerText = document.querySelector('.winner')
        winnerText.textContent = `${winner} has won the game, sorry ${loser} maybe next time!`;
    }

    return {}
};