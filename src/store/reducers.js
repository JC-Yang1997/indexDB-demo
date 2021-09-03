import {combineReducers} from 'redux'
const todos=(state=[],action)=>{
  // console.log(action)
  switch(action.type){
    case 'ADD':
      return [
        ...state,
        {
          id:action.id
        }
      ]
    case 'SETTITLE':
      return {
        ...state,
        title:action.title
      }
    default:
      return state
  }
}
const todoApp=combineReducers({
  todos
})
export default todoApp