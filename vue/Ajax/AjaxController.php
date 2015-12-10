<?php
require_once('../../modele/ClientManager.php');
$manager= new ClientManager();
if(isset($_GET['func'])){
	if($_GET['func']=='getImg' && is_numeric($_GET['cat'])){//test si l'user imput est bien un nombre
		echo json_encode($manager->getAllImgs($_GET['cat']));
		return;
	}
	elseif($_GET['func']=='getCats'){
		echo json_encode($manager->getAllCats());
		return;
	}
	elseif($_GET['func']=='getLastNews'){
		echo json_encode($manager->getLastNews());
		return;
	}
	elseif($_GET['func']=='getAllNews'){
		echo json_encode($manager->getAllNews());
		return;
	}
	elseif($_GET['func']=='getOneNews' && is_numeric($_GET['Id'])){
		echo json_encode($manager->getOneNews($_GET['Id']));
		return;
	}




}




?>