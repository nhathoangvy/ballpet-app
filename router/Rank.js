import React from 'react'
import ALink from './ActiveLink'
import baseControlUrl from '../db/api.js'
import Menu from './Menu.js'

class Rank extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: []
    }

 }

  componentDidMount() {
  var history = JSON.parse(localStorage.getItem('user'));


    fetch(baseControlUrl + 'ranking', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization' : history.token
      }
    }).then((res) => res.json()).then((data)=>{
        for(var i =0 ; i < data.length; i++) {
            document.getElementById('inbox').innerHTML += "<tr><td>" + Number(i+1) + "</td><td>" + data[i].name + "</td><td>" + data[i].win + "</td><td>" + data[i].date + "</td></tr>"
        }
    });
    return this.setState({data:history})
  }

 
  render() {
    return (
      <div id = "home">
    {this.props.children || <Menu/>}
      <div id = "box">
        <h3>Ranking(win scores)</h3>
        <div id = 'table'>
        <table>
          <thead>
          <tr><td>TOP</td><td>NAME</td><td>WIN</td><td>NOW</td></tr>
            </thead>
          <tbody id= 'inbox'>

          </tbody>
        </table>
        </div>
      </div>
          </div>
    )
  }
}

export default Rank