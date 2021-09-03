import {Switch, Route, Redirect} from 'react-router-dom'
import menus from './config'

const Router = () => {
  return (
    <Switch>
      {menus.map(item=>{
        return <Route key={item.key} path={item.key} render={()=><item.component/>}/>
      })}
      <Redirect from="/" to="/home" />
    </Switch>
  )
}
export default Router