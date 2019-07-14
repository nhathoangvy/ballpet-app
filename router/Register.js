import React from 'react'
import Menu from './Menu.js'
import baseControlUrl from '../db/api.js'
import Change from './Change.js';

class Register extends React.Component {
     constructor() {
      super();
		
      this.state = {
         data: []
      }

   }
   componentDidMount() {
    var history = JSON.parse(localStorage.getItem('user'));

    return this.setState({data:history})
    }
    register() {
        document
        .getElementById('loading')
        .setAttribute("style", "display:block");
      
        var item = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value,
            role: document.getElementById('select').value,
            scores: document.getElementById('scores').value
        }
        var history = JSON.parse(localStorage.getItem('user'));
        fetch(baseControlUrl + 'register', {
                method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization' : history.token
                },
                body: JSON.stringify(item)
            }).then((res) => res.json()).then((data)=>{
                document
                .getElementById('loading')
                .setAttribute("style", "display:none");
              
                if(data.error){
                    alert(data.message);
                }else{
                    alert(data.message);
                window.location.href = "/"
                }
            })
    }
    number(event) {
        const {id} = event.target;
    }

    render() {
        return (

        <div  id = 'home'>
            {this.props.children || <Menu/>}
            
        <div id = 'change'>
        <h2>Register</h2>
        <div id = 'form'>
        <label>Username</label><br/>
            <input type="text" id="name" name="name"/><br/>
            <label>Password</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <label>Role</label><br/>
            <div id='select'>
            <select>
                <option value = 'member'>Member</option>
                <option value = 'admin'>Admin</option>
            </select>
            </div>
            <label>Scores</label><br/>
            <input type="number" id="scores" name="scores" onkeypress={this.number}/><br/>
            <input type="submit" value="Register" onClick={this.register} />
        </div>
        </div>
        </div>

        )
    }
}

export default Register