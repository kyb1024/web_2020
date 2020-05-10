import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class Model extends Common {
    // constructor(args) {
    //     super(args)
    // }

    componentDidMount() {
        super.componentDidMount()
        this.init()
    }

    init() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.getBackground()
        this.addLight()
        this.loaderObj()
        this.animation()
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

    addLight() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.8))

    }

    loaderObj() {
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', res=> {
                // console.log(res)  // res.scene是加载头盔的场景
                res.scene.traverse(mesh => {
                    // 背景对所有面进行一一映射
                    if(mesh.isMesh) {
                        // mesh.material.side = THREE.BackSide
                        mesh.material.side = THREE.DoubleSide
                        mesh.material.envMap = this.scene.background
                    }
                })
                this.scene.add(res.scene)
            }
        )
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default Model