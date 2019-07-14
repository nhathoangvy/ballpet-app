import React from 'react'
import baseControlUrl from '../db/api.js'
import Menu from './Menu.js'

class Home extends React.Component{
  constructor() {
    super();
  
    this.state = {
       data: [],
       cookie : [],
       typed : '',
       data2: []
    }
    this.handleChange = this.handleChange.bind(this);
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

  fetch(baseControlUrl + 'list', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization' : history.token
    }
  }).then((res) => res.json()).then((data)=>{
      for(var m = 0; m < data.length; m++){
        if(!data[m].status) {
          data[m].status = 'working'
        }
        if(data[m].role){
          data[m].role = 'Admin';
          document.getElementById('users').innerHTML += "<tr><td style='display:none' class='id'>"+data[m].id+'</td><td>'+(m+1)+'</td><td>'+data[m].name+'</td><td>'+data[m].scores+'</td><td style="color:#ff0000">'+data[m].role+'</td><td>'+data[m].createdat+'</td><td>'+data[m].updatedat+'</td><td>'+data[m].status+"</td><td></td></tr>";
        }else{
          data[m].role = 'Member'
          document.getElementById('users').innerHTML += "<tr><td style='display:none' class='id'>"+data[m].id+'</td><td>'+(m+1)+'</td><td>'+data[m].name+'</td><td>'+data[m].scores+'</td><td>'+data[m].role+'</td><td>'+data[m].createdat+'</td><td>'+data[m].updatedat+'</td><td>'+data[m].status+"</td><td><input type='number' min='0' value='0' style='width:30px' /> <button class='scores'>+</button></td></tr>";
        }
      }
    
      var x = document.querySelectorAll('button.scores');

      for(var i = 0; i < x.length; i++) {
          x[i].addEventListener('click', function (event) {
            var item = {};
            // If the clicked  item is an `.accordion-toggle` get the parent 
              var parent = getClosest(event.target, 'tr');

              var ele = parent.childNodes;
              var item = {
                userID : ele[0].textContent,
                scores : ele[ele.length - 1].childNodes[0].value
              }
              fetch(baseControlUrl + 'upscore', {
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
                      ele[2].textContent = Number(item.scores) + Number(ele[2].textContent)
                  } 
              })
            
            
          });
        };
      //return this.setState({data:history})
  });

  fetch(baseControlUrl + 'messages', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization' : history.token
    }
  }).then((res) => res.json()).then((data)=>{

      if(data.length > 0 ) {
        for(var m = 0; m < data.length; m++){
          var color = 'green',
              style="opacity: 0.5;cursor: none";
          document.getElementById('activities').innerHTML += '<tr style=' + style + '><td>'+data[m].userId+'</td><td>'+data[m].username+'</td><td>'+data[m].scores+ ' - ' + data[m].catch +'</td><td>'+data[m].homename+ '</td><td>'+data[m].awayname+'</td><td>'+data[m].match+'</td><td>'+data[m].createdat+"</td><td>" + data[m].updatedat + "</td></tr>";
        }
      }
      // var z = document.querySelectorAll('button.approved');

      // for(var k = 0; k < z.length; k++) {
      //     z[k].addEventListener('click', function (event) {
      //       var item = {};
      //       // If the clicked  item is an `.accordion-toggle` get the parent 
      //         var parent = getClosest(event.target, 'tr');

      //         var ele = parent.childNodes;
      //         var item = {
      //           userID : ele[0].textContent,
      //           match_id : ele[5].textContent
      //         }
      //         fetch(baseControlUrl + 'approved', {
      //           method: 'POST',
      //           headers: {
      //             'content-type': 'application/json',
      //             'authorization' : history.token
      //           },
      //           body: JSON.stringify(item)
      //         }).then((res) => res.json()).then((data)=>{
      //             //history.replaceState(null, null);
      //             if ( data.error ) {
      //                 alert(data.message)
      //             }else {
      //                 ele[8].textContent = 'approved';
            
      //             } 
      //         })
            
            
      //     });
      //   };
      //return this.setState({data:history})
  });
  var home = document.getElementById('home_check');
  var away = document.getElementById('away_check');
  var draw = document.getElementById('draw_check');

  home.addEventListener('click', function(){
    away.checked = false;
    draw.checked = false;
  });
  draw.addEventListener('click', function(){
    home.checked = false;
    away.checked = false;
  });
  away.addEventListener('click', function(){
    home.checked = false;
    draw.checked = false;
  });

  var home2 = document.getElementById('home_check2');
  var away2 = document.getElementById('away_check2');
  var draw2 = document.getElementById('draw_check2');

  home2.addEventListener('click', function(){
    away2.checked = false;
    draw2.checked = false;
  });
  draw2.addEventListener('click', function(){
    home2.checked = false;
    away2.checked = false;
  });
  away2.addEventListener('click', function(){
    home2.checked = false;
    draw2.checked = false;
  });
    fetch(baseControlUrl + 'playing', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization' : history.token
      }
    }).then((res) => res.json()).then((data)=>{
      if(data[0].picker.length > 0) {
        document.getElementById('scores').value = data[0].picker[0].scores
        if(data[0].picker[0].catch == data[0].homename){
          home.checked = true;
          away.checked = false;
          draw.checked = false;
        }else if(data[0].picker[0].catch == 'draw') {
          draw.checked = true;
          away.checked = false;
          home.checked = false
        }else {
          away.checked = true;
          draw.checked = false;
          home.checked = false;
        }
      }
      document.getElementById('homeimg').src = '/flags/' + data[0].homename + '.png';
      document.getElementById('awayimg').src = '/flags/' + data[0].awayname + '.png';

      var info = {
        id : data[0].id,
        league : data[0].leagues,
        date : data[0].date,
        time : data[0].time,
        status : data[0].status,
        notes : null,
        home_name : data[0].homename,
        away_name : data[0].awayname,
        rule : data[0].rule
      }
      if(data[0].picker.length > 0) info.notes = data[0].picker[0].notes
      document.getElementById('notes').value = info.notes
      document.getElementById('picks').addEventListener('click', function () {
        document
        .getElementById('loading')
        .setAttribute("style", "display:block");
      
              var item = {
                match_id : info.id,
                home_name : info.home_name,
                away_name : info.away_name,
                scores: document.getElementById('scores').value,
                catch : null,
                notes : document.getElementById('notes').value
              };

              if(home.checked){
                item.catch = item.home_name
              }else if(away.checked){
                item.catch = item.away_name
              }else {
                item.catch = 'draw'
              }
              fetch(baseControlUrl + 'pick', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  'authorization' : history.token
                },
                body: JSON.stringify(item)
              }).then((res) => res.json()).then((res)=>{
                  //history.replaceState(null, null);
                  document
                  .getElementById('loading')
                  .setAttribute("style", "display:none");
                
                  if ( res.error ) {
                      alert(res.message)
                  }else {
                      alert(res.message)
                  } 
              })
            
            
          })
          this.setState({data:info})
        if(data.length > 1) {
          if(data[1].picker.length > 0) {
            document.getElementById('scores2').value = data[1].picker[0].scores
            if(data[1].picker[0].catch == data[1].homename){
              home2.checked = true;
              away2.checked = false;
              draw2.checked = false;
            }else if(data[1].picker[0].catch == 'draw') {
              draw2.checked = true;
              away2.checked = false;
              home2.checked = false
            }else {
              away2.checked = true;
              draw2.checked = false;
              home2.checked = false;
            }
          }
          document.getElementById('homeimg2').src = '/flags/' + data[1].homename + '.png';
          document.getElementById('awayimg2').src = '/flags/' + data[1].awayname + '.png';
  
          var info2 = {
            id : data[1].id,
            league : data[1].leagues,
            date : data[1].date,
            time : data[1].time,
            status : data[1].status,
            notes : null,
            home_name : data[1].homename,
            away_name : data[1].awayname,
            rule : data[1].rule
          }
          if(data[1].picker.length > 0) info2.notes = data[1].picker[0].notes
          document.getElementById('notes2').value = info2.notes
          document.getElementById('picks2').addEventListener('click', function () {
            document
            .getElementById('loading')
            .setAttribute("style", "display:block");
          
                  var item2 = {
                    match_id : info2.id,
                    home_name : info2.home_name,
                    away_name : info2.away_name,
                    scores: document.getElementById('scores2').value,
                    catch : null,
                    notes : document.getElementById('notes2').value
                  };
  
                  if(home2.checked){
                    item2.catch = item2.home_name
                  }else if(away.checked){
                    item2.catch = item2.away_name
                  }else {
                    item2.catch = 'draw'
                  }
                  fetch(baseControlUrl + 'pick', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                      'authorization' : history.token
                    },
                    body: JSON.stringify(item)
                  }).then((res) => res.json()).then((res)=>{
                      //history.replaceState(null, null);
                      document
                      .getElementById('loading')
                      .setAttribute("style", "display:none");
                    
                      if ( res.error ) {
                          alert(res.message)
                      }else {
                          alert(res.message)
                      } 
                  })
                
                
              })
              this.setState({data2:info2})
        }else {
          document
          .querySelectorAll('#table-quick-pick')[1]
          .setAttribute('style', 'display:none');
        }
    });
    return this.setState({cookie:history})
    
  }

  handleChange(event) {
    this.setState({typed: event.target.value});
  }
  
  render() {
    return (
    <div id="home">
              {this.props.children || <Menu/>}
              { this.state.cookie.role ? <div>
              <div id = 'u'>
              <h2>Users</h2>
              <div id = 'table'>
              <table>
                <thead>
                  <tr><td>ID</td><td>NAME</td><td>SCORES</td><td>ROLE</td><td>CREATEDAT</td><td>UPDATEDAT</td><td>STATUS</td><td>ADD SCORES</td></tr>
                  
                  </thead>
                  
                  <tbody id= 'users'></tbody>
                  
                  </table>
                </div>
              </div>
                  <div id = 'active'>
                  <h2>Activity</h2>
                  <div id = 'table'>
                  <table>
                    <thead>
                    <tr><td>ID</td><td>NAME</td><td>SCORES - CATCH</td><td>HOME</td><td>AWAY</td><td>MATCHES</td><td>CREATEDAT</td><td>UPDATEDAT</td></tr>
                      </thead>
                    <tbody id= 'activities'>

                    </tbody>
                  </table>
                  </div>
                  </div>
                  </div> 
            :
            <div id="upnext">
            <h2>UP NEXT</h2>
            <div id = 'table-quick-pick'>
            <table>
              <tbody>
              <tr><td id='id' colSpan={3}>{this.state.data.status}</td></tr>
                <tr><td id='time' colSpan={3}>{this.state.data.date} {this.state.data.time}</td></tr>
                <tr><td id='home_name'><img id="homeimg" src=""/>{this.state.data.home_name}</td>
                <td id='draw_name'>Draw</td>
                <td id='away_name'><img id="awayimg" src=""/>{this.state.data.away_name}</td></tr>
                {this.state.data.rule ? <tr><td>{this.state.data.rule.split(':')[0]}</td><td>{this.state.data.rule.split(':')[1]}</td><td>{this.state.data.rule.split(':')[2]}</td></tr> : null}
                <tr><td><input id='home_check' type='checkbox'/></td><td><input id='draw_check' type='checkbox'/></td><td><input id='away_check' type='checkbox'/></td></tr>
                <tr><td colSpan={3}><h3>Scores</h3><br/><input type='number' id='scores' min="0"/><br/><textarea id='notes'/></td></tr>
                <tr><td colSpan={3}><button id='picks'>Đặt</button></td></tr>
              </tbody>
            </table>
            </div>
            <br/>
            <div id = 'table-quick-pick'>
            <table>
              <tbody>
              <tr><td id='id2' colSpan={3}>{this.state.data2.status}</td></tr>
                <tr><td id='time2' colSpan={3}>{this.state.data2.date} {this.state.data2.time}</td></tr>
                <tr><td id='home_name2'><img id="homeimg2" src=""/>{this.state.data2.home_name}</td>
                <td id='draw_name2'>Draw</td>
                <td id='away_name2'><img id="awayimg2" src=""/>{this.state.data2.away_name}</td></tr>
                {this.state.data2.rule ? <tr><td>{this.state.data2.rule.split(':')[0]}</td><td>{this.state.data2.rule.split(':')[1]}</td><td>{this.state.data2.rule.split(':')[2]}</td></tr> : null}
                <tr><td><input id='home_check2' type='checkbox'/></td><td><input id='draw_check2' type='checkbox'/></td><td><input id='away_check2' type='checkbox'/></td></tr>
                <tr><td colSpan={3}><h3>Scores</h3><br/><input type='number' id='scores2' min="0"/><br/><textarea id='notes2'/></td></tr>
                <tr><td colSpan={3}><button id='picks2'>Đặt</button></td></tr>
              </tbody>
            </table>
            </div>
            </div>
            }
        
      </div>
    )
  }
}

export default Home