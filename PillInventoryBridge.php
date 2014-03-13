<?php

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");

include 'DatabasePasswords.php';

if (isset($_GET['RegisterPill']))
{
	$err = array();

	if (!$_GET['numLeft'] || !$_GET['name'])
		$err[] = 'All the fields must be filled in!';
	else
	{
		$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

		$query = "SELECT * FROM " . $PillTableName . " WHERE name='{$_GET['name']}'";

		$row = mysqli_fetch_assoc(mysqli_query($con, $query));

	    if ($row['name'])
	    {
	        $err[] = 'Pill already exists';
	    }
	    else if(!count($err))
    	{
			$query = "INSERT INTO " . $PillTableName . "(name, numLeft) 
			VALUES(
                    '".$_GET['name']."',
                    '".$_GET['numLeft']."'
                    )";

			echo $query;

			mysqli_query($con, $query);
		}
	}
	if (count($err))
	{
		print_r($err);
	}
}
else if (isset($_GET['GetInventory']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
	
	$query = "SELECT * FROM " . $PillTableName . " WHERE name='{$_GET['name']}'";

	mysqli_query($con, $query); 
	$results = mysqli_query($con, $query);

	$LongData = array();

	array_push($LongData, mysqli_fetch_assoc($results));

	echo json_encode($LongData);
}
else if (isset($_GET['GetAllInventory']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
	
	$query = "SELECT * FROM " . $PillTableName;

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
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

    $name = $_GET['name'];
    $numLeft = $_GET['numLeft'];

    $query = "UPDATE " . $PillTableName . " SET numLeft='{$_GET['numLeft']}' WHERE name='{$_GET['name']}'";
    mysqli_query($con, $query); 
}
else if (isset($_GET['NewInventory']))
{
	echo "IN HERE";
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

	$Names = json_decode($_GET['Names']);
	$NumLeft = json_decode($_GET['NumLeft']);

	print_r($Names);
	print_r($NumLeft);

	//Delete all rows from the inventory table
	$query = "TRUNCATE Pills";
	mysqli_query($con, $query);

	$NamesSize = sizeof($Names);

	echo $NamesSize;

	for ($i = 0; $i < $NamesSize; $i++) {
		$query = "INSERT INTO " . $PillTableName . "(name, numLeft) 
			VALUES(
                    '".$Names[$i]."',
                    '".$NumLeft[$i]."'
                    )";
		mysqli_query($con, $query);
	}

}