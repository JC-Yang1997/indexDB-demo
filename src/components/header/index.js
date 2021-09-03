import {  useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import menus from '../router/config'

let Header = ({ location }) => {
  let [title, setTitle] = useState('首页')
  let [isShowTabbar, setShow] = useState(true)
  let history = useHistory()

  useEffect(() => {
    setShow(true)
    setTitle(menus.find(menu => (menu.key === location.pathname))?.title)
  }, [location])

  return (
    <header className="App-header">
      {!isShowTabbar ? <span className="App-header-back" onClick={() => { history.goBack() }}>返回</span> : ''}
      <p>{title}</p>
    </header>
  )
}
export default withRouter(Header)