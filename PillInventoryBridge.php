<?php

header("Content-Type: text/plain");

require_once 'DatabasePasswords.php';

if (isset($_GET['registerPill']))
{
	$err = array();

	if (!$_POST['numLeft'] || !$_POST['id'] || !$_POST['name'])
		$err[] = 'All the fields must be filled in!';
	else
	{
		$con = mysqli_connect($DatabaseAddress, $DatabaseID, $DatabasePassword, $PillTableName);
    	
		$query = "INSERT INTO " . $PillTableName . "(id, name, numLeft) 
			VALUES(
                    '".$_POST['id']."',
                    '".$_POST['name']."',
                    '".$_POST['numLeft']."'
                    )";

		mysqli_query($con, $query);
	}
}
else if (isset($_GET['getInventory']))
{
	$con = mysqli_connect($DatabaseAddress, $DatabaseID, $DatabasePassword, $PillTableName);
    	
	$query = "SELECT * FROM " . $PillTableName;

	mysqli_query($con, $query); 
	$results = mysqli_query($con, $query);

	if ($results)
	{
		$LongData = array();
		while ($row = $results->fetch_assoc())
		{
			array_push($LongData, $row);
		}
		echo json_encode($LongData);
	}
}
else if (isset($_GET['UpdateInventory']))
{
	$con = mysqli_connect($DatabaseAddress, $DatabaseID, $DatabasePassword, $PillTableName);
    
    $name = $_GET['name'];
    $numLeft = $_GET['numLeft'];

    $query = "UPDATE " . $PillTableName . " SET numLeft = " . $numLeft . " WHERE name=" . $name;
    mysqli_query($con, $query); 
}