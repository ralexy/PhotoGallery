<?php
namespace Library;

class Pager extends ApplicationComponent
{
  protected $current;
  protected $records;
  protected $url;
  protected $view;

  public function __construct(Application $app, array $data)
  {
    parent::__construct($app);
    $this->hydrate($data);

    $this->delta = $this->app()->config()->get('delta');
    $this->perPage = $this->app()->config()->get('perPage');
    
    $this->pages = ceil($this->records / $this->perPage); // Nombre de pages
    $this->start = $this->current > 1 ? ($this->current - 1) * $this->perPage() : 0;
  }

  public function __toString()
  {
    $this->buildView();

    return $this->view;
  }

  public function hydrate(array $data)
  {
    foreach ($data as $key => $value)
    {
      $method = 'set'. ucfirst($key);

      if (method_exists($this, $method))
        $this->$method($value);
    }
  }

  // Getters
  public function perPage() { return $this->perPage; }
  public function start() { return $this->start; }

  // Setters
  public function setCurrent($current)
  {
    $this->current = (int) $current;
  }

  public function setRecords($records)
  {
    $this->records = (int) $records;
  }

  public function setUrl($url)
  {
    $this->url = $url;
  }
  

  public function buildView()
  {
    $this->view = '<p>';

    if($this->records > $this->perPage)
    {
      if($this->current > 1 && $this->pages > $this->delta)
        $this->view .= '<a href="'. $this->url. '">1</a> ...';

      $i = ($this->pages - $this->current > $this->delta) ? $this->current : $this->pages - $this->delta; // Affiche bien les dernières pages

      for($i; $i < $this->pages; $i++)
      {
        if($i > 0 && $i < $this->current + $this->delta)
        {
          if($i == $this->current)
            $this->view .= ' &nbsp;'. $i. ' ';

          else
            $this->view .= '<a href="'. $this->url. '-p'. $i. '">'. $i. '</a> ';
        }
      }

      $this->view .= '... <a href="'. $this->url. '-p'. $this->pages. '">'. $this->pages. '</a> <a href="'. $this->url. '-all" class="f_right maj">All</a></p>';
    }
  }
}