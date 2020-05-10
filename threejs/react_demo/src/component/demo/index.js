import * as THREE from 'three'
import FireMode from '../../lib/FireMode'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import Common from '../common/common'
import myControl from '../../lib/MyControl'

class Index extends Common {
    componentDidMount() {
        super.componentDidMount()  // 先将基类当中的初始化方法执行完
        this.init()
    }

    init() {
        // this.camera.position.set(100, 0, 100)
        this.camera.lookAt(0, 0, 0)
        this.addCubes()
        this.addMMD()
        this.addControlMode()
        // 让相机产生发射物体的操作
        this.fireSystem = new FireMode(this.camera, this.scene)
        this.scene.background = new THREE.Color(0xffffff)
        this.animation()
    }

    addControlMode() {
        this.control = new myControl(this.camera, this.renderer.domElement, this.cubeList)
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

        for(let i=0; i<20; i++) {
            let cube = this.getCube()
            cube.position.set(90+i*10, 5+i*10, 100)
            this.cubeList.push(cube)
        }
        this.scene.add(...this.cubeList)
    }

    getCube(w=10, h=10, d=10) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            new THREE.MeshBasicMaterial({color: new THREE.Color((0xffffff)*Math.random())})
        )
        return mesh
    }

    addMMD() {
        // this.MMDhelper = new MMDAnimationHelper()
        const loader = new MMDLoader()
        this.mmdList = []
        for(let i=0; i<10; i++) {
            loader.load(
                'models/mmd/miku/miku_v2.pmd',
                mmd => {
                    mmd.position.set(Math.random()*200, 0, Math.random()*200)
                    this.mmdList.push(mmd)
                    this.scene.add(mmd)
                }
            )
        }
    }

    checkDistance(obj1, obj2, distance) {
        let dx = obj1.position.x - obj2.position.x
        let dy = obj1.position.y - obj2.position.y
        let dz = obj1.position.z - obj2.position.z
        return dx*dx + dy*dy + dz*dz < distance*distance
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.control.update()
        // 相机位置更新,物体更新
        this.fireSystem.update()
        // 修改mmd的朝向
        this.mmdList.forEach(mmd => {
            mmd.lookAt(this.camera.position.x, 0, this.camera.position.z)
        })
        // 对发射出来的子弹和mmdList里面的每一个人进行判断, 距离小于一定值的时候删除
        this.fireSystem.ballList.forEach((ball, index) => {
            if(!this.checkDistance(ball, this.camera, 200)) {
                ball.kill()
                this.fireSystem.ballList.splice(index, 1)
                index--
            }
            this.mmdList.forEach((mmd, index2) => {
                if(this.checkDistance(ball, mmd, 10)) {
                    ball.kill()
                    this.fireSystem.ballList.splice(index, 1)
                    this.scene.remove(mmd)
                    this.mmdList.splice(index2, 1)
                }
            })
        })
        if(this.control.cameraState.y < -100) {
            this.control.reset()
        }
        this.renderer.render(this.scene, this.camera)
    }
}

export default Index