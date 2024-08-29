import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loadingScene');
  }

  preload() {}

  create() {
    this.scene.start('gameScene');
  }

  update() {}
}
