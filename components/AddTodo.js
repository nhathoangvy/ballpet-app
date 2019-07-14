import React, { Component, PropTypes } from 'react'
import baseControlUrl from '../db/api.js'

export default class AddTodo extends Component {
         constructor() {
      super();
		
      this.state = {
         data: []
      }
         }
       handleClick(e) {
      const node = this.refs.input
      let item = {
            name : document.getElementById('in').value
          }
            const text = node.value.trim()

const arr = [];
const runTime = () => {
  for(var i = 0 ; i < arr.length; i++){
    var n = arr[i]._id
  }
     this.props.onAddClick(text, n)
      socket.emit('msg',{text, n})
      node.value = ''
      document.getElementById('in').focus()
}
const resolvePromise = (array) => {
    fetch(baseControlUrl, {
        method: 'post',
        headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
          },
         body: JSON.stringify(item)
      }).then((res) => res.json()).then((json)=>{
           array.push(json);
          return array
      }).then(() => {
        runTime();
      });
}
resolvePromise(arr)

   }
   render() {
      return (
         <div>
           <span className="msg"></span>
            <input type = 'text' id="in" ref = 'input'/>
				
            <button onClick = {(e) => this.handleClick(e)}>
               Add
            </button>
				
         </div>
      )
   }

}
