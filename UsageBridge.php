<?php

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");

include 'DatabasePasswords.php';

if(isset($_GET['Stock']))
{
	//Add entry to sql table indicating that we dispensed
	if( !$_GET['number'] || !$_GET['PharmID'] || !$_GET['name'] )
	{
		$err[] = 'All the fields must be filled in!';
	}
	else
	{
		$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

		//Query the pill table to get the pillid
		$query = "SELECT * FROM " . $PillTableName . " WHERE name='" . $_GET['name'] . "'";

		$results = mysqli_query($con, $query);

		$row = mysqli_fetch_assoc($results);

		if ($row)
		{
			print_r($row);
			$PillID = $row['id'];
			$query = "INSERT INTO " . $UsageTableName . " (PharmacistID, PillID, CurrDate, ChangeInCount)
				VALUES(
                    '".$_GET['PharmID']."',
                    '".$PillID."',
                    NOW(),
                    '".$_GET['number']."'
                    )";

			mysqli_query($con, $query);

			echo $query;
		}
		else
		{
			$err[] = 'Pill name is invalid';
		}
	}
}
else if (isset($_GET['Dispense']))
{
	//Add entry to sql table indicating that we dispensed
	if( !$_GET['number'] || !$_GET['PharmID'] || !$_GET['name'] )
	{
		$err[] = 'All the fields must be filled in!';
	}
	else
	{
		$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

		//Query the pill table to get the pillid
		$query = "SELECT * FROM " . $PillTableName . " WHERE name='" . $_GET['name'] . "'";

		$results = mysqli_query($con, $query);

		$row = mysqli_fetch_assoc($results);

		if ($row)
		{
			print_r($row);
			$PillID = $row['id'];
			$query = "INSERT INTO " . $UsageTableName . " (PharmacistID, PillID, CurrDate, ChangeInCount)
				VALUES(
                    '".$_GET['PharmID']."',
                    '".$PillID."',
                    NOW(),
                    '".-1*$_GET['number']."'
                    )";

			mysqli_query($con, $query);

			echo $query;
		}
		else
		{
			$err[] = 'Pill name is invalid';
		}
	}
}
else if (isset($_GET['QueryByPill']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
	
}
else if (isset($_GET['QueryByTime']))
{

}
else if (isset($_GET['QueryByDay']))
{

}
else if (isset($_GET['QueryByPharmacist']))
{

}
else if (isset($_GET['QueryAll']))
{
	
}