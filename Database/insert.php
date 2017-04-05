<?php include 'dbaccess.php';?>
<?php

    if(isset($_POST['read'])){
		//echo "We made it submit!";
		$plant = isset($_POST['plant']) ? $_POST['plant'] : '';
		$temp  = isset($_POST['temp'])  ? $_POST['temp']  : ''; 
		$humid = isset($_POST['humid']) ? $_POST['humid'] : ''; 
		$moist = isset($_POST['moist']) ? $_POST['moist'] : '';
		$date  = isset($_POST['date'])  ? $_POST['date']  : '';
	}
	else{
		//echo "didn't submit";
		$plant = '';
		$temp  = '';
		$humid = '';
		$moist = '';
		$date  = '';
	}

    if(isset($_POST['read'])){
        
        $plant = $_POST
        
		//echo "did an insert!";
		$stmt = $db->prepare("INSERT INTO readings(plant_id, temp, humid, moist, last_read) VALUES(:plant, :temp, :humid, :moist, :light, :date)");
        $stmt->bindParam(":plant", $plant, PDO :: PARAM_INT);
		$stmt->bindParam(":temp", $temp, PDO::PARAM_IN);
		$stmt->bindParam(":humid", $humid, PDO::PARAM_INT);
		$stmt->bindParam(":moist", $moist, PDO::PARAM_INT);
        $stmt->bindParam(":date", $date, PDO::PARAM_INT);
		$stmt->execute();
		
	}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width">
    <?php
        <meta http-equiv="refresh" content="0; url=./dbrequests.php?variable1=$plant">
    ?>
    <title>Healthy Plants | plant environment data analytics </title>
    <!-- My stylesheet -->
</head>

<body>
   You will be redirected shortly.
</body>

</html>
