import Phaser, { Utils } from 'phaser';

const TILE_SIZE = 78;
const GRID_SIZE = 4;
const GAP = 10;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');

    this.board = [];
    this.score = 0;

    this.boardContainer = null;
    this.scoreText = null;
  }

  preload() {}

  create() {
    const scoreContainer = this.add.container(200, 45);

    const graphicsScore = this.add.graphics();
    graphicsScore.fillStyle(0xdadada, 1);
    graphicsScore.fillRoundedRect(-125, -35, 250, 70, 38);
    graphicsScore.lineStyle(5, 0xa0a0a0, 1);
    graphicsScore.strokeRoundedRect(-125, -35, 250, 70, 38);

    const scoreBg = this.add.container(0, 0);
    scoreBg.add(graphicsScore);

    const scoreHeading = this.add.text(-90, 0, 'СЧЁТ:', {
      font: '28px sans-serif',
      color: '#100c0a',
    });
    scoreHeading.setOrigin(0, 0.5);
    this.scoreText = this.add.text(0, -15, this.score, {
      font: '28px sans-serif',
      color: '#100c0a',
    });
    scoreContainer.add([scoreBg, scoreHeading, this.scoreText]);

    this.initBoard();

    this.boardContainer = this.add.container(145, 135);
    const boardSize = TILE_SIZE * GRID_SIZE + GAP * (GRID_SIZE + 2);
    const graphicsBorder = this.add.graphics();
    graphicsBorder.fillStyle(0xd0c0af, 1);
    graphicsBorder.fillRoundedRect(-130, -40, boardSize, boardSize, 5);
    graphicsBorder.lineStyle(5, 0xa0a0a0, 1);
    graphicsBorder.strokeRoundedRect(-130, -40, boardSize, boardSize, 5);
    const borderBg = this.add.container(0, 0);

    borderBg.add(graphicsBorder);
    this.boardContainer.add(borderBg);

    this.createRandom2or4();
    this.updateBoard();

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.board[i][j] === 0) {
          const graphicsTile = this.add.graphics();
          graphicsTile.fillStyle(0xeee4da, 1);
          graphicsTile.fillRoundedRect(
            i * (TILE_SIZE + GAP) +
              TILE_SIZE / 2 -
              (TILE_SIZE * GRID_SIZE + (GAP * (GRID_SIZE + 1)) / 2),
            j * (TILE_SIZE + GAP) +
              TILE_SIZE / 2 -
              (TILE_SIZE * GRID_SIZE + (GAP * (GRID_SIZE + 1)) / 2),
            TILE_SIZE,
            TILE_SIZE,
            5,
          );
          const tileBg = this.add.container(184, 272).setName(`tile-${i}-${j}`);
          tileBg.add(graphicsTile);
          this.boardContainer.add(tileBg);
        }
      }
    }
  }

  initBoard() {
    for (let i = 0; i < GRID_SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  createRandom2or4() {
    const emptyTiles = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.board[i][j] === 0) {
          emptyTiles.push({
            x: i,
            y: j,
          });
        }
      }
    }

    const chosenTile = Phaser.Utils.Array.GetRandom(emptyTiles);
    const randomValue = Phaser.Math.Between(1, 100);
    let generatedNumber;

    if (randomValue <= 90) {
      generatedNumber = 2;
    } else {
      generatedNumber = 4;
    }
    this.board[chosenTile.x][chosenTile.y] = generatedNumber;
  }

  getColor(value) {
    switch (value) {
      case 2:
        return 0xeee4da;
      case 4:
        return 0xeee0c6;
      case 8:
        return 0xf9b377;
      case 16:
        return 0xff9b60;
      case 32:
        return 0xca6a48;
      case 64:
        return 0xec6233;
      case 128:
        return 0xe8c462;
      case 256:
        return 0xe0ba55;
      case 512:
        return 0xf3c54b;
      case 1024:
        return 0xf2c138;
      case 2048:
        return 0xf3bd29;
      default:
        return 0xeee4da;
    }
  }

  createTile(i, j) {
    const tileContainer = this.add.container(
      i * (TILE_SIZE + GAP) + TILE_SIZE / 2 - (TILE_SIZE * GRID_SIZE + (GAP * (GRID_SIZE + 1)) / 2),
      j * (TILE_SIZE + GAP) + TILE_SIZE / 2 - (TILE_SIZE * GRID_SIZE + (GAP * (GRID_SIZE + 1)) / 2),
    );
    const graphicsTile = this.add.graphics();
    graphicsTile.fillStyle(this.getColor(this.board[i][j]), 1);
    graphicsTile.fillRoundedRect(0, 0, TILE_SIZE, TILE_SIZE, 5);

    const tileBg = this.add.container(184, 272);
    tileBg.add(graphicsTile);
    const tileText = this.add.text(214, 294, this.board[i][j], {
      font: 'bold 32px sans-serif',
      color: '#050003',
    });
    tileContainer.add([tileBg, tileText]);
    this.boardContainer.add(tileContainer);
  }

  updateBoard() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.board[i][j] !== 0) {
          const tile = this.boardContainer.getByName(`tile-${i}-${j}`);
          if (!tile) {
            this.createTile(i, j);
          }
        }
      }
    }

    console.log(this.board);
    this.updateScore();
  }

  updateScore() {
    let score = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        score += this.board[i][j];
      }
    }
    this.score = score;

    this.scoreText.setText(this.score);
  }

  update() {}
}
