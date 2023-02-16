//Factory Function
// const player = (player, symbol) => {
//     const getPlayerName = () =>  player
//     const getPlayerSymbol = () => symbol
//     let container = document.querySelector('body')
    
//     const sayHello = () => {
//         console.log(`Hello ${player}`)
//         let div = document.createElement('div')
//         container.appendChild(div)
//         div.textContent = (`${getPlayerName()} ${getPlayerSymbol()}`)
//     }
//     const testAFunction = () => {
//         let div = document.createElement('div')
//         container.appendChild(div)
//         div.textContent = symbol
//     }    
//     return {
//         sayHello,
//         testAFunction
//     }
// };

// const player1 = player('Ben', 'x')
// player1.testAFunction();
// player1.sayHello();
// const player2 = player('test', 'o')
// player2.testAFunction();
// player2.sayHello();

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
        }
    }
    return {
        displayGameBoard
    }
})();

