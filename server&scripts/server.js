/**************************************************************
*  Healthy Plant Analyzer Web Server
*  Author(s): Weston Clark
*  02/2017
*
*  This is a node web server that will relay information from
*  the html interface and the scripts that will analyze plant data
**************************************************************/

//include all needed modules
var http = require('http');
var fs = require('fs');
var io = require('socket.io');

//'util' and 'exec' are require to run commands in the terminal
var util = require('util');
var exec = require('child_process').exec;

//defines how the arguments are used in the terminal
var puts = function(error, stdout, stderr){
  //use 'print' - it doesn't throw a newline in the console :)
  util.print(stdout);
  //util.puts(stdout);
};

//define a port to listen on
const PORT = 8080;


//create the server and have it listen on our PORT
var server = http.createServer();
server.listen(PORT);
console.log("Waiting for a connection...");


/*******************************************************************
* Runs each sensor script
* Input  - none
* Output - none
*******************************************************************/
var runScripts = function(){
  //create a timestamp to put with each script run (for logs, mainly)
  var date = new Date();
  var timestamp = (date.getMonth() + 1) + "/"  + date.getDate()  + "/" +
                   date.getFullYear()   +  " " + date.getHours() + ":" +
                   date.getMinutes()    + ":"  + date.getSeconds();

  //log that we are running the scripts
  console.log("Scripts are running -  " + timestamp);

  //Run each script
  exec("sudo python temp_humid/temp_humid.py 11 4", puts);
  exec("sudo python moist/moist.py", puts);

  exec("touch moist/moist2.txt", puts);
};

//have the server listen for a connection with the web page
io.listen(server).on('connection', function(socket){

  //Log that we have a connection
  console.log("The server and web page are connected!");

  //sends a message to the html page and runs the checks
  var autoRun = function(){
    runChecks();
  };

  //we'll set a timer here to run the scripts every 10 min (60000ms)
  var timer = setInterval(autoRun, 600000);

  //Web page button press allows a manual running of the scripts
  socket.on("runChecks", function(){
    runScripts();
  });

  /**********************************************
  * Now we set listeners to each file the scrips
  * will update. When a file has been updated, the
  * server notifies the web page and processed
  * data can be sent
  **********************************************/

  fs.watchFile("temp_humid/temp.txt", function() {
      console.log("Detected a change in the temp.txt...");
      var temp = fs.readFileSync("temp_humid/temp.txt").toString();
      var check = {temp: temp, id: "tempData"};
      socket.emit("check", check);
  });

  fs.watchFile("temp_humid/humid.txt", function() {
      console.log("Detected a change in the humid.txt...");
      var humid = fs.readFileSync("temp_humid/humid.txt").toString();
      var check = {humid: humid, id: "humidData"};
      socket.emit("check", check);
  });

  fs.watchFile("moist/moist2.txt", function() {
      console.log("Detected a change in the moisture.txt...");
      var text = fs.readFileSync("moist/moist2.txt").toString();
      var check = {moist: text, id: "moistData"};
      socket.emit("check", check);
	console.log("The check that will be sent: " + check.moist);
      console.log("Sent the Moisture Check!!");
  });

});
