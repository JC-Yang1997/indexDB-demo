
import './App.css';
import Tabbar from './components/tabbar/index'
import Routes from './components/router'
import {BrowserRouter} from 'react-router-dom'
import Header from './components/header/index'
  
let App = ({store}) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header store={store} />
        <Routes/>
        <Tabbar store={store}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
