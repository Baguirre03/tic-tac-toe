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
    const formDiv = document.querySelector('.form-container')
    displayBtn.addEventListener('click', () => {
        formDiv.classList.toggle('active')
        displayGameBoard();
        playGame();
    })

    let restartBtn = document.querySelector('#restart-btn')
    restartBtn.addEventListener('click', () => {
        clearGameBoardObject();
        winnerDisplay.classList.toggle('active')
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
    const winnerDisplay = document.querySelector('.winner-display')
    const winnerText = document.querySelector('.winner')
    const playerWon = (winner, loser) => {
        winnerDisplay.classList.toggle('active')
        winnerText.textContent = `${winner} has won the game, sorry ${loser} maybe next time!`;
    }
    const playerTie = (player1, player2) => {
        winnerDisplay.classList.toggle('active')
        winnerText.textContent = `Wow ${player1} and ${player2}, its a tie! Next time someone has to win!`
    }

    return {playerWon, playerTie}
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
                    checkTie();
                } else if (inPlay === playerTwo.getName() && getLocation(div.dataset.boxNumber) === '') {
                    placeSpot(playerTwo, div.dataset.boxNumber, div)
                    inPlay = playerOne.getName();
                    checkWinner();
                    checkTie();
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
                displayGame.playerWon(playerOne.getName(), playerTwo.getName());
            } else if (winnerCombs[property].toString() === checkO) {
                playerWin = true;
                displayGame.playerWon(playerTwo.getName(), playerOne.getName());
            }
        }
    }
    
    const checkTie = () => {
        const fullArray = (array) => {return array != ''}
        if (gameBoard.gameBoardObject.every(fullArray)) {
            displayGame.playerTie(playerOne.getName(), playerTwo.getName())
        }
    }

    return {}
};