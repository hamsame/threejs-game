import * as THREE from "three"
import "./styles/style.css"

const [width, height] = [window.innerWidth * 0.9, window.innerHeight * 0.9]

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const cube = new THREE.Mesh(geometry, material)
cube.scale.set(0.5, 0.5, 0.5)
scene.add(cube)

// camera
const camera = new THREE.PerspectiveCamera(75, width / height)
scene.add(camera)
camera.position.set(0, 1.3, 2)

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

  // renders scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(loop)
}

loop()
