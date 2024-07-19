import { createBackButton } from '../util'
import { createControl } from '../controls'
import { Scene } from 'phaser'
import { Line } from 'anthima'
import db from '../db'

export class LinePoints extends Scene {
  constructor() {
    super('LinePoints')
  }

  init() {
    this.options = {
      count: { type: 'number', value: 5, min: 1, max: 20 },
      spacing: { type: 'number', value: 100, min: 10, max: 1000 }
    }
  }

  create() {
    this.sky = this.add.image(db.half.w, db.half.h, 'sky').setDisplaySize(db.size.w, db.size.h)
    this.logo = this.add.image(db.half.w, 70, 'logo')

    /** @type {HTMLDivElement} */
    // @ts-expect-error
    const div = document.getElementById('controls')
    if (!div) throw new Error('No controls div found')
    while (div.firstChild) div.removeChild(div.firstChild)

    div.appendChild(createBackButton(this.scene))
    this.createControls().forEach((c) => div.appendChild(c))
    this.drawPoints()
  }

  createControls() {
    const controls = []

    for (const name in this.options) {
      const prop = this.options[name]
      const control = createControl(name, prop, (newValue) => {
        const newProp = { ...prop, value: newValue }
        this.options = { ...this.options, [name]: newProp }
        this.drawPoints()
      })
      controls.push(control)
    }

    return controls
  }
  drawPoints() {
    const optionValues = {}
    for (const name in this.options) optionValues[name] = this.options[name].value

    this.points?.forEach((p) => p.destroy())
    /** @type {Phaser.GameObjects.Arc[]} */
    this.points = []
    Line.create.points(optionValues).forEach((p, _) => {
      const c = this.add.circle(db.half.w + p, db.half.h, 20, 0xffffff)
      this.points?.push(c)
    })
  }
}
