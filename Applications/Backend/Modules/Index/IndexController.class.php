<?php
namespace Applications\Backend\Modules\Index;

class IndexController extends \Library\BackController
{
  public function executeIndex()
  {
    $this->page->addVar('Title', 'Statistics');
    $this->page->addVar('hideSearch', 1);
  }
}