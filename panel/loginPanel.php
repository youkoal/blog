<?php
session_start();

function verif(){
	$usr = '';// Your md5(login user) here 
	$ps  = '';// Your md5(password) here

	if (md5($_POST['usr'])== $usr && md5($_POST['ps'])== $ps){
		$_SESSION['admin'] = 'Admin';
		return true;
	}
	else{
		$file = 'logs.php';
		$current = file_get_contents($file);
		$current .= date("d/m/Y : G:i :").$_POST['usr']."\n";
		file_put_contents($file, $current);
		return false;
	}
}

if(isset($_SESSION['admin'])){
	if($_SESSION['admin']="Admin"){
		unset($_SESSION['admin']);
		unset($_SESSION);
		echo 'vous vous etes deconnecter';
		include('Ajax/form/loginForm.html');
	}
}
elseif(isset($_POST['usr'])) {
		if(verif()) {header('Location: index.php');}
		else include('Ajax/form/loginForm.html');
	}
	else include('Ajax/form/loginForm.html');

?>