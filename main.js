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

const gameFlowController = (() => {
    let gameBoardObject = ['', '', '', '', '', '', '', '', '',]

    const editBoardArray = (player, spot) => {
        let symbol = player.getSymbol();
        gameBoardObject[spot] = symbol
    }


    return {
        editBoardArray
    }
})();

const DomController = (() => {
    const board = document.querySelectorAll('div.box')
    let boardContainer = document.querySelector('.game-board')

    const formDiv = document.querySelector('.form-container')
    const playersTop = document.querySelector('.in-play')
    const input1 = document.querySelector('#player1')
    const input2 = document.querySelector('#player2')
    const alertDiv = document.querySelector('.alert')

    const displayBtn = document.querySelector('#display-btn')
    displayBtn.addEventListener('click', () => {
        displayAll();
    })
    addEventListener('keypress', (e) => {
        if (e.code === 'Enter' && !formDiv.classList.contains('active')) {
            displayAll();
        }
    })

    const clearGameBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.firstChild)
        }
    }

    const displayGameBoard = () => {
        clearGameBoard();
        boardContainer.classList.add('active')
        for (i = 0; i < gameBoard.gameBoardObject.length; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.classList.add('box')
            boardContainer.appendChild(div)
        }
    }

    const displayAll = () => {
        if (input1.value == '' || input2.value == '') {
            alertDiv.textContent = 'Please enter both names!'
            return
        } else if (input1.value === input2.value) {
            alertDiv.textContent = 'Please put different names!'
            return
        }
        formDiv.classList.toggle('active')
        displayGameBoard();
        playersTop.classList.toggle('active')
    }

    //BOT commands
    const botBtn = document.querySelector('#bot-btn')
    const botForm = document.querySelector('.bot-form')
    const returnBtn = document.querySelector('#return')
    const startBot = document.querySelector('#start-bot')

    botBtn.addEventListener('click', () => {
        botForm.classList.toggle('active')
        formDiv.classList.toggle('active')
    })
    returnBtn.addEventListener('click', () => {
        formDiv.classList.toggle('active')
        botForm.classList.toggle('active')
    })
    startBot.addEventListener('click', () => {
        botForm.classList.toggle('active')
        displayGameBoard();
        playersTop.classList.toggle('active')
    })
    const newGameBtn = document.querySelector('#new-game')
    newGameBtn.addEventListener('click', () => {
        location.reload();
    })
    const restartBtn = document.querySelector('#restart-btn')
    restartBtn.addEventListener('click', () => {
        winnerDisplay.classList.toggle('active')
        boardContainer.classList.remove('active')
        displayGameBoard(); 
    })

    //Winner Displays:
    const winnerDisplay = document.querySelector('.winner-display')
    const winnerText = document.querySelector('.winner')

    const playerWon = (winner, loser) => {
        winnerDisplay.classList.toggle('active')
        winnerText.textContent = `${winner} you win! Sorry ${loser} maybe next time!`;
    }
    const playerTie = (player1, player2) => {
        winnerDisplay.classList.toggle('active')
        winnerText.textContent = `${player1} and ${player2}, its a tie! Next time someone better to win!`
    }

    return {
        playerWon,
        playerTie
    }
})();

const displayGame = () => {
    //After gameboard displays commands
    const clearGameBoardObject = () => {
        gameBoard.gameBoardObject = ['', '', '', '', '','','','','',]
    }

};



const playGame = () => {
    let playerOneName = document.getElementById('player1').value
    let playerOneSym = 'X'
    let playerOne = Players(playerOneName, playerOneSym);

    let playerTwoName = document.getElementById('player2').value
    let playerTwoSym = 'O'
    let playerTwo = Players(playerTwoName, playerTwoSym);

    //Display Names above board
    const playerOneDisplay = document.querySelector('.player-1')
    const playerTwoDisplay = document.querySelector('.player-2')
    playerOneDisplay.textContent = `${playerOneName} : X`
    playerTwoDisplay.textContent = `${playerTwoName} : O`
    playerOneDisplay.classList.add('active')
    playerTwoDisplay.classList.remove('active')

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
                    playerHighlightTwo();
                    checkWinner();
                    checkTie();
                } else if (inPlay === playerTwo.getName() && getLocation(div.dataset.boxNumber) === '') {
                    placeSpot(playerTwo, div.dataset.boxNumber, div)
                    inPlay = playerOne.getName();
                    playerHighlightOne();
                    checkWinner();
                    checkTie();
                }
            })
        });
    
    const playerHighlightOne = () => {
        playerTwoDisplay.classList.toggle('active')
        playerOneDisplay.classList.toggle('active')
    }
    const playerHighlightTwo = () => {
        playerOneDisplay.classList.toggle('active')
        playerTwoDisplay.classList.toggle('active')
    }
    
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

const playBot = () => {
    let playerOneName = document.getElementById('player3').value
    let playerOneSym = 'X'
    let playerOne = Players(playerOneName, playerOneSym);

    let botName = document.getElementById('player-bot').textContent
    let botSymbol = 'O'
    let bot = Players(botName, botSymbol)

    const playerOneDisplay = document.querySelector('.player-1')
    const playerTwoDisplay = document.querySelector('.player-2')
    playerOneDisplay.textContent = `${playerOneName} : X`
    playerTwoDisplay.textContent = `${botName} : O`
    playerOneDisplay.classList.add('active')
    playerTwoDisplay.classList.remove('active')

    let inPlay = playerOne.getName();
    const board = document.querySelectorAll('div.box')
    let playerWin = false;

    //USE OTHER LOGIC HERE

    return {}
}
