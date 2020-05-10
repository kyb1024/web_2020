// 路由配置
/**
 * name: 网页名称
 * path: 网页路径
 * com: 组件
 */
import First from './component/first/index'
import Second from './component/second/index'
import Model from './component/model/index'
import Model2 from './component/model2/index'
import Light from './component/light/index'
import Mirror from './component/mirror/index'
import Control from './component/control/index'
import Control2 from './component/control2/index'
import Gravity from './component/gravity/index'
import Demo from './component/demo/index'

export default [
    {
        name: "项目启动",
        path: "/first",
        com: First
    }, {
        name: "导入静态资源",
        path: "/second",
        com: Second
    }, {
        name: "导入gltf模型文件",
        path: "/model",
        com: Model
    }, {
        name: "导入mmd模型文件",
        path: "/model2",
        com: Model2
    }, {
        name: "光与影",
        path: "/light",
        com: Light
    }, {
        name: "镜子案例",
        path: "/mirror",
        com: Mirror
    }, {
        name: "模型控制",
        path: "/control",
        com: Control
    }, {
        name: "交互控制",
        path: "/control2",
        com: Control2
    }, {
        name: "第一人称重力",
        path: "/gravity",
        com: Gravity
    }, {
        name: "案例",
        path: "/demo",
        com: Demo
    }
]