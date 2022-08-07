import "./style.css"

import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Base stuff
 */
const gui = new dat.GUI()

const canvas = document.querySelector('.webgl')


const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
}
/**
 * Objects
 */
const boxGeo = new THREE.BoxGeometry(1, 1)
const material = new THREE.MeshNormalMaterial()
const box = new THREE.Mesh(boxGeo, material)
box.position.x = 1.5
box.position.y = -.4
// gui.add(box.position, 'y', -5, 5, .1)

scene.add(box)

// responsive canvas
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5

cameraGroup.add(camera)

/**
 * Gsap
 */

gsap.to(box.rotation, {x: -2, ease: "power1.inOut", scrollTrigger: {
   trigger: ".first",
   scrub: 1,
 }})
gsap.to(box.rotation, {y: -3, ease: "power1.inOut", scrollTrigger: {
   trigger: ".second",
   scrub: 1,
 }})
gsap.to(box.rotation, {x: 0, ease: "power1.inOut", scrollTrigger: {
   trigger: ".second",
   scrub: 1,
}})
gsap.to(box.scale, {y: 4, ease: "power1.inOut", scrollTrigger: {
   trigger: ".card-cont",
   scrub: 1,
 }})

/**
 * Cursor
 */
const mouse = {
   x: 0,
   y: 0
}
window.addEventListener('mousemove', (e) => {
   mouse.x = - (e.clientX / sizes.width) + 1.5
   mouse.y = (e.clientY / sizes.height) - .5
})


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
   canvas,
   antialias: true,
   alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
   const elapsedTime = clock.getElapsedTime()
   const deltaTime =  elapsedTime - previousTime
   previousTime = elapsedTime

   cameraGroup.position.x += (- (mouse.x * .25) - cameraGroup.position.x) * 5 * deltaTime
   cameraGroup.position.y += (- (mouse.y * .25) - cameraGroup.position.y) * 5 * deltaTime


   // renderer
   renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
