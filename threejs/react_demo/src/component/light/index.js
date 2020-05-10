import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Common from '../common/common'

class Light extends Common {

    componentDidMount() {
        super.componentDidMount()
        this.init()
    }

    init() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // this.getBackground()
        // 添加环境光
        this.addAmbientLight()
        // 添加点光源
        // this.pointLight = this.addPointLight()
        // 添加平行光
        // this.directionalLight = this.addDirectionalLight()
        // 添加半球光
        // this.hemisphereLight = this.addHemisphereLight()
        // 聚光灯
        this.spotLight = this.addSpotLight()
        this.spotLight.castShadow = true  //
        // 平面光
        // this.addRectAreaLight()
        this.cube = this.getCube()
        this.cube.castShadow = true  //
        this.scene.add(this.cube)
        // 添加地板
        this.plane = this.getPlane()
        this.plane.receiveShadow = true  //
        this.scene.add(this.plane)
        this.scene.background = new THREE.Color(0xeeeeee)
        this.renderer.shadowMap.enabled = true  //
        this.animation()
        this.x = -5
        this.dx = 0.01
        this.degree = 0
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
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.1))
    }

    addPointLight() {
        const pointLight = new THREE.PointLight(0xffffff, 1, 1000)
        pointLight.position.set(-5, 5, 5)
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
        this.scene.add(pointLightHelper)
        this.scene.add(pointLight)
        return pointLight
    }

    addDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(1, 1, 1)
        const helper = new THREE.DirectionalLightHelper(directionalLight, 5)
        // helper.position.set(3, 3, 3)
        this.scene.add(helper)
        this.scene.add(directionalLight)
        return directionalLight
    }

    addHemisphereLight() {
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820)
        this.scene.add(hemisphereLight)
        return hemisphereLight
    }

    addSpotLight() {
        const spotLight = new THREE.SpotLight(0xffffff*Math.random())
        spotLight.position.set(0, 10, 0)
        spotLight.angle = Math.PI/6
        this.scene.add(spotLight)
        return spotLight
    }

    addRectAreaLight() {
        const rectAreaLight = new THREE.RectAreaLight(0xffffff, 1, 5, 5)
        rectAreaLight.position.set(5, 5, 0)
        rectAreaLight.lookAt(0, 0, 0)
        this.scene.add(rectAreaLight)
        // const rectAreaLightHelper = new THREE.RectAreaLightHelper(rectAreaLight)
        // this.scene.add(rectAreaLightHelper)
    }

    getPlane() {
        const geometry = new THREE.PlaneGeometry(50, 50)
        // const material = new THREE.MeshLambertMaterial({color: new THREE.Color(0xdddddd)})
        const material = new THREE.MeshPhongMaterial({color: new THREE.Color(0xdddddd)})
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(0, -4, 0)
        plane.rotateX(-Math.PI/2)
        return plane
    }

    getCube() {
        const geometry = new THREE.BoxGeometry(3, 3, 3)
        const material = new THREE.MeshLambertMaterial({color: new THREE.Color(0xff0000)})
        const mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        // this.x = this.x + this.dx
        // this.pointLight.position.set(this.x, 5, 5)
        // this.degree += 0.01
        // this.hemisphereLight.position.set(Math.sin(this.degree), Math.cos(this.degree), 0)
        this.renderer.render(this.scene, this.camera)
    }
}

export default Light