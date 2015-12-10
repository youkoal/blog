<?php
require_once('Images.php');
class Categorie {

	public $Id;
	public $Nom;
	public $LienB;
	public $Ordre;
	public $DB; 		// instance de PDO


	public function setDB(PDO $db){
		$this->DB=$db;
	}

	//cree une nouvelle categorie et l'ajoute à la BDD
	public function create(array $data){
		//initalisation des parametres
		$this->Nom = isset($data['Nom']) ? $data['Nom'] : -1 ;
		$this->LienB = isset($data['LienB'] ) ? $data['LienB'] : "";

			//si l'ordre n'est pas définis, on le présente en 1er
		$this->Ordre = isset($data['Ordre'])  ? $data['Ordre'] : -1;

		//init l'ordre en cas d'absence de donnée
		if ($this->Ordre == -1){
			$O= $this->DB->query("select COUNT(*) from categorie")->fetchColumn();
			if ($O!=null){
				$this->Ordre=$O+1;
				echo 'à ajouter en dernier';
			}
			else {echo 'Un probleme est survenus';}
		}
		else{
			$r= $this->DB->query("select COUNT(*) from categorie")->fetchColumn();
			$req = $this->DB->query("select * from categorie where Ordre >=".$this->Ordre)->fetchAll();
			foreach ($req as $i) {
				$i['Ordre']+=1;
				$tmp=new Categorie();
				$tmp->setDB($this->DB);
				$tmp->build($i);
				$tmp->update($i);			
			}
		}
		$sql = $this->DB->prepare('INSERT INTO categorie VALUES("", :nm, :link ,:ord)');
		$sql->bindValue('nm',$this->Nom,PDO::PARAM_STR);
		$sql->bindValue('link',$this->LienB,PDO::PARAM_STR);
		$sql->bindValue('ord',$this->Ordre,PDO::PARAM_INT);
		try {
			$sql->execute();						  	
			} catch (PDOException $e) {
			    echo $e->getMessage();
			    echo '<br/> le webmaster la fail en serieux';
			}

		}


		//suprime une categorie de la BDD et met à jour l'ordre
		public function delete(){
		
		$req = $this->DB->query("select * from categorie where Ordre >".$this->Ordre)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']-1);
			$tmp=new Categorie();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();			
		}
		//avant de suprimé la catégorie, on suprime toute les références des images de la BDD
		$req2 = $this->DB->query("select * from images where IdCateg=".$this->Id)->fetchAll();
		foreach ($req2 as $i) {
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->delete();			
		}

		//print_r($this);
		$sql= $this->DB->prepare('DELETE FROM categorie where Id= :id');
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->execute();

		}

				//suprime une categorie de la BDD et met à jour l'ordre
		public function reorder($ordre){
		
		$req = $this->DB->query("select * from categorie where Ordre >".$this->Ordre)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']-1);
			$tmp=new Categorie();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();		
		}

		$req = $this->DB->query("select * from categorie where Ordre >=".$ordre)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']+1);
			$tmp=new Categorie();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();		
		}

		}






	//met à jour une categorie et la BDD (édition d'info)
	public function update(){
		$sql = $this->DB->prepare("update categorie set Nom= :nm, LienB= :link, Ordre = :ord where Id = :id ");	
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->bindValue('nm',$this->Nom,PDO::PARAM_STR);
		$sql->bindValue('link',$this->LienB,PDO::PARAM_STR);
		$sql->bindValue('ord',$this->Ordre,PDO::PARAM_INT);
		$sql->execute();
		
	}

		//met à jour une categorie et la BDD (édition d'info)
	public function updateE($n, $l, $o){
		
		if ($o != $this->Ordre){
			$this->reorder($o);
			$this->Ordre=$o;
		}
		$this->Nom=$n;
		$this->LienB=$l;
		$this->update();
		
	}

	//construit l'objet à partir de l'id à trouver dans la BDD
	public function findById($i){
		$sql= $this->DB->prepare("select * from categorie where Id= :id");
		$sql->bindValue('id',$i,PDO::PARAM_INT);
		$sql->execute();
		$this->build($sql->fetch());
	}

	public function build($data){
		$this->Id = isset($data['Id']) ? $data['Id'] : -1 ;
		$this->Nom = isset($data['Nom']) ? $data['Nom'] : "" ;
		$this->LienB = isset($data['LienB'] ) ? $data['LienB'] : "";
		$this->Ordre = isset($data['Ordre'])  ? $data['Ordre'] : -1;
	}

}


//$i = new Categorie();
//$db = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
//$i->setDB($db);
//
//
//$i->findById(1);
//$i->delete();


//$i->create(array(	'Nom'=>'test1',
//					'LienB'=>'lien'
//					));
//

?>