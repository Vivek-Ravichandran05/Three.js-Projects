import * as THREE from 'three';

// -------------------- Scene --------------------

const scene = new THREE.Scene()
scene.background = new THREE.Color("#87CEEB")

// -------------------- Ground(Bowling Lane) --------------------

const planeGeometry = new THREE.PlaneGeometry(6,40)
const planeMaterial = new THREE.MeshStandardMaterial({color:"#C19A6B",side:THREE.DoubleSide})

const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -Math.PI/2
plane.position.y = -1
plane.receiveShadow = true
scene.add(plane)

// -------------------- Bowling Snowball --------------------

const BallGeometry = new THREE.SphereGeometry(0.4,32,32)
const BallMaterial = new THREE.MeshStandardMaterial({color:"white",
    roughness:0.8,
    metalness:0.1
})

const Ball = new THREE.Mesh(BallGeometry,BallMaterial)
Ball.position.set(0,-0.6,6)
Ball.castShadow = true
scene.add(Ball)

// -------------------- Lighting --------------------

// Ambient Light(Overall Lighting)

const ambientlight = new THREE.AmbientLight(0xffffff,0.4)
scene.add(ambientlight)

// Directional Light(main light source)

const directionlight = new THREE.DirectionalLight(0xffffff,0.8)
directionlight.position.set(0,20,15)
directionlight.target.position.set(0,0,-15)
directionlight.castShadow = true
scene.add(directionlight)

// -------------------- Bowling Pins --------------------

const bodyGeometry = new THREE.CylinderGeometry(0.12,0.18,1,32)
const bodyMaterial = new THREE.MeshStandardMaterial({color:0xffffff})


const headGeometry = new THREE.SphereGeometry(0.15,16,32)
const headMaterial = new THREE.MeshStandardMaterial({color:"red"})

function CreatePin(x,z) {
    const PinGroup = new THREE.Group()

    const bodyMesh = new THREE.Mesh(bodyGeometry,bodyMaterial)
    bodyMesh.position.y = 0.5
    bodyMesh.castShadow = true

    const headMesh = new THREE.Mesh(headGeometry,headMaterial)
    headMesh.position.y = 1.1
    headMesh.castShadow = true

    PinGroup.add(bodyMesh,headMesh)
    PinGroup.position.set(x,-1,z)
    scene.add(PinGroup)
}
CreatePin(0,-12)

CreatePin(-0.4,-13)
CreatePin(0.4,-13)

CreatePin(-0.8,-14)
CreatePin(0,-14)
CreatePin(0.8,-14)

CreatePin(-1.2,-15)
CreatePin(-0.4,-15)
CreatePin(0.4,-15)
CreatePin(1.2,-15)

// -------------------- Camera --------------------

const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,50)
camera.position.set(0,1,12)
camera.lookAt(0,0.5,-10)

// -------------------- Renderer --------------------

const canvas = document.querySelector("canvas.threejs")
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// -------------------- Resizing Handling --------------------

window.addEventListener("resize",() => {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

// -------------------- Speed Controls --------------------

let isDragging = false                                      // Setting mouse dragging as false                                           

const raycaster = new THREE.Raycaster()                     //
const mouse = new THREE.Vector2()

let startZ = 6
let startY = -0.6
let maxDrag = 3

let launchSpeed = 0
let islaunched = false

window.addEventListener("mousedown",(event) =>{
    mouse.x = (event.clientX/window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY/window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse,camera)

    const intersects = raycaster.intersectObject(Ball)

    if (intersects.length > 0){
        isDragging = true
    }
})

window.addEventListener("mousemove",(event)=>{
    if (!isDragging) return

    let dragAmount = event.movementY * 0.02

    Ball.position.z += dragAmount

    if (Ball.position.z > startZ + maxDrag){
        Ball.position.z = maxDrag + startZ
    }
    if (Ball.position.z < startZ){
        Ball.position.z = startZ
    }
})

window.addEventListener("mouseup",()=>{
    if (!isDragging) return

    isDragging = false

    let dragDistance = Ball.position.z - startZ
    launchSpeed = dragDistance * 0.2
    islaunched = true
})

function resetBall(){
    Ball.position.set(0,startY,startZ)
    launchSpeed = 0
    islaunched = false
}


function animate(){

    if (islaunched){
    
        Ball.position.z -= launchSpeed

        launchSpeed *= 0.99
    
        if (launchSpeed <= 0.001){
            
            launchSpeed = 0
            islaunched = false
            setTimeout(resetBall,800)
        }
    }

    if (Ball.position.z < -16){

        launchSpeed = 0
        islaunched = false
        setTimeout(resetBall,800)
    }
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
}

animate()
