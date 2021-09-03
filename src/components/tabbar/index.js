import './index.css'
import {  useState } from 'react'
import { useHistory } from 'react-router-dom'
let Tabbar = ({store}) => {
  let [isShowTabbar,setShowTab]=useState(true)
  let [currentIndex, setCurrentIndex] = useState(0)
  let history = useHistory()
  let tabbarList = [
    { title: '首页', name: '/home' },
    { title: '我的', name: '/mine' },
  ]
  
  let getPage = (index, page) => {
    setCurrentIndex(index)
    history.replace(page)
  }

  store.subscribe(()=>{
    let data=store.getState()
    setShowTab(data.todos.title === '首页' || data.todos.title === '我的')
  })

  return (
    <div className="tabbar">
      {tabbarList.map((item, index) => {
        return isShowTabbar
        ?
        <div 
          className={`tabbar-item ${currentIndex === index ? 'tabbar-item-active' : ''}`} 
          key={item.name} 
          onClick={() => getPage(index, item.name)} >
          {item.title}
        </div>
        : ''
      })}
    </div>
  )
}
export default Tabbar