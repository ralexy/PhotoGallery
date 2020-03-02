<?php
namespace Applications\Api\Modules\AddPicture;

use Library\Entities\Picture;

class AddPictureController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
      $postJson = $request->postData('postJson');
      $data = json_decode($postJson, true);
      $res = [];

      if($data[0]) {
          foreach($data as $line) {
              $line['year'] = new \DateTime($line['year']);
              $picture = new Picture($line);

              if($picture->isValid()) {
                  $this->managers->getManagerOf('Picture')->save($picture);

                  $line['pictureId'] = $picture->getPictureId();
                  $line['year'] = $line['year']->format("Y");
                  $res['result'][] = $line;
              } else {
                  $res['result'][] = 'error';
              }
          }
      } else {
          $res['result'] = 'error';
      }

      $this->page()->addVar('res', $res);
  }
}