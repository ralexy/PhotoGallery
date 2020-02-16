<?php
namespace Applications\Backend\Modules\Payments;

class PaymentsController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
    $current = $request->getData('p') ? $request->getData('p') : 1;
    $records = $this->managers->getManagerOf('Payments')->count();

    $pager = new \Library\Pager($this->app(), array(
      'current' => $current,
      'url'      => 'payments',
      'records' => $records
    ));

    $payments = $this->managers->getManagerOf('Payments')->getList($pager->start(), $pager->perPage());

    $this->page->addVar('title', 'Payments');
    $this->page->addVar('payments', $payments);
    $this->page->addVar('pager', $pager);
  }

  public function executeAll()
  {
    $payments = $this->managers->getManagerOf('Payments')->getList();

    $this->page->addVar('title', 'All Payments');
    $this->page->addVar('payments', $payments);
  }

  public function executeDelete(\Library\HTTPRequest $request)
  {
    if($id = $request->getData('d'))
    {
      $this->managers->getManagerOf('Payments')->delete((int) $id);

      $this->app->httpResponse()->redirect('payments');
    }
  }

  public function executeSearch(\Library\HTTPRequest $request)
  {
    $payments = $this->managers->getManagerOf('Payments')->search($request->postData('query'));

    $this->page->addVar('title', 'Search Results');
    $this->page->addVar('payments', $payments);
  }
}