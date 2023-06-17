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

// default position = -6 / -3 depending on row
// if cube is multiple of 2/3 make cube go 2 left / right

scene.add(cube)
// vals need to be changeable and loop needs to be a func
const obs = () => {
  for (let i = 0; i < 200; i++) {
    let [val1, val2] = [-4, -2]
    const obsCube = new THREE.Mesh(geometry, material2)
    obsCube.position.z -= i * 5
    if (i % 2 === 0) {
      obsCube.position.x = -3
    } else if (i % 2 !== 0) {
      obsCube.position.x = Math.random() <= 0.5 ? val1 : val2
    } else if (i % 3 == 0) {
      obsCube.position.x = val2
    }
    scene.add(obsCube)
  }
  for (let i = 0; i < 200; i++) {
    const obsCube = new THREE.Mesh(geometry, material2)
    obsCube.position.z -= i * 5
    scene.add(obsCube)
  }
  for (let i = 0; i < 200; i++) {
    const obsCube = new THREE.Mesh(geometry, material2)
    obsCube.position.z -= i * 5
    obsCube.position.x = 3
    scene.add(obsCube)
  }
  for (let i = 0; i < 200; i++) {
    const obsCube = new THREE.Mesh(geometry, material2)
    obsCube.position.z -= i * 5
    obsCube.position.x = 6
    scene.add(obsCube)
  }
  for (let i = 0; i < 200; i++) {
    const obsCube = new THREE.Mesh(geometry, material2)
    obsCube.position.z -= i * 5
    obsCube.position.x = -6
    scene.add(obsCube)
  }
}

obs()

// camera
const camera = new THREE.PerspectiveCamera(75, width / height)
scene.add(camera)
camera.position.set(0, 2.6, 5)

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
  cube.position.z -= 0.05

  // getting the camera to chase cube
  camera.position.z -= 0.05

  // renders scene
  renderer.render(scene, camera)

  window.requestAnimationFrame(loop)
}

loop()
