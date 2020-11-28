const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score')
let score = 0
let squares = [];
let pacmanCurrentIndex = 490

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

setUpGame()

function setUpGame() {
    createBoard()
    scoreDisplay.innerText = score

    // insert pac-man
    squares[pacmanCurrentIndex].classList.add('pac-man')
}

function createBoard() {
    for(let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        switch(layout[i]) {
        case 0:
        squares[i].classList.add('pac-dot')
        break

        case 1: 
        squares[i].classList.add('wall')
        break

        case 2:
        squares[i].classList.add('ghost-lair')
        break

        // case 3:
        // squares[i].classList.add('power-pellet')
        // break
        }
    }
}

function movePacMan(event) {
    let pacmanNextIndex
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(event.keyCode) {
        // move down
        case 40:
        pacmanNextIndex = pacmanCurrentIndex + width
        if(
            pacmanNextIndex < width * width &&
            !squares[pacmanNextIndex].classList.contains('wall') &&
            !squares[pacmanNextIndex].classList.contains('ghost-lair')
            ) {
            pacmanCurrentIndex += width;
        }
        break
        
        // move up
        case 38:
        pacmanNextIndex = pacmanCurrentIndex - width
        if(
            pacmanNextIndex > -1 &&
            !squares[pacmanNextIndex].classList.contains('wall')
            ) {
            pacmanCurrentIndex -= width;
        }
        break
        
        // move left
        case 37:
        pacmanNextIndex = pacmanCurrentIndex - 1
        if(
            pacmanCurrentIndex % width != 0 &&
            !squares[pacmanNextIndex].classList.contains('wall')
            ) {
            pacmanCurrentIndex -= 1;

            if(pacmanCurrentIndex === 364) {
                pacmanCurrentIndex += width - 1;
            }
        }
        break

        // move right
        case 39:
        pacmanNextIndex = pacmanCurrentIndex + 1
        if(
            pacmanNextIndex % width != 0 &&
            !squares[pacmanNextIndex].classList.contains('wall')
            ) {     
            pacmanCurrentIndex += 1;

            if(pacmanCurrentIndex === 391) {
                pacmanCurrentIndex -= width - 1;
            }
        }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    eatPacDot()
}

function updateScoreBy(points) {
    score += points
    scoreDisplay.innerText = score
}

function eatPacDot() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        updateScoreBy(1)
    }
}



document.addEventListener('keyup', movePacMan)