<?php
namespace Applications\Api\Modules\Addpicture;

use Library\Entities\Picture;

class AddPictureController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
      $postJson = $request->postData('postJson');
      $data = json_decode($postJson, true);
      $res = [];

      if($data[0]) {
          $data[0]['year'] = new \DateTime($data[0]['year']);
          $picture = new Picture($data[0]);

          if ($picture->isValid()) {
              $this->managers->getManagerOf('picture')->save($picture);

              $res['result'] = 'success';
          } else {
              $res['result'] = 'error';
          }
      } else {
          $res['result'] = 'error';
      }

      echo json_encode($res);
  }
}