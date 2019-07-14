import React from 'react'
import ALink from './ActiveLink'
import {Link} from 'react-router'
import Home from './Home.js'
import baseControlUrl from '../db/api.js'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import { connect } from 'react-redux'
import { addTodo } from '../actions/actions'
import { removeTodo } from '../actions/actions'
import { updateTodo } from '../actions/actions'
const select = (state) => {
   return {
      visibleTodos: state.todos
   }
}
class Contact extends React.Component{
     constructor() {
      super();
		
      this.state = {
         data: []
      }
   }
 componentDidMount(){
document.getElementById('in').addEventListener('focus', () => {socket.emit('typing')})
document.getElementById('in').addEventListener('blur', () => {socket.emit('stopTyping')})
   const n = []
    const origin = document.title;
   const flashTitle = (pageTitle, newMessageTitle) =>
  {
  const interv = setInterval(() => { if (document.title == pageTitle){ document.title = newMessageTitle;}
 else { document.title = pageTitle; } },800)
document.getElementById('in').addEventListener('click', () => {
  clearInterval(interv)
document.title=origin})
document.addEventListener( 'visibilitychange' , () => {
  clearInterval(interv)
  document.title=origin}, false );
    }
   const { dispatch, visibleTodos } = this.props
    socket.on('newmsg', (data) => {
      document.getElementById('in').click()
      dispatch(addTodo(data.text, data.n)) 
        n.push([data.n].length)
         flashTitle(origin, `(${n.length}) New message`)
    })
   socket.on('typingMsg', () => {document.querySelector('.msg').innerHTML = 'Typing'})
   socket.on('stopTypingMsg', () => {document.querySelector('.msg').innerHTML = ''})
     socket.on('noteMsg', (data) => {dispatch(removeTodo(data.n))})
      socket.on('editedMsg', (data) => {dispatch(updateTodo(data.text,data.n))})
    fetch(baseControlUrl, {
        method: 'GET',
        headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          
         // mode: 'no-cors'
    }).then((res) => res.json()).then((json)=>{
           return this.setState({data : json})
      })
 }

  render() {
    const { dispatch, visibleTodos } = this.props
    return (
      <div>
         {this.props.children || <Home/>}
                   <AddTodo onAddClick = {(text, n) => dispatch(addTodo(text, n))}/>
      
            <h1>Lists</h1>

<TodoList todos = {visibleTodos}/>
      </div>
    )
  }
}

export default connect(select)(Contact)
