import React from 'react'
import Home from './Home.js'
import baseControlUrl from '../db/api.js'

class Post extends React.Component{
     constructor() {
      super();
		
      this.state = {
         data: []
      }

   }

    componentDidMount() {
      let parts = window.location.href.split('/')
      let lastSegment = parts.pop() || parts.pop()
        fetch(baseControlUrl + lastSegment, {
        method: 'GET'
    })
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                      return this.setState({data: json});
                    });

    }
update() {
  let parts = window.location.href.split('/')
      let lastSegment = parts.pop() || parts.pop()
       const item = {
      _id: lastSegment,
      name: document.getElementById('name').value
    }
   fetch(baseControlUrl + lastSegment, {
        method: 'PUT',
            headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
          },
         body: JSON.stringify(item)
    }).then(() => {
        history.go(-1);
      })
}

  render() {
    return (
       <div>
       {this.props.children || <Home/>}
      <div>
        <ul>
           <li>{this.state.data._id}</li>
            <li>{this.state.data.name}
              <br/>
            Edit:<br/>

            <input id="name" name="name"/>
            <input type="submit" onClick={this.update} />



            </li>
       </ul>
      </div>
      </div>
    )
  }
}

export default Post