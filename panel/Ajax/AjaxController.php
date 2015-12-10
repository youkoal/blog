<?php
session_start();
if(isset($_SESSION['admin'])){
	if($_SESSION['admin']="Admin"){
		require_once('../../modele/Manager.php');
		$manager= new Manager();
		//appel des fonction destiné à récupéré des elts
		if (isset($_GET['func'])){
			if ($_GET['func']=='getAllImgs'){
				echo json_encode($manager->getAllImgs());
			}
			elseif ($_GET['func']=='getAllNews'){
				echo json_encode($manager->getAllNews());
			}
			elseif ($_GET['func']=='getOneNews'){
				echo json_encode($manager->getOneNews($_GET['newsId']));
			}
			elseif ($_GET['func']=='getFormNewNews'){
				include('form/newsForm.html');
			}
			elseif ($_GET['func']=='getAllCats'){
				echo json_encode($manager->getAllCats());
			}
			elseif ($_GET['func']=='getFormCats'){

				include('form/CatsForm.html');
			}
			elseif ($_GET['func']=='getCatsO'){
				echo $manager->getCatsO();
			}
			elseif ($_GET['func']=='getOneCats'){
				echo json_encode($manager->getOneCats($_GET['catsId']));
			}
			elseif ($_GET['func']=='getFormImgs'){

				include('form/ImgForm.html');
			}
			elseif ($_GET['func']=='getImgsNb'){

				echo $manager->getImgsNb($_GET['cat']);
			}
		}

		elseif(isset($_POST['func'])){
			if($_POST['func']=='creeNews'){
				echo $manager->creeNews( $_POST['Titre'] , $_POST['Contenus'] );
			}
			elseif($_POST['func']=='editNews'){
				echo $manager->editNews($_POST['nid'], $_POST['Titre'] , $_POST['Contenus'] );
			}
			elseif($_POST['func']=='suprNews'){
				echo $manager->suprNews($_POST['nid']);
			}
			elseif($_POST['func']=='creeCats'){
				echo $manager->editNews($_POST['nid'], $_POST['Titre'] , $_POST['Contenus'] );
			}
			elseif($_POST['func']=='creeCatsOK'){
				echo $manager->creeCats( $_POST['Nom'] , $_POST['Lien'] , $_POST['Ordre']);
			}
			elseif($_POST['func']=='editCats'){
				echo $manager->editCats($_POST['cid'], $_POST['Titre'] , $_POST['Lien'] , $_POST['Ordre']);
			}
			elseif($_POST['func']=='suprCats'){
				echo $manager->suprCats($_POST['cid']);
			}
			elseif($_POST['func']=='creeImgOK'){
				echo $manager->creeImg($_POST['Categorie'], $_POST['Nom'] , $_POST['Descr'] , $_POST['Ordre'] , $_POST['LienMin'] , $_POST['LienBig']);
			}
			elseif($_POST['func']=='editImgOK'){
				echo $manager->editImg($_POST['Id'],$_POST['Categorie'], $_POST['Nom'] , $_POST['Descr'] , $_POST['Ordre'] , $_POST['LienMin'] , $_POST['LienBig']);
				echo 'fait';
			}
			elseif($_POST['func']=='suprImg'){
				echo $manager->suprImg($_POST['iid']);
			}

		}

	}
}

?>