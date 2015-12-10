<?php

class News {

	public $Id;
	public $Titre;
	public $Date;
	public $Contenus;
	public $DB;
	// instance de PDO


	public function setDB(PDO $db){
		$this->DB=$db;
	}

	//cree une nouvelle image et l'ajoute à la BDD
	public function create(array $data){
		//initalisation des parametres
		$this->Titre = isset($data['Titre']) ? $data['Titre'] : "";
		$this->Date = date("Y-m-d H:i:s");
		$this->Contenus = isset($data['Contenus'])  ? $data['Contenus'] : "";


		$sql = $this->DB->prepare('INSERT INTO news VALUES("", :Titre, :Dat, :Contenus)');
		$sql->bindValue('Titre',$this->Titre,PDO::PARAM_STR);
		$sql->bindValue('Dat',$this->Date,PDO::PARAM_STR);
		$sql->bindValue('Contenus',$this->Contenus,PDO::PARAM_STR);

		try {
			$sql->execute();						  	
			} catch (PDOException $e) {
			    echo $e->getMessage();
			    echo '<br/> le webmaster la fail en serieux';
			}

		}


		//suprime une images de la BDD et met à jour l'ordre
		public function delete(){
		$sql= $this->DB->prepare('DELETE FROM news where Id= :id');
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->execute();
		}






	//met à jour une image et la BDD (édition d'info)
	public function update(array $data){
		echo $data['Id'];
		$sql = $this->DB->prepare("update news set Titre= :Titre, Dat= :Dat, Contenus= :Contenus where Id = :id ");	
		$sql->bindValue('Titre',$this->Titre,PDO::PARAM_STR);
		$sql->bindValue('Dat',$this->Date,PDO::PARAM_STR);
		$sql->bindValue('Contenus',$this->Contenus,PDO::PARAM_STR);
		$sql->execute();
	}

	//met à jour une image et la BDD (édition d'info)
	public function updateTC($T,$C){
		$sql = $this->DB->prepare("update news set Titre= :Titre, Contenus= :Contenus where Id = :id ");	
		$sql->bindValue('Titre',$T,PDO::PARAM_STR);
		$sql->bindValue('Contenus',$C,PDO::PARAM_STR);
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->execute();
	}

	//construit l'objet à partir de l'id à trouver dans la BDD
	public function findById($i){
		$sql= $this->DB->prepare("select * from news where Id= :id");
		$sql->bindValue('id',$i,PDO::PARAM_INT);
		$sql->execute();
		$this->build($sql->fetch());
	}

	public function build($data){
		$this->Id = isset($data['Id']) ? $data['Id'] : -1 ;
		$this->Titre = isset($data['Titre']) ? $data['Titre'] : "" ;
		$this->Date = isset($data['Dat'])  ? $data['Dat'] : "";
		$this->Contenus = isset($data['Contenus'] ) ? $data['Contenus'] : "";
	}



}


//$i = new News();
//$db = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
//$i->setDB($db);
//
//$i->create(array('Titre'=>'peche2','Contenus'=>'melba2'))

?>