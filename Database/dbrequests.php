<?php include 'dbaccess.php';?>
<?php
    if(isset($_POST['submit'])){
		//echo "did an insert!";
		$stmt = $db->prepare("INSERT INTO readings(plant_id, temp, humid, moist, light, last_read) VALUES(:plant, :temp, :humid, :moist, :light, :date)");
        $stmt->bindParam(":plant", $plant, PDO :: PARAM_INT);
		$stmt->bindParam(":temp", $book, PDO::PARAM_IN);
		$stmt->bindParam(":humid", $chapter, PDO::PARAM_INT);
		$stmt->bindParam(":moist", $verse, PDO::PARAM_INT);
		$stmt->bindParam(":light", $content, PDO::PARAM_INT);
        $stmt->bindParam(":date", $date, PDO::PARAM_INT);
		$stmt->execute();
		
	}
	
	$newReadingID = $db->lastInsertId();
	
	//echo "<br>$newId";
		
	if($_POST['newPlant']!=''){
		$stmt = $db->prepare("INSERT INTO plants(name, sci_name, temp_id, humid_id, light_id, moist_id) 						VALUES(:name, :sci_name, :temp, :humid, light, moist)");
		$stmt->bindParam(":name", $newtopic, PDO::PARAM_STR, 20);
        $stmt->bindParam(":sci_name", $newtopic, PDO::PARAM_STR, 256);
		$stmt->bindParam(":temp", $newtopic, PDO::PARAM_INT);
		$stmt->bindParam(":humid", $newtopic, PDO::PARAM_INT);
		$stmt->bindParam(":light", $newtopic, PDO::PARAM_INT);
		$stmt->bindParam(":moist", $newtopic, PDO::PARAM_INT);
		$stmt->execute();
	}
	
    if($_POST['newPlant']!='')
	   $newPlantId = $db->lastInsertId();
	
	//echo "<br>$newTopicId";
	
	/*if (!empty($topics)){
		//echo "In the link IF";
			foreach($topics as $row){
				//echo "in the link FOREACH $row";
				$topicId = $db->query("SELECT id FROM topics WHERE name='$row'");
				$stmt = $db->prepare("INSERT INTO link(scripture_id, topics_id)
				VALUES(:scripture_id, :topics_id)");
				$stmt->bindParam(":scripture_id", $newId, PDO::PARAM_INT);
				$stmt->bindParam(":topics_id", $topicId, PDO::PARAM_INT);
				$stmt->execute();
				//echo "<br>$topicId";
				}
	}*/
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width">
    <title>Healthy Plants | plant environment data analytics </title>

    <!-- My stylesheet -->
    <link rel="stylesheet" type="text/css" href="index.css">
    <link rel="stylesheet" type="text/css" href="therm.css">
    <!-- Fonts -->
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    
    <script language="JavaScript" src="healthyPlant.js"></script>
    <script type="text/javascript" src="./node_modules/socket.io-client/dist/socket.io.js"></script>

</head>

<body>

    <!-- Script to connect to the node server -->
    <script>
        var socket = io.connect("localhost:8080");

        //on 'connect', log the connection in the console
        socket.on("connect", function(){
            console.log("Connected to the server!");
        });

        //This will listen for a reponse from the server after each check
        socket.on("check", function(check){
           console.log("Got the check!");
           //send the check to the function router
           router(check);
        });
    </script>
    
    <!-- Top Nav Bar -->
    <div class="top-nav">
        <div class="top-nav-item">Healthy Plant</div>
        <div class="top-nav-item"></div>
        <div class="top-nav-item">
            <!--
            <div class="top-nav-link"><a class="top-link" target="_blank" href="#">Link 1</a></div>            
            <div class="top-nav-link"><a class="top-link" target="_blank" href="#">Link 2</a></div>
            <div class="top-nav-link"><a class="top-link" target="_blank" href="#">Link 3</a></div> -->
            <?php
            foreach($db->query('SELECT id, name FROM plants') as $row)
            {
                echo"<div class='top-nav-link'><a class='top-link' target='_blank' href='#'>" . $row['name'] . "</a></div>";
            }
            ?>
        </div>
    </div>

    <!-- Side Nav Bar -->
    <div class="side-nav">
        <div class="side-nav-item"></div>
        <div class="side-nav-item plantpicdiv">
        <img id="plantPic" src="resources/plant2.png">
            
        
        </div>
        <div class="side-nav-item">
            
        </div>
        <div class="side-nav-link"><a class="side-link" target="_blank" href="https://github.com/pocket86/healthyPlant">Github Repo</a></div>
        
    </div>
    
    <!-- Main Content -->
    <div class="content">
        <h1 id="contentHeader"> How is my plant today?</h1>
        
        <div class="btnBox">
            <button class="checkBtn" onclick="runChecks()">Manual Update</button>
        </div>
        <div class="border-box">
            <div class="border-spacer"></div>
            <div class="spacer-border"></div>
            <div class="border-spacer"></div>
        </div>
        
        <div class="data">
            <div class="dataItem"></div>
            <div class="dataItem" id="mainTemp">
               <div class="spacer"></div>
                <div class="dataBox">
                
                
                    <div class="donation-meter">
                      <span class="glass">
                          <strong class="tempText" id="tempText">65&deg;</strong>
                          <span class="amount" id="amount"></span>
                      </span>
                      <div class="bulb">
                          <span class="red-circle" id="red-circle"></span>
                          <span class="filler" id="filler">
                              <span></span>
                          </span>
                      </div>
                    </div>
                
                
                
                </div>
                <div class="spacer"></div>
            </div>
            <div class="dataItem" id="mainHumid">
                <div class="spacer"></div>
                <div class="dataBox">Humidity</div>
                <div class="spacer"></div>
            </div>
            
            <div class="dataItem" id="mainMoist">
                <div class="spacer"></div>
                <div class="dataBox" id="moistText">Moisture</div>
                <div class="spacer"></div>            
            </div>
            <div class="dataItem"></div>
        </div>

        <?php
        foreach($db->query("SELECT temp, humidity, light, moisture, last_read  FROM readings WHERE plant_id = $plantID") as $row)
        {
	       echo '<b>' . $row['temp'] . ' ';
	       echo $row['humididity'] . ':';
	       echo $row['moisture'] . "</b>";
	       echo ' - "' . $row['light'] . '"<br><br>' . $row['last_read'];
        }

?>
        
    </div>
    <!-- Footer -->
    <footer>
        <div>
           © 2017 | Last Update: 3/21/2017
        </div>
    </footer>

</body>

</html>

