import React from 'react'
import ALink from './ActiveLink'
import baseControlUrl from '../db/api.js'

class Menu extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: []
    }

 }

  componentDidMount() {
    var history = JSON.parse(localStorage.getItem('user'));

    if(!history){
      window.location.href = '/login';
    }
    fetch(baseControlUrl + 'info' , {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization' : history.token
      }
    }).then((res) => res.json()).then((data)=>{
    if(data.error){
      alert("Someting went wrong, Login try again");
          localStorage.removeItem('user');
          window.location.href = '/login';
    }else{
        return this.setState({data:data})
        }
    })
    document
      .getElementById('app')
      .setAttribute("style", "background: url(/image/home.png) no-repeat;background-size: cover");
    var menu = document.getElementById('menu-click'),
        cancel = document.getElementById('cancel');

    menu.addEventListener('click', function(){
      
      document
      .getElementById('pt')
      .setAttribute("style", "float:none");
      document
      .getElementById('menu')
      .setAttribute("style", "left:0%");
      setTimeout(function(){
        document
        .getElementById('cancel')
        .setAttribute("style", "display:block");
      }, 500)
    })

    cancel.addEventListener('click', function(){
      document
      .getElementById('cancel')
      .setAttribute("style", "display:none");
      document
      .getElementById('pt')
      .setAttribute("style", "float:left");
      document
      .getElementById('menu')
      .setAttribute("style", "left:-100%");
    })
  }

  logout() {
    var history = JSON.parse(localStorage.getItem('user'));
    document
    .getElementById('loading')
    .setAttribute("style", "display:block");
  
    fetch(baseControlUrl + 'logout', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization' : history.token
            },
            body: JSON.stringify({data:''})
        }).then((res) => res.json()).then((data)=>{
            //history.replaceState(null, null);
            document
            .getElementById('loading')
            .setAttribute("style", "display:none");
          
            if ( data.error ) {
                alert(data.message)
            }else {
                localStorage.removeItem('user');
                window.location.href = '/login';
            } 
        })
  } 
  render() {
    return (
    <div id = 'wrap'>
      <div id="header">
      <div id = 'menu'>
        <ul role="nav">
            <li><ALink to="/">Home</ALink></li>
            { this.state.data.role ? <li><ALink to="/register">Register</ALink></li> : null }
            <li><ALink to="/change">Change password</ALink></li>
            <li><ALink to="/matches">Matches</ALink></li>
            <li><ALink to="/inbox">Inbox</ALink></li>
            <li><ALink to="/ranking">Rank</ALink></li>
            { this.state.data.name == 'hoangdev' ? <li><ALink to="/update">Update</ALink></li> : null }
          </ul>
      </div>
          <span id="cancel">X</span>
          <img id="menu-click" src="../image/menu.png" />
          <h1 id="user">{this.state.data.name} { this.state.data.role  ? <strong id="pt">admin</strong> : <strong id="pt">{this.state.data.scores}</strong>}</h1>
         
        <input id='logout' type="submit" value='Logout' onClick={this.logout} />
      </div>
      <div id = 'date'>
      <span id="date_time"></span>
      </div>
    </div>
    )
  }
}

export default Menu