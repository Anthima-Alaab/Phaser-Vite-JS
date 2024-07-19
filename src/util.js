/**
 * @param {Phaser.Scenes.ScenePlugin} scene
 */
export function createBackButton(scene) {
  const button = document.createElement('button')
  button.innerHTML = 'Back'
  button.onclick = () => scene.start('MainMenu')
  return button
}
