import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initializing the scene

const scene = new THREE.Scene()

// Initializing the camera

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,35)
camera.position.z = 5

// Initializing the object

const SphereGeometry = new THREE.SphereGeometry(2,64,64)
const SphereMaterial = new THREE.MeshBasicMaterial({color:"yellow"})

const SphereMesh = new THREE.Mesh(SphereGeometry,SphereMaterial)
scene.add(SphereMesh)

// Initializing the render

const canvas = document.querySelector("canvas.threejs")
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(window.innerWidth,window.innerHeight)

// Initializing the control

const Control = new OrbitControls(camera,canvas)
Control.enableDamping = true
Control.autoRotate = true

// Initializing the renderloop

const renderloop = () =>{
    Control.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()