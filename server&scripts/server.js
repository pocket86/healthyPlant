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

//Define our main function to call the scripts
var runScripts = function(){
  //create a timestamp to put with each script run (for logs, mainly)
  var date = new Date();
  var timestamp = (date.getMonth() + 1) + "/"  + date.getDate()  + "/" +
                   date.getFullYear()   +  " " + date.getHours() + ":" +
                   date.getMinutes()    + ":"  + date.getSeconds();

  //log that we are running the scripts
  console.log("Scripts are running -  " + timestamp);

  //Run each script
 // exec("#", puts);
 // exec("#", puts)
 // exec("#", puts);
 // exec("#", puts);
};

//have the server listen for a connection with the web page
io.listen(server).on('connection', function(socket){

  //Log that we have a connection
  console.log("The server and web page are connected!");

  //sends a message to the html page and runs the checks
  var autoRun = function(){
    socket.emit("#");
    runChecks();
  };

  //we'll set a timer here to run the scripts every 10 min (60000ms)
  var timer = setInterval(autoRun, 600000);

  //Web page button press allows a manual running of the scripts
  socket.on("#", function(){
    //reset the timer
    clearInterval(timer);
    timer = setInterval(autoRun, 600000);

    //tell the webpage to reset it's data
    socket.emit("#");
    runChecks();
  });

  /**********************************************
  * Now we set listeners to each file the scrips
  * will update. When a file has been updated, the
  * server notifies the web page and processed
  * data can be sent
  **********************************************/

  fs.watchFile("temp_humid/temp.txt", function() {
      var text = fs.readFileSync("temp_humid/temp.txt").toString();
      var check = {status: text, id: "#"};
      socket.emit("check", check);
  });

  fs.watchFile("temp_humid/humid.txt", function() {
      var text = fs.readFileSync("temp_humid/humid.txt").toString();
      var check = {status: text, id: "#"};
      socket.emit("check", check);
  });

 // fs.watchFile("#", function() {
 //     var text = fs.readFileSync("#").toString();
 //     var check = {status: text, id: "#"};
 //     socket.emit("check", check);
 // });

 // fs.watchFile("#", function() {
 //     var text = fs.readFileSync("#").toString();
 //     var check = {status: text, id: "#"};
 //     socket.emit("check", check);
 // });

});
