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

	$query = "SELECT * FROM UsageTable WHERE PillName='" . $_GET['pillname'] . "'";

	$results = mysqli_query($con, $query);
	
	if ($results)
	{
		$LongData = array();
		while ($row = $results->fetch_assoc())
		{
			array_push($LongData, $row);
		}
		$RetData = array();
		$RetData['count'] = count($LongData);
		$RetData['name'] = $_GET['pillname'];

		echo json_encode($RetData);
	}
}
else if (isset($_GET['QueryByPatient']))
{	
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);	
	$query = "SELECT * FROM UsageTable WHERE Patient = '" . $_GET['PatientName'] . "'";

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
else if (isset($_GET['QueryByHour']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

	$query = "SELECT * FROM " . $UsageTableName . " WHERE hour(`CurrDate`) >= " . $_GET['HourLow'] .
	" and hour(`CurrDate`) < " . $_GET['HourHigh'];

	$results = mysqli_query($con, $query);

	if ($results)
	{
		$LongData = array();
		while ($row = $results->fetch_assoc())
		{
			array_push($LongData, $row);
		}
		echo count($LongData);
	}
}
else if (isset($_GET['QueryByDay']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

	$query = "SELECT * FROM " . $UsageTableName . " WHERE DAYOFWEEK(`CurrDate`) = " . $_GET['DayQuery'];

	$results = mysqli_query($con, $query);

	if ($results)
	{
		$LongData = array();
		while ($row = $results->fetch_assoc())
		{
			array_push($LongData, $row);
		}
		echo count($LongData);
	}
}
else if (isset($_GET['QueryByPharmacist']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

	$query = "SELECT * FROM " . $UsageTableName . " WHERE PharmacistID='" . $_GET['PharmacistID'] . "'";

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
else if (isset($_GET['QueryAll']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

	$query = "SELECT * FROM " . $UsageTableName;

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
else if (isset($_GET['NewUsage']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
	$query = "INSERT INTO UsageTable(PharmacistID, PillName, ChangeInCount, Patient, Currdate) VALUES("
	 . $_GET['pharmacistID'] . ",'"
	 . $_GET['pillname'] . "',"
	 . $_GET['changeInCount'] . ",'"
	 . $_GET['patient'] . "', NOW() )";

	echo $query;

	mysqli_query($con, $query);
}
else if (isset($_GET['GetUniquePills']))
{
	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
	
	$query = "SELECT DISTINCT PillName FROM UsageTable";

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