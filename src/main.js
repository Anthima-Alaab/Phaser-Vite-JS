import { LineOne } from './scenes/LineOne'
import { LinePoints } from './scenes/LinePoints'
import { MainMenu } from './scenes/MainMenu'
import { Preloader } from './scenes/Preloader'
import db from './db.js'

/** @see https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig */
/** @type {Phaser.Types.Core.GameConfig} */
const config = {
  title: 'أنظمة ألعاب',
  type: Phaser.AUTO,
  width: db.size.w,
  height: db.size.h,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Preloader, MainMenu, LineOne, LinePoints]
}

export default new Phaser.Game(config)
