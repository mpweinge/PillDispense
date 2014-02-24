<?php

header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");

include 'DatabasePasswords.php';

session_name('LoginSession');

session_set_cookie_params(2*7*24*60*60); //make the cookie live for 2 weeks

session_start();

if (isset($_GET['logoff']))
{
	$_SESSION = array();
	session_destroy();
	exit;
}

if (isset($_GET['Login']))
{
	$err = array();

	 if(!$_GET['username'] || !$_GET['password'])
        $err[] = 'All the fields must be filled in!';
    else
    {
    	$con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);
        $_GET['username'] = mysql_real_escape_string($_GET['username']);
        $_GET['password'] = mysql_real_escape_string($_GET['password']);

        // Escaping all input data
        $query = "SELECT id,username FROM Users WHERE username='{$_GET['username']}' AND password='".md5($_GET['password'])."'";
        
        $row = mysqli_fetch_assoc(mysqli_query($con, $query));

        if ($row['username'])
        {
        	$_SESSION['usr'] = $row['username'];
            $_SESSION['id'] = $row['id'];

            // Store login data in cookie
            $LoginData = array();
            $LoginData['username'] = $_GET['username'];
            $LoginData['password'] = $_GET['password'];

            $LoginData = json_encode($LoginData);

            setcookie('loginCookie', $LoginData);
        }
        else $err[]='Wrong username and/or password!';
	}

    if($err)
    {
        $_SESSION['msg']['login-err'] = implode('<br />',$err);
        // Save the error messages in the session
        print_r($err);
    }
    
    exit;
}
else if (isset($_GET['Register']))
{
	// If the Register form has been submitted
    $err = array();

    if(strlen($_GET['username'])<7 || strlen($_GET['username'])>32)
    {
        $err[]='Your username must be between 6 and 32 characters!';
    }

    if(preg_match('/[^a-z0-9\-\_\.]+/i',$_GET['username']))
    {
        $err[]='Your username contains invalid characters!';
    }

    $con = mysqli_connect($DatabaseAddress, $MySQLUser, $DatabasePassword, $DatabaseID);

    //Check to see if username exists
    $Username = mysqli_real_escape_string($con, $_GET['username']);

    $query = "SELECT * FROM Users WHERE username='{$_GET['username']}'";
    $row = mysqli_fetch_assoc(mysqli_query($con, $query));

    if ($row['username'])
    {
        $err[] = 'Username already exists';
    }
    else if(!count($err))
    {
        // If there are no errors
        $pass = md5($_GET['password']);
        $email = $_GET['email'];

        $query = "   INSERT INTO Users(username,password, email)
                    VALUES(
                    '" . $Username . "',
                    '". $pass ."',
                    '". $email ."'
        )";

        // Escape the input data
        mysqli_query($con, $query);

        $LoginData = array();
        $LoginData['username'] = $_GET['username'];
        $LoginData['password'] = $_GET['password'];

        $LoginData = json_encode($LoginData);

        setcookie('loginCookie', $LoginData);
    }

    if(count($err))
    {
        $_SESSION['msg']['reg-err'] = implode('<br />',$err);
    }
    print_r($err);
    exit;
}
?>