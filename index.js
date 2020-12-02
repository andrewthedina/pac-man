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
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
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

        case 3:
        squares[i].classList.add('power-pellet')
        break
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
    eatPowerPellet()
    checkForGameOver()
    checkForWin()
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

function eatPowerPellet() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        updateScoreBy(10)
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(removeIsScared, 10000)
    }
}

function removeIsScared() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className,
        this.startIndex = startIndex,
        this.speed = speed,
        this.currentIndex = startIndex,
        this.isScared = false,
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 320, 200),
    new Ghost('pinky', 348, 250),
    new Ghost('inky', 323, 300),
    new Ghost('clyde', 351, 350)
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    ghost.timerId = setInterval( function() {
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor((Math.random() * directions.length))]
        let ghostNextIndex = ghost.currentIndex + direction

        if(
            !squares[ghostNextIndex].classList.contains('wall') &&
            !squares[ghostNextIndex].classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

            ghost.currentIndex += direction
            
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]


        // scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        // eaten
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.isScared = false
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            updateScoreBy(40)
        }

        checkForGameOver()
        checkForWin()
    }, ghost.speed);
}

function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
        ) {
            squares[pacmanCurrentIndex].classList.remove('pac-man')
            document.removeEventListener('keyup', movePacMan)
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            scoreDisplay.innerHTML = 'You LOSE'
        }
}

function checkForWin() {
    if (score >= 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacMan)
        scoreDisplay.innerHTML = 'You WON!'
        console.log('executed')
        setInterval(changeWalls, 350)
    }
}


let walls = document.querySelectorAll('.wall')


function changeWalls() {
    if (!walls[0].classList.contains('wall-won')) {
        walls.forEach(wall => wall.classList.add('wall-won'))
    } else {
        walls.forEach(wall => wall.classList.remove('wall-won'))
    }
}




    


document.addEventListener('keyup', movePacMan)