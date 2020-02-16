<?php
namespace Applications\Backend\Modules\Members;

class MembersController extends \Library\BackController
{
  public function __construct(\Library\Application $app, $module, $action)
  {
    parent::__construct($app, $module, $action);

    $this->page->addVar('searchAction', strtolower($module));
  }

  public function executeIndex(\Library\HTTPRequest $request)
  {
    $current = $request->getData('p') ? $request->getData('p') : 1;
    $records = $this->managers->getManagerOf('Members')->count();

    $pager = new \Library\Pager($this->app(), array(
      'current' => $current,
      'url'      => 'members',
      'records' => $records
    ));

    $members = $this->managers->getManagerOf('Members')->getList($pager->start(), $pager->perPage());

    $this->page->addVar('title', 'Members');
    $this->page->addVar('members', $members);
    $this->page->addVar('pager', $pager);
  }

  public function executeAll()
  {
    $members = $this->managers->getManagerOf('Members')->getList();

    $this->page->addVar('title', 'All Members');
    $this->page->addVar('members', $members);
  }

  public function executeDelete(\Library\HTTPRequest $request)
  {
    if($id = $request->getData('d'))
    {
      $this->managers->getManagerOf('Members')->delete((int) $id);

      $this->app->httpResponse()->redirect('members');
    }
  }

  public function executeEdit(\Library\HTTPRequest $request)
  {
    $member = new \Library\Entities\Member(array(
      'id'  => (int) $request->getData('e'),
      'key' => $this->app->config()->get('membersKey')
    ));

    $manager = $this->managers->getManagerOf('Members')->get($member);

    if($request->postExists('email') && $request->postExists('password'))
    {
      $member->hydrate($request->postData());

      if($member->isValid())
      {
        $this->managers->getManagerOf('Members')->save($member);

        $this->page->addVar('success', 'Modification made');
        $member->unsetPassword();
      }
    } 

    $this->page->addVar('member', $member);
  }

  public function executeSearch(\Library\HTTPRequest $request)
  {
    $r = $this->managers->getManagerOf('Members')->search($request->postData('query'));

    $this->page->addVar('title', 'Search Results');
    $this->page->addVar('members', $r);
  } 
}