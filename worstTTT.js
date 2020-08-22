/* variables */
var board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]
var isHumanTurn = true
/* constants */
const numRows = 3
const numCols = 3
const player = {
    HUMAN: 'X',
    COMPUTER: 'O'
}
const boardStates = {
    WIN: 1,
    TIE: 0,
    NEUTRAL: -1
}

render()

/* render */
function render() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            document.getElementById(i + "," + j).innerText = board[i][j]
        }
    }
}

/* make moves */
function humanMove(i,j) {
    if (isHumanTurn && board[i][j] == ' ') {
        board[i][j] = player.HUMAN
        isHumanTurn = false;
        switch(getBoardState(board, player.HUMAN)) {
            case boardStates.WIN:
                endGame(player.HUMAN)
                break
            case boardStates.TIE:
                endGame(null)
                break
            case boardStates.NEUTRAL:
                render()
                computerMove()
        }
    }
}

function computerMove() {
    let bestScore = Infinity
    let bestMove = {i: -1,j: -1}
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = player.COMPUTER
                let score = minimax(board, false)
                board[i][j] = ' '
                if (score < bestScore) {
                    bestMove = {i,j}
                    bestScore = score
                }
            }
        }
    }

    board[bestMove.i][bestMove.j] = player.COMPUTER
    switch(getBoardState(board, player.COMPUTER)) {
        case boardStates.WIN:
            endGame(player.COMPUTER)
            break
        case boardStates.TIE:
            endGame(null)
            break
        case boardStates.NEUTRAL:
            isHumanTurn = true
    }
    render()
}

/* end game */
function endGame(winner) {
    if (winner != null) {
        // announce winner
        document.getElementById("announcementText").innerText = winner + " Wins!"
    } else {
        // announce tie
        document.getElementById("announcementText").innerText = "It's a tie!"
    }
    // render one last time so they can see the final board
    render()
}

/* Helper Methods */
// NOTE: returns a number based on the board state
function getBoardState(board, player) {
    // CHECK FOR WIN FIRST
    // horizontal
    // row 0
    if (board[0][0] == player && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
        return boardStates.WIN
    }
    // row 1
    if (board[1][0] == player && board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
        return boardStates.WIN
    }
    // row 2
    if (board[2][0] == player && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
        return boardStates.WIN
    }

    // vertical
    // column 0
    if (board[0][0] == player && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
        return boardStates.WIN
    }
    // column 1
    if (board[0][1] == player && board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
        return boardStates.WIN
    }
    // column 2
    if (board[0][2] == player && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
        return boardStates.WIN
    }

    // diagonal
    // top-left to bottom-right
    if (board[0][0] == player && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        return boardStates.WIN
    }
    // bottom-left to top-right
    if (board[2][0] == player && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
        return boardStates.WIN
    }

    // CHECK FOR TIE
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j] == ' ') {
                return boardStates.NEUTRAL
            }
        }
    }

    return boardStates.TIE
}

/* AI Move Algorithm */

/*
    Basically find the worst possible move using minimax, just inverted
*/

function minimax(board, isMaximizing) {
    if (isMaximizing) {
        switch(getBoardState(board, player.HUMAN)) {
            case boardStates.WIN:
                return -1
            case boardStates.TIE:
                return 0
            case boardStates.NEUTRAL:
                // actively search for the WORST MOVE
                let bestScore = Infinity
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        // only look at moves that are possible
                        if (board[i][j] == ' ') {
                            board[i][j] = player.COMPUTER
                            let score = minimax(board, false)
                            board[i][j] = ' '
                            if (score < bestScore) {
                                bestScore = score
                            }
                        }
                    }
                }
                return bestScore
        }
    } else {
        switch(getBoardState(board, player.COMPUTER)) {
            case boardStates.WIN:
                return 1
            case boardStates.TIE:
                return 0
            case boardStates.NEUTRAL:
                // actively search for the WORST MOVE
                let bestScore = -Infinity
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        // only look at moves that are possible
                        if (board[i][j] == ' ') {
                            board[i][j] = player.HUMAN
                            let score = minimax(board, true)
                            board[i][j] = ' '
                            if (score > bestScore) {
                                bestScore = score
                            }
                        }
                    }
                }
                return bestScore
        }
    }
}

function printBoard(board) {
    for (let i = 0; i < board.length; i++) {
        console.log(board[i][0] + " " + board[i][1] + " " + board[i][2])
    }
}