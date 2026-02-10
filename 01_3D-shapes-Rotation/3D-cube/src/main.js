import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Initializing the scene

const scene = new THREE.Scene()

// Adding Objects to the scene

const cubeGeometry = new THREE.BoxGeometry(2,2,2)
const cubeMaterial = new THREE.MeshBasicMaterial({color:"yellow",side:THREE.DoubleSide})

const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial)
scene.add(cubeMesh)

// Initializing the camera

const camera = new THREE.PerspectiveCamera(50,
    window.innerWidth/window.innerHeight,
    0.1,
    35)
camera.position.z = 5


// Initializing the render

const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({canvas : canvas})
renderer.setSize(window.innerWidth,window.innerHeight)

// Initializing the control
const control = new OrbitControls(camera,canvas)
control.enableDamping = true
control.autoRotate = true

// Initializing the renderloop
const renderloop = () =>{
    control.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()