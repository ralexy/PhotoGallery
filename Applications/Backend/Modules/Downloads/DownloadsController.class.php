<?php
namespace Applications\Backend\Modules\Downloads;

class DownloadsController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
    $current = $request->getData('p') ? $request->getData('p') : 1;
    $records = $this->managers->getManagerOf('Downloads')->count();

    $pager = new \Library\Pager($this->app(), array(
      'current' => $current,
      'url'     => 'downloads',
      'records' => $records
    ));

    $downloads = $this->managers->getManagerOf('Downloads')->getList($pager->start(), $pager->perPage());

    $this->page->addVar('title', 'Downloads');
    $this->page->addVar('downloads', $downloads);
    $this->page->addVar('pager', $pager);
  }

  public function executeAll()
  {
    $downloads = $this->managers->getManagerOf('Downloads')->getList();

    $this->page->addVar('title', 'All Downloads');
    $this->page->addVar('downloads', $downloads);
  }

  public function executeDelete(\Library\HTTPRequest $request)
  {
    if($id = $request->getData('d'))
    {
      $this->managers->getManagerOf('Downloads')->delete((int) $id);

      exit($this->app->httpResponse()->redirect('downloads'));
    }
  }

  public function executeSearch(\Library\HTTPRequest $request)
  {
    $downloads = $this->managers->getManagerOf('Downloads')->search($request->postData('query'));

    $this->page->addVar('title', 'All Downloads');
    $this->page->addVar('downloads', $downloads);
  }
}