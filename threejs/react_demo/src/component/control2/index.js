import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'

const clock = new THREE.Clock()

class Control2 extends Common {
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
        this.camera.position.z = 20
        this.addControlMode()
        this.addCubes()
        // console.log(this.scene.children)
        this.addCameraCenterRaycaster()
        this.animation()
    }

    addCameraCenterRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.mouse = {
            x: 0,
            y: 0
        }
        window.addEventListener("click", (e) => {
            this.mouse.x = (e.clientX-200) / (window.innerWidth-200) * 2 -1
            this.mouse.y = -e.clientY / window.innerHeight * 2 +1
            // 通过摄像机和鼠标位置更新射线
            this.raycaster.setFromCamera(
                this.mouse,
                this.camera
            )
            // 计算物体和射线的焦点
            let arr = this.raycaster.intersectObjects(this.scene.children)
            if(arr.length > 0) {
                // this.scene.remove(arr[0].object)
                arr[0].object.material.color = new THREE.Color(0xff0000)
            }
        })
        
    }

    addCubes() {
        this.cubeList = []
        for(let i=0; i<200; i++) {
            let cube = this.getCube()
            cube.position.set((Math.random()-.5)*50, (Math.random()-.5)*50, (Math.random()-.5)*50)
            cube.rotation.set(Math.random()*Math.PI/2, Math.random()*Math.PI/2, Math.random()*Math.PI/2)
            this.cubeList.push(cube)
        }
        this.scene.add(...this.cubeList)
    }
    
    addControlMode() {
        // 锁定鼠标的控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.register2()
    }

    register2() {
        // 点击canvas标签, 激活鼠标的锁定
        // this.renderer.domElement.addEventListener('click', () => {
        //     this.controls.lock()
        // })
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
        this.controls.update()
        // this.controls.update(clock.getDelta())

        // 根据moveState修改镜头位置
        const speed = 0.5
        // console.log(this.moveState.w)
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

        // 实时更新数据, 相机位置以及朝向等信息
        this.renderer.render(this.scene, this.camera)
    }
}

export default Control2