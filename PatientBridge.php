<?php

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");

include 'DatabasePasswords.php';

if (isset($_GET['CreatePatient']))
{
	// If the Register form has been submitted
    $err = array();

    $con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

    //Check to see if username exists
    $name = mysqli_real_escape_string($con, $_GET['name']);

    $query = "SELECT * FROM Patients WHERE username='{$_GET['name']}'";
    $row = mysqli_fetch_assoc(mysqli_query($con, $query));

    if ($row['name'])
    {
        $err[] = 'Patient name already exists';
    }
    else if(!count($err))
    {
        // If there are no errors
        $address = $_GET['address'];
        $city = $_GET['city'];
        $province = $_GET['province'];
        $postalcode = $_GET['postalcode'];
        $phonenumber = $_GET['phonenumber'];
        $email = $_GET['email'];
        $doctor = $_GET['doctor'];
        $insurance = $_GET['insurance'];
        

        $query = "   INSERT INTO Patients(name, address, city, province, postalcode, phonenumber, email, doctor, insurance)
                    VALUES(
                    '" . $name . "',
                    '". $address ."',
                    '". $city ."',
                    '". $province ."',
                    '". $postalcode ."',
                    '". $phonenumber ."',
                    '". $email ."',
                    '". $doctor ."',
                    '". $insurance ."'
        )";

        // Escape the input data
        mysqli_query($con, $query);
    }

    if(count($err))
    {
        $_SESSION['msg']['reg-err'] = implode('<br />',$err);
    }
    print_r($err);
    exit;
}
else if (isset($_GET['UpdatePatient']))
{
    // If the Register form has been submitted
    $err = array();

    $con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

    //Check to see if username exists
    $name = mysqli_real_escape_string($con, $_GET['name']);
    $address = $_GET['address'];
    $city = $_GET['city'];
    $province = $_GET['province'];
    $postalcode = $_GET['postalcode'];
    $phonenumber = $_GET['phonenumber'];
    $email = $_GET['email'];
    $doctor = $_GET['doctor'];
    $insurance = $_GET['insurance'];

    $query = "UPDATE Patients SET address='{$_GET['address']}', 
    city='{$_GET['city']}', province='{$_GET['province']}', postalcode='{$_GET['postalcode']}',
    phonenumber='{$_GET['phonenumber']}', email='{$_GET['email']}', doctor='{$_GET['doctor']}',
    insurance='{$_GET['insurance']}' WHERE name='{$_GET['name']}'";
    mysqli_query($con, $query); 
    echo $query;
}
else if (isset($_GET['GetPatients']))
{
    $con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
    $query = "SELECT * FROM Patients WHERE name LIKE '" . $_GET['beginString'] . "%'";
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
else if (isset($_GET['DeletePatient']))
{
    $con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
    $query = 'DELETE FROM Patients WHERE name = "' . $_GET['name'] . '"';
    echo $query;
    mysqli_query($con, $query);
}
?>