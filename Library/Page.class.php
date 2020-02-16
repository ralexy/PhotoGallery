<?php
namespace Library;

class Page extends ApplicationComponent
{
  protected $contentFile;
  protected $languageFile;
  protected $module; // Utile pour la recherche en Backend et le changement de langue
  protected $vars = array();

  public function addVar($var, $value)
  {
    if (!is_string($var) || is_numeric($var) || empty($var))
    {
      throw new \InvalidArgumentException('Le nom de la variable doit être une chaîne de caractères non nulle');
    }

    $this->vars[$var] = $value;
  }

  public function getGeneratedPage()
  {
    if (!is_file($this->contentFile))
    {
      throw new \RuntimeException('La vue spécifiée n\'existe pas');
    }

    $user = $this->app->user();

    extract($this->vars);

    ob_start();
      is_file($this->languageFile) ? require $this->languageFile : ''; // On initialise les variables avant de les utiliser
      require $this->contentFile;
    $content = ob_get_clean();

    ob_start();
      require __DIR__. '/../Applications/'. $this->app->name(). '/Templates/layout.php';
    return ob_get_clean();
  }

  public function setContentFile($contentFile)
  {
    if (!is_string($contentFile) || empty($contentFile))
    {
      throw new \InvalidArgumentException('La vue doit être une chaîne de caractères valide');
    }

    $this->contentFile = $contentFile;
  }

  public function setLanguageFile($languageFile)
  {
    if (!is_string($languageFile) || empty($languageFile))
    {
      throw new \InvalidArgumentException('Le fichier de langue doit être une chaîne de caractères valide');
    }

    $this->languageFile = $languageFile; 
  }

  public function setModule($module)
  {
    if (!is_string($module) || empty($module))
    {
      throw new \InvalidArgumentException('Le module doit être une chaîne de caractères valide');
    }

    $this->module = $module;
  }
}