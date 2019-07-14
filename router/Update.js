import React from 'react'
import Menu from './Menu.js'
import baseControlUrl from '../db/api.js'

class Update extends React.Component {
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
    Update() {
        document
        .getElementById('loading')
        .setAttribute("style", "display:block");
      
        var item = {
            match_id: document.getElementById('match_id').value,
            home_points: document.getElementById('home_points').value,
            away_points: document.getElementById('away_points').value,
        }
        var history = JSON.parse(localStorage.getItem('user'));
        fetch(baseControlUrl + 'result', {
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
            <h2>Update</h2>
            <div id = 'form'>
            <label>MatchID</label><br/>
            <input type="text" id="match_id" name="match_id"/><br/>
            <label>Home points</label><br/>
            <input type="number" id="home_points" name="home_points" min="0"/><br/>
            <label>Away points</label><br/>
            <input type="number" id="away_points" name="away_points" min="0"/><br/>
            <input type="submit" value="Update" onClick={this.Update} />
            </div>
            </div>
        </div>

        )
    }
}

export default Update