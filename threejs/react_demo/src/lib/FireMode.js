import * as THREE from 'three'

export default class FireMode {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene
        // 存放子弹, 对子弹的维护工作
        this.ballList = []
        this.init()
    }

    init() {
        this.register()
    }

    register() {
        window.addEventListener('keydown', e => {
            const key = e.key.toLowerCase()
            if(key === 'f') {
                this.cameraInfo = this.getCameraInfo()
                this.fireBoll(this.cameraInfo)
            }
        })
    }

    getCameraInfo() {
        // 相机的位置
        const position = this.camera.position
        // 通过raycaster访问相机朝向
        const raycaster = new THREE.Raycaster()
        const coords = {
            x: 0,
            y: 0
        }
        raycaster.setFromCamera(coords, this.camera)
        // 相机的朝向
        const direction = raycaster.ray.direction
        return {position, direction}
    }

    fireBoll({position, direction}) {
        this.ballList.push(this.createBall(position, direction))
    }

    createBall(position, direction) {
        const geometry = new THREE.SphereGeometry(0.5, 10, 10)
        const material = new THREE.MeshBasicMaterial({color: new THREE.Color(0x000000)})
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(position.x, position.y, position.z)
        this.scene.add(mesh)
        position = Object.assign({}, position)
        let that = this
        return {
            mesh,
            position,
            direction,
            update: function() {
                position.x += direction.x
                position.y += direction.y
                position.z += direction.z
                this.mesh.position.set(position.x, position.y, position.z)
            },
            kill: function() {
                that.scene.remove(this.mesh)
            }
        }
    }

    update() {
        this.ballList.forEach(ball => {
            ball.update()
        })
    }
}