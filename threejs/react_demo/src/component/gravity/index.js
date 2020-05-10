import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import Common from '../common/common'

const clock = new THREE.Clock()

class Gravity extends Common {
    constructor(args) {
        super(args)
        this.moveState = {
            w: false,
            a: false,
            s: false,
            d: false,
            " ": false,
        }
        this.fallState = false
        this.canJump = false  // 不允许跳
        this.cameraState = {
            y: 20,
            vy: 0,  // y轴上的速度
            g: -0.08  // y轴上向下自由落体的加速度
        }
    } 

    componentDidMount() {
        super.componentDidMount()  // 先将基类当中的初始化方法执行完
        this.init()
    }

    init() {
        this.camera.position.set(100, 10, 100)
        this.camera.lookAt(0, 0, 0)
        this.addControlMode()
        this.addCubes()
        this.animation()
    }

    addCubes() {
        this.cubeList = []
        for(let i=0; i<20; i++) {
            for(let j=0; j<20; j++) {
                let cube = this.getCube()
                cube.position.set(i*10, -5, j*10)
                // cube.rotation.set(Math.random()*Math.PI/2, Math.random()*Math.PI/2, Math.random()*Math.PI/2)
                this.cubeList.push(cube)
            }
        }
        this.scene.add(...this.cubeList)
    }
    
    addControlMode() {
        // 锁定鼠标的控制器
        this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
        this.register()
    }

    register() {
        // 点击canvas标签, 激活鼠标的锁定
        this.renderer.domElement.addEventListener('click', () => {
            this.controls.lock()
        })
        // lock状态的监听
        this.controls.addEventListener('lock', () => {
            console.log('游戏开始')
            if(!this.animate) {
                this.animation()
            }
            this.fallState = true
        })
        this.controls.addEventListener('unlock', () => {
            console.log('游戏结束')
            this.fallState = false
            cancelAnimationFrame(this.animation)
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

    getCube(w=10, h=10, d=10) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            new THREE.MeshBasicMaterial({color: new THREE.Color((0xffffff)*Math.random())})
        )
        return mesh
    }

    checkCube() {
        const raycaster = new THREE.Raycaster(this.camera.position, new THREE.Vector3(0, -1, 0))
        let arr = raycaster.intersectObjects(this.scene.children)
        if(arr[0] && arr[0].distance < 10) {
            this.fallState = false
            this.camera.position.y = arr[0].point.y+10
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

    animation() {
        requestAnimationFrame(this.animation.bind(this))

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

        // 实时更新数据, 相机位置以及朝向等信息
        this.renderer.render(this.scene, this.camera)
    }
}

export default Gravity