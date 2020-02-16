<?php
namespace Library;

class ExternalApi
{
  protected $apiLink;
  protected $result = array();

  public function __construct($apiLink)
  {
    $this->setApiLink($apiLink);

    $this->connect();
  }

  protected function connect()
  {
    $d = file_get_contents($this->apiLink);
    $d = json_decode($d, true);

    $this->setResult($d);
  }

  public function result() { return $this->result; }

  public function setApiLink($apiLink)
  {
    if (filter_var($apiLink, FILTER_VALIDATE_URL))
      $this->apiLink = $apiLink;
  }

  public function setResult(array $result)
  {
    $this->result = $result;
  }
}