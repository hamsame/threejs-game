import * as THREE from "three"
import "./styles/style.css"

const [width, height] = [window.innerWidth * 0.9, window.innerHeight * 0.9]

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const material2 = new THREE.MeshBasicMaterial({ color: "blue" })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const obstacles = () => {
  for (let i = -5; i < 3; i++) {
    const obstacle = new THREE.Mesh(geometry, material2)
    obstacle.position.x = i + i / 0.5
    obstacle.position.z = -3
    // add to scene
    scene.add(obstacle)
  }
}
obstacles()

// camera
const camera = new THREE.PerspectiveCamera(75, width / height)
scene.add(camera)
camera.position.set(0, 1.3, 3.5)

// const renderer
const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({
  canvas,
})

const resizeCanvas = () => {
  camera.aspect = width / height
  renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  camera.updateProjectionMatrix()
}

renderer.setSize(width, height)
const loop = () => {
  window.addEventListener("resize", resizeCanvas)

  // move cube away from camera
  cube.position.z -= 0.02

  // getting the camera to chase cube
  camera.position.z -= 0.02

  // renders scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(loop)
}

loop()
