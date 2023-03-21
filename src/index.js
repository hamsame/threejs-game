import * as THREE from "three"
import "./styles/style.css"

// console.log(THREE)
// model, scene, camera, renderer

const size = { width: 800, height: 600 }
const { width, height } = size

// Scene
const scene = new THREE.Scene()

// cube
const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const cube = new THREE.Mesh(box, material)
scene.add(cube)

// camera
const camera = new THREE.PerspectiveCamera(75, width / height)
scene.add(camera)
camera.position.z = 5

// renderer
const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(width, height)
renderer.render(scene, camera)
