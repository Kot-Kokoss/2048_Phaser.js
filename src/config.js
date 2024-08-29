import Phaser from 'phaser';
import LoadingScene from './scenes/loadingScene';
import GameScene from './scenes/gameScene';

export default {
  type: Phaser.AUTO,
  width: 400,
  height: 485,
  parent: 'game',
  backgroundColor: '#ffffff',
  scene: [LoadingScene, GameScene],
};
