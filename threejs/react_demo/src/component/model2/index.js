import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'

const AMMo = require('three/examples/js/libs/ammo')
window.Ammo = new AMMo()
const clock = new THREE.Clock()

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
        this.camera.position.set(0, 0, 50)
        this.renderer = new OutlineEffect(this.renderer)
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
        // const loader = new MMDLoader()
        // loader.load('models/mmd/miku/miku_v2.pmd', mesh => {
        //     mesh.position.set(0, -20, 0)
        //     this.scene.add(mesh)
        // })
        this.MMDhelper = new MMDAnimationHelper()
        const loader = new MMDLoader()
        loader.loadWithAnimation(
            'models/mmd/miku/miku_v2.pmd',
            'models/mmd/vmds/wavefile_v2.vmd',
            mmd => {
                this.MMDhelper.add(mmd.mesh, {
                    animation: mmd.animation,
                    physics: true
                })
                // mmd.mesh.position.set(0, -20, 0)
                this.scene.add(mmd.mesh)

                const audioLoader = new THREE.AudioLoader()
                audioLoader.load('models/mmd/audios/wavefile_short.mp3', music => {
                    // 音频的管理器
                    const listener = new THREE.AudioListener()
                    // 音乐obj对象
                    const audio = new THREE.Audio(listener).setBuffer(music)
                    // 音频关联到动画中, 设置了延时
                    this.MMDhelper.add(audio, {delayTime: 160/30})
                    this.scene.add(audio)
                    this.scene.add(listener)
                })
                // 相机模块
                loader.loadAnimation(
                    'models/mmd/vmds/wavefile_camera.vmd',
                    this.camera,
                    cameraAnimation => {
                        this.MMDhelper.add(this.camera, {
                            animation: cameraAnimation
                        })
                    }
                )
            }
        )
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.MMDhelper.update(clock.getDelta())
        this.renderer.render(this.scene, this.camera)
    }
}

export default Model