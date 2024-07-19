import { Scene } from 'phaser'
import db from '../db'

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu')
  }

  init() {
    this.options = {
      count: { type: 'number', value: 5, min: 1, max: 20 },
      spacing: { type: 'number', value: 100, min: 10, max: 1000 }
    }
  }

  create() {
    this.add.image(db.half.w, db.half.h, 'sky').setDisplaySize(db.size.w, db.size.h)
    this.add.image(db.half.w, 70, 'logo')

    const scenes = ['LineOne', 'LinePoints']
    this.createButtons(scenes)
  }

  /**
   * @param {string[]} scenes
   */
  createButtons(scenes) {
    /** @type {HTMLDivElement} */
    // @ts-expect-error
    const div = document.getElementById('controls')
    if (!div) throw new Error('No controls div found')
    while (div.firstChild) div.removeChild(div.firstChild)

    for (let i = 0; i < scenes.length; i++) {
      const s = scenes[i]

      const button = document.createElement('button')
      button.innerText = s
      button.onclick = () => this.scene.start(s)

      div.appendChild(button)
    }
  }
}
