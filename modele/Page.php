<?php

class Page {

	public $Id;
	public $IdComic;
	public $IdChapitre;
	public $LienImg;
	public $Ordre;
	public $DB; 		// instance de PDO

	public function setDB(PDO $db){
		$this->DB=$db;
	}





	}

?>