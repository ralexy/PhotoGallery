<?php
namespace Library;

class PDOFactory
{
  public static function getMysqlConnexion()
  {
    try
    {
      $options = array(
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
      );

      $db = new \PDO('mysql:host=127.0.0.1;dbname=photogallery', 'root', '', $options);

      return $db;
    }
    catch(\PDOException $e)
    {
      exit($e->getMessage());
    }
  }
}