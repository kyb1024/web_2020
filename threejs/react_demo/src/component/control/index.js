import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {FlyControls} from 'three/examples/jsm/controls/FlyControls'
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import Common from '../common/common'

const clock = new THREE.Clock()

class First extends Common {
    constructor(args) {
        super(args)
        this.moveState = {
            w: false,
            a: false,
            s: false,
            d: false,
        }
    }

    componentDidMount() {
        super.componentDidMount()  // 先将基类当中的初始化方法执行完
        this.init()
    }

    init() {
        this.cubeList = []
        for(let i=0; i<200; i++) {
            let cube = this.getCube()
            cube.position.set((Math.random()-.5)*50, (Math.random()-.5)*50, (Math.random()-.5)*50)
            cube.rotation.set(Math.random()*Math.PI/2, Math.random()*Math.PI/2, Math.random()*Math.PI/2)
            this.cubeList.push(cube)
        }
        this.scene.add(...this.cubeList)
        this.camera.position.z = 20
        this.addControlMode()
        this.animation()
    }
    
    addControlMode() {
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // this.lockState = true
        // this.controls.enabled = this.lockState
        // this.register()

        // this.controls = new TrackballControls(this.camera, this.renderer.domElement)
        // this.controls.noPan = false  // 是否允许平移操作
        // this.controls.noRotate = false  // 是否允许旋转
        // this.controls.noZoom = false  // 是否允许放大缩小
        // this.controls.rotateSpeed = 3  // 1
        // this.controls.zoomSpeed = 2

        // this.controls = new FlyControls(this.camera, this.renderer.domElement)  //wasd rf
        // this.controls.movementSpeed = 10
        // this.controls.rollSpeed = 0.5
        // // this.controls.autoForward = true
        // // this.controls.dragToLook = true

        // this.controls = new FirstPersonControls(this.camera, this.renderer.domElement)
        // this.controls.lookSpeed = 0.1
        // this.controls.movementSpeed = 30
        // this.lockState = true
        // this.controls.enabled = this.lockState
        // this.register1()

        // 锁定鼠标的控制器
        this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
        this.register2()
    }

    register1() {
        window.addEventListener('keydown', e => {
            let key = e.key.toLocaleLowerCase()
            if(key === 'l') {
                this.lockState = !this.lockState
                this.controls.enabled = this.lockState
            }
        })
    }
    register2() {
        // 点击canvas标签, 激活鼠标的锁定
        this.renderer.domElement.addEventListener('click', () => {
            this.controls.lock()
        })
        // lock状态的监听
        this.controls.addEventListener('lock', () => {
            console.log('游戏开始')
        })
        this.controls.addEventListener('unlock', () => {
            console.log('游戏结束')
        })
        // wsad按键状态与改变
        window.addEventListener('keydown', e => {
            let {key} = e
            if(this.moveState[key] === false) {
                this.moveState[key] = true
            }
        })
        window.addEventListener('keyup', e => {
            let {key} = e
            if(this.moveState[key] === true) {
                this.moveState[key] = false
            }
        })
    }

    getCube() {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: new THREE.Color((0xffffff)*Math.random())})
        )
        return mesh
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        // this.controls.update()
        // this.controls.update(clock.getDelta())

        // 根据moveState修改镜头位置
        const speed = 0.5
        console.log(this.moveState.w)
        if(this.moveState.w) {
            this.camera.translateZ(-speed)
        }
        if(this.moveState.s) {
            this.camera.translateZ(speed)
        }
        if(this.moveState.a) {
            this.camera.translateX(-speed)
        }
        if(this.moveState.d) {
            this.camera.translateX(speed)
        }

        this.renderer.render(this.scene, this.camera)
    }
}

export default First