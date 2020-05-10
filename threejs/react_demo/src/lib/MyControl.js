import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'

export default class myControl {
    constructor(camera, dom, floor) {
        this.camera = camera
        this.dom = dom
        this.floor = floor
        this.moveState = {
            w: false,
            a: false,
            s: false,
            d: false,
            " ": false,
        }
        this.fallState = false
        this.canJump = false  // 不允许跳
        this.init()
    }

    init() {
        // 锁定鼠标的控制器
        this.controls = new PointerLockControls(this.camera, this.dom)
        this.reset()
        this.register()
    }

    reset() {
        this.cameraState = {
            y: 20,
            vy: 0,  // y轴上的速度
            g: -0.08  // y轴上向下自由落体的加速度
        }
        this.camera.position.set(100, 0, 150)
    }

    register() {
        // 点击canvas标签, 激活鼠标的锁定
        this.dom.addEventListener('click', () => {
            this.controls.lock()
        })
        // lock状态的监听
        this.controls.addEventListener('lock', () => {
            console.log('游戏开始')
            // if(!this.animate) {
            //     this.animation()
            // }
            this.fallState = true
        })
        this.controls.addEventListener('unlock', () => {
            console.log('游戏结束')
            this.fallState = false
            // cancelAnimationFrame(this.animation)
            this.animate = null
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

    checkCube() {
        const raycaster = new THREE.Raycaster(this.camera.position, new THREE.Vector3(0, -1, 0))
        let arr = raycaster.intersectObjects(this.floor)
        if(arr[0] && arr[0].distance < 10) {
            this.fallState = false
            // this.camera.position.y = arr[0].point.y+10
            this.camera.position.y = 10
            this.cameraState.vy = 0
        }
    }

    falling() {
        if(this.fallState) {
            this.cameraState.vy += this.cameraState.g
            this.cameraState.y += this.cameraState.vy
            this.camera.position.y = this.cameraState.y
        }else {
            this.cameraState.vy = 0
            this.canJump = true
        }
    }

    update() {
        // 根据moveState修改镜头位置
        const speed = 1
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
        if(this.moveState[" "]) {
            if(this.canJump) {
                this.canJump = false
                this.cameraState.vy = 2
                this.fallState = true
            }
        }

        this.falling()

        this.checkCube()
    }
}