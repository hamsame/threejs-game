import * as THREE from "three"
import "./styles/style.css"
const [width, height] = [window.innerWidth * 0.9, window.innerHeight * 0.9]

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const material2 = new THREE.MeshBasicMaterial({ color: "green" })
const material3 = new THREE.MeshBasicMaterial({ color: "blue" })
const cube = new THREE.Mesh(geometry, material)

// cube 1 bounding box
// let cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
// cubeBB.setFromObject(cubeBB)
cube.geometry.computeBoundingBox()
console.log(cube.geometry.boundingBox)

const geometry2 = new THREE.BoxGeometry(3, 2, 10)
const barrier1 = new THREE.Mesh(geometry2, material2)
const barrier2 = new THREE.Mesh(geometry2, material2)
barrier1.position.set(-11, 0, cube.position.z)
barrier1.scale.z = 200
barrier2.position.set(11, 0, cube.position.z)
barrier2.scale.z = 200

scene.add(cube, barrier1, barrier2)

const loadObs = () => {
  const xCoords = [-6, -3, 0, 3, 6]
  xCoords.forEach((xcoord) => {
    for (let i = 0; i < 200; i++) {
      let xPosition = xcoord
      let [val1, val2] = [xPosition + 1, xPosition - 1]
      const obsCube = new THREE.Mesh(geometry, material3)
      obsCube.position.z -= i * 5
      if (i % 2 === 0) {
        obsCube.position.x = xcoord
      } else if (i % 3 == 0) {
        obsCube.position.x = val1
      } else if (i % 2 !== 0) {
        obsCube.position.x = val2
      }
      scene.add(obsCube)
    }
  })
}

loadObs()

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
