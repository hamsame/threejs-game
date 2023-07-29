export const movements = (cube, camera) => {
  // follow user controls
  document.onkeydown = (e) => {
    if (e.key === "ArrowLeft") {
      // on left arrow key
      if (cube.position.x > -7) {
        cube.position.x -= 1
        camera.position.x -= 1
      }
    }
    if (e.key === "ArrowRight") {
      // on right arrow key
      if (cube.position.x < 7) {
        cube.position.x += 1
        camera.position.x += 1
      }
    }
  }
  document.onmousedown = (e) => {
    let midPoint = window.innerWidth / 2
    if (e.clientX < midPoint) {
      if (cube.position.x > -6) {
        // on left side click
        cube.position.x -= 1
        camera.position.x -= 1
      }
    } else if (e.clientX >= midPoint) {
      if (cube.position.x < 6) {
        // on right side click
        cube.position.x += 1
        camera.position.x += 1
      }
    }
  }
}
