import React from 'react'
import ALink from './ActiveLink'
import baseControlUrl from '../db/api.js'
import Menu from './Menu.js'

class Home extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: []
    }
    this.onChange = this.onChange.bind(this)

 }
 onChange(e){
  const re = /^[0-9\b]+$/;
  if (e.target.value == '' || re.test(e.target.value)) {
     this.setState({value: e.target.value})
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


    fetch(baseControlUrl + 'matches', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization' : history.token
      }
    }).then((res) => res.json()).then((data)=>{
        var style = '';
        for(var m = 0; m < data.length; m++){
          var homeScore = '',
              awayScore = '',
              drawScore = '';
          if(data[m].picker.length > 0) {
            for(var p = 0; p < data[m].picker.length ; p++) {
              if (data[m].picker[p].catch == data[m].homename) {
                homeScore += '<li>' + data[m].picker[p].username + '  <i>' + data[m].picker[p].scores + 'k</i></li>';
                if(data[m].picker[p].notes != null){
                  homeScore += '<em style="color:gray;font-size:13px">' +data[m].picker[p].notes + '</em>';
                }
              }
              else if (data[m].picker[p].catch == data[m].awayname) {
                awayScore += '<li>' + data[m].picker[p].username + '  <i>' + data[m].picker[p].scores + 'k</i></li>';
                if(data[m].picker[p].notes != null){
                  awayScore += '<em style="color:gray;font-size:13px">' +data[m].picker[p].notes + '</em>';
                }
              }
              else {
                drawScore += '<li>' + data[m].picker[p].username + '  <i>' + data[m].picker[p].scores + 'k</i></li>';
                if(data[m].picker[p].notes != null){
                  drawScore += '<em style="color:gray;font-size:13px">' +data[m].picker[p].notes + '</em>';
                }
              }
            }
          }
          var color = 'black';
          if(data[m].status == 'Waiting') {
            color = '#00ffeb'
          }else if (data[m].status == 'Playing'){
            color = 'green';
            style="opacity: 0.5;cursor: none"
          }else {
            color = 'brown';
            style="opacity: 0.5;cursor: none"
          }
        document.getElementById('matches').innerHTML += '<tr style=' + style + '><td>'+data[m].id+'</td><td>'+data[m].date+'</td><td>'+data[m].time+'</td><td><span style ="color:#ff0000;text-align:left;font-size:15px">'+data[m].homename + '</span><ul>' + homeScore + '</ul></td><td>' + '<ul>' + drawScore +'</ul></td><td><span style ="color:#ff0000;text-align:left;font-size:15px">'+data[m].awayname+ '</span><ul>'+awayScore + '</ul></td><td>'+data[m].leagueid+"</td><td style= 'color:" +color+ "'>"+data[m].status+'</td><td>' + data[m].rule + '</td></tr>';
        }
        /*
        <input type="number" min="0" value="0" style="width:30px" /> <select><option value="' + data[m].homename + '">' + data[m].homename + '</option><option value="' + data[m].awayname + '">' + data[m].awayname + ' </option></select> <textarea></textarea><button class="matches">+</button>
        */
        var y = document.querySelectorAll('button.matches');

        for(var j = 0; j < y.length; j++) {
            y[j].addEventListener('click', function (event) {
              var item = {};
              // If the clicked  item is an `.accordion-toggle` get the parent 
                var parent = getClosest(event.target, 'tr');
  
                var ele = parent.childNodes;
                var item = {
                  match_id : ele[0].textContent,
                  home_name : ele[3].textContent.split('+')[0],
                  away_name : ele[5].textContent.split('+')[0],
                  leagues : ele[6].textContent,
                  scores: ele[ele.length - 1].childNodes[0].value,
                  catch : ele[ele.length - 1].childNodes[2].value,
                  notes : ele[ele.length - 1].childNodes[4].value
                };
                fetch(baseControlUrl + 'pick', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                    'authorization' : history.token
                  },
                  body: JSON.stringify(item)
                }).then((res) => res.json()).then((data)=>{
                    //history.replaceState(null, null);
                    if ( data.error ) {
                        alert(data.message)
                    }else {
                        alert(data.message);
                        ele[ele.length - 1].childNodes[0].value = 0;
                        ele[ele.length - 1].childNodes[2].value = 0;
                        ele[ele.length - 1].childNodes[4].value = 0;
                    } 
                })
              
              
            });
          };
        //return this.setState({data:history})
    });
    return this.setState({data:history})
  }

 
  render() {
    return (
      <div id = "home">
    {this.props.children || <Menu/>}
    
        <div id = 'match'>
        <h3>Matches</h3>
        <h2>ROUND 32</h2>
        <div id = 'table'>
        <table>
          <thead>
          <tr><td>ID</td><td>DATE</td><td>TIME</td><td>HOME</td><td>DRAW</td><td>AWAY</td><td>LEAGUE</td><td>STATUS</td><td>RULES</td></tr>
            </thead>
          <tbody id= 'matches'>

          </tbody>
        </table>
        </div>
        </div>
          </div>
    )
  }
}

export default Home