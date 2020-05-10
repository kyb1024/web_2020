// 页面右侧的通用组件
import React, {Component} from 'react'
import * as THREE from 'three'
import './common.css'

class Common extends Component {
    constructor(args) {
        super(args)
        this.state = {
            width: window.innerWidth-200,
            height: window.innerHeight
        }
    }

    componentDidMount() {
        // this.init()
        // 初始化render, camera, scene
        this.scene = this.getScene()
        this.camera = this.getCamera()
        this.renderer = this.getRender()
        this.registerEvent()  // 页面的事件控制
    }

    registerEvent() {
        window.onresize = this.resize.bind(this)
    }

    resize() {
        this.setState({
            width: window.innerWidth-200,
            height: window.innerHeight
        })
        this.camera.aspect = this.state.width/this.state.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.state.width, this.state.height)
    }

    getScene() {
        const scene = new THREE.Scene()
        return scene
    }

    getCamera() {
        const camera = new THREE.PerspectiveCamera(75, this.state.width/this.state.height, 0.01, 2000)
        camera.position.z = 10
        camera.lookAt(0, 0, 0)
        return camera
    }

    getRender() {
        const renderer = new THREE.WebGLRenderer()
        // 调整渲染颜色范围
        renderer.gammaOutput = true
        renderer.setSize(this.state.width, this.state.height)
        // renderer.domElement 是canvas标签
        document.querySelector(".three-canvas").appendChild(renderer.domElement)
        return renderer
    }

    render() {
        return (
            <div className="three-canvas" style={{width:this.state.width}}>
                
            </div>
        )
    }
}

export default Common