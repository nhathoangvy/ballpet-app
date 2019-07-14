import baseControlUrl from '../db/api.js'

export default  fetch(baseControlUrl, {
        method: 'GET',
        headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          
         // mode: 'no-cors'
    }).then(response => 
     response.json()).then(json => {
       return Promise.all(json).then((x) =>{
        return x
      });
    })