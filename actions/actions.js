
export const ADD_TODO = 'ADD_TODO'

export const id = (id) => {
    return id
}

export const addTodo = (text, n) => {
    
   return {
      type: ADD_TODO,
      id: id(n),
      text
   }
}

export const REMOVE_TODO = 'REMOVE_TODO'

export const removeTodo = (n) => {
    return {
        type: REMOVE_TODO,
        id: id(n)
    }
}

export const UPDATE_TODO = 'UPDATE_TODO'

export const updateTodo = (text, n) => {
    return {
        type: UPDATE_TODO,
        id: id(n),
        text
    }
}

export const LOGIN = 'LOGIN'

export const login = (params) => {
    return {
        type: LOGIN,
        name: id(n),
        text
    }
}