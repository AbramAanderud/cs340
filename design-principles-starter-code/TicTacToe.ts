// This program violates the principles of High-Quality Abstraction, Primitive Obsession, and Information Hiding.
//
// 1. Explain why/how this program violates the above principles.
// The board representation is a primitive array of strings which is not an abstraction of the game state.
// The game exposees board directly.
// The winner logic doesnt make sense and is hard coded.
// Tests and production and driver all in the same file.

// 2. Explain how you would refactor the code to improve its design.
// create player type and an empty constant.
// centralize win lines.
// keep the public behavior the same.

export class Game {
  board: string[];

  constructor(board: string[], position: number = -1, player: string = "") {
    this.board = [...board];

    if (position >= 0 && player !== "") {
      this.board[position] = player;
    }
  }

  move(player: string): number {
    for (let i = 0; i < 9; i++) {
      if (this.board[i] == "-") {
        let game = this.play(i, player);
        if (game.winner() == player) {
          return i;
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      if (this.board[i] == "-") {
        return i;
      }
    }
    return -1;
  }

  play(position: number, player: string): Game {
    return new Game(this.board, position, player);
  }

  winner(): string {
    if (
      this.board[0] != "-" &&
      this.board[0] == this.board[1] &&
      this.board[1] == this.board[2]
    ) {
      return this.board[0];
    }
    if (
      this.board[3] != "-" &&
      this.board[3] == this.board[4] &&
      this.board[4] == this.board[5]
    ) {
      return this.board[3];
    }
    if (
      this.board[6] != "-" &&
      this.board[6] == this.board[7] &&
      this.board[7] == this.board[8]
    ) {
      return this.board[6];
    }

    return "-";
  }
}

export class GameTest {
  testDefaultMove() {
    let game = new Game(this.stringToCharArray("XOXOX-OXO"));
    this.assertEquals(5, game.move("X"));

    game = new Game(this.stringToCharArray("XOXOXOOX-"));
    this.assertEquals(8, game.move("O"));

    game = new Game(this.stringToCharArray("---------"));
    this.assertEquals(0, game.move("X"));

    game = new Game(this.stringToCharArray("XXXXXXXXX"));
    this.assertEquals(-1, game.move("X"));
  }

  testFindWinningMove() {
    let game = new Game(this.stringToCharArray("XO-XX-OOX"));
    this.assertEquals(5, game.move("X"));
  }

  testWinConditions() {
    let game = new Game(this.stringToCharArray("---XXX---"));
    this.assertEquals("X", game.winner());
  }

  private assertEquals(expected: string | number, actual: string | number) {
    if (expected !== actual) {
      console.error(`${expected} != ${actual}`);
    }
  }

  private stringToCharArray(str: string): string[] {
    let result: string[] = [];
    for (const char of str) {
      result.push(char);
    }
    return result;
  }
}

// Test Driver

let gameTest = new GameTest();
gameTest.testDefaultMove();
gameTest.testFindWinningMove();
gameTest.testWinConditions();
