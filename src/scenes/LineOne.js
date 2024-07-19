import { createBackButton } from '../util'
import { createControl } from '../controls'
import { Scene } from 'phaser'
import { Line } from 'anthima'
import db from '../db'

const index = { keep: true, type: 'select', arr: [0, 1, 2], value: 0, prev: 0 }
const neg = { type: 'boolean', value: false }
const count = { type: 'number', value: 3, min: 2, max: 10 }
const options = [
  {
    index,
    end: { type: 'number', value: 250, min: -500, max: 500 },
    count
  },
  {
    index,
    dis: { type: 'number', value: 250, min: 1, max: 500 },
    neg,
    count
  },
  {
    index,
    spacing: { type: 'number', value: 125, min: 10, max: 200 },
    neg,
    count
  }
]

/**
 * @property {HTMLDivElement} div
 */
export class LineOne extends Scene {
  /** @type {HTMLDivElement} */
  div

  constructor() {
    super('LineOne')
  }

  init() {
    this.options = options[0]

    // @ts-expect-error
    this.div = document.getElementById('controls')
    if (!this.div) throw new Error('No controls div found')
    while (this.div.firstChild) this.div.removeChild(this.div.firstChild)
  }

  create() {
    this.sky = this.add.image(db.half.w, db.half.h, 'sky').setDisplaySize(db.size.w, db.size.h)
    this.logo = this.add.image(db.half.w, 70, 'logo')

    this.div.appendChild(createBackButton(this.scene))
    this.recreate()
  }

  recreate() {
    this.deleteControls(this.div)
    this.createControls(this.div)

    this.drawPoints()
  }

  /**
   * @param {HTMLDivElement} div
   */
  createControls(div) {
    for (const name in this.options) {
      const prop = this.options[name]
      if (div.querySelector(`#${name}`)) continue

      const control = createControl(name, prop, (newValue) => {
        const newProp = { ...prop, value: newValue }
        this.options = { ...this.options, [name]: newProp }
        this.drawPoints()
      })
      if (prop.keep) control.dataset.keep = 'true'

      div.appendChild(control)
    }
  }
  /**
   * @param {HTMLDivElement} div
   */
  deleteControls(div) {
    const controls = div.querySelectorAll('div')
    for (let i = 0; i < controls.length; i++) {
      const c = controls[i]
      console.log('📢 | LineOne | deleteControls | c.dataset.keep:', c.dataset.keep)
      if (!c.dataset.keep == true) div.removeChild(c)
    }
  }

  drawPoints() {
    const index = this.options.index
    if (index.value !== index.prev) {
      this.options = options[index.value]
      index.prev = index.value

      this.recreate()
      return
    }

    const optionValues = {}
    for (const name in this.options) optionValues[name] = this.options[name].value

    this.points?.forEach((p) => p.destroy())
    /** @type {Phaser.GameObjects.Arc[]} */
    this.points = []
    Line.create.one(optionValues).points.forEach((p, _) => {
      const c = this.add.circle(db.half.w + p, db.half.h, 20, 0xffffff)
      this.points?.push(c)
    })
  }
}
