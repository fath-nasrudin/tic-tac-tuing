const cellFactory = () => {
  const defaultValue = '_';
  let value = defaultValue;

  // return: -1 if failed to add mark;
  const addMark = (mark) => {
    if (value !== defaultValue) return -1;
    value = mark;
    return mark;
  };
  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
};

const strikeFinder2 = (rowS, colS, board, strike) => {
  let row = Number(rowS);
  let col = Number(colS);
  const boardRow = board.length - 1;
  const boardCol = board[0].length - 1;
  const char = board[row][col].getValue();

  const diagonalKananBawah = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row + i;
      const colIndex = col + i;

      if (rowIndex > boardRow || colIndex > boardCol) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const diagonalKiriAtas = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row - i;
      const colIndex = col - i;

      if (rowIndex < 0 || colIndex < 0) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const diagonalKananAtas = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row - i;
      const colIndex = col + i;

      if (rowIndex < 0 || colIndex > boardCol) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const diagonalKiriBawah = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row + i;
      const colIndex = col - i;

      if (rowIndex > boardRow || colIndex < 0) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const verticalAtas = () => {
    let value = 0;
    for (let i = 1; i < strike; i++) {
      const rowIndex = row - i;
      const colIndex = col;

      if (rowIndex < 0) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const verticalBawah = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row + i;
      const colIndex = col;

      if (rowIndex > boardRow) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const horizontalKiri = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row;
      const colIndex = col - i;

      if (colIndex < 0) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };
  const horizontalKanan = () => {
    let value = 0;

    for (let i = 1; i < strike; i++) {
      const rowIndex = row;
      const colIndex = col + i;

      if (colIndex > boardCol) break;
      if (board[rowIndex][colIndex].getValue() !== char) break;
      value += 1;
    }
    return value;
  };

  const find = () => {
    if (diagonalKananAtas() + diagonalKiriBawah() + 1 >= strike) {
      console.log({
        char,
        dkaA: diagonalKananAtas(),
        dkiB: diagonalKiriBawah(),
        strike,
      });
      console.log('true in diagonal kanan atas');
      return true;
    }
    if (diagonalKananBawah() + diagonalKiriAtas() + 1 >= strike) {
      console.log('true in diagonal kanan bawah');

      return true;
    }
    if (verticalAtas() + verticalBawah() + 1 >= strike) {
      console.log('true in diagonal vertical');

      return true;
    }
    if (horizontalKanan() + horizontalKiri() + 1 >= strike) {
      console.log('true in diagonal horizontal');

      return true;
    }
    return false;
  };

  return { find };
};

const gameBoard = () => {
  const _column = 3;
  const _row = 3;
  const _board = [];

  const _createBoard = () => {
    for (let r = 0; r < _row; r++) {
      _board[r] = [];
      for (let c = 0; c < _column; c++) {
        _board[r].push(cellFactory());
      }
    }
  };
  _createBoard();

  const getTotalCell = () => _board.length * _board[0].length;
  const getBoard = () => _board;
  const resetBoard = () => {
    _createBoard();
  };

  const printBoard = () => {
    let stringBoard = '';
    _board.forEach((row) => {
      row.forEach((cell) => {
        stringBoard += `| ${cell.getValue()} `;
      });
      stringBoard += '|\n';
    });
    console.log(stringBoard);
  };

  const markCell = (rowIndex, colIndex, marker) => {
    return _board[rowIndex][colIndex].addMark(marker);
  };
  return {
    getBoard,
    getTotalCell,
    printBoard,
    markCell,
    resetBoard,
  };
};

const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameController = () => {
  const player1 = playerFactory('player1', 'x');
  const player2 = playerFactory('player2', 'o');
  const players = [player1, player2];
  const board = gameBoard();
  let totalCell = board.getTotalCell();
  let winner = null; // player1, player2// tie
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  const getWinner = () => winner;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    console.log(`${getActivePlayer().name}'s turn`);
    board.printBoard();
  };

  const playRound = (rowIndex, colIndex) => {
    const addMarkStatus = board.markCell(
      rowIndex,
      colIndex,
      getActivePlayer().mark
    );
    if (addMarkStatus === -1) return;

    if (totalCell === 1) winner = 'tie';

    const isPlayerWin = strikeFinder2(
      rowIndex,
      colIndex,
      board.getBoard(),
      3
    ).find();
    totalCell -= 1;
    if (isPlayerWin) {
      winner = getActivePlayer();
    }

    switchActivePlayer();
    // printNewRound();
  };

  const restart = () => {
    board.resetBoard();
    activePlayer = players[0];
    winner = null;
    board.getTotalCell();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getWinner,
    restart,
  };
};

const screenController = () => {
  const game = gameController();
  const boardUI = globalThis.document.querySelector('.board');
  const turnUI = document.querySelector('.turn');
  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again?';
  playAgainButton.addEventListener('click', () => {
    game.restart();
    updateScreen();
  });

  const updateScreen = () => {
    // clear the board
    boardUI.textContent = '';
    const board = game.getBoard();
    const player = game.getActivePlayer();
    const winner = game.getWinner();

    if (winner === null) {
      turnUI.textContent = `${player.name}'s turn`;
    } else if (winner === 'tie') {
      turnUI.textContent = 'Game Tie';
      turnUI.appendChild(playAgainButton);
    } else {
      turnUI.textContent = `The winner is ${winner.name}`;
      turnUI.appendChild(playAgainButton);
    }

    const cellClickListener = (e) => {
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;
      game.playRound(row, col);
      updateScreen();
    };
    // add cells into boardUI
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cellButton = document.createElement('button');
        cellButton.setAttribute('data-row', row);
        cellButton.setAttribute('data-col', col);
        cellButton.classList.add('cell');
        cellButton.addEventListener('click', cellClickListener);

        if (winner !== null && winner !== 'tie') cellButton.disabled = true;

        cellButton.textContent = board[row][col].getValue();
        boardUI.appendChild(cellButton);
      }
    }
  };

  updateScreen();

  // button handler
};

// screen controller testing
screenController();
