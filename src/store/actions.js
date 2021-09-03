let nextTodoId=0
export const add=id=>{
  return {
    type:'ADD',
    id:nextTodoId++
  }
}
