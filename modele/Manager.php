<?php
require_once('Images.php');
require_once('Categorie.php');
require_once('News.php');
class Manager{
	public $DB;

	function __construct() {
        $this->DB = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$this->DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    }


    public function creeNews($titre,$contenus){
    	$news=new News();
    	$news->DB=$this->DB;
    	$res;
    	try{
    		$news->create(array('Titre'=> $titre, 'Contenus' => $contenus));
    		$res = 'news créée avec succès';
    	}
    	catch( PDOException $e ) {
    		$res= 'un probleme est survenus lors de la création de la news<br/>';
    		echo $e;
    	}
    	return $res;
    }

    public function editNews($Id,$titre,$contenus){
        $news=new News();
        $news->DB=$this->DB;
        $res;
        try{
            $news->findById($Id);
            $news->updateTC($titre,$contenus);
            $res = 'news créée avec succès';
        }
        catch( PDOException $e ) {
            $res= 'un probleme est survenus lors de la création de la news<br/>';
            echo $e;
        }
        return $res;
    }

    public function suprNews($Id){
        $news=new News();
        $news->DB=$this->DB;
        $res;
        try{
            $news->findById($Id);
            $news->delete();
            $res = 'news suprimée avec succès';
        }
        catch( PDOException $e ) {
            $res= 'un probleme est survenus lors de la suppession de la news<br/>';
            echo $e;
        }
        return $res;
    }

	public function getAllNews(){
		$res=array();
		$db=$this->DB;
		$sql=$db->query("select Id,Titre,Dat from news order by Dat desc")->fetchAll();
		foreach ($sql as $i) {
			$item = new News();
			$item->setDB($db);
			$item->build($i);
			$res[]=$item;
		}
		return $res;

	}

        public function getOneNews($nid){
        $db=$this->DB;
        $sql=$db->query("select * from news where Id=".$nid)->fetch();
        return $sql;

    }



    public function getCatsO(){
        $db=$this->DB;
        $sql=$db->query("select COUNT(*) from categorie")->fetchColumn();
        return $sql[0];

    }

    public function getOneCats($cid){
        $db=$this->DB;
        $sql=$db->query("select * from categorie where Id=".$cid)->fetch();
        return $sql;

    }

    public function getAllCats(){
        $res=array();
        $db=$this->DB;
        $sql=$db->query("select * from categorie order by Ordre")->fetchAll();
        foreach ($sql as $i) {
            $item = new Categorie();
            $item->setDB($db);
            $item->build($i);
            $res[]=$item;
        }
        return $res;

    }

    public function creeCats($nom,$lien,$ordre){
        $news=new Categorie();
        $news->DB=$this->DB;
        $res;
        try{
            $news->create(array('Nom'=> $nom, 'LienB' => $lien , 'Ordre' => $ordre));
            $res = 'catégorie créée avec succès';
        }
        catch( PDOException $e ) {
            $res= 'un probleme est survenus lors de la création de la catégorie<br/>';
            echo $e;
        }
        return $res;
    }

        public function editCats($id,$nom,$lien,$ordre){
        $cat=new Categorie();
        $cat->DB=$this->DB;
        $res;
        try{
            $cat->findById($id);
            $cat->updateE($nom,$lien,$ordre);

            $res = 'catégorie créée avec succès';
        }
        catch( PDOException $e ) {
            $res= "un probleme est survenus lors de l'édition de la catégorie<br/>";
            echo $e;
        }
        return $res;
    }

        public function suprCats($Id){
        $cats=new Categorie();
        $cats->DB=$this->DB;
        $res;
        try{
            $cats->findById($Id);
            $cats->delete();
            $res = 'catégorie et immages associées suprimé avec succès<br>';
        }
        catch( PDOException $e ) {
            $res= 'un probleme est survenus lors de la suppession de la catégorie<br/>';
            echo $e;
        }
        return $res;
    }


    public function getAllImgs(){
        $res=array();
        $db=$this->DB;
        $sql=$db->query("select * from images order by Ordre")->fetchAll();
        foreach ($sql as $i) {
            $item = new Images();
            $item->setDB($db);
            $item->build($i);
            $res[]=$item;
        }
        return $res;
    }


    public function getImgsNb($Id){
        $db=$this->DB;
        $sql=$db->query("select COUNT(*) from images where IdCateg=".$Id)->fetchColumn();
        return $sql;
    }
//Categorie Nom Descr Ordre LienMin LienBig 

    public function creeImg($ca, $nm, $ds, $or, $lm, $lb){
        $img=new Images();
        $img->DB=$this->DB;
        $img->create(array(
            'IdCateg'   => $ca,
            'ProjName'  => $nm,
            'Descr'     =>  $ds,
            'LienMin'   =>   $lm,
            'LienBig'   =>    $lb,
            'Ordre'     =>     $or));
    }


    public function editImg($id, $ca, $nm, $ds, $or, $lm, $lb){
        $img=new Images();
        $img->DB=$this->DB;
        $res;
        try{
            $img->findById($id);
            $img->updateE($ca, $nm, $ds, $or, $lm, $lb);

            $res = 'image édité avec succès';
        }
        catch( PDOException $e ) {
            $res= "un probleme est survenus lors de l'édition de l'image'<br/>";
            echo $e;
        }
        return $res;
    }


    public function suprImg($Id){
        $img=new Images();
        $img->DB=$this->DB;
        $res;
        try{
            $img->findById($Id);
            $img->delete();
            $res = 'image suprimé avec succès<br>';
        }
        catch( PDOException $e ) {
            $res= 'un probleme est survenus lors de la suppession de l\'image<br/>';
            echo $e;
        }
        return $res;
    }


}
//$i = new Manager();
//$db = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
//$i->DB=$db;
//
//$i->creeNews('testA','testcontenus');
//$r=$i->getAllNews();
//foreach ($r as $item) {
//	print_r(json_encode($item));
//	echo '<br/>';
//}
?>