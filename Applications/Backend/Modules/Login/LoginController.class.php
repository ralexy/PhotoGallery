<?php
namespace Applications\Backend\Modules\Login;

class LoginController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
    $this->page->addVar('title', 'Login');

    if($request->postExists('login'))
    {
      $login = $request->postData('login');
      $password = $request->postData('password');

      if ($login == $this->app->config()->get('login') && $password == $this->app->config()->get('password'))
      {
        $this->app->user()->setAuthenticated($this->app->name());
        //$this->app->httpResponse()->redirect('.');
        $this->app->httpResponse()->redirect('.');
      }
      else
      {
        $this->page->addVar('invalidLogin', 1);
      }
    }
  }

  public function executeLogout()
  {
    $this->app->user()->logout();
    exit($this->app->httpResponse()->redirect('.'));
  }
}