<?php

header("Content-Type: text/plain");

require_once 'DatabasePasswords.php';

session_name('LoginSession');

session_set_cookie_params(2*7*24*60*60); //make the cookie live for 2 weeks

session_start();

if (isset($_GET['logoff']))
{
	$_SESSION = array();
	session_destroy();
	exit;
}

if (isset($_GET['login']))
{
	$err = array();

	 if(!$_POST['username'] || !$_POST['password'])
        $err[] = 'All the fields must be filled in!';
    else
    {
    	$con = mysqli_connect($DatabaseAddress, $DatabaseID, $DatabasePassword, $TableName);
    	$_POST['username'] = mysql_real_escape_string($_POST['username']);
        $_POST['password'] = mysql_real_escape_string($_POST['password']);

        // Escaping all input data
        $query = "SELECT id,username FROM Users WHERE usr='{$_POST['username']}' AND pass='".md5($_POST['password'])."'";
        
        $row = mysqli_fetch_assoc(mysqli_query($con, $query));

        if ($row['usr'])
        {
        	$_SESSION['usr'] = $row['username'];
            $_SESSION['id'] = $row['id'];

            // Store login data in cookie
            $LoginData = array();
            $LoginData['username'] = $_POST['username'];
            $LoginData['password'] = $_POST['password'];
            setcookie('loginCookie', serialize($LoginData));
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

    if(strlen($_POST['username'])<7 || strlen($_POST['username'])>32)
    {
        $err[]='Your username must be between 6 and 32 characters!';
    }

    if(preg_match('/[^a-z0-9\-\_\.]+/i',$_POST['username']))
    {
        $err[]='Your username contains invalid characters!';
    }

    //Check to see if username exists
    $_POST['username'] = mysql_real_escape_string($_POST['username']);
    $con = mysqli_connect($DatabaseAddress, $DatabaseID, $DatabasePassword, $TableName);

    $query = "SELECT * FROM Users WHERE username='{$_POST['username']}'";
    $row = mysqli_fetch_assoc(mysqli_query($con, $query));

    if ($row['usr'])
    {
        $err[] = 'Username already exists';
    }
    else if(!count($err))
    {
        // If there are no errors
        $pass = substr(md5($_SERVER['REMOTE_ADDR'].microtime().rand(1,100000)),0,6);
        // Generate a random password

        // Escape the input data
        mysqli_query($con, "   INSERT INTO Username(username,password)
                    VALUES(
                    '".$_POST['username']."',
                    '".md5($pass)."'
        )");
    }

    if(count($err))
    {
        $_SESSION['msg']['reg-err'] = implode('<br />',$err);
    }
    print_r($err);
    exit;
}
?>