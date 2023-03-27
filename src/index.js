import * as THREE from "three"
import "./styles/style.css"

const [width, height] = [window.innerWidth * 0.9, window.innerHeight * 0.9]

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const material2 = new THREE.MeshBasicMaterial({ color: "red" })
const cube = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material2)
cube.scale.set(0.5, 0.5, 0.5)
cube2.position.x = -1
cube2.scale.set(0.5, 0.5, 0.5)
cube2.material.color.setColorName("blue")
scene.add(cube, cube2)

// camera
const camera = new THREE.PerspectiveCamera(75, width / height)
scene.add(camera)
camera.position.set(0, 1.3, 2.5)

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
  cube.position.z -= 0.01

  // getting the camera to chase cube
  camera.position.z -= 0.01

  // renders scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(loop)
}

loop()
