/*****************************************************
* This function will route the element to be 
* updated based off the id passed in from the server
*****************************************************/
function router(check){
    
   console.log("Router function...");

   if(check.id === "tempData"){
      updateTemp(check);
   } else if (check.id === "humidData"){
      updateHumid(check);
   } else if (check.id === "moistData"){
       updateMoisture(check);
   } else if (check.id === "lightData"){
       updateLight(check);
   }
}

function runChecks(){
   console.log("running checks...");
   socket.emit("runChecks");
}

/*********** UPDATE FUNCTIONS **************/
function updateTemp(check){
   console.log("updateTemp function...");
   document.getElementById("tempText").innerHTML = check.temp + "&deg;";
    //now add the changes for tempText and amount class style: bottom and height
    var tempInt = parseInt(check.temp);


    if(tempInt < 100){
        document.getElementById("tempText").style.bottom="25%";
        document.getElementById("amount").style.height="25%";
        //set color of entire bar to blue 
	document.getElementById("amount").style.background="blue";
	document.getElementById("red-circle").style.background="blue";
	document.getElementById("filler").style.background="blue";

    }
    
//    } else if(tempInt > HIGH_TEMP_THRESHOLD){
//        document.getElementById("tempText").style.bottom="75%";
//        document.getElementById("amount").style.height="75%";
//        //set color of entire bar to blue
//        document.querySelectorAll('.amount, .red-circle, .filler').style.background="red";
//    } else {
//        document.getElementById("tempText").style.bottom="50%";
//        document.getElementById("amount").style.height="50%";
//        //set color of entire bar to blue
//        document.querySelectorAll('.amount, .red-circle, .filler').style.background="green";
//    }  
}

function updateHumid(check){
    console.log("updateHumid function...");
    var humidInt = parseInt(check.humid);
    document.getElementById('mainHumid').innerHTML = humidInt;
}

function updateMoisture(check){
    console.log("updateMiosture function...");
    var moistInt = parseInt(check.moist);
    document.getElementById("moistText").innerHTML = moistInt;
}

function updateLight(check){
    console.log("updateLight function...");
}

