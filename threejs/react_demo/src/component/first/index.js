import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'

class First extends Common {
    // constructor(args) {
    //     super(args)
    // }

    componentDidMount() {
        super.componentDidMount()  // 先将基类当中的初始化方法执行完
        this.init()
    }

    init() {
        this.cube = this.getCube()
        this.scene.add(this.cube)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.animation()
    }

    getCube() {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2, 3),
            new THREE.MeshNormalMaterial()
        )
        return mesh
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default First