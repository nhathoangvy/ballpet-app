import React from 'react'
import Menu from './Menu.js'
import baseControlUrl from '../db/api.js'

class Withdraw extends React.Component {
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
    withdraw() {
        var confirm = confirm("Bạn chắc chắn muốn rút . Hãy liên hệ admin để lấy tiền mặt tương ứng số scores rút ra rồi hãy ấn OK!");
        if (confirm == true) {
            document
            .getElementById('loading')
            .setAttribute("style", "display:block");
          
            var item = {
                scores: document.getElementById('scoress').value
            }
            var history = JSON.parse(localStorage.getItem('user'));
            fetch(baseControlUrl + 'withdraw', {
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
    }

    render() {
        return (

        <div id = 'home'>
                {this.props.children || <Menu/>}

            <input type="number" id="scoress" name="scoress" min="0" placeholder="Scores"/><br/>
            <input type="submit" value="Withdraw" onClick={this.withdraw} />

        </div>

        )
    }
}

export default Withdraw