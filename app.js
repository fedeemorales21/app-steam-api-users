'use strict'
    document.querySelector('#id-profile')
        .addEventListener('keyup', function(){
        getData(document.getElementById('id-profile').value)        
    })

    function getData(id) {
        let url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=F95C34E0D5A2B1449D4756262869476B&steamids=${id}`

        const http = new XMLHttpRequest

        http.open('GET',url,true)
        http.send()

        http.onreadystatechange = function(){
            if (this.readyState ==  4  && this.status == 200) {
                const res = document.querySelector('#res')
                
                let data = JSON.parse(this.responseText).response.players[0]
                

                switch (data.personastate) {
                    case 0:
                        data.personastate = 'Offline'
                    break;
                    
                    case 1:
                        data.personastate = 'Online'
                    break;

                    case 2:
                        data.personastate = 'Busy'
                    break;

                    case 3:
                        data.personastate = 'Away'
                    break;

                    case 4:
                        data.personastate = 'Snooze'
                    break;

                    case 5:
                        data.personastate = 'Looking to trade'
                    break;                
                    
                    case 6:
                        data.personastate = 'Looking to play'
                    break;
                }

                function unixConvert(time){
                    var dt = new Date(time*1000)
                    var d = dt.getDay()
                    var m = dt.getMonth()+1
                    var y = dt.getFullYear()
                    return `${d}/${m}/${y}`
                }

                // console.log(data)
                 res.innerHTML = `<img src="${data.avatarfull}" class="img-fluid mx-auto d-block mb-4">
                 <div class="row text-white mx-auto text-center">
                     <div class="col-md-6">
                         <p class="font-weight-bold">Player Name : ${data.personaname}</p>
                         <p class="font-weight-bold">Real Name : ${data.realname}</p>
                         <p class="font-weight-bold">Country (Code) : ${data.loccountrycode}</p>
                         <p class="font-weight-bold">State (Code) : ${data.locstatecode}</p>
                     </div>
                     <div class="col-md-6">
                         <p class="font-weight-bold">Profile URL : <a href="${data.profileurl}" target="_blank">Link</a></p>
                         <p class="font-weight-bold">Status : ${data.personastate}</p>
                         <p class="font-weight-bold">Date of Account Creation : ${unixConvert(data.timecreated)}</p>
                         <p class="font-weight-bold">last connection ago : ${unixConvert(data.lastlogoff)}</p>
                     </div>
                 </div>`
               

                
            }
        }
    }
