<?php

class Images {

	public $Id;
	public $IdCateg;
	public $ProjName;
	public $Descr;
	public $LienMin;
	public $LienBig;
	public $Ordre;
	public $DB; 		// instance de PDO


	public function setDB(PDO $db){
		$this->DB=$db;
	}

	//cree une nouvelle image et l'ajoute à la BDD
	public function create(array $data){
		//initalisation des parametres
		$this->IdCateg = isset($data['IdCateg']) ? $data['IdCateg'] : -1 ;
		$this->ProjName = isset($data['ProjName'])  ? $data['ProjName'] : "";
		$this->Descr = isset($data['Descr'] ) ? $data['Descr'] : "";
		$this->LienMin = isset($data['LienMin'])  ? $data['LienMin'] : "";
		$this->LienBig = isset($data['LienBig'] ) ? $data['LienBig'] : "";

			//si l'ordre n'est pas définis, on le présente en 1er
		$this->Ordre = isset($data['Ordre'])  ? $data['Ordre'] : -1;

		//init l'ordre en cas d'absence de donnée
		if ($this->Ordre == -1){
			$O= $this->DB->query("select COUNT(*) from images where IdCateg=".$this->IdCateg)->fetchColumn();
			if ($O!=null){
				$this->Ordre=$O+1;
				echo 'à ajouter en dernier';
			}
			else {echo 'Un probleme est survenus';}
		}
		else{
			$r= $this->DB->query("select COUNT(*) from images where IdCateg=".$this->IdCateg)->fetchColumn();
			$req = $this->DB->query("select * from Images where Ordre >=".$this->Ordre." AND IdCateg=".$this->IdCateg)->fetchAll();
			foreach ($req as $i) {
				$i['Ordre']+=1;
				$tmp=new Images();
				$tmp->setDB($this->DB);
				$tmp->build($i);
				$tmp->update();			
			}
		}

		$sql = $this->DB->prepare('INSERT INTO images VALUES("", :idc , :Pnam , :Des , :Lmin , :Lbig , :ord)');
		$sql->bindValue('idc',$this->IdCateg,PDO::PARAM_INT);
		$sql->bindValue('Pnam',$this->ProjName,PDO::PARAM_STR);
		$sql->bindValue('Des',$this->Descr,PDO::PARAM_STR);
		$sql->bindValue('Lmin',$this->LienMin,PDO::PARAM_STR);
		$sql->bindValue('Lbig',$this->LienBig,PDO::PARAM_STR);
		$sql->bindValue('ord',$this->Ordre,PDO::PARAM_INT);
		try {
			$sql->execute();						  	
			} catch (PDOException $e) {
			    echo $e->getMessage();
			    echo '<br/> le webmaster la fail en serieux';
			}

		}


		//suprime une images de la BDD et met à jour l'ordre
		public function delete(){
		
		$req = $this->DB->query("select * from Images where Ordre >".$this->Ordre." AND IdCateg=".$this->IdCateg)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']-=1;
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();			
		}
		print_r($this);
		$sql= $this->DB->prepare('DELETE FROM images where Id= :id');
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->execute();

		}






	//met à jour une image et la BDD (édition d'info)
	public function update(){
		$sql = $this->DB->prepare("update images set IdCateg= :idc, ProjName= :Pnam, Descr= :Des, LienMin = :Lmin, LienBig = :Lbig, Ordre = :ord where Id = :id ");	
		$sql->bindValue('idc',$this->IdCateg,PDO::PARAM_INT);
		$sql->bindValue('Pnam',$this->ProjName,PDO::PARAM_STR);
		$sql->bindValue('Des',$this->Descr,PDO::PARAM_STR);
		$sql->bindValue('Lmin',$this->LienMin,PDO::PARAM_STR);
		$sql->bindValue('Lbig',$this->LienBig,PDO::PARAM_STR);
		$sql->bindValue('ord',$this->Ordre,PDO::PARAM_INT);
		$sql->bindValue('id',$this->Id,PDO::PARAM_INT);
		$sql->execute();
		
	}

	//construit l'objet à partir de l'id à trouver dans la BDD
	public function findById($i){
		$sql= $this->DB->prepare("select * from images where Id= :id");
		$sql->bindValue('id',$i,PDO::PARAM_INT);
		$sql->execute();
		$this->build($sql->fetch());
	}

	public function build($data){
		$this->Id = isset($data['Id']) ? $data['Id'] : -1 ;
		$this->IdCateg = isset($data['IdCateg']) ? $data['IdCateg'] : -1 ;
		$this->ProjName = isset($data['ProjName'])  ? $data['ProjName'] : "";
		$this->Descr = isset($data['Descr'] ) ? $data['Descr'] : "";
		$this->LienMin = isset($data['LienMin'])  ? $data['LienMin'] : "";
		$this->LienBig = isset($data['LienBig'] ) ? $data['LienBig'] : "";
		$this->Ordre = isset($data['Ordre'])  ? $data['Ordre'] : -1;
	}

	//met à jour une categorie et la BDD (édition d'info)
	public function updateE($ca, $nm, $ds, $or, $lm, $lb){
		
		if ($or != $this->Ordre && $ca == $this->IdCateg){
			$this->reorder($or);
			$this->Ordre=$or;
		}
		elseif($ca != $this->IdCateg){
			$this->reorderDC($or,$ca);
			$this->Ordre=$or;
		}
		$this->IdCateg=$ca;
		$this->ProjName=$nm;
		$this->Descr=$ds;
		$this->LienMin=$lm;
		$this->LienBig=$lb;
		$this->update();
		
	}
	//public $IdCateg;
	//public $ProjName;
	//public $Descr;
	//public $LienMin;
	//public $LienBig;
	//public $Ordre;

	//boug une image de la BDD et met à jour l'ordre
	public function reorder($ordre){
		$req = $this->DB->query("select * from images where Ordre >".$this->Ordre." AND IdCateg=".$this->IdCateg)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']-1);
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();		
		}

		$req = $this->DB->query("select * from images where Ordre >=".$ordre." AND IdCateg=".$this->IdCateg)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']+1);
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();	
		}
	}

	//boug une image de la BDD et met à jour l'ordre (différentes catégories)
	public function reorderDC($ordre,$id){
		$req = $this->DB->query("select * from images where Ordre > ".$this->Ordre." AND IdCateg= ".$this->IdCateg)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']-1);
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();		
		}

		$req = $this->DB->query("select * from images where Ordre >= ".$ordre." AND IdCateg= ".$id)->fetchAll();
		foreach ($req as $i) {
			$i['Ordre']=($i['Ordre']+1);
			$tmp=new Images();
			$tmp->setDB($this->DB);
			$tmp->build($i);
			$tmp->update();	
		}
	}


	public function getClient(){
		return (object) [
			'ProjName'=>$this->ProjName,
			'Descr'=>$this->Descr,
			'LienMin'=>$this->LienMin,
			'LienBig'=>$this->LienBig];
	}


}


//$i = new Images();
//$db = new PDO('mysql:host=localhost;dbname=dbblog', 'root', '',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
//$i->setDB($db);

?>