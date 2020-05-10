import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'

class Second extends Common {
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
        this.animation()
        this.cube = this.getCube()
        this.scene.add(this.cube)
    }

    getCube() {
        // const video = document.createElement("video")
        // video.src = "textures/sintel.mp4"
        // video.autoplay = true
        // const texture = new THREE.VideoTexture(video)
        const loader = new THREE.TextureLoader()
        const texture = loader.load('textures/758px-Canestra_di_frutta_(Caravaggio).jpg') 
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 6),
            new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide})
        )
        return mesh
    }

    getBackground() {
        const loader = new THREE.CubeTextureLoader()
        const bgTexture = loader.setPath('/textures/cube/Park2/')
            .load([
                'posx.jpg','negx.jpg',
                'posy.jpg','negy.jpg',
                'posz.jpg','negz.jpg',
            ])
        this.scene.background = bgTexture
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default Second