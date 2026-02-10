import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Initializing the scene

const scene = new THREE.Scene()

// ----------Ground(Bowling Lane)----------

const GroundGeometry = new THREE.PlaneGeometry(6,40)
const GroundMaterial = new THREE.MeshBasicMaterial({color:"#C19A6B"})

const Ground = new THREE.Mesh(GroundGeometry,GroundMaterial)

Ground.rotation.x = - Math.PI/2
Ground.position.y = -1

scene.add(Ground)

// Initializing the object

const SphereGeometry = new THREE.SphereGeometry(0.4,32,32)
const SphereMaterial = new THREE.MeshBasicMaterial({color:"white"})

const SphereMesh = new THREE.Mesh(SphereGeometry,SphereMaterial)
SphereMesh.position.z = 4
scene.add(SphereMesh)

// Initializing the camera

const camera = new THREE.PerspectiveCamera(50,
    window.innerWidth/window.innerHeight,
    0.1,
    50)
camera.position.set(0,2,10)
camera.lookAt(0, 0, -10)


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