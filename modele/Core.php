<?php
class Core
{
    public $dbh; // handle of the db connexion
    private static $instance;

    private function __construct()
    {
        // building data source name from config
        $dsn = 'pgsql:host=' . Config::read('db.host') .
               ';dbname='    . Config::read('db.basename') .
               ';port='      . Config::read('db.port') .
               ';connect_timeout=15';
        // getting DB user from config                
        $user = Config::read('db.user');
        // getting DB password from config                
        $password = Config::read('db.password');

        $this->dbh = new PDO($dsn, $user, $password);
    }

    public static function getInstance()
    {
        if (!isset(self::$instance))
        {
            $object = __CLASS__;
            self::$instance = new $object;
        }
        return self::$instance;
    }

    // others global functions

//exemples BDD
//$sql = "select login, email from users where id = :id";
//
//try {
//    $core = Core::getInstance();
//    $stmt = $core->dbh->prepare($sql);
//    $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
//
//    if ($stmt->execute()) {
//        $o = $stmt->fetch(PDO::FETCH_OBJ);
//        // blablabla...
}
?>

