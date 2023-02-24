const Players = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol

    return {
        getName, 
        getSymbol,
    }
}

const gameFlowController = (() => {
    let gameBoardObject = ['', '', '', '', '', '', '', '', '',]
    let playerWin = false
    const getLocation = (location) => gameBoardObject[location];
    
    const playerOne = Players('Player1', 'X')
    const playerTwo = Players('Player2', 'O')
    
    let inPlay = playerOne.getName();
    const playerOneName = playerOne.getName();
    const playerTwoName = playerTwo.getName();
    
    const boardBegin = () => {
        const board = document.querySelectorAll('div.box')
        board.forEach((div) => {
            div.addEventListener('click', () => {
                if (playerWin) {
                    return
                }
                if (inPlay === playerOneName && getLocation(div.dataset.boxNumber) === '') {
                    placeSpot(playerOne.getSymbol(), div.dataset.boxNumber)
                    inPlay = playerTwoName
                    DomController.playerHighlightTwo()
                    DomController.updatePlay(div.dataset.boxNumber)
                    checkTie();
                    checkWinner();
                } else if (inPlay === playerTwoName && getLocation(div.dataset.boxNumber) === '' ) {
                    placeSpot(playerTwo.getSymbol(), div.dataset.boxNumber)
                    inPlay = playerOneName
                    DomController.playerHighlightOne()
                    DomController.updatePlay(div.dataset.boxNumber)
                    checkTie();
                    checkWinner();
                }
            })
        })   
    }

    const placeSpot = (symbol, spot) => {
        gameBoardObject[spot] = symbol
    }
    
    const clearGameBoardObject = () => {
        gameBoardObject = ['', '', '', '', '','','','','',]
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
                DomController.playerWon(playerOne.getName(), playerTwo.getName());
                clearGameBoardObject();
                DomController.playerHighlightOne();
            } else if (winnerCombs[property].toString() === checkO) {
                playerWin = true;
                DomController.playerWon(playerTwo.getName(), playerOne.getName());
                clearGameBoardObject();
                DomController.playerHighlightOne();
            }
        }
    }
    
    const checkTie = () => {
        const fullArray = (array) => {return array != ''}
        if (gameBoardObject.every(fullArray)) {
            DomController.playerTie(playerOne.getName(), playerTwo.getName())
        }
    }

    return {
        boardBegin,
        getLocation
    }
})();

const DomController = (() => {
    // let board = document.querySelectorAll('div.box')
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
        for (i = 0; i < 9; i++) {
            let div = document.createElement('div')
            div.dataset.boxNumber = i;
            div.id = i;
            div.classList.add('box')
            boardContainer.appendChild(div)
        }
        gameFlowController.boardBegin();
    }

    const displayAll = () => {
        if (input1.value === '' || input2.value === '') {
            alertDiv.textContent = 'Please enter both names!'
            return
        } else if (input1.value === input2.value) {
            alertDiv.textContent = 'Please put different names!'
            return
        }
        formDiv.classList.toggle('active')
        displayGameBoard();
        changeNames();
        playersTop.classList.toggle('active')
    }

    const playerOneDisplay = document.querySelector('.player-1')
    const playerTwoDisplay = document.querySelector('.player-2')
    playerOneDisplay.classList.add('active')
    playerTwoDisplay.classList.remove('active')

    const changeNames = () => {
        playerOneDisplay.textContent = `${input1.value} : X`
        playerTwoDisplay.textContent = `${input2.value} : O`
    }

    //Update DOM for spot play
    const updatePlay = (spot) => {
        let selectedBox = document.getElementById(spot)
        selectedBox.textContent = gameFlowController.getLocation(spot)
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

    //highlight upper names
    const playerHighlightOne = () => {
        playerTwoDisplay.classList.remove('active')
        playerOneDisplay.classList.add('active')
    }
    const playerHighlightTwo = () => {
        playerOneDisplay.classList.remove('active')
        playerTwoDisplay.classList.add('active')
    }

    return {
        playerWon,
        playerTie,
        changeNames,
        playerHighlightOne,
        playerHighlightTwo,
        updatePlay
    }
})();
