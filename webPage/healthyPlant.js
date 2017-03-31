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
   } else if (check.id === "moistureData"){
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
   document.getElementsByClassName("tempText").innerHTML = check.temp + "&deg;";
    //now add the changes for tempText and amount class style: bottom and height
}

function updateHumid(check){
    console.log("updateHumid function...");
    document.getElementById('mainHumid').innerHTML = check.humid;
}

function updateLight(check){
    console.log("updateLight function...");
}

function updateMoisture(check){
    console.log("updateMiosture function...");
}
