<?php

class Volume {

	public $Id;
	public $IdComic;
	public $Titre;
	public $Descr;
	public $LienMin;
	public $Ordre;
	public $DB; 		// instance de PDO


	public function setDB(PDO $db){
		$this->DB=$db;
	}





	}

?>