import { combineReducers } from 'redux'
import { ADD_TODO } from '../actions/actions'
import { REMOVE_TODO } from '../actions/actions'
import { UPDATE_TODO } from '../actions/actions'
import { RECEIVE_TODO } from '../actions/actions'
import x from './resolve'
const arr = [];
const resolvePromise = (array) => {
    
    x.then((data) => {
        data.forEach((i) => {
              array.push(i);
        })
         return array;
    });
}
resolvePromise(arr);

const todo = (state, action) => {
   switch (action.type) {
	
      case ADD_TODO:
         return {
            _id: action.id,
            name: action.text
         } 
      default:
      return state
   }
}

const todos = (state = arr, action) => {
   switch (action.type) {
	
      case ADD_TODO:
         return [
            ...state,
            todo(undefined, action)
         ]
      case REMOVE_TODO:
            return state.filter(item => item._id !== action.id)
      case UPDATE_TODO:
            return state.map(item => {
                if(item._id === action.id){item.name = action.text}
              return item
             })
      default:
      return state
   }
} 

const todoApp = combineReducers({
   todos
})

export default todoApp