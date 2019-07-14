import React from 'react'
import ALink from './ActiveLink'
import baseControlUrl from '../db/api.js'
import Menu from './Menu.js'

class Inbox extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: []
    }

 }

  componentDidMount() {
  var history = JSON.parse(localStorage.getItem('user'));

  var getClosest = (elem, selector) => {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
  
    // Get the closest matching element
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  
  };


    fetch(baseControlUrl + 'activities', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization' : history.token
      }
    }).then((res) => res.json()).then((data)=>{
        for(var i =0 ; i < data.length; i++) {
            document.getElementById('inbox').innerHTML += "<tr><td>" + (i+1) + "</td><td>" + data[i].contents + "</td><td>" + data[i].createdat + "</td></tr>"
        }
    });
    return this.setState({data:history})
  }

 
  render() {
    return (
      <div id = "home">
    {this.props.children || <Menu/>}
      <div id = "box">
        <h3>Inbox</h3>
        <div id = 'table'>
        <table>
          <thead>
          <tr><td>ID</td><td>CONTENT</td><td>CREATEDAT</td></tr>
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

export default Inbox