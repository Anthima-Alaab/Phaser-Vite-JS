/**
 * @param {string} name
 * @param {object} prop
 * @param {Function} onChange
 */
export function createControl(name, prop, onChange) {
  let control

  if (prop.type === 'number') control = numControl(name, prop, onChange)
  else if (prop.type === 'boolean') control = boolControl(name, prop, onChange)
  else if (prop.type === 'select') control = selectControl(name, prop, onChange)
  else throw new Error('Unknown control type: ' + prop.type)

  return control
}

/**
 * @param {string} name
 * @param {object} options
 * @param {number} options.value
 * @param {number} options.min
 * @param {number} options.max
 * @param {Function} onChange
 */
export function numControl(name, { value, min, max }, onChange) {
  const control = document.createElement('div')
  control.innerHTML = `
        <label for="${name}">${name}:</label>
        <input type="range" id="${name}" value="${value}" min="${min}" max="${max}" />
        <span id="${name}-value">${value}</span>
      `
  // @ts-expect-error
  control.querySelector('input').addEventListener('input', (e) => {
    // @ts-expect-error
    document.getElementById(`${name}-value`).textContent = e.target.value
    // @ts-expect-error
    onChange(parseInt(e.target.value, 10))
  })
  return control
}

/**
 * @param {string} name
 * @param {object} options
 * @param {boolean} options.value
 * @param {Function} onChange
 */
export function boolControl(name, { value }, onChange) {
  const control = document.createElement('div')
  control.innerHTML = `
      <label for="${name}">${name}:</label>
      <input type="checkbox" id="${name}" ${value ? 'checked' : ''} />
    `
  // @ts-expect-error
  control.querySelector('input').addEventListener('input', (e) => {
    // @ts-expect-error
    onChange(e.target.checked)
  })
  return control
}

/**
 * @template T
 * @param {string} name
 * @param {object} options
 * @param {T[]} options.arr
 * @param {T} options.value
 * @param {Function} onChange
 */
export function selectControl(name, { arr, value }, onChange) {
  const control = document.createElement('div')
  control.innerHTML = `
     <label for="${name}">${name}:</label>
     <select id="${name}">
      ${arr.map((v) => `<option value="${v}" ${value === v ? 'selected' : ''}>${v}</option>`).join('')}
     </select>
   `
  // @ts-expect-error
  control.querySelector('select').addEventListener('change', (e) => {
    // @ts-expect-error
    onChange(e.target.value)
  })
  return control
}
