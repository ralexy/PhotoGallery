<?php
namespace Applications\Api\Modules\AddPictureCollection;

use Library\Entities\PictureCollection;

class addPictureCollectionController extends \Library\BackController
{
  public function executeIndex(\Library\HTTPRequest $request)
  {
      $postJson = $request->postData('postJson');
      $data = json_decode($postJson, true);
      $res = [];

      if(count($data) > 0) {
          foreach($data as $line) {
              $pictureCollection = new PictureCollection($line);

              if($pictureCollection->isValid()) {
                  $this->managers->getManagerOf('PictureCollection')->save($pictureCollection);
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