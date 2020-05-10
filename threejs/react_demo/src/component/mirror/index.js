import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'
import {Reflector} from 'three/examples/jsm/objects/Reflector'  // 镜面生成器

class Mirror extends Common {
    constructor(args) {
        super(args)
        this.ballStaete = {
            // 小球的位置
            x: 0,
            y: 0,
            z: 0,
            // 小球的速度
            vx: (Math.random()-0.5)*3,
            vy: (Math.random()-0.5)*3,
            vz: (Math.random()-0.5)*3,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.init()
    }

    init() {
        let planeList = []
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.getBackground()
        this.ball = this.addBall()
        this.ball.castShadow = true
        this.addAmbientLight()
        this.addPointLight()
        this.mirror = this.addMirror(new THREE.Vector3(0, 0, -30))
        planeList.push(this.getPlane(new THREE.Vector3(30, 0, 0)))
        planeList.push(this.getPlane(new THREE.Vector3(-30, 0, 0)))
        planeList.push(this.getPlane(new THREE.Vector3(0, 30, 0)))
        planeList.push(this.getPlane(new THREE.Vector3(0, -30, 0)))
        planeList.push(this.getPlane(new THREE.Vector3(0, 0, 30)))
        planeList.forEach(item => item.receiveShadow = true)
        this.scene.add(this.ball, this.mirror, ...planeList)
        this.camera.position.set(0, 0, 100)
        this.animation()
        this.renderer.shadowMap.enabled = true
    }

    getBackground() {
        const loader = new THREE.CubeTextureLoader()
        const bgTexture = loader.setPath('/textures/cube/Bridge2/')
            .load([
                'posx.jpg','negx.jpg',
                'posy.jpg','negy.jpg',
                'posz.jpg','negz.jpg',
            ])
        this.scene.background = bgTexture
    }

    addAmbientLight() {
        const ambientLight = new THREE.AmbientLight(0x0000ff, 0.5)
        this.scene.add(ambientLight)
    }

    addPointLight() {
        const pointLight = new THREE.PointLight(0xffffff, 0.3)
        pointLight.castShadow = true
        this.scene.add(pointLight)
    }

    addMirror(position, direction=new THREE.Vector3(0, 0 ,0)) {
        const geometry = new THREE.PlaneGeometry(60, 60)
        const mirrorMesh = new Reflector(geometry, {
            // color: new THREE.Color(0x7f7f7f),
            textureWidth: this.weight,
            textureHeight: this.height
        })
        mirrorMesh.position.set(position.x, position.y, position.z)
        mirrorMesh.lookAt(direction.x, direction.y, direction.z)
        return mirrorMesh
    }

    addBall() {
        const geometry = new THREE.SphereGeometry(2, 30, 30)
        const material = new THREE.MeshPhongMaterial({
            envMap: this.scene.background
        })
        const mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    getPlane(position, direction=new THREE.Vector3(0, 0, 0)) {
        const geometry = new THREE.PlaneGeometry(60, 60)
        const material = new THREE.MeshPhongMaterial({
            // side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('textures/brick_diffuse.jpg')
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(position.x, position.y, position.z)
        mesh.lookAt(direction.x, direction.y, direction.z)
        return mesh
    }

    updateBallState() {
        // 更新位置
        this.ballStaete.x += this.ballStaete.vx
        this.ballStaete.y += this.ballStaete.vy
        this.ballStaete.z += this.ballStaete.vz
        // 维护速度的正确性
        if(this.ballStaete.x > 28) {
            this.ballStaete.x = 28
            this.ballStaete.vx *= -0.6
        }
        if(this.ballStaete.x < -28) {
            this.ballStaete.x = -28
            this.ballStaete.vx *= -0.6
        }
        if(this.ballStaete.y > 28) {
            this.ballStaete.y = 28
            this.ballStaete.vy *= -0.6
        }
        if(this.ballStaete.y < -28) {
            this.ballStaete.y = -28
            this.ballStaete.vy *= -.6
        }
        if(this.ballStaete.z > 28) {
            this.ballStaete.z = 28
            this.ballStaete.vz *= -0.6
        }
        if(this.ballStaete.z < -28) {
            this.ballStaete.z = -28
            this.ballStaete.vz *= -0.6
        }

        // 维护加速度
        this.ballStaete.vy += -0.02
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        // 修改球的位置信息
        this.updateBallState()
        // 将数据反映到页面中
        this.ball.position.set(this.ballStaete.x, this.ballStaete.y, this.ballStaete.z)
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default Mirror