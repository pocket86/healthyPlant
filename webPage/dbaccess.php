<?php

   $dsn = 'mysql:host=localhost;dbname=plants';
   $username = 'root';
   $password = 'pass';
   $opt = array(
       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
   );
   $db = null;

   try {
       $db = new PDO($dsn, $username, $password, $opt);
   } catch (PDOException $e) {
       echo "ERROR: " . $e->getMessage();
       exit();
   }

$query = "SELECT * FROM readings";
   $statement = $db->prepare($query);
   $statement->execute();
   $results = $statement->fetch();
   $statement->closeCursor();

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Plants</title>
</head>
    <body></body>
</html> 
