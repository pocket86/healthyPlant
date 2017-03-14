/*****************************************************
* This function will route the element to be 
* updated based off the id passed in from the server
*****************************************************/
function router(id){

   console.log("Router function...");

   if(check.id === "tempData"){
      updateTemp(check);
   } else if (check.id === "humidData"){
      updateHumid(check);
   }
}

/*********** UPDATE FUNCTIONS **************/
function updateTemp(check){
   console.log("updateTemp function...");
}

function updateHumid(check){
    console.log("updateHumid function...");
}

function updateLight(check){
    console.log("updateLight function...");
}

function updateMiosture(check){
    console.log("updateMiosture function...");
}
