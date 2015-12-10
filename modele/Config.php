<?php
class Config
{
    static $confArray;

    public static function read($name)
    {
        return self::$confArray[$name];
    }

    public static function write($name, $value)
    {
        self::$confArray[$name] = $value;
    }

}

// db
Config::write('db.host', '127.0.0.1');
Config::write('db.port', '5432');
Config::write('db.basename', 'mydb');
Config::write('db.user', 'myuser');
Config::write('db.password', 'mypassword');