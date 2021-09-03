import HOME from '../../view/home/index'
import MIME from '../../view/mine/index'
import ABOUT from '../../view/about/index'

const menus = [
  { key: '/home', title: '首页', icon: 'mobile', component: HOME },
  { key: '/mine', title: '我的', icon: 'mobile', component: MIME },
  { key: '/about', title: '关于', icon: 'mobile', component: ABOUT },
]
export default menus