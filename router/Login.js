import React from 'react'
import Home from './Home.js'
import baseControlUrl from '../db/api.js'

class Login extends React.Component {
     constructor() {
      super();
		
      this.state = {
         data: []
      }

   }
   componentDidMount() {
    if (typeof(Storage) == "undefined") {
        alert("please use update your browser")
    }
    var history = JSON.parse(localStorage.getItem('user'));
    if(history){
        window.location.href = '/';
      }
      document
      .getElementById('app')
      .setAttribute("style", "background: url(/image/login.png) no-repeat;background-size: cover");
   }
    login() {
        document
        .getElementById('loading')
        .setAttribute("style", "display:block");
      
        var item = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        }

        fetch(baseControlUrl + 'login', {
                method: 'POST',
                    headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((res) => res.json()).then((data)=>{
                document
                .getElementById('loading')
                .setAttribute("style", "display:none");
                if ( data.error ) {
                    alert(data.message)
                }else {
                    var user = {name: data.name, token: data.token, scores: data.scores, role: data.role} ;
                    localStorage.setItem('user',JSON.stringify(user));
                    //history.pushState(user, null, '/');
                    window.location.href = '/';
                } 
            })
    }

    render() {
        return (
        <div id = 'login'>
            <img src="../image/logo.png"/>
            <div id = 'form'>
            <label>Username</label><br/>
            <input id="name" name="name"/><br/>
            <label>Password</label><br/>
            <input type="password" id="password" name="password"/><br/>
                <input type="submit" value='Sign In' onClick={this.login} />
            </div>
        </div>

        )
    }
}

export default Login