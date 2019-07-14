import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import baseControlUrl from '../db/api.js'
import { removeTodo } from '../actions/actions'
import { updateTodo } from '../actions/actions'

import { connect } from 'react-redux'
const select = (state) => {
   return {
      visibleTodos: state.todos
   }
}
class Todo extends Component {
     constructor() {
      super();
		
      this.state = {
         data: [],
         visible: false
      }
  this.onClick = this.delete.bind(this);
  this.delete = this.delete.bind(this)
  this.update = this.update.bind(this)
  this.hidden = this.hidden.bind(this)
   }
      delete(event){
        const { dispatch, visibleTodos } = this.props
        const {id} = event.target
         const n = id
         dispatch(removeTodo(n))
           fetch(baseControlUrl + id, {
            method: 'delete',
               headers: {
                  'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
               }
           })
        socket.emit('removeMsg', {n})
      }

update(event) {
  const { dispatch, visibleTodos } = this.props
       const {id} = event.target
        const n = id
        const text = document.querySelector('input#'+ id)
         const str = text.value.trim()
         dispatch(updateTodo(text.value, n))
           const item = {
      _id: id,
      name: text.value
    }
    fetch(baseControlUrl + id, {
        method: 'PUT',
            headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
          },
         body: JSON.stringify(item)
    })
    socket.emit('editMsg', {text:text.value, n:n})
    text.value = ''
    this.setState({visible: !this.state.visible});
}
 hidden() {
    this.setState({visible: !this.state.visible});
  }
   render() {
     
      return (
         <li>
             <Link to={"/posts/" + this.props._id}> {this.props.name}</Link>
             <a onClick={this.delete} id={this.props._id}> X </a>
             <a onClick={this.hidden} > Edit </a>
              { this.state.visible ? <input id={this.props._id}/> : null}
              { this.state.visible ? <button onClick={this.update} id={this.props._id} type="submit">OK</button> : null}
         </li>
      )
   }
}

export default connect(select)(Todo)
