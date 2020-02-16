<?php
function autoload($class)
{
  $path =  '../'. str_replace('\\', '/', $class). '.class.php';
  require $path;
}

spl_autoload_register('autoload');