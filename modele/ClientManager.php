<?php
require_once('Images.php');
require_once('Categorie.php');
require_once('News.php');
class ClientManager{
	public $DB;

	function __construct() {
        $this->DB = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$this->DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    }




    public function getAllImgs($cat){
        $res=array();
        $db=$this->DB;
        $sql=$db->query("select * from images where IdCateg=".$cat." order by Ordre")->fetchAll();
        foreach ($sql as $i) {
            $item = new Images();
            $item->setDB($db);
            $item->build($i);
            $item=$item->getClient();
            $res[]=$item;
        }
        return $res;
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


    public function getLastNews(){
        return $this->DB->query("SELECT * FROM news order by Dat desc limit 1")->fetch();
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


    }

    ?>