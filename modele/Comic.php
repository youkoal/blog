<?php

class Comic {

	public $Id;
	public $ProjName;
	public $Descr;
	public $LienMin;
	public $Ordre;
	public $DB; 		// instance de PDO


	public function setDB(PDO $db){
		$this->DB=$db;
	}





	}

?>