const gameBoard = (() => {
    let gameBoardObject = [
        'x', 
        'x', 
        'x', 
        'o', 
        'o',
        'o',
        'x',
        'x',
        'x'
    ]

    let displayBtn = document.querySelector('#display')
    displayBtn.addEventListener('click', () => {
        displayGameBoard();
    })

    const displayGameBoard = () => {
        for (i = 0; i <= gameBoardObject.length; i++) {
            let container = document.querySelector('.container')
            let div = document.createElement('div')
            container.appendChild(div)
            div.textContent = [gameBoardObject[i]]
            div.addEventListener('click', () => {
                // console.log('test')
            })
        }
    }
    return {
        gameBoardObject,
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

