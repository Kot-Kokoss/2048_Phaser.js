import Phaser from 'phaser';

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

    const scoreHeading = this.add.text(-60, 0, 'СЧЁТ:', {
      font: '28px sans-serif',
      color: '#100c0a',
    });
    scoreHeading.setOrigin(0, 0.5);
    this.scoreText = this.add.text(30, -15, this.score, {
      font: '28px sans-serif',
      color: '#100c0a',
    });
    scoreContainer.add([scoreBg, scoreHeading, this.scoreText]);

    this.initBoard();
    this.boardContainer = this.add.container(145, 135);
    const boardSize = TILE_SIZE * GRID_SIZE + GAP * (GRID_SIZE + 1);
    const graphicsBorder = this.add.graphics();
    graphicsBorder.fillStyle(0xd0c0af, 1);
    graphicsBorder.fillRoundedRect(-125, -35, boardSize, boardSize, 5);
    graphicsBorder.lineStyle(5, 0xa0a0a0, 1);
    graphicsBorder.strokeRoundedRect(-125, -35, boardSize, boardSize, 5);

    const borderBg = this.add.container(0, 0);
    borderBg.add(graphicsBorder);

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const graphicsTile = this.add.graphics();
        graphicsTile.fillStyle(0xeee4da, 1);
        graphicsTile.fillRoundedRect(
          i * (TILE_SIZE + GAP) + TILE_SIZE / 2,
          j * (TILE_SIZE + GAP) + TILE_SIZE / 2,
          TILE_SIZE,
          TILE_SIZE,
          5,
        );

        const tileBg = this.add.container(-10, 70);
        tileBg.add(graphicsTile);
      }
    }

    this.boardContainer.add([borderBg]);
  }

  initBoard() {
    for (let i = 0; i < GRID_SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        this.board[i][j] = null;
      }
    }
  }

  update() {}
}
