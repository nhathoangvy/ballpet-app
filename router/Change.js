import React from 'react'
import Menu from './Menu.js'
import baseControlUrl from '../db/api.js'

class Change extends React.Component {
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
    change() {
        document
        .getElementById('loading')
        .setAttribute("style", "display:block");
      
        var item = {
            password: document.getElementById('password').value,
            newPassword: document.getElementById('newPassword').value
        }
        var history = JSON.parse(localStorage.getItem('user'));
        fetch(baseControlUrl + 'change', {
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
              
                if ( data.error ) {
                    alert(data.message)
                }else {
                    alert(data.message);
                    window.location.href = "/"
                } 
            }).catch((err) => {
                alert(err);
            })
    }

    render() {
        return (

        <div id = 'home'>
                        {this.props.children || <Menu/>}
            <div id ='change'>
            <h2>Change Password</h2>
            <div id = 'form'>
            <label>Old password</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <label>New password</label><br/>
            <input type="password" id="newPassword" name="newPassword"/><br/>
            <input type="submit" value="Change" onClick={this.change} />
            </div>
            </div>
        </div>

        )
    }
}

export default Change