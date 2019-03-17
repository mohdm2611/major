// devices = [{
//         "moduleID": "Y5K8B4",
//         "mapped": "Arcu Associates",
//         "type": "709",
//         "status": "active"
//     },
//     {
//         "moduleID": "X1J1F7",
//         "mapped": "Mauris A Nunc LLP",
//         "type": "879",
//         "status": "active"
//     },
//     {
//         "moduleID": "V1A8P7",
//         "mapped": "Accumsan Interdum Libero Associates",
//         "type": "832",
//         "status": "active"
//     },
//     {
//         "moduleID": "X1K5W3",
//         "mapped": "Tincidunt Company",
//         "type": "715",
//         "status": "active"
//     }
// ]
function viewOverview(){
    document.getElementById("devices").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("overview").style.display = "block";
}
function viewDevices(){
    document.getElementById("overview").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("devices").style.display = "block";
}
function viewStats(){
    document.getElementById("overview").style.display = "none";
    document.getElementById("devices").style.display = "none";
    document.getElementById("stats").style.display = "block";
}
var devices;
function genDevices(){
    var count;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            devices = JSON.parse(this.responseText);  
            count = devices.count; 
            // console.log(devices.modules);
            for(var i=0;i<count;i++){
                document.querySelector('.devices--cont__table tbody').innerHTML+=`<tr>
                <td>`+devices.modules[i].moduleID+`</td>
                <td>`+devices.modules[i].mappedTo+`</td>
                <td>`+devices.modules[i].type+`</td>
                <td class="status">`+devices.modules[i].status+`</td>
              </tr>`;
            }
       }
    };
    xhttp.open("GET", "modules/active", true);
    xhttp.send();
}

$(document).ready(genDevices);

