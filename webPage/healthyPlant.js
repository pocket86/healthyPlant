var tempInt, humidInt, moistInt;

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
      console.log("temp Value = " + tempInt);
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
function updateTemp(check) {
    
    console.log('tempMin = ' + tempMin);
    console.log('tempMax = ' + tempMax);
    
    console.log("updateTemp function...");
    document.getElementById("tempText").innerHTML = check.temp + "&deg;";
    //now add the changes for tempText and amount class style: bottom and height
    tempInt = parseInt(check.temp);
    if (tempInt < tempMin) {
        document.getElementById("tempText").style.bottom = "25%";
        document.getElementById("amount").style.height = "25%";
        //set color of entire bar to blue 
        document.getElementById("amount").style.background = "#7FDBFF";
        document.getElementById("red-circle").style.background = "#7FDBFF";
        document.getElementById("filler").style.background = "#7FDBFF";
    }
    else if (tempInt > tempMax) {
        document.getElementById("tempText").style.bottom = "75%";
        document.getElementById("amount").style.height = "75%";
        //set color of entire bar to blue
        document.getElementById("amount").style.background = "#FF4136";
        document.getElementById("red-circle").style.background = "#FF4136";
        document.getElementById("filler").style.background = "#FF4136";
    }
    else {
        document.getElementById("tempText").style.bottom = "50%";
        document.getElementById("amount").style.height = "50%";
        //set color of entire bar to blue
        document.getElementById("amount").style.background = "#2ECC40";
        document.getElementById("red-circle").style.background = "#2ECC40";
        document.getElementById("filler").style.background = "#2ECC40";
    }
}


function updateHumid(check){
     
    console.log('humidMin = ' + humidMin);   
    console.log('humidMax = ' + humidMax);
    
    console.log("updateHumid function...");
    humidInt = parseInt(check.humid);
    document.getElementById('humidText').innerHTML = humidInt + "%";
    
    if(humidInt < humidMin){
        document.getElementsByClassName("teardrop").style.background="lightskyblue";
    } else if(humidInt > humidMax){
        document.getElementsByClassName("teardrop").style.background="#005df4";
    } else {
        document.getElementsByClassName("teardrop").style.background="deepskyblue";
    }
}

function updateMoisture(check){
    
    
    console.log("updateMiosture function...");
    moistInt = parseInt(check.moist);
    if(moistInt){
        var water = document.getElementById("water");
        water.style.height="250px";
        water.style.backgroundPosition="top left";
        water.style.transition="all 2s ease-out";
    }
}

/* MAY NOT USE THE LIGHT SENSOR */
//function updateLight(check){
//    console.log("updateLight function...");
//}