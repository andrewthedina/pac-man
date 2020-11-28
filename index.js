const width = 28;
const grid = document.querySelector('.grid');
let squares = [];

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


function createBoard() {
    for(let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        // if (layout[i] === 0) {
        //     squares[i].classList.add('pac-dot')
        // } else if (layout[i] === 1) {
        //     squares[i].classList.add('wall')
        // } else if (layout[i] === 2) {
        //     squares[i].classList.add('ghost-lair')
        // } else if (layout[i] === 3) {
        //     squares[i].classList.add('power-pellet')
        // }
    }
}

createBoard()

// insert pac-man
let pacmanCurrentIndex = 490
squares[490].classList.add('pac-man')

function movePacMan(event) {
    let nextIndex
    console.log(pacmanCurrentIndex)
    switch(event.keyCode) {
        // move down
        case 40:
        nextIndex = pacmanCurrentIndex + 28
        if(nextIndex < width * width) {
            adjustPacMan(width)
        } else {
            console.log('contains wall')
        }
        break
        
        // move up
        case 38:
        nextIndex = pacmanCurrentIndex - width
        if(nextIndex > -1) {
            adjustPacMan(-width)
        } else {
            console.log('contains wall')
        }
        
        break
        
        // move left
        case 37:
        nextIndex = pacmanCurrentIndex - 1
        if(nextIndex % width >= 0) {
            adjustPacMan(-1)
        } else {
            console.log('contains wall')
        }
        break

        // move right
        case 39:
        nextIndex = pacmanCurrentIndex + 1
        if(nextIndex % width != 0) {     
            adjustPacMan(1)
        } else {
            console.log('rcontains wall')
        }
        break
    }


    // switch(event.keyCode) {
    //     // move down
    //     case 40:
    //     if(!squares[pacmanCurrentIndex + 28].classList.contains('wall')) {
    //         adjustPacMan(28)
            
    //     } else {
    //         console.log('contains wall')
    //     }
    //     break
        
    //     // move up
    //     case 38:
    //     if(!squares[pacmanCurrentIndex - 28].classList.contains('wall')) {
    //         adjustPacMan(-28)
    //     } else {
    //         console.log('contains wall')
    //     }
        
    //     break
        
    //     // move left
    //     case 37:
    //     if(!squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
    //         adjustPacMan(-1)
    //     } else {
    //         console.log('contains wall')
    //     }
    //     break

    //     // move right
    //     case 39:
    //     if(!squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
    //         adjustPacMan(1)
    //     } else {
    //         console.log('contains wall')
    //     }
    //     break
    // }
}

function adjustPacMan(amount) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    pacmanCurrentIndex += amount;
    squares[pacmanCurrentIndex].classList.add('pac-man')
}


document.addEventListener('keyup', movePacMan)