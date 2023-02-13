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

  const getBoard = () => _board;

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
    printBoard,
    markCell,
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
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

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

    switchActivePlayer();
    printNewRound();
  };

  return {
    playRound,
  };
};

// TESTING
// game controller testing
// const game = gameController();
// game.playRound(1, 1);
// game.playRound(1, 2);

// gameBoard testing
// const board = gameBoard();

// cell testing;
// let cell = cellFactory();
// console.log(cell.getValue());
// console.log(cell.addMark('x'));
// console.log(cell.addMark('x'));
