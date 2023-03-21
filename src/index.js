import * as THREE from "three"
import "./styles/style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// model, scene, camera, renderer
const size = { width: 800, height: 600 }
const { width, height } = size

// Scene
const scene = new THREE.Scene()

// cube
const box = new THREE.BoxGeometry(1, 1, 1)
box.center()
const material = new THREE.MeshBasicMaterial({
  color: "blue",
  wireframe: false,
})
for (let i = 0; i < 4; i++) {
  const cube = new THREE.Mesh(box, material)
  cube.position.x += i * 2
  scene.add(cube)
}

// camera
const camera = new THREE.PerspectiveCamera(25, width / height)
scene.add(camera)
camera.position.z = 6

// renderer
const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({
  canvas,
})
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

renderer.setSize(width, height)

const tick = () => {
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call func again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
